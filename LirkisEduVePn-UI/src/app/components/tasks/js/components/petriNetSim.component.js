import {SceneEvent} from '../models/sceneEvent.enum';
import * as petriNetLoader from '../modules/petriNetLoader.mjs';
import PetriNet from '../modules/petriNet.mjs';
import * as userActivityLogger from '../modules/userActivityLogger';
import {transitions, places} from "../transitionScript";


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
    const finalRegex = /^(finalSucc|finalFail)/;

    // load petri net and array with transitions
    let net;

    petriNetLoader.loadXMLDoc(this.data.pnmlFile).then(res => {
      net = (this.petriNet = new PetriNet(res));
      console.log(net);
      places.forEach(place => {
        if(!net.findPlace(place.placeName)) place.ifPlaceNotFoundOnStart();
      })
    });

    // // create session or fire all transition from session data
    // if (!sessionID){
    //   userActivityLogger.createSession(this.data.taskId, 1).then(data => {
    //         localStorage.setItem('sessionID', data);
    //         sessionID = data;
    //     }
    //   )
    // }else {
    //   // TODO: get all transition from current session and fire them
    //   userActivityLogger.getFiredTransitionsFromSession(sessionID).then(res => {
    //     res.forEach(transition => {
    //       const foundTransition = Transitions.find(el => el.transitionName === transition.action);
    //       const isTransitionEnabled = net.isEnabled(transition.action);
    //       if (isTransitionEnabled) {
    //         foundTransition.ifTransitionEnabled();
    //         net.fire(transition.action);
    //       }
    //     });
    //   })
    // }

    this.transitionEventHandler = () => {
      const transition = transitions.find(el => el.transitionName === data.message);
      const finalTransitions = transitions.filter(el => finalRegex.test(el.transitionName));
      // check if the transition is in the petri net
      if (net.findTransition(transition.transitionName)){
          console.log(transition.transitionName + ' found');
          transition.ifTransitionFound(this.data.affectedElements, false);
          // check if the transition can be fired
          if (net.isEnabled(transition.transitionName)){
              // fire transition
              console.log('%c' + transition.transitionName + ' Transition Fired 🚀', 'color: #FB607F');
              net.fire(transition.transitionName);
              // fire transition function
              transition.ifTransitionEnabled(this.data.affectedElements, false);
              // iterate trough final transitions and try if the transition can be fired
              finalTransitions.forEach(el => {
                  if (net.isEnabled(el.transitionName)) {
                    net.fire(el.transitionName);
                    el.ifTransitionEnabled(this.data.affectedElements, false);
                  }
              });
          } else {
              // if transition can be fired, fire different transition
              transition.ifTransitionDisabled(this.data.affectedElements, false);
          }
      }else {
          console.log(transition.transitionName + ' not found');
          transition.ifTransitionNotFound(this.data.affectedElements, false);
      }

      // const isTransitionEnabled = net.isEnabled(data.message);
      //
      // if (isTransitionEnabled) {
      //   net.fire(data.message);
      //   transition.ifTransitionEnabled(this.data.affectedElements, false);
      //
      //   // TODO: multiple ways of ending the task (quit, wrong answers, ..)
      //   if (net.getMarking(data.finalPlace) === data.taskCount) {
      //     // userActivityLogger.endSession(sessionID, new Date(), true);
      //     this.showFinalMessage();
      //     this.playVictorySound();
      //   }
      // } else {
      //   transition.ifTransitionDisabled(this.data.affectedElements, false);
      // }
      // log user activity
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
