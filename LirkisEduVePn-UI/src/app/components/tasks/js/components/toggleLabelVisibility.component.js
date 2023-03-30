AFRAME.registerComponent('toggle-label-visibility', {
  init: function () {
    // const plane = document.createElement('a-plane');
    // plane.setAttribute('width', '2');
    // plane.setAttribute('height', '1');
    // plane.setAttribute('color', '#000');
    // plane.setAttribute('position', '0 0 0');
    // this.el.appendChild(plane);
    //
    // // Create a text element to display the label text
    // const text = document.createElement('a-text');
    // text.setAttribute('value', 'change visibility');
    // text.setAttribute('align', 'center');
    // text.setAttribute('color', '#fff');
    // text.setAttribute('position', `0 0.01 0`);
    // plane.appendChild(text);

    this.el.addEventListener('click', () => {
      this.el.sceneEl.emit('toggleLabelVisibility');
      console.log('click');
    });
  }
});
