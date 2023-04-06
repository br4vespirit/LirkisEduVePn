
export const playConfirmationSuccessSound = (elementId) => {
    if (elementId.includes('confirm')) {
      var confirmationEntity = document.querySelector(`#${elementId}`);
      confirmationEntity.setAttribute('material', 'color: #36c991;');
      confirmationEntity.setAttribute('text', 'value: Správna odpoveď');
      confirmationEntity.emit('success');
    }
}

export const playConfirmationUnsuccessSound = (elementId) => {
    if (elementId.includes('confirm')) {
      var confirmationEntity = document.querySelector(`#${elementId}`);
      confirmationEntity.emit('unsuccess');
    }
}

export const updateVisualProgres = (elementId) =>  {
    if (elementId.includes('confirm')) {
      var progressEntity = document.querySelector(`#${elementId}Progress`);
      progressEntity.setAttribute(
        'material',
        'color: green; side: double; shader: flat'
      );
    }
}

export const changeSelectButton = (elementId) => {
  const clkMultiEventHandler = elementId.getAttribute('clk-multi-event-handler').selected;
  if (clkMultiEventHandler === false){
    elementId.setAttribute('material', 'src: #selected; side: double; shader: flat');
  }else{
    elementId.setAttribute('material', 'src: #unselected; side: double; shader: flat');
  }

  elementId.setAttribute('clk-multi-event-handler', `selected: ${!clkMultiEventHandler}`);
}
