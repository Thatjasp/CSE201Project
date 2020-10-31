const fetch = require('node-fetch');
const url = 'http://localhost:8080'

/*
    This method retrieves an array of App objects
    without filtering
*/
export async function getAccounts() {
    return await fetch(url + '/Accounts/Users').then((response) => {
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

export async function getAccountByEmail(email) {
    return await fetch(`${url}/Accounts/Users/${email}`).then((response) => {
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
    return await fetch(url+'/Accounts/NewUser',{
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
    return await fetch(`${url}/Accounts/User/${name}`,{
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
