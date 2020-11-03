let appFunctions = require('../test-modules/testAppFunctions');
let _ = require('underscore');

test('Retrieves test app from datase',async () => {
    const arr = await appFunctions.getApps();
    expect(Array.isArray(arr)).toBeTruthy();
    if (arr.length != 0)
        expect(_.isObject(arr[0])).toBeTruthy();
});

test('Gets app information by name', async () => {
    const data = await appFunctions.getApp('Calorie Counter');
    expect(_.isObject(data)).toBeTruthy();
});

test('Posts app onto the repo collection', async () => {
    let app = {
        _id: "Test",
        description: "Description test",
        organization: "The org",
        platforms: ['IOS 142','Androi 1.23'],
        versions: "1.0",
        link: "bob.com",
        price: 2.99
    };
    const data = await appFunctions.postApps(app);
    
    expect(_.isObject(data)).toBeTruthy();

});

test('Basic updateApp function test', async () => {
    let updates = {
        description:"Another Test"
    }
    appFunctions.updateApp("Test",updates);
    const app = await appFunctions.getApp('Test');
    expect(app.description).toEqual("Another Test");
});