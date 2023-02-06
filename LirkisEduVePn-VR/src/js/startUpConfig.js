import * as petriNetLoader from './modules/petriNetLoader.mjs';
import PetriNet from './modules/petriNet.mjs';
import Transition from './modules/transition.mjs';

// change description in the scene
const getJsonData = (url) => {
    try{
        fetch(url).then((res) => {
            res.json().then((data)=>{
                for (const key in data){
                    const text = document.getElementById(key) !== null ? document.getElementById(key) : document.getElementsByClassName(key); 
                    if (text){
                       if(text.length){
                           for (let i=0; i<text.length; i++) {
                               text[i].setAttribute('value', data[key]);
                           }
                       }else {
                           text.setAttribute('value', data[key]);
                       }
                    }
               }
           });
       });
    }catch(error){
        console.error(error);
    }
}

getJsonData('../assets/sceneDescription.json');

// let net;
// const Transitions = [];

// petriNetLoader.loadXMLDoc('../assets/petriNetFile/28032022_net_exhibition.pnml').then(res => {
//     net = new PetriNet(res);
//     res.transitions.forEach(transition => Transitions.push(new Transition(transition.name)));
//     console.log(Transitions);
// })