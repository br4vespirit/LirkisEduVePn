import { playConfirmationSuccessSound, playConfirmationUnsuccessSound, updateVisualProgres } from '../transitionFunctions';

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

    always() {
        // imported function
    }
}