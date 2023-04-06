import * as transitionFunctions from './transitionFunctions';

export const transitions = [
  {
    transitionName: 'P3Cplace',
    ifTransitionFound: (targets, replay) => {

    },
    ifTransitionEnabled: (targets, replay) => {

    },
    ifTransitionDisabled: (targets, replay) => {
    },
    ifTransitionNotFound: (targets, replay) => {

    }
  },
  {
    transitionName: 'P3Iplace',
    ifTransitionFound: (targets, replay) => {

    },
    ifTransitionEnabled: (targets, replay) => {

    },
    ifTransitionDisabled: (targets, replay) => {
    },
    ifTransitionNotFound: (targets, replay) => {

    }
  },
  {
    transitionName: 'P3confirm',
    ifTransitionFound: (targets, replay) => {

    },
    ifTransitionEnabled: (targets, replay) => {

    },
    ifTransitionDisabled: (targets, replay) => {
    },
    ifTransitionNotFound: (targets, replay) => {

    }
  },
  {
    transitionName: 'P3Cdisplace',
    ifTransitionFound: (targets, replay) => {

    },
    ifTransitionEnabled: (targets, replay) => {

    },
    ifTransitionDisabled: (targets, replay) => {
    },
    ifTransitionNotFound: (targets, replay) => {

    }
  },
  {
    transitionName: 'P3Idisplace',
    ifTransitionFound: (targets, replay) => {

    },
    ifTransitionEnabled: (targets, replay) => {

    },
    ifTransitionDisabled: (targets, replay) => {
    },
    ifTransitionNotFound: (targets, replay) => {

    }
  },
  {
    transitionName: 'P2Iselect',
    ifTransitionFound: (targets, replay) => {

    },
    ifTransitionEnabled: (targets, replay) => {

    },
    ifTransitionDisabled: (targets, replay) => {
    },
    ifTransitionNotFound: (targets, replay) => {

    }
  },
  {
    transitionName: 'P2Iunselect',
    ifTransitionFound: (targets, replay) => {

    },
    ifTransitionEnabled: (targets, replay) => {

    },
    ifTransitionDisabled: (targets, replay) => {
    },
    ifTransitionNotFound: (targets, replay) => {

    }
  },
  {
    transitionName: 'P2Cunselect',
    ifTransitionFound: (targets, replay) => {

    },
    ifTransitionEnabled: (targets, replay) => {
      const element = document.getElementById(targets[0]);
      element.components["clk-multi-event-handler"].toggleButton();
    },
    ifTransitionDisabled: (targets, replay) => {
    },
    ifTransitionNotFound: (targets, replay) => {

    }
  },
  {
    transitionName: 'P2Cselect',
    ifTransitionFound: (targets, replay) => {

    },
    ifTransitionEnabled: (targets, replay) => {
      const element = document.getElementById(targets[0]);
      element.components["clk-multi-event-handler"].toggleButton();
    },
    ifTransitionDisabled: (targets, replay) => {
    },
    ifTransitionNotFound: (targets, replay) => {

    }
  },
  {
    transitionName: 'P2confirm',
    ifTransitionFound: (targets, replay) => {

    },
    ifTransitionEnabled: (targets, replay) => {

    },
    ifTransitionDisabled: (targets, replay) => {
    },
    ifTransitionNotFound: (targets, replay) => {

    }
  },
  {
    transitionName: 'P1Cunselect',
    ifTransitionFound: (targets, replay) => {

    },
    ifTransitionEnabled: (targets, replay) => {

    },
    ifTransitionDisabled: (targets, replay) => {
    },
    ifTransitionNotFound: (targets, replay) => {

    }
  },
  {
    transitionName: 'P1Cselect',
    ifTransitionFound: (targets, replay) => {

    },
    ifTransitionEnabled: (targets, replay) => {

    },
    ifTransitionDisabled: (targets, replay) => {
    },
    ifTransitionNotFound: (targets, replay) => {

    }
  },
  {
    transitionName: 'P1Iselect',
    ifTransitionFound: (targets, replay) => {

    },
    ifTransitionEnabled: (targets, replay) => {

    },
    ifTransitionDisabled: (targets, replay) => {
    },
    ifTransitionNotFound: (targets, replay) => {

    }
  },
  {
    transitionName: 'P1Iunselect',
    ifTransitionFound: (targets, replay) => {

    },
    ifTransitionEnabled: (targets, replay) => {

    },
    ifTransitionDisabled: (targets, replay) => {
    },
    ifTransitionNotFound: (targets, replay) => {

    }
  },
  {
    transitionName: 'P1confirm',
    ifTransitionFound: (targets, replay) => {

    },
    ifTransitionEnabled: (targets, replay) => {

    },
    ifTransitionDisabled: (targets, replay) => {
    },
    ifTransitionNotFound: (targets, replay) => {

    }
  }
]
