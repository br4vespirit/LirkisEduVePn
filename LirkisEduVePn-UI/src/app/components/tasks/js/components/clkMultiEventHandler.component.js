import {SceneEvent} from '../models/sceneEvent.enum';

AFRAME.registerComponent('clk-multi-event-handler', {
  schema: {
    firstToggleEvent: { type: 'string', default: 'firstToggleEvent' },
    secondToggleEvent: { type: 'string', default: 'secondToggleEvent' },
    selected: { type: 'boolean', default: false },
    affectedElements: {type: 'array', default: []}
  },

  // Do something when component first attached.
  init: function () {
    const elementID = this.el.getAttribute('id');
    this.data.affectedElements.unshift(elementID);
    const el = this.el;
    let data = this.data;
    const scene = this.el.sceneEl;

    el.addEventListener('click', function () {
      console.log(elementID);
      if (data.selected === false) {
        scene.setAttribute('petri-net-sim', {
          event: SceneEvent.firedTransition,
          message: data.firstToggleEvent,
          affectedElements: data.affectedElements
        });
        scene.emit(data.firstToggleEvent);
      } else {
        scene.setAttribute('petri-net-sim', {
          event: SceneEvent.firedTransition,
          message: data.secondToggleEvent,
          affectedElements: data.affectedElements
        });
        scene.emit(data.secondToggleEvent);
      }
    });
  },

  toggleButton: function (){
    if (this.data.selected === false){
      this.el.setAttribute('material', 'src: #selected; side: double; shader: flat');
    }else{
      this.el.setAttribute('material', 'src: #unselected; side: double; shader: flat');
    }

    this.data.selected = !this.data.selected;
  }
});
