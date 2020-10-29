const fetch = require('node-fetch');
const url = 'http://localhost:8080'

/*
    This method retrieves an array of App objects
    without filtering
*/
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

async function getApp(name) {
    return await fetch(url + '/Apps/getApp/' + name).then((response) => {
        try {
            return response.json();
        } catch {
            return response;
        }
    }).catch((err) => {
        return null;
    });
}

/*


*/
async function postApps(obj) {
    return await fetch(url + '/Apps/sendApps', {
        method: 'POST',
        body: obj
    }).then(response => {
        try {
            return response.json();
        } catch {
            return response;
        }
    }).catch(err => {
        return null;
    });
}

async function updateApp(name, obj) {
    return await fetch(`${url}/Apps/sendApps/${name}`, {
        method: 'PUT',
        body: obj
    }).then(response => {
        try {
            return response.json();
        } catch {
            return response;
        }
    }).catch(err => {
        return null;
    });
}
module.exports.getApps = getApps;
module.exports.getApp = getApp;
module.exports.postApps = postApps;
module.exports.updateApp = updateApp;