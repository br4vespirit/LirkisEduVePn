import {transitions} from "../transitionScript";

AFRAME.registerComponent('dashboard', {
  schema: {
    // label: {type: 'string', default: ''},
    // type: {type: 'string', default: 'transition'}
  },

  init: function () {
    // Create a plane to contain the label text
    this.plane = document.createElement('a-plane');
    this.plane.setAttribute('width', '4');
    this.plane.setAttribute('height', '3');
    // plane.setAttribute('color', '#fff');
    // this.plane.setAttribute('material', 'color: white; side: double; shader: flat')
    this.plane.setAttribute('position', '0 0 0');
    this.plane.setAttribute('material', 'transparent: true; opacity: 0.5;');
    this.el.appendChild(this.plane);

    // TODO: timer with session start and end

    // user information display
    const userInfo = JSON.parse(localStorage.getItem('user-profile'));
    this.createTextElement(userInfo.firstname + ' ' + userInfo.lastname, "1.3 1.05 0");
    this.createTextElement(userInfo.role, "1.3 1.25 0");


    // TODO: task progress info
    let tasks = [];
    transitions.forEach(el => {
      if (el.transitionName.includes('confirm')) {
        const taskName = el.transitionName.replace('confirm', '');
        tasks.push(taskName);
      }
    });
    this.createTasksProgress(tasks);

    // show/hide transitions labels button
    const visibleTo = ['ADMIN', 'TEACHER'];

    if (visibleTo.includes(userInfo.role)){
      this.createLabelButton();
    }

    // TODO: submit/end test buttons

    // TODO: message after end of task

  },

  createTextElement: function (text, position){
    const textInfo = document.createElement('a-text');
    textInfo.setAttribute('value', text);
    textInfo.setAttribute('align', 'center');
    textInfo.setAttribute('color', '#fff');
    textInfo.setAttribute('position', position);
    textInfo.setAttribute('text', 'width: 2; wrapCount: 20; alphaTest: 3');
    this.plane.appendChild(textInfo);
  },

  createLabelButton: function (){
    const el = document.createElement('a-text');
    el.setAttribute('class', 'interactible');
    el.setAttribute("position" , "1.3 0.7 0.1");
    el.setAttribute('font', "../assets/fonts/WorkSans-VariableFont_wght-msdf.json");
    el.setAttribute('negate', "false");
    el.setAttribute('geometry', "primitive: plane; height: 0.78; width: 2.020");
    el.setAttribute('material', "color: #338cd8; flatShading: true; height: 254.55; width: 492.44");
    el.setAttribute('align', "center");
    el.setAttribute( 'text', "width: 1.84; value: Show labels; color: #e3e3e3; wrapCount: 15.94");
    el.setAttribute('scale', "0.44 0.25 1");
    el.setAttribute('animation', "property: scale; dur: 400; easing: easeInOutSine; dir: normal; loop: false; from: 0.54 0.35 1.1; to: 0.44 0.25 1; startEvents: click;");
    el.setAttribute( 'toggle-label-visibility', '');
    this.plane.appendChild(el);
  },

  createTasksProgress: function (tasks){
    tasks.sort();
    let yPos = -0.2; // starting y-position
    tasks.forEach(el => {
      this.createProgressCircle(el, `-1.5 ${yPos} 0.1`)
      this.createTextElement(el, `-1.3 ${yPos} 0.1`);
      yPos -= 0.2; // decrement the y-position by 0.2
    });
  },

  createProgressCircle: function (name, position){
    const progressCircle = document.createElement('a-circle');
    progressCircle.setAttribute('id', `${name}confirmProgress`);
    progressCircle.setAttribute('position', position);
    progressCircle.setAttribute('scale', '0.07 0.07 0.07');
    progressCircle.setAttribute('material', 'color: red; side: double; shader: flat');
    this.plane.appendChild(progressCircle);
  }
});
