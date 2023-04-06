import {SceneEvent} from '../models/sceneEvent.enum';

AFRAME.registerComponent('clk-single-event-handler', {
  schema: {
    name: { type: 'string', default: '' },
    affectedElements: {type: 'array', default: []}
  },

  // Do something when component first attached.
  init: function () {
    const elementID = this.el.getAttribute('id');
    this.data.affectedElements.unshift(elementID);
    let data = this.data;
    const el = this.el;
    const scene = this.el.sceneEl;
    el.addEventListener('click', () => {
      scene.setAttribute('petri-net-sim', {
        event: SceneEvent.firedTransition,
        message: data.name,
        affectedElements: data.affectedElements
      });
      scene.emit(data.name);
    });
  },

  update: function () {
    // Do something when component's data is updated.
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  // eslint-disable-next-line no-unused-vars
  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  }
});
