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
      transitionFunctions.playConfirmationSuccessSound(targets[0]);
      transitionFunctions.updateVisualProgres(targets[1]);
    },
    ifTransitionDisabled: (targets, replay) => {
      transitionFunctions.playConfirmationUnsuccessSound(targets[0]);
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
      const element = document.getElementById(targets[0]);
      element.components["clk-multi-event-handler"].toggleButton();
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
      const element = document.getElementById(targets[0]);
      element.components["clk-multi-event-handler"].toggleButton();
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
      transitionFunctions.playConfirmationSuccessSound(targets[0]);
      transitionFunctions.updateVisualProgres(targets[1]);
    },
    ifTransitionDisabled: (targets, replay) => {
      transitionFunctions.playConfirmationUnsuccessSound(targets[0]);
    },
    ifTransitionNotFound: (targets, replay) => {

    }
  },
  {
    transitionName: 'P1Cunselect',
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
    transitionName: 'P1Cselect',
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
    transitionName: 'P1Iselect',
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
    transitionName: 'P1Iunselect',
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
    transitionName: 'P1confirm',
    ifTransitionFound: (targets, replay) => {

    },
    ifTransitionEnabled: (targets, replay) => {
        transitionFunctions.playConfirmationSuccessSound(targets[0]);
        transitionFunctions.updateVisualProgres(targets[1]);
    },
    ifTransitionDisabled: (targets, replay) => {
        transitionFunctions.playConfirmationUnsuccessSound(targets[0]);
    },
    ifTransitionNotFound: (targets, replay) => {

    }
  }
]

export const places = [
  {
    placeName: 'P1',
    ifPlaceFound: (placeName) => transitionFunctions.showTaskPanel(placeName),
    ifPlaceNotFound: () => {
      transitionFunctions.placeBarrier('-3.819 1 5.049');
      transitionFunctions.placeBarrier('-7.429 1 5.049');
    }
  },
  {
    placeName: 'P2',
    ifPlaceFound: (placeName) => transitionFunctions.showTaskPanel(placeName),
    ifPlaceNotFound: () => {
      transitionFunctions.placeBarrier('-3.819 1 5.049');
      transitionFunctions.placeBarrier('-7.429 1 5.049');
    }
  },
  {
    placeName: 'P3',
    ifPlaceFound: (placeName) => transitionFunctions.showTaskPanel(placeName),
    ifPlaceNotFound: () => {
      transitionFunctions.placeBarrier('-3.819 1 5.049');
      transitionFunctions.placeBarrier('-7.429 1 5.049');
    }
  },
  {
    placeName: 'P4',
    ifPlaceFound: (placeName) => transitionFunctions.showTaskPanel(placeName),
    ifPlaceNotFound: () => {
      transitionFunctions.placeBarrier('-3.819 1 5.049');
      transitionFunctions.placeBarrier('-7.429 1 5.049');
    }
  },
  {
    placeName: 'P5',
    ifPlaceFound: (placeName) => transitionFunctions.showTaskPanel(placeName),
    ifPlaceNotFound: () => {
      transitionFunctions.placeBarrier('-3.819 1 5.049');
      transitionFunctions.placeBarrier('-7.429 1 5.049');
    }
  },
  {
    placeName: 'P6',
    ifPlaceFound: (placeName) => transitionFunctions.showTaskPanel(placeName),
    ifPlaceNotFound: () => {
      transitionFunctions.placeBarrier('-3.819 1 5.049');
      transitionFunctions.placeBarrier('-7.429 1 5.049');
    }
  },
  {
    placeName: 'P7',
    ifPlaceFound: (placeName) => transitionFunctions.showTaskPanel(placeName),
    ifPlaceNotFound: () => {
      transitionFunctions.placeBarrier('-3.819 1 5.049');
      transitionFunctions.placeBarrier('-7.429 1 5.049');
    }
  },
  {
    placeName: 'P8',
    ifPlaceFound: (placeName) => transitionFunctions.showTaskPanel(placeName),
    ifPlaceNotFound: () => {
      transitionFunctions.placeBarrier('-3.819 1 5.049');
      transitionFunctions.placeBarrier('-7.429 1 5.049');
    }
  },
  {
    placeName: 'P9',
    ifPlaceFound: (placeName) => transitionFunctions.showTaskPanel(placeName),
    ifPlaceNotFound: () => {
      transitionFunctions.placeBarrier('-3.819 1 5.049');
      transitionFunctions.placeBarrier('-7.429 1 5.049');
    }
    },
  {
    placeName: 'Roaming',
    ifPlaceFound: (placeName) => transitionFunctions.showTaskPanel(placeName),
    ifPlaceNotFound: () => {
      transitionFunctions.placeBarrier('-3.819 1 5.049');
      transitionFunctions.placeBarrier('-7.429 1 5.049');
    }
    },
]
