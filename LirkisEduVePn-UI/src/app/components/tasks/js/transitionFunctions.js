
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