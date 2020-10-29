let formFunctions = require('./modules/formFunctions.js');

test('Retrieves test form from datase', async () => {
    const arr = await formFunctions.getForms();
    expect(arr).toEqual([{
        _id: "String",
        platforms: ["String"],
        description: "String",
        organization: "String",
        versions: "tring",
        link: "tring",
        price: 3.22,
    }]);
});

test('Gets form information by name', async () => {
    const data = await formFunctions.getForm('String');
    expect(data).toEqual({
        _id: "String",
        platforms: ["String"],
        description: "String",
        organization: "String",
        versions: "tring",
        link: "tring",
        price: 3.22,
        __v: 0
    });
});

test('Posts app onto the repo collection', async () => {
    let app = {
        _id: "Bob's App",
        description: "Description test",
        organization: "The org",
        platforms: ['IOS 14.2', 'Androi 1.23'],
        versions: "1.0",
        link: "bob.com",
        price: 2.99
    };
    const data = await formFunctions.postForm(app);
    expect(data).toEqual(null);

});

test('Basic update form function test', async () => {
    let updates = {
        description: "Another Test"
    }
    const data = formFunctions.updateForm(updates);
    expect(data).toEqual(null);
});