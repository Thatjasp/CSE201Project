
const url = 'http://localhost:8080'

/*
    This method retrieves an array of App objects
    without filtering
*/
export async function getForms() {
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
export async function postForm(obj){
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

export async function updateForm(name,obj){
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
