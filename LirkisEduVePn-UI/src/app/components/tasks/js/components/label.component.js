AFRAME.registerComponent('label', {
  schema: {
    label: {type: 'string', default: ''}
  },

  init: function () {
    // Create a plane to contain the label text
    const plane = document.createElement('a-plane');
    plane.setAttribute('width', '2');
    plane.setAttribute('height', '1');
    plane.setAttribute('color', '#000');
    plane.setAttribute('position', '0 0 0');
    this.el.appendChild(plane);

    // Create a text element to display the label text
    const text = document.createElement('a-text');
    text.setAttribute('value', this.data.label);
    text.setAttribute('align', 'center');
    text.setAttribute('color', '#fff');
    text.setAttribute('position', `0 0.01 0`);
    plane.appendChild(text);

    this.visibleTo = ['ADMIN', 'TEACHER'];

    if (this.isVisibleToCurrentUser()) {
      this.el.setAttribute('visible', true);
    } else {
      this.el.setAttribute('visible', false);
    }

    // Add event listener to each label component
    this.el.addEventListener('toggleLabelVisibility', () => {
      if (this.isVisibleToCurrentUser()) {
        this.el.setAttribute('visible', !this.el.getAttribute('visible'));
      }
    })
  },

  isVisibleToCurrentUser: function () {
    const currentUser = JSON.parse(localStorage.getItem('user-profile'));
    console.log(currentUser.role, this.visibleTo);
    return this.visibleTo.includes(currentUser.role);
  }
});
