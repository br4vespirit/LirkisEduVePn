import {
  playConfirmationSuccessSound,
  playConfirmationUnsuccessSound,
  updateVisualProgres
} from '../transitionFunctions.js';

/**
 * @class
 */
export default class Transition {
    /**
     * Constructs instance of PetriNet
     * @param {string} transitionName - Name of transition.
     */
    constructor(transitionName) {
      this.transitionName = transitionName;
    }


    ifTransitionEnabled() {
        // imported functions
        playConfirmationSuccessSound(this.transitionName);
        updateVisualProgres(this.transitionName);
    }

    ifTransitionDisabled() {
        // imported function
        playConfirmationUnsuccessSound(this.transitionName);
    }

    /**
     *
     * @param {boolean} isTransitionEnabled - jfkajfk a
     */
    always(isTransitionEnabled) {
        // imported function
        // TODO: log user activity to server
        //serverLogger.createParseFiringAttempt(1,data.message,true,new Date(),1);
        console.log(this.transitionName, isTransitionEnabled);
    }
}
