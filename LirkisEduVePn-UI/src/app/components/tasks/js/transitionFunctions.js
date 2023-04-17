
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

export const updateVisualProgres = (elementId) => {
  const progressEntity = document.getElementById(elementId);
  progressEntity.setAttribute('material', 'color: green; side: double; shader: flat');
}

export const placeBarrier = (position) => {
  const sceneEl = document.getElementById('scene');
  const entityEl = document.createElement('a-entity');
  entityEl.setAttribute('gltf-model', '#ropeBarrier');
  entityEl.setAttribute('position', position);
  entityEl.setAttribute('scale', '0.012 0.01 0.01');
  sceneEl.appendChild(entityEl);
}

export const showTaskPanel = (placeName) => {
  const taskPanel = document.querySelector(`#task${placeName}`);
  if (taskPanel) {
    taskPanel.setAttribute('visible', !taskPanel.getAttribute('visible'));
    taskPanel.children.item(2).classList.toggle('interactible');
  }
}
