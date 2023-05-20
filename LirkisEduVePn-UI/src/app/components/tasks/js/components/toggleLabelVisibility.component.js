AFRAME.registerComponent('toggle-label-visibility', {
  init: function () {
    this.el.addEventListener('click', () => {
      this.el.sceneEl.emit('toggleLabelVisibility');
    });
  }
});
