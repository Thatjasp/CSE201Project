const { TestScheduler } = require('jest');
const appFunctions = require('../test-modules/testAppFunctions');
const formFunctions = require('../test-modules/testFormsFunctions');
const _ = require('underscore');

test('Deleting form (Admin denying form)', async() => {
    let app = {
        _id: "bob'sapp",
        nameapp: "bob'saapp",
        description: "description test",
        organization: "the org",
        platforms: ['ios 14.2', 'androi 1.23'],
        versions: "1.0",
        link: "bob.com",
        price: 2.99
    };
    await formFunctions.postForm(app);
    expect(_.isObject(await formFunctions.getForm(app._id)));
    await formFunctions.deleteForm(app._id);
    expect(_.isObject(await formFunctions.getForm(app._id))).toBeFalsy();
});

test('User Sending Request', async() => {
    let app = {
        _id: "bob'sapp",
        nameApp: "",
        description: "",
        organization: "",
        platforms: [],
        versions: "",
        link: "google.com",
        price: 2.99
    };
    
    await formFunctions.postForm(app);
    expect(_.isObject(await formFunctions.getForm(app._id))).toBeTruthy();
    await formFunctions.deleteForm(app._id);

    app.link = "";
    await formFunctions.postForm(app);
    expect(_.isObject(await formFunctions.getForm(app._id))).toBeFalsy();
    await formFunctions.deleteForm(app._id);    
});


test('Moving Form to the App database (Admin accepting Form)',async () =>{
    let app = {
        _id: "bob'sapp",
        nameApp: "bob'saapp",
        description: "description test",
        organization: "the org",
        platforms: ['ios 14.2', 'androi 1.23'],
        versions: "1.0",
        link: "bob.com",
        price: 2.99
    };
    let app2 = {
        _id: "bob'sapp",
        nameApp: "bob'saapp",
        description:"",
        organization: "the org",
        platforms: ['ios 14.2', 'androi 1.23'],
        versions: "",
        link: "bob.com",
        price: 2.99
    }; 
    await formFunctions.postForm(app);

    await formFunctions.postForm(app2);

    var obj = await formFunctions.getForm(app._id);

    var obj2 = await formFunctions.getForm(app2._id);

    var appObj = formToAppHelper(obj);
    var appObj2 = formToAppHelper(obj2);


    await appFunctions.postApps(appObj);
    await appFunctions.postApps(appObj2);

    expect(_.isObject(await appFunctions.getApp(appObj._id))).toBeTruthy();
    expect(_.isObject(await appFunctions.getApp(appObj2._id))).toBeTruthy();

    await appFunctions.deleteApp(appObj._id);
    await appFunctions.deleteApp(appObj2._id);

    await formFunctions.deleteForm(app._id);
    await formFunctions.deleteForm(app2._id);

});

function formToAppHelper(obj){
    return {
        _id: obj.nameApp,
        description: obj.description,
        organization: obj.organization,
        platforms: obj.platforms,
        versions: obj.versions,
        link: obj.link,
        price: obj.price
    }
}