
const url = 'http://localhost:8080';
var jsonIndex = 0;
window.onload = function (){
    getApps().then((data) => {
        if(!Array.isArray(data)){
            console.log(data);
            return;
        }
        putInfoCards(data);
        
});
}
function putInfoCards(data){
    var repo = document.getElementById('appRepo');
        
        for (var i = 0; i < data.length; i++ ) {
            var div = createDiv();
            div.setAttribute('onclick',`location.href='http://localhost:8080/AppPage?name=${data[jsonIndex]._id}';`);
            div.setAttribute('style','cursor: pointer;');
            var children = div.children;
            clearAndAddText(children[0],data[jsonIndex]._id);
            clearAndAddText(children[1],data[jsonIndex].organization);
            var platStr = addingPlatform(data[jsonIndex]);
            clearAndAddText(children[2],platStr);
            clearAndAddText(children[3],data[jsonIndex].versions);
            clearAndAddText(children[4],data[jsonIndex].price);
            clearAndAddText(children[5],data[jsonIndex].description);
            repo.appendChild(div);
            jsonIndex++;
        }
}
function nextPage(){
    getApps().then((data) => {
        putInfoCards(data);
    });
}
function addingPlatform (data){
    var platforms = data.platforms;
    var platformStr = "Platforms: ";
    for(var j = 0; j < platforms.length; j++) 
        platformStr += platforms[j] + " ";
    return platformStr;
}

function clearAndAddText(element,data){
    var text;
    element.innerHTML = "";
    if (data === 0)
        text = document.createTextNode('Free');
    else
        text = document.createTextNode(data);
    element.appendChild(text);
}
async function getApps() {
    return await fetch(url + '/Apps/getApps').then((response) => {
        try {
            return response.json();
        } catch {
            return response;
        }
    }).catch((err) => {
        return null;
    });
}


function createDiv() {
    var appCard = document.createElement('div');
    appCard.setAttribute('class','appCard');
    var h3 = document.createElement('h3');
    var p1 = document.createElement('p');
    var p2 = document.createElement('p');
    var p3 = document.createElement('p');
    var p4 = document.createElement('p');
    var p5 = document.createElement('p');

    var arr = [h3,p1,p2,p3,p4,p5];

    for (var i = 0; i < arr.length; i++){
        appCard.appendChild(arr[i]);
    }
    return appCard;
}