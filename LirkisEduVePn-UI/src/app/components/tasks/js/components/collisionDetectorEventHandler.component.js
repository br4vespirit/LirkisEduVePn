import {SceneEvent} from '../models/sceneEvent.enum';

AFRAME.registerComponent('collision-detector', {
  schema: {
    collisionEvent: {type: 'string'},
    clearedCollisionEvent: {type: 'string'},
    placeColliderType: {type: 'boolean', default: true},
    affectedElements: {type: 'array', default: []}
  },

  init: function () {
    const elementID = this.el.getAttribute('id');
    // Do something when component first attached.
    let el = this.el;
    const data = this.data;
    const scene = document.querySelector('a-scene');

    // listen for collisions
    el.addEventListener('collisions', (e) => {
      const collided = e.detail.els.length;

      if (collided === 1 && (e.detail.els[0].id || e.detail.els[0].className)) {
        data.affectedElements = [elementID, e.detail.els[0].id];
        const collisionMsg = data.placeColliderType ? data.collisionEvent : `${e.detail.els[0].className}${data.collisionEvent}`;
        console.log(data.affectedElements);
        scene.setAttribute('petri-net-sim', {
          event: data.placeColliderType ? SceneEvent.enteredPlace : SceneEvent.firedTransition,
          message: collisionMsg,
          affectedElements: data.affectedElements
        });
        scene.emit(collisionMsg);
      } else if (collided === 0 && (e.detail.clearedEls[0].id || e.detail.clearedEls[0].className)) {
        data.affectedElements = [elementID, e.detail.clearedEls[0].id];
        const clearedCollisionMsg = data.placeColliderType ? data.clearedCollisionEvent : `${e.detail.clearedEls[0].className}${data.clearedCollisionEvent}`;
        scene.setAttribute('petri-net-sim', {
          event: data.placeColliderType ? SceneEvent.leftPlace : SceneEvent.firedTransition,
          message: clearedCollisionMsg,
          affectedElements: data.affectedElements
        });
        scene.emit(clearedCollisionMsg);
      }
    });
  },

  changeBoxColorGreen: function () {
    this.el.setAttribute('material', 'color: green');
  },

  changeBoxColorRed: function () {
    this.el.setAttribute('material', 'color: red');
  }
});
