AFRAME.registerComponent('language', {
  schema: {
    languageFile: {type: 'string'},
    languageVersion: {type: 'string'}
  },
  // Do something when component first attached.
  init: function () {
    this.parsedData = JSON.parse(this.data.languageFile);
    for (let key in this.parsedData) {
      const text = document.getElementsByClassName(key).length !== 0 ? document.getElementsByClassName(key) : document.getElementById(key);

      if (text) {
        if (text.length > 0) {
          for (let i = 0; i < text.length; i++) {
            text[i].setAttribute('value', this.parsedData[key]);
          }
        } else {
          text.setAttribute('value', this.parsedData[key]);
        }
      }
    }
  },

  update: function (oldData) {
  }
});
