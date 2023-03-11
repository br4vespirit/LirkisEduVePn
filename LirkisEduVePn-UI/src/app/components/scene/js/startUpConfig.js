// change description in the scene
const getJsonData = (url) => {
    try{
        fetch(url).then((res) => {
          try {
            res.json().then((data) => {
              for (const key in data) {
                const text = document.getElementById(key) !== null ? document.getElementById(key) : document.getElementsByClassName(key);
                if (text) {
                  if (text.length) {
                    for (let i = 0; i < text.length; i++) {
                      text[i].setAttribute('value', data[key]);
                    }
                  } else {
                    text.setAttribute('value', data[key]);
                  }
                }
              }
            });
          }catch (error){
            console.log(error);
          }
       });
    }catch(error){
        console.error(error);
    }
}

getJsonData('../assets/sceneDescription.json');

// let net;
// const Transitions = [];

// petriNetLoader.loadXMLDoc('../assets/petriNetFile/scenario.pnml').then(res => {
//     net = new PetriNet(res);
//     res.transitions.forEach(transition => Transitions.push(new Transition(transition.name)));
//     console.log(Transitions);
// })
