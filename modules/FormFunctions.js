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
export async function getForm(name) {
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
export async function postForm(obj){
    return await fetch(url+'/AppForms/sendForms',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(obj)
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
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(obj)
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
