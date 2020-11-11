
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
    var cards = document.getElementsByClassName('appCard');
        
        for (var i = 0; i < cards.length; i++ ) {
            var children = cards[i].children;
            clearAndAddText(children[1],data[jsonIndex]._id);
            clearAndAddText(children[2],data[jsonIndex].organization);
            var platStr = addingPlatform(data[jsonIndex]);
            clearAndAddText(children[3],platStr);
            clearAndAddText(children[4],data[jsonIndex].versions);
            clearAndAddText(children[5],data[jsonIndex].price);
            clearAndAddText(children[6],data[jsonIndex].description);
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