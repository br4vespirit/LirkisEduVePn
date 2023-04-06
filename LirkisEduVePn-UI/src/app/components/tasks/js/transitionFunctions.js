
export const playConfirmationSuccessSound = (elementId) => {
  const confirmationEntity = document.getElementById(elementId);
  confirmationEntity.setAttribute('material', 'color: #36c991;');
  confirmationEntity.setAttribute('text', 'value: Správna odpoveď');
  confirmationEntity.emit('success');
}

export const playConfirmationUnsuccessSound = (elementId) => {
  const confirmationEntity = document.getElementById(elementId);
  confirmationEntity.emit('unsuccess');
}

export const updateVisualProgres = (elementId) =>  {
  const progressEntity = document.getElementById(elementId);
  progressEntity.setAttribute('material', 'color: green; side: double; shader: flat');
}
