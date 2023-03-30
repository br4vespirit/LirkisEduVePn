AFRAME.registerComponent('toggle-label-visibility', {
  init: function () {
    const buttonEl = document.createElement('button');
    buttonEl.innerText = 'Toggle Label Visibility';

    this.el.addEventListener('click', () => {
      this.el.sceneEl.emit('toggleLabelVisibility');
    });

    this.el.appendChild(buttonEl);
  }
});
