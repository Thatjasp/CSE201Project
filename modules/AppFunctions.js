
const url = 'http://localhost:8080'

/*
    This method retrieves an array of App objects
    without filtering
*/
export async function getApps() {
    return await fetch(url + '/Apps/getApps').then((response) => {
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
export async function postApps(obj){
    return await fetch(url+'/Apps/sendApps',{
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

export async function updateApp(name,obj){
    return await fetch(`${url}/Apps/sendApps/${name}`,{
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
