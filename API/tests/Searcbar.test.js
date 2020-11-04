
const _ = require('underscore');

test('Searches for specific name inside of app', async () =>{
    var obj = searchBar.getByKeyWords('Calorie Counter');
    expect(obj.name).toBeEqual('Calorie Counter');
    var obj2 = searchBar.getByKeyWords('null');
    expect(obj2).toBeEqual(null); 
});

test('Search by price', async () => {
    var arrObj = searchBar.getByPrice(0)
    expect(arrObj).toBeTruthy(Array.isArray(arrObj));
    var arrObj2 = searchBar.getByPrice(1000);
    expect(arrObj2).toBeFalsy(Array.isArray(arrObj2));
});

test('Filter by Org', async () => {
    var arrObj = searchBar.getByOrg("Samsung")
    expect(arrObj).toBeTruthy(Array.isArray(arrObj));
    var arrObj2 = searchBar.getByOrg("Ports");
    expect(arrObj2).toBeFalsy(Array.isArray(arrObj2));
});

test('Get Highest to Lowest of price', async() => {
    var arrObj = searchBar.highestToLowest("Samsung")
    expect(arrObj).toBeTruthy(Array.isArray(arrObj));
    var prev = -1

    for (var i = 0; i < arrObj.length; i++) {
        if (arrObj[i] < prev) {
            throw new Error('Array not Orginized');
        }
    }

});