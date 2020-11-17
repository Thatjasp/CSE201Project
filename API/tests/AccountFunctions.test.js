let accountFunctions = require('../test-modules/testAccountFuncions');
let _ = require('underscore');

test('Retrieves account from database',async () => {
    const arr = await accountFunctions.getAccounts();
    expect(Array.isArray(arr)).toBeTruthy();
    if (arr.length != 0)
        expect(_.isObject(arr[0])).toBeTruthy();
});

test('Gets account information by name', async () => {
    const data = await accountFunctions.getAccountByUser('user');
    expect(_.isObject(data)).toBeTruthy();
});

test('Posts account onto the account collection', async () => {
    let user = {
        _id: "Test",
        password: "test",
        userType: "moderator"
    };
    const data = await accountFunctions.postAccount(user);
    
    expect(_.isObject(data)).toBeTruthy();

});

test('Basic update Account function test', async () => {
    let updates = {
        userType:"Another Test"
    };
    
    await accountFunctions.updateAccount("Test",updates);
    const user = await accountFunctions.getAccountByUser('Test');
    expect(user.userType).toEqual("Another Test");
});

test('Delete account test', async () => {
    var id = "Test"
    await accountFunctions.deleteAccount(id);
    var obj = await accountFunctions.getAccountByUser(id);
    expect(_.isObject(obj)).toBeFalsy();
});