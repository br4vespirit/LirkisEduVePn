
const playConfirmationSuccessSound = (elementId: string) => {
  const confirmationEntity = document.getElementById(elementId);
  if (confirmationEntity !== null) {
    confirmationEntity.setAttribute('material', 'color: #36c991;');
    confirmationEntity.setAttribute('text', 'value: Správna odpoveď');
    // @ts-ignore
    confirmationEntity.emit('success');
  }
}

const playConfirmationUnsuccessSound = (elementId: string) => {
  const confirmationEntity = document.getElementById(elementId);
  if (confirmationEntity !== null) { // @ts-ignore
    confirmationEntity.emit('unsuccess');
  }
}

const updateVisualProgres = (elementId: string) => {
  const progressEntity = document.getElementById(elementId);
  if (progressEntity !== null) progressEntity.setAttribute('material', 'color: green; side: double; shader: flat');
}

const placeBarrier = (position: string) => {
  const sceneEl = document.getElementById('scene');
  const entityEl = document.createElement('a-entity');
  entityEl.setAttribute('gltf-model', '#ropeBarrier');
  entityEl.setAttribute('position', position);
  entityEl.setAttribute('scale', '0.012 0.01 0.01');
  if (sceneEl !== null) sceneEl.appendChild(entityEl);
}

const showTaskPanel = (placeName: string) => {
  const taskPanel = document.querySelector(`#task${placeName}`);
  if (taskPanel !== null) {
    taskPanel.setAttribute('visible', String(!taskPanel.getAttribute('visible')));
    // @ts-ignore
    taskPanel.children.item(2).classList.toggle('interactible');
  }
}

const playVictorySound = () => {
  const environmentEntity = document.querySelector('#player');
  setTimeout(() => {
    if (environmentEntity !== null) { // @ts-ignore
      environmentEntity.emit('win');
    }
  }, 2000);
}

const showFinalMessage = () => {
  const finalMsgEntity = document.querySelector('#gratulationMsg');
  if (finalMsgEntity !== null) finalMsgEntity.setAttribute('visible', 'true');
}

export const transitions = [
  {
    transitionName: 'P3Cplace',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      const element = document.getElementById(targets[0]);
      if(element !== null) { // @ts-ignore
        element.components["collision-detector"].changeBoxColorGreen();
      }
      if (replay) {
        const model = document.getElementById(targets[1]);
        if (model !== null) model.setAttribute('position', '22.51704 3.933 -5.80505');
      }
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'P3Iplace',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      const element = document.getElementById(targets[0]);
      if (element !== null) { // @ts-ignore
        element.components["collision-detector"].changeBoxColorGreen();
      }
      if (replay) {
        const model = document.getElementById(targets[1]);
        if (model !== null) model.setAttribute('position', '22.51704 3.933 -5.80505');
      }
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'P3confirm',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      playConfirmationSuccessSound(targets[0]);
      updateVisualProgres(targets[1]);
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
      playConfirmationUnsuccessSound(targets[0]);
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'P3Cdisplace',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      const element = document.getElementById(targets[0]);
      if (element !== null) { // @ts-ignore
        element.components["collision-detector"].changeBoxColorRed();
      }
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'P3Idisplace',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      const element = document.getElementById(targets[0]);
      if (element !== null) { // @ts-ignore
        element.components["collision-detector"].changeBoxColorRed();
      }
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'P2Iselect',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      const element = document.getElementById(targets[0]);
      if (element !== null) { // @ts-ignore
        element.components["clk-multi-event-handler"].toggleButton();
      }
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'P2Iunselect',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      const element = document.getElementById(targets[0]);
      if (element !== null) { // @ts-ignore
        element.components["clk-multi-event-handler"].toggleButton();
      }
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'P2Cunselect',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      const element = document.getElementById(targets[0]);
      if (element !== null) { // @ts-ignore
        element.components["clk-multi-event-handler"].toggleButton();
      }
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'P2Cselect',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      const element = document.getElementById(targets[0]);
      if (element !== null) { // @ts-ignore
        element.components["clk-multi-event-handler"].toggleButton();
      }
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'P2confirm',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      playConfirmationSuccessSound(targets[0]);
      updateVisualProgres(targets[1]);
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
      playConfirmationUnsuccessSound(targets[0]);
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'P1Cunselect',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      const element = document.getElementById(targets[0]);
      if (element !== null) { // @ts-ignore
        element.components["clk-multi-event-handler"].toggleButton();
      }
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'P1Cselect',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      const element = document.getElementById(targets[0]);
      if (element !== null) { // @ts-ignore
        element.components["clk-multi-event-handler"].toggleButton();
      }
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'P1Iselect',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      const element = document.getElementById(targets[0]);
      if (element !== null) { // @ts-ignore
        element.components["clk-multi-event-handler"].toggleButton();
      }
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'P1Iunselect',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      const element = document.getElementById(targets[0]);
      if (element !== null) { // @ts-ignore
        element.components["clk-multi-event-handler"].toggleButton();
      }
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'P1confirm',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      playConfirmationSuccessSound(targets[0]);
      updateVisualProgres(targets[1]);
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
      playConfirmationUnsuccessSound(targets[0]);
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'finSucc',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      console.log('finnSucc')
      playVictorySound()
      showFinalMessage()
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'finFail1',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      playVictorySound()
      showFinalMessage()
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'finFail2',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      playVictorySound()
      showFinalMessage()
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'finFail3',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      console.log('finnFail3')
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  }
]

export const places = [
  {
    placeName: 'P1',
    ifPlaceFound: (placeName: string) => showTaskPanel(placeName),
    ifPlaceNotFound: () => {
    },
    ifPlaceNotFoundOnStart: () => {
      placeBarrier('-3.819 1 5.049');
      placeBarrier('-7.429 1 5.049');
    }
  },
  {
    placeName: 'P2',
    ifPlaceFound: (placeName: string) => showTaskPanel(placeName),
    ifPlaceNotFound: () => {
    },
    ifPlaceNotFoundOnStart: () => {
      placeBarrier('-3.819 1 -2.71779');
      placeBarrier('-7.429 1 -2.71779');
    }
  },
  {
    placeName: 'P3',
    ifPlaceFound: (placeName: string) => showTaskPanel(placeName),
    ifPlaceNotFound: () => {
    },
    ifPlaceNotFoundOnStart: () => {
      placeBarrier('20.539 1 5.049');
      placeBarrier('24.037 1 5.049');
      placeBarrier('20.539 1 -2.285');
      placeBarrier('24.037 1 -2.285');
    }
  },
  {
    placeName: 'Roaming',
    ifPlaceFound: (placeName: string) => {
    },
    ifPlaceNotFound: () => {
    },
    ifPlaceNotFoundOnStart: () => {
    }
  }
]
