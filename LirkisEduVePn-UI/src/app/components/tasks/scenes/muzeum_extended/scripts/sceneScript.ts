
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

const showFailMessage = () => {
  const finalMsgEntity = document.querySelector('#failedMsg');
  if (finalMsgEntity !== null) finalMsgEntity.setAttribute('visible', 'true');
}

export const transitions = [
  {
    transitionName: 'JewelsCplace',
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
    transitionName: 'JewelsIplace',
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
    transitionName: 'JewelsConfirm',
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
    transitionName: 'JewelsCdisplace',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      const element = document.getElementById(targets[0]);
      if (element !== null) { // @ts-ignore
        element.components["collision-detector"].changeBoxColorRed();
      }
      if (replay){
        const model = document.getElementById(targets[1]);
        if (model != null) model.setAttribute('position', "22.582 2.456 12.098");
      }
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'JewelsIdisplace',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      const element = document.getElementById(targets[0]);
      if (element !== null) { // @ts-ignore
        element.components["collision-detector"].changeBoxColorRed();
      }
      if (replay){
        const model = document.getElementById(targets[1]);
        if (model != null) model.setAttribute('position', "22.582 2.456 12.098");
      }
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'ReformsIselect',
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
    transitionName: 'ReformsIunselect',
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
    transitionName: 'ReformsCunselect',
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
    transitionName: 'ReformsCselect',
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
    transitionName: 'ReformsConfirm',
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
    transitionName: 'MonarchCunselect',
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
    transitionName: 'MonarchCselect',
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
    transitionName: 'MonarchIselect',
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
    transitionName: 'MonarchIunselect',
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
    transitionName: 'MonarchConfirm',
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
  }, {
    transitionName: 'ImportCplace',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      const element = document.getElementById(targets[0]);
      if (element !== null) { // @ts-ignore
        element.components["collision-detector"].changeBoxColorGreen();
      }
      if (replay) {
        const model = document.getElementById(targets[1]);
        if (model !== null) model.setAttribute('position', '-18.35 3.933 11.5');
      }
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'ImportIplace',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      const element = document.getElementById(targets[0]);
      if (element !== null) { // @ts-ignore
        element.components["collision-detector"].changeBoxColorGreen();
      }
      if (replay) {
        const model = document.getElementById(targets[1]);
        if (model !== null) model.setAttribute('position', '-18.35 3.933 11.5');
      }
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'ImportConfirm',
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
    transitionName: 'ImportCdisplace',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      const element = document.getElementById(targets[0]);
      if (element !== null) { // @ts-ignore
        element.components["collision-detector"].changeBoxColorRed();
      }
      if (replay) {
        const model = document.getElementById(targets[1]);
        if (model !== null) model.setAttribute('position', '-18.407 2.133 -5.234')
      }
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'ImportIdisplace',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      const element = document.getElementById(targets[0]);
      if (element !== null) { // @ts-ignore
        element.components["collision-detector"].changeBoxColorRed();
      }
      if (replay) {
        const model = document.getElementById(targets[1]);
        if (model !== null) model.setAttribute('position', '-18.407 2.133 -5.234')
      }
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'CounterReformCunselect',
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
    transitionName: 'CounterReformCselect',
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
    transitionName: 'CounterReformIselect',
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
    transitionName: 'CounterReformIunselect',
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
    transitionName: 'CounterReformConfirm',
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
    transitionName: 'DynastyCunselect',
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
    transitionName: 'DynastyCselect',
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
    transitionName: 'DynastyIselect',
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
    transitionName: 'DynastyIunselect',
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
    transitionName: 'DynastyConfirm',
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
    transitionName: 'TurkStrikeCunselect',
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
    transitionName: 'TurkStrikeCselect',
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
    transitionName: 'TurkStrikeIselect',
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
    transitionName: 'TurkStrikeIunselect',
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
    transitionName: 'TurkStrikeConfirm',
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
    transitionName: 'finalSucc',
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
    transitionName: 'finalFail1',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      showFailMessage()
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'finalFail2',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      showFailMessage()
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'finalFail3',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      showFailMessage()
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'finalFail4',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      showFailMessage()
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'finalFail6',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      showFailMessage()
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'finalFail7',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      showFailMessage()
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  },
  {
    transitionName: 'finalFail8',
    ifTransitionFound: (targets: string[], replay: boolean) => {

    },
    ifTransitionEnabled: (targets: string[], replay: boolean) => {
      showFailMessage()
    },
    ifTransitionDisabled: (targets: string[], replay: boolean) => {
    },
    ifTransitionNotFound: (targets: string[], replay: boolean) => {

    }
  }
]

export const places = [
  {
    placeName: 'Monarch',
    ifPlaceFound: (placeName: string) => showTaskPanel(placeName),
    ifPlaceNotFound: () => {
    },
    ifPlaceNotFoundOnStart: () => {
      placeBarrier('-3.819 1 5.049');
      placeBarrier('-7.429 1 5.049');
    }
  },
  {
    placeName: 'Reforms',
    ifPlaceFound: (placeName: string) => showTaskPanel(placeName),
    ifPlaceNotFound: () => {
    },
    ifPlaceNotFoundOnStart: () => {
      placeBarrier('-3.819 1 -2.71779');
      placeBarrier('-7.429 1 -2.71779');
    }
  },
  {
    placeName: 'Jewels',
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
    placeName: 'Import',
    ifPlaceFound: (placeName: string) => showTaskPanel(placeName),
    ifPlaceNotFound: () => {
    },
    ifPlaceNotFoundOnStart: () => {
      placeBarrier('-20.219 1 5.049');
      placeBarrier('-16.525 1 5.049');
      placeBarrier('-20.219 1 -2.507');
      placeBarrier('-16.525 1 -2.507');
    }
  },
  {
    placeName: 'Renesance',
    ifPlaceFound: (placeName: string) => showTaskPanel(placeName),
    ifPlaceNotFound: () => {
    },
    ifPlaceNotFoundOnStart: () => {
      placeBarrier('-32.698 1 5.049');
      placeBarrier('-29.025 1 5.049');
      placeBarrier('-32.698 1 -2.285');
      placeBarrier('-29.025 1 -2.285');
    }
  },
  {
    placeName: 'CounterReform',
    ifPlaceFound: (placeName: string) => showTaskPanel(placeName),
    ifPlaceNotFound: () => {
    },
    ifPlaceNotFoundOnStart: () => {
      placeBarrier('33.194 1 5.049');
      placeBarrier('36.678 1 5.049');
    }
  },
  {
    placeName: 'Dynasty',
    ifPlaceFound: (placeName: string) => showTaskPanel(placeName),
    ifPlaceNotFound: () => {
    },
    ifPlaceNotFoundOnStart: () => {
      placeBarrier('33.194 1 -2.285');
      placeBarrier('36.678 1 -2.285');
    }
  },
  {
    placeName: 'TurkStrike',
    ifPlaceFound: (placeName: string) => showTaskPanel(placeName),
    ifPlaceNotFound: () => {
    },
    ifPlaceNotFoundOnStart: () => {
      placeBarrier('45.616 1 5.049');
      placeBarrier('49.328 1 5.049');
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
