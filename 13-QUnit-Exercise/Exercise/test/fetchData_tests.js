const { assert } = require("qunit");
const {fetchData} = require("../async_test_functions.js");

QUnit.test("Fetch Data function tests for bulgarian post code", async function(assert){

    const data = await fetchData('https://www.zippopotam.us/bg/8000');

    //response from https://www.zippopotam.us/bg/8000
    //
    /* {
    "post code": "8000",
    "country": "Bulgaria",
    "country abbreviation": "BG",
    "places": [
      {
        "place name": "Бургас / Burgas",
        "longitude": "27.4667",
        "state": "Бургас / Burgas",
        "state abbreviation": "BGS",
        "latitude": "42.5"
      }
    ]
    } */



    // Check main object properties

    assert.ok(data.hasOwnProperty('post code'), "Data contains 'post code' " );
    assert.equal(data['post code'], '8000', "'post code' is 8000");

    assert.ok(data.hasOwnProperty('country'), "Data has property 'country'");
    assert.equal(data['country'], 'Bulgaria', "country is 'Bulgaria'")

    assert.ok(data.hasOwnProperty('country abbreviation'), "Data has property 'country abbreviation");
    assert.equal(data['country abbreviation'], 'BG', "country abbreviation is 'BG'")

    assert.ok(data.hasOwnProperty('places'), "Data has property 'places'");
    assert.deepEqual(data['places'], [
        {
          "place name": "Бургас / Burgas",
          "longitude": "27.4667",
          "state": "Бургас / Burgas",
          "state abbreviation": "BGS",
          "latitude": "42.5"
        }
      ] );
    
    //check 'places' array
    assert.ok(Array.isArray(data.places), "'places' is an array");
    assert.equal(data.places.length, 1 , "'places' array has one element");

    const place = data.places[0];
    assert.ok(place.hasOwnProperty('place name'), "Place contains 'place name'");
    assert.equal(place['place name'], 'Бургас / Burgas', "Place name is 'Бургас / Burgas'");

    assert.ok(place.hasOwnProperty('longitude'), "Place contains property 'longitude'");
    assert.equal(place['longitude'], '27.4667', "Longitude is 27.4667");

    assert.ok(place.hasOwnProperty('state'), "Place has property 'state'");
    assert.equal(place['state'], 'Бургас / Burgas', "state is 'Бургас / Burgas'");

    assert.ok(place.hasOwnProperty('state abbreviation'), "Place has property 'state abbreviation'");
    assert.equal(place['state abbreviation'], 'BGS', "Place property 'state abbreviation' is 'BGS'");

    assert.ok(place.hasOwnProperty('latitude'), "Place has property 'latitude'");
    assert.equal(place['latitude'], '42.5', "place property 'latitude' is '42.5'")
})

QUnit.test("Fetch Data function tests for bulgarian post code with unexisting post code", async function(assert){
    const data = await fetchData('https://www.zippopotam.us/bg/8000113');

    assert.notOk(data); //falsy value
    assert.true(data === undefined);

})

QUnit.test("Fetch Data function tests with unexisting URL", async function(assert){
    const data = await fetchData('https://wwww.zippopotam.us/bg/8000113');

    assert.equal(data, 'fetch failed');
    

})





