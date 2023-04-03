import * as transitionFunctions from './transitionFunctions';

export const transitions = [
  {
    transitionName: 'P3Cplace',
    ifTransitionEnabled: (elementId) => {
      transitionFunctions.playConfirmationSuccessSound(elementId);
      transitionFunctions.updateVisualProgres(elementId);
    },
    ifTransitionDisabled: (elementId) => {
      transitionFunctions.playConfirmationUnsuccessSound(elementId);
    },
    always: (elementId) => {
      console.log(elementId);
    }
  },
  {
    transitionName: 'P3Iplace',
    ifTransitionEnabled: (elementId) => {
      transitionFunctions.playConfirmationSuccessSound(elementId);
      transitionFunctions.updateVisualProgres(elementId);
    },
    ifTransitionDisabled: (elementId) => {
      transitionFunctions.playConfirmationUnsuccessSound(elementId);
    },
    always: (elementId) => {
      console.log(elementId);
    }
  },
  {
    transitionName: 'P3confirm',
    ifTransitionEnabled: (elementId) => {
      transitionFunctions.playConfirmationSuccessSound(elementId);
      transitionFunctions.updateVisualProgres(elementId);
    },
    ifTransitionDisabled: (elementId) => {
      transitionFunctions.playConfirmationUnsuccessSound(elementId);
    },
    always: (elementId) => {
      console.log(elementId);
    }
  },
  {
    transitionName: 'P3Cdisplace',
    ifTransitionEnabled: (elementId) => {
      transitionFunctions.playConfirmationSuccessSound(elementId);
      transitionFunctions.updateVisualProgres(elementId);
    },
    ifTransitionDisabled: (elementId) => {
      transitionFunctions.playConfirmationUnsuccessSound(elementId);
    },
    always: (elementId) => {
      console.log(elementId);
    }
  },
  {
    transitionName: 'P3Idisplace',
    ifTransitionEnabled: (elementId) => {
      transitionFunctions.playConfirmationSuccessSound(elementId);
      transitionFunctions.updateVisualProgres(elementId);
    },
    ifTransitionDisabled: (elementId) => {
      transitionFunctions.playConfirmationUnsuccessSound(elementId);
    },
    always: (elementId) => {
      console.log(elementId);
    }
  },
  {
    transitionName: 'P2Iselect',
    ifTransitionEnabled: (elementId) => {
      transitionFunctions.playConfirmationSuccessSound(elementId);
      transitionFunctions.updateVisualProgres(elementId);
    },
    ifTransitionDisabled: (elementId) => {
      transitionFunctions.playConfirmationUnsuccessSound(elementId);
    },
    always: (elementId) => {
      console.log(elementId);
    }
  },
  {
    transitionName: 'P2Iunselect',
    ifTransitionEnabled: (elementId) => {
      transitionFunctions.playConfirmationSuccessSound(elementId);
      transitionFunctions.updateVisualProgres(elementId);
    },
    ifTransitionDisabled: (elementId) => {
      transitionFunctions.playConfirmationUnsuccessSound(elementId);
    },
    always: (elementId) => {
      console.log(elementId);
    }
  },
  {
    transitionName: 'P2Cunselect',
    ifTransitionEnabled: (elementId) => {
      transitionFunctions.playConfirmationSuccessSound(elementId);
      transitionFunctions.updateVisualProgres(elementId);
    },
    ifTransitionDisabled: (elementId) => {
      transitionFunctions.playConfirmationUnsuccessSound(elementId);
    },
    always: (elementId) => {
      console.log(elementId);
    }
  },
  {
    transitionName: 'P2Cselect',
    ifTransitionEnabled: (elementId) => {
      transitionFunctions.playConfirmationSuccessSound(elementId);
      transitionFunctions.updateVisualProgres(elementId);
    },
    ifTransitionDisabled: (elementId) => {
      transitionFunctions.playConfirmationUnsuccessSound(elementId);
    },
    always: (elementId) => {
      console.log(elementId);
    }
  },
  {
    transitionName: 'P2confirm',
    ifTransitionEnabled: (elementId) => {
      transitionFunctions.playConfirmationSuccessSound(elementId);
      transitionFunctions.updateVisualProgres(elementId);
    },
    ifTransitionDisabled: (elementId) => {
      transitionFunctions.playConfirmationUnsuccessSound(elementId);
    },
    always: (elementId) => {
      console.log(elementId);
    }
  },
  {
    transitionName: 'P1Cunselect',
    ifTransitionEnabled: (elementId) => {
      transitionFunctions.playConfirmationSuccessSound(elementId);
      transitionFunctions.updateVisualProgres(elementId);
    },
    ifTransitionDisabled: (elementId) => {
      transitionFunctions.playConfirmationUnsuccessSound(elementId);
    },
    always: (elementId) => {
      console.log(elementId);
    }
  },
  {
    transitionName: 'P1Cselect',
    ifTransitionEnabled: (elementId) => {
      transitionFunctions.playConfirmationSuccessSound(elementId);
      transitionFunctions.updateVisualProgres(elementId);
    },
    ifTransitionDisabled: (elementId) => {
      transitionFunctions.playConfirmationUnsuccessSound(elementId);
    },
    always: (elementId) => {
      console.log(elementId);
    }
  },
  {
    transitionName: 'P1Iselect',
    ifTransitionEnabled: (elementId) => {
      transitionFunctions.playConfirmationSuccessSound(elementId);
      transitionFunctions.updateVisualProgres(elementId);
    },
    ifTransitionDisabled: (elementId) => {
      transitionFunctions.playConfirmationUnsuccessSound(elementId);
    },
    always: (elementId) => {
      console.log(elementId);
    }
  },
  {
    transitionName: 'P1Iunselect',
    ifTransitionEnabled: (elementId) => {
      transitionFunctions.playConfirmationSuccessSound(elementId);
      transitionFunctions.updateVisualProgres(elementId);
    },
    ifTransitionDisabled: (elementId) => {
      transitionFunctions.playConfirmationUnsuccessSound(elementId);
    },
    always: (elementId) => {
      console.log(elementId);
    }
  },
  {
    transitionName: 'P1confirm',
    ifTransitionEnabled: (elementId) => {
      transitionFunctions.playConfirmationSuccessSound(elementId);
      transitionFunctions.updateVisualProgres(elementId);
    },
    ifTransitionDisabled: (elementId) => {
      transitionFunctions.playConfirmationUnsuccessSound(elementId);
    },
    always: (elementId) => {
      console.log(elementId);
    }
  },
]
