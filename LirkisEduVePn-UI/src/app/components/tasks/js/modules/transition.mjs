import {
  playConfirmationSuccessSound,
  playConfirmationUnsuccessSound,
  updateVisualProgres
} from '../transitionFunctions.js';
import * as userActivityLogger from '../modules/userActivityLogger';

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
   * @param {boolean} isTransitionEnabled
   */
  always(isTransitionEnabled) {
    // log user activity to server
    console.log(this.transitionName, isTransitionEnabled);
    userActivityLogger.createFiringAttemt(
      localStorage.getItem('sessionID'),
      this.transitionName,
      new Date(),
      isTransitionEnabled
    );
  }
}
