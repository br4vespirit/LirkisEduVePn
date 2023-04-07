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

    // load petri net and array with transitions
    let net;

    petriNetLoader.loadXMLDoc(this.data.pnmlFile).then(res => {
      net = (this.petriNet = new PetriNet(res));
      console.log(net);
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
      // const transition = Transitions.find(el => el.transitionName === data.message);
      const transition = transitions.find(el => el.transitionName === data.message);
      const isTransitionEnabled = net.isEnabled(data.message);

      if (isTransitionEnabled) {
        net.fire(data.message);
        transition.ifTransitionEnabled(this.data.affectedElements, false);

        // TODO: multiple ways of ending the task (quit, wrong answers, ..)
        if (net.getMarking(data.finalPlace) === data.taskCount) {
          // userActivityLogger.endSession(sessionID, new Date(), true);
          this.showFinalMessage();
          this.playVictorySound();
        }
      } else {
        transition.ifTransitionDisabled(this.data.affectedElements, false);
      }
      // log user activity
    };

    this.changePlaceEventHandler = () => {
      const place = places.find(el => el.placeName === data.message);
      place.ifPlaceNotFound(place.placeName);
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
        console.log(SceneEvent.firedTransition + ' ' + data.message);
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
