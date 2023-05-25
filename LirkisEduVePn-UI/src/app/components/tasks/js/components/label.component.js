AFRAME.registerComponent('label', {
  schema: {
    label: {type: 'string', default: ''},
    type: {type: 'string', default: 'transition'}
  },

  init: function () {
    // Create a plane to contain the label text
    const plane = document.createElement('a-plane');
    plane.setAttribute('width', '1.2');
    plane.setAttribute('height', '0.2');
    plane.setAttribute('material', 'color: white; side: double; shader: flat')
    plane.setAttribute('position', '0 0 0');
    plane.setAttribute('rounded', 'radius: 0.5');

    this.el.appendChild(plane);

    // Create a text element to display the label text
    const text = document.createElement('a-text');
    text.setAttribute('value', this.data.label);
    text.setAttribute('align', 'center');
    text.setAttribute('color', '#6f42c1');
    text.setAttribute('position', `0 -0.02 0`);
    text.setAttribute('text', 'width: 0.9; wrapCount: 30; alphaTest: 3');

    const textInfo = document.createElement('a-text');
    textInfo.setAttribute('value', this.data.type);
    textInfo.setAttribute('align', 'center');
    textInfo.setAttribute('color', '#000');
    textInfo.setAttribute('position', `0 0.06 0`);
    textInfo.setAttribute('text', 'width: 0.4; wrapCount: 20; alphaTest: 3');

    plane.appendChild(text);
    plane.appendChild(textInfo);

    this.visibleTo = ['ADMIN', 'TEACHER'];

    if (this.isVisibleToCurrentUser()) {
      this.el.setAttribute('visible', true);
    } else {
      this.el.setAttribute('visible', false);
    }

    // Add event listener to each label component
    const sceneEl = document.querySelector('a-scene');
    sceneEl.addEventListener('toggleLabelVisibility', () => {
      this.el.setAttribute('visible', !this.el.getAttribute('visible'));
    })
  },

  isVisibleToCurrentUser: function () {
    const currentUser = JSON.parse(localStorage.getItem('user-profile')).role;
    return this.visibleTo.includes(currentUser);
  }
});
