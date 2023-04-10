import * as transitionFunctions from './transitionFunctions';

export const transitions = [
  {
    transitionName: 'P3Cplace',
    ifTransitionFound: (targets, replay) => {

    },
    ifTransitionEnabled: (targets, replay) => {
      const element = document.getElementById(targets[0]);
      element.components["collision-detector"].changeBoxColorGreen();
      if (replay){
        const model = document.getElementById(targets[1]);
        model.setAttribute('position', '22.51704 3.933 -5.80505');
      }
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
      const element = document.getElementById(targets[0]);
      element.components["collision-detector"].changeBoxColorGreen();
      if (replay){
        const model = document.getElementById(targets[1]);
        model.setAttribute('position', '22.51704 3.933 -5.80505');
      }
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
      const element = document.getElementById(targets[0]);
      element.components["collision-detector"].changeBoxColorRed();
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
      const element = document.getElementById(targets[0]);
      element.components["collision-detector"].changeBoxColorRed();
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
  },{
    transitionName: 'P4Cplace',
    ifTransitionFound: (targets, replay) => {

    },
    ifTransitionEnabled: (targets, replay) => {
      const element = document.getElementById(targets[0]);
      element.components["collision-detector"].changeBoxColorGreen();
      if (replay){
        const model = document.getElementById(targets[1]);
        model.setAttribute('position', '22.51704 3.933 -5.80505');
      }
    },
    ifTransitionDisabled: (targets, replay) => {
    },
    ifTransitionNotFound: (targets, replay) => {

    }
  },
  {
    transitionName: 'P4Iplace',
    ifTransitionFound: (targets, replay) => {

    },
    ifTransitionEnabled: (targets, replay) => {
      const element = document.getElementById(targets[0]);
      element.components["collision-detector"].changeBoxColorGreen();
      if (replay){
        const model = document.getElementById(targets[1]);
        model.setAttribute('position', '22.51704 3.933 -5.80505');
      }
    },
    ifTransitionDisabled: (targets, replay) => {
    },
    ifTransitionNotFound: (targets, replay) => {

    }
  },
  {
    transitionName: 'P4confirm',
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
    transitionName: 'P4Cdisplace',
    ifTransitionFound: (targets, replay) => {

    },
    ifTransitionEnabled: (targets, replay) => {
      const element = document.getElementById(targets[0]);
      element.components["collision-detector"].changeBoxColorRed();
    },
    ifTransitionDisabled: (targets, replay) => {
    },
    ifTransitionNotFound: (targets, replay) => {

    }
  },
  {
    transitionName: 'P4Idisplace',
    ifTransitionFound: (targets, replay) => {

    },
    ifTransitionEnabled: (targets, replay) => {
      const element = document.getElementById(targets[0]);
      element.components["collision-detector"].changeBoxColorRed();
    },
    ifTransitionDisabled: (targets, replay) => {
    },
    ifTransitionNotFound: (targets, replay) => {

    }
  },
  {
    transitionName: 'P6Cunselect',
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
    transitionName: 'P6Cselect',
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
    transitionName: 'P6Iselect',
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
    transitionName: 'P6Iunselect',
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
    transitionName: 'P6confirm',
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
    transitionName: 'P7Cunselect',
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
    transitionName: 'P7Cselect',
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
    transitionName: 'P7Iselect',
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
    transitionName: 'P7Iunselect',
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
    transitionName: 'P7confirm',
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
    ifPlaceNotFound: () => {},
    ifPlaceNotFoundOnStart: () => {
      transitionFunctions.placeBarrier('-3.819 1 5.049');
      transitionFunctions.placeBarrier('-7.429 1 5.049');
    }
  },
  {
    placeName: 'P2',
    ifPlaceFound: (placeName) => transitionFunctions.showTaskPanel(placeName),
    ifPlaceNotFound: () => {},
    ifPlaceNotFoundOnStart: () => {
      transitionFunctions.placeBarrier('-3.819 1 -2.71779');
      transitionFunctions.placeBarrier('-7.429 1 -2.71779');
    }
  },
  {
    placeName: 'P3',
    ifPlaceFound: (placeName) => transitionFunctions.showTaskPanel(placeName),
    ifPlaceNotFound: () => {},
    ifPlaceNotFoundOnStart: () => {
      transitionFunctions.placeBarrier('20.539 1 5.049');
      transitionFunctions.placeBarrier('24.037 1 5.049');
      transitionFunctions.placeBarrier('20.539 1 -2.285');
      transitionFunctions.placeBarrier('24.037 1 -2.285');
    }
  },
  {
    placeName: 'P4',
    ifPlaceFound: (placeName) => transitionFunctions.showTaskPanel(placeName),
    ifPlaceNotFound: () => {},
    ifPlaceNotFoundOnStart: () => {
      transitionFunctions.placeBarrier('-20.219 1 5.049');
      transitionFunctions.placeBarrier('-16.525 1 5.049');
      transitionFunctions.placeBarrier('-20.219 1 -2.507');
      transitionFunctions.placeBarrier('-16.525 1 -2.507');
    }
  },
  {
    placeName: 'P5',
    ifPlaceFound: (placeName) => transitionFunctions.showTaskPanel(placeName),
    ifPlaceNotFound: () => {},
    ifPlaceNotFoundOnStart: () => {
      transitionFunctions.placeBarrier('-32.698 1 5.049');
      transitionFunctions.placeBarrier('-29.025 1 5.049');
      transitionFunctions.placeBarrier('-32.698 1 -2.285');
      transitionFunctions.placeBarrier('-29.025 1 -2.285');
    }
  },
  {
    placeName: 'P6',
    ifPlaceFound: (placeName) => transitionFunctions.showTaskPanel(placeName),
    ifPlaceNotFound: () => {},
    ifPlaceNotFoundOnStart: () => {
      transitionFunctions.placeBarrier('33.194 1 5.049');
      transitionFunctions.placeBarrier('36.678 1 5.049');
    }
  },
  {
    placeName: 'P7',
    ifPlaceFound: (placeName) => transitionFunctions.showTaskPanel(placeName),
    ifPlaceNotFound: () => {},
    ifPlaceNotFoundOnStart: () => {
      transitionFunctions.placeBarrier('33.194 1 -2.285');
      transitionFunctions.placeBarrier('36.678 1 -2.285');
    }
  },
  {
    placeName: 'P8',
    ifPlaceFound: (placeName) => transitionFunctions.showTaskPanel(placeName),
    ifPlaceNotFound: () => {},
    ifPlaceNotFoundOnStart: () => {
      transitionFunctions.placeBarrier('45.616 1 5.049');
      transitionFunctions.placeBarrier('49.328 1 5.049');
    }
  },
  {
    placeName: 'P9',
    ifPlaceFound: (placeName) => transitionFunctions.showTaskPanel(placeName),
    ifPlaceNotFound: () => {},
    ifPlaceNotFoundOnStart: () => {
      transitionFunctions.placeBarrier('45.616 1 -2.285');
      transitionFunctions.placeBarrier('49.328 1 -2.285');
    }
    },
  {
    placeName: 'Roaming',
    ifPlaceFound: (placeName) => {},
    ifPlaceNotFound: () => {},
    ifPlaceNotFoundOnStart: () => {}
    }
]
