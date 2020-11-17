const fetch = require('node-fetch');
const url = 'http://localhost:8080'


/*
    This method retrieves an array of App objects
    without filtering
*/
async function getAccounts() {
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

async function getAccountByUser(user) {
    return await fetch(`${url}/Accounts/User/${user}`).then((response) => {
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
async function postAccount(obj){
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

async function updateAccount(name,obj){
    return await fetch(`${url}/Accounts/updateUser/${name}`,{
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

async function deleteAccount(name) {
        return await fetch(url + '/Accounts/deleteAccount/' + name,{
          method:'DELETE'
        }).then((response) => {
          try {
              return response.json();
          } catch {
              return response;
          }
      }).catch((err) => {
          return null;
      });
    }

module.exports.getAccounts = getAccounts;
module.exports.getAccountByUser = getAccountByUser;
module.exports.postAccount = postAccount;
module.exports.updateAccount = updateAccount;
module.exports.deleteAccount = deleteAccount;