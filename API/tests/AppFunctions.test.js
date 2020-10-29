let appFunctions = require('./modules/appFunctions.js');

test('Retrieves test app from datase',async () => {
    const arr = await appFunctions.getApps();
    expect(arr).toEqual(null);
});

test('Gets app information by name', async () => {
    const data = await appFunctions.getApp('test');
    expect(data).toEqual(null);
});

test('Posts app onto the repo collection', async () => {
    let app = {
        _id: "BobsApp",
        description: "Description test",
        organization: "The org",
        platforms: ['IOS 142','Androi 1.23'],
        versions: "1.0",
        link: "bob.com",
        price: 2.99
    };
    const data = await appFunctions.postApps(app);
    expect(data).toEqual(null);

});

test('Basic updateApp function test', async () => {
    let updates = {
        description:"Another Test"
    }
    const data = appFunctions.updateApp(updates);
    expect(data).toEqual(null);
});