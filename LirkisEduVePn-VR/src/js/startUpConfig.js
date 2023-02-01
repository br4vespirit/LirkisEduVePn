// change description in the scene
const getJsonData = (url) =>{
    fetch(url).then((res) => {
         res.json().then((data)=>{
             for (const key in data){
                 const text = document.getElementById(key);
                 if (text){
                     text.setAttribute('value', data[key]);
                 }
             }
        });
    })
}

getJsonData('../assets/sceneDescription.json');