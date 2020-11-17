let formFunctions = require('../test-modules/testFormsFunctions');
const _ = require('underscore');

test('Retrieves test form from datase', async () => {
    const arr = await formFunctions.getForms();
    expect(Array.isArray(arr)).toBeTruthy();
    if (arr.length != 0)
        expect(_.isObject(arr[0])).toBeTruthy();
        
});

test('Posts app onto the form collection', async () => {
    let app = {
        _id: "Bob'sApp",
        nameApp: "Bob'saapp",
        description: "Description test",
        organization: "The org",
        platforms: ['IOS 14.2', 'Androi 1.23'],
        versions: "1.0",
        link: "bob.com",
        price: 2.99
    };
    await formFunctions.postForm(app);
    const data = await formFunctions.getForm("Bob'sApp");
    expect(_.isObject(data)).toBeTruthy();
});

test('Gets form information by name', async () => {
    const data = await formFunctions.getForm("Bob'sApp");
    expect(_.isObject(data)).toBeTruthy();
});

test('Basic update form function test', async () => {
    let updates = {
        description: "Oooga Booga Booga"
    }
    var id = "Bob'sApp"
    await formFunctions.updateForm(id,updates);
    const data = await formFunctions.getForm(id);
    expect(data.description).toEqual("Oooga Booga Booga");
});
test('Delete App Forms from data base', async() => {
    var id = "Bob'sApp";
    await formFunctions.deleteForm(id);
    var obj = await formFunctions.getForm(id);
    expect(_.isObject(obj)).toBeFalsy();
});