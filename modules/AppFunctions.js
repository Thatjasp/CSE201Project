const url = 'http://localhost:8080'

/*
    This method retrieves an array of App objects
    without filtering
*/
export async function getApps() {
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

export async function getApp(name) {
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
export async function postApps(obj) {
    return await fetch(url + '/Apps/sendApps', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(obj)
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

export async function updateApp(name, obj) {
    return await fetch(`${url}/Apps/sendApps/${name}`, {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(obj)
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
