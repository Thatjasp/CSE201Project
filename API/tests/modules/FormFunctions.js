const fetch = require('node-fetch');
const url = 'http://localhost:8080'

/*
    This method retrieves an array of App objects
    without filtering
*/
async function getForms() {
    return await fetch(url + '/AppForms/getForms').then((response) => {
        try{
            return response.json();
        }
        catch{
            return response;
        }
    }).catch((err) => {
        return null;
    });
}
/*


*/
async function getForm(name) {
    return await fetch(url + '/AppForms/getForm/' + name).then((response) => {
        try {
            return response.json();
        } catch {
            return response;
        }
    }).catch((err) => {
        return null;
    });
}
async function postForm(obj){
    return await fetch(url+'/AppForms/sendForms',{
        method: 'POST',
        body: obj
    }).then(response =>{
        try{
            return response.json();
        }
        catch{
            return response;
        }
    }).catch(err =>{
        return null;
    });
}

async function updateForm(name,obj){
    return await fetch(`${url}/AppForms/sendForms/${name}`,{
        method:'PUT',
        body: obj
    }).then(response=>{
        try{
            return response.json();
        }
        catch{
            return response;
        }
    }).catch(err =>{
        return null;
    });
}
module.exports.getForm = getForm;
module.exports.getForms = getForms;
module.exports.updateForm = updateForm;
module.exports.postForm = postForm;