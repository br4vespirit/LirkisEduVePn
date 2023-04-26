import {SceneEvent} from '../models/sceneEvent.enum';
import * as petriNetLoader from '../modules/petriNetLoader.mjs';
import * as cpnLoader from '../modules/cpnLoader.mjs';
import PetriNet from '../modules/petriNet.mjs';
import * as userActivityLogger from '../modules/userActivityLogger';
import {places, transitions} from "../transitionScript";


AFRAME.registerComponent('petri-net-sim', {
  schema: {
    event: {type: 'string', default: 'Scene Loaded'},
    message: {type: 'string', default: SceneEvent.petriNetLoaded},
    activePlace: {type: 'string', default: 'Roaming'},
    finalPlace: {type: 'string'},
    taskCount: {type: 'number', default: 1},
    pnmlFile: {type: 'string'},
    taskId: {type: 'number'},
    affectedElements: {type: 'array', default: []}
  },
  // Do something when component first attached.
  init: function () {
    let data = this.data;
    let sessionID = localStorage.getItem('sessionID');
    const userData = JSON.parse(localStorage.getItem('user-profile'));
    const finalRegex = /^(finSucc|finFail)/;
    let finalTransitions;

    // load petri net and array with transitions
    let net;

    cpnLoader.loadCPNData('../../../../../assets/petriNetFile/refactorInteractiveMap.cpn').then(res => {
      net = (this.petriNet = new PetriNet(res));
      console.log(net);
      finalTransitions = transitions.filter(el => finalRegex.test(el.transitionName));
      console.log(finalTransitions)
      // for every place fire function on start
      places.forEach(place => {
        if (!net.findPlace(place.placeName)) place.ifPlaceNotFoundOnStart();
      })
    })

    // petriNetLoader.loadXMLDoc(this.data.pnmlFile).then(res => {
    //   net = (this.petriNet = new PetriNet(res));
    //   console.log(net);
    //   finalTransitions = transitions.filter(el => finalRegex.test(el.transitionName));
    //   // for every place fire function on start
    //   places.forEach(place => {
    //     if (!net.findPlace(place.placeName)) place.ifPlaceNotFoundOnStart();
    //   })
    // });

    // TODO: make sure that session that is being restored is from logged user
    // create session or fire all transition from session data
    if (!sessionID) {
      userActivityLogger.createSession(this.data.taskId, userData.id).then(data => {
        console.log('%c New session created 🎉', 'color: #FB607F');
        localStorage.setItem('sessionID', data);
        sessionID = data;
      })
    } else {
      console.log('%c Session restored 🎉', 'color: #FB607F');
      // get all transition from current session and fire them
      userActivityLogger.getFiredTransitionsFromSession(sessionID).then(res => {
        res.forEach(transition => {
          const transitionReplay = transitions.find(el => el.transitionName === transition.action);
          if (transition.actionFound) {
            transitionReplay.ifTransitionFound(transition.actionTargets, true);
            if (transition.successful) {
              net.fire(transitionReplay.transitionName);
              transitionReplay.ifTransitionEnabled(transition.actionTargets, true);
            } else transitionReplay.ifTransitionDisabled(transition.actionTargets, true);
          } else {
            transitionReplay.ifTransitionNotFound(transition.actionTargets, true)
          }
        });
      })
    }

    this.transitionEventHandler = () => {
      const transition = transitions.find(el => el.transitionName === data.message);
      // check if the transition is in the petri net
      if (net.findTransition(transition.transitionName)) {
        console.log(transition.transitionName + ' found');
        transition.ifTransitionFound(this.data.affectedElements, false);
        // check if the transition can be fired
        if (net.isEnabled(transition.transitionName)) {
          // fire transition
          console.log('%c' + transition.transitionName + ' Transition Fired 🚀', 'color: #FB607F');
          net.fire(transition.transitionName);
          // log user activity
          userActivityLogger.createFiringAttemt(sessionID, transition.transitionName, new Date(), true, true, data.affectedElements);
          // fire transition function
          transition.ifTransitionEnabled(this.data.affectedElements, false);
          // iterate trough final transitions and try if the transition can be fired
          finalTransitions.forEach(el => {
            if (net.isEnabled(el.transitionName)) {
              console.log(el.transitionName)
              net.fire(el.transitionName);
              el.ifTransitionEnabled(this.data.affectedElements, false);
              // log user activity and end session
              userActivityLogger.createFiringAttemt(sessionID, transition.transitionName, new Date(), true, true, data.affectedElements);
              // TODO: determine whether session ended successfull or not
              userActivityLogger.endSession(sessionID, new Date(), true);
            }
          });
        } else {
          // if transition can be fired, fire different transition
          transition.ifTransitionDisabled(this.data.affectedElements, false);
          // log user activity
          userActivityLogger.createFiringAttemt(sessionID, transition.transitionName, new Date(), false, true, data.affectedElements);
        }
      } else {
        console.log(transition.transitionName + ' not found');
        transition.ifTransitionNotFound(this.data.affectedElements, false);
        // log user activity
        userActivityLogger.createFiringAttemt(sessionID, transition.transitionName, new Date(), false, false, data.affectedElements);
      }
    };

    this.changePlaceEventHandler = () => {
      const place = places.find(el => el.placeName === data.message);
      if (net.findPlace(place.placeName)) place.ifPlaceFound(place.placeName);
      else place.ifPlaceNotFound();
      data.activePlace = data.message;
    };
  },

  update: function (oldData) {
    // Do something when component's data is updated.
    const data = this.data;
    const el = this.el;
    // `event` updated. Remove the previous event listener if it exists.
    if (oldData.event && oldData.event === SceneEvent.firedTransition && data.event !== oldData.event) {
      el.removeEventListener(oldData.event, this.transitionEventHandler);
    } else {
      el.removeEventListener(oldData.event, this.changePlaceEventHandler);
    }

    if (data.event === SceneEvent.firedTransition) {
      this.resolveSceneEvent(el, data, this.transitionEventHandler);
    } else {
      this.resolveSceneEvent(el, data, this.changePlaceEventHandler);
    }
  },

  resolveSceneEvent: function (element, data, handler) {
    switch (data.event) {
      case SceneEvent.enteredPlace:
        element.addEventListener(data.message, handler);
        console.log(SceneEvent.enteredPlace + ' ' + data.message);
        break;
      case SceneEvent.leftPlace:
        element.addEventListener(data.message, handler);
        console.log(SceneEvent.leftPlace + ' ' + data.message);
        break;
      case SceneEvent.firedTransition:
        element.addEventListener(data.message, handler);
        // console.log(SceneEvent.firedTransition + ' ' + data.message);
        break;
      default:
        console.log(SceneEvent.petriNetLoaded);
        data.activePlace = 'Roaming';
    }
  },


  playVictorySound: function () {
    const environmentEntity = document.querySelector('#player');
    setTimeout(() => {
      environmentEntity.emit('win');
    }, 2000);
  },

  showFinalMessage: function () {
    const finalMsgEntity = document.querySelector('#gratulationMsg');
    finalMsgEntity.setAttribute('visible', 'true');
  }
});
