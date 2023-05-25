import {endSession} from "../modules/userActivityLogger";

AFRAME.registerComponent('dashboard', {
  schema: {},

  init: function () {
    this.scene = this.el.sceneEl;
    const transitions = window.transitions;
    // Create a plane to contain the label text
    this.plane = document.createElement('a-plane');
    this.plane.setAttribute('width', '2');
    this.plane.setAttribute('height', '2');
    // plane.setAttribute('color', '#fff');
    // this.plane.setAttribute('material', 'color: white; side: double; shader: flat')
    this.plane.setAttribute('position', '0 0 0');
    this.plane.setAttribute('material', 'transparent: true; opacity: 0;');
    this.el.appendChild(this.plane);

    // user information display
    const userInfo = JSON.parse(localStorage.getItem('user-profile'));
    this.createTextElement(userInfo.firstname + ' ' + userInfo.lastname, "0.5 1.05 0");
    this.createTextElement(userInfo.role, "0.5 1.25 0");


    // task progress info
    let tasks = [];
    transitions.forEach(el => {
      if (el.transitionName.includes('Confirm')) {
        const taskName = el.transitionName.replace('Confirm', '');
        tasks.push(taskName);
      }
    });
    this.createTasksProgress(tasks);

    // show/hide transitions labels button
    const visibleTo = ['ADMIN', 'TEACHER'];

    if (visibleTo.includes(userInfo.role)){
      this.createLabelButton();
    }

    // submit/end test buttons
    this.createEndButton();
    this.createBackButton();
  },

  createTextElement: function (text, position){
    const textInfo = document.createElement('a-text');
    textInfo.setAttribute('font', "../../assets/fonts/WorkSans-VariableFont_wght-msdf.json")
    textInfo.setAttribute('value', text);
    textInfo.setAttribute('negate', 'false');
    textInfo.setAttribute('align', 'center');
    textInfo.setAttribute('color', '#333333');
    textInfo.setAttribute('position', position);
    textInfo.setAttribute('text', 'width: 2; wrapCount: 20; alphaTest: 3');
    this.plane.appendChild(textInfo);
  },

  createLabelButton: function (){
    const el = document.createElement('a-text');
    el.setAttribute('class', 'interactible');
    el.setAttribute("position" , "0.5 0.7 0.01");
    el.setAttribute('font', "../assets/fonts/WorkSans-VariableFont_wght-msdf.json");
    el.setAttribute('negate', "false");
    el.setAttribute('geometry', "primitive: plane; height: 0.78; width: 2.020");
    el.setAttribute('material', "color: #338cd8; flatShading: true; height: 254.55; width: 492.44");
    el.setAttribute('align', "center");
    el.setAttribute( 'text', "width: 1.84; value: Show/Hide labels; color: #e3e3e3; wrapCount: 15.94");
    el.setAttribute('scale', "0.44 0.25 1");
    el.setAttribute('animation', "property: scale; dur: 400; easing: easeInOutSine; dir: normal; loop: false; from: 0.54 0.35 1.1; to: 0.44 0.25 1; startEvents: click;");
    el.setAttribute( 'toggle-label-visibility', '');
    this.plane.appendChild(el);
  },

  createEndButton: function (){
    const el = document.createElement('a-text');
    el.setAttribute('font', "../../assets/fonts/WorkSans-VariableFont_wght-msdf.json");
    el.setAttribute('negate', 'false');
    el.setAttribute('class', 'interactible');
    el.setAttribute("position" , "0.5 0.1 0.01");
    el.setAttribute('geometry', "primitive: plane; height: 0.78; width: 2.020");
    el.setAttribute('material', "color: red; flatShading: true; height: 254.55; width: 492.44");
    el.setAttribute('align', "center");
    el.setAttribute( 'text', "width: 1.84; value: End session; color: #e3e3e3; wrapCount: 15.94");
    el.setAttribute('scale', "0.44 0.25 1");
    el.setAttribute('animation', "property: scale; dur: 400; easing: easeInOutSine; dir: normal; loop: false; from: 0.54 0.35 1.1; to: 0.44 0.25 1; startEvents: click;");
    el.addEventListener('click', () => {
      this.scene.setAttribute('petri-net-sim', {
        event: 'endSession',
        message: 'endSession'
      });
      this.scene.emit('endSession');
    })
    this.plane.appendChild(el);
  },

  createBackButton: function (){
    const el = document.createElement('a-text');
    el.setAttribute('font', "../../assets/fonts/WorkSans-VariableFont_wght-msdf.json");
    el.setAttribute('negate', 'false');
    el.setAttribute('class', 'interactible');
    el.setAttribute("position" , "0.5 0.4 0.01");
    el.setAttribute('geometry', "primitive: plane; height: 0.78; width: 2.020");
    el.setAttribute('material', "color: #338cd8; flatShading: true; height: 254.55; width: 492.44");
    el.setAttribute('align', "center");
    el.setAttribute( 'text', "width: 1.84; value: Back to menu; color: #e3e3e3; wrapCount: 15.94");
    el.setAttribute('scale', "0.44 0.25 1");
    el.setAttribute('animation', "property: scale; dur: 400; easing: easeInOutSine; dir: normal; loop: false; from: 0.54 0.35 1.1; to: 0.44 0.25 1; startEvents: click;");
    el.addEventListener('click', () => {
      // return to main page
      window.router.navigateByUrl('/');
    })
    this.plane.appendChild(el);
  },

  createTasksProgress: function (tasks){
    tasks.sort();
    let yPos = 1.05; // starting y-position
    tasks.forEach(el => {
      this.createProgressCircle(el, `-1.7 ${yPos} 0.01`)
      this.createTextElement(el, `-0.9 ${yPos} 0.01`);
      yPos -= 0.2; // decrement the y-position by 0.2
    });
  },

  createProgressCircle: function (name, position){
    const progressCircle = document.createElement('a-circle');
    progressCircle.setAttribute('id', `${name}ConfirmProgress`);
    progressCircle.setAttribute('position', position);
    progressCircle.setAttribute('scale', '0.07 0.07 0.07');
    progressCircle.setAttribute('material', 'color: red; side: double; shader: flat');
    this.plane.appendChild(progressCircle);
  }
});
