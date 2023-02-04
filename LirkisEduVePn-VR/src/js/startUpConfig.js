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