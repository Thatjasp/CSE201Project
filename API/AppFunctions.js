const url = 'localhost:8080'

/*
    This method retrieves an array of App objects
    without filtering
*/
async function getApps() {
    await fetch(url + '/Apps/getApps').then((response) => {
        return response.json();
    }).catch((err) => {
        return null;
    });
}


async function postApps(obj){
    await fetch(url+'/Apps/sendApps',{
        method: 'POST',
        body: obj
    })
}