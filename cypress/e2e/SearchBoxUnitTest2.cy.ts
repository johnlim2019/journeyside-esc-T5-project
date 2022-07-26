/// <reference types="cypress" />
//import functions to test
import { validateQuery, setErrorMessages, getDestDetails, getDefaultDates, getMinDate} from '../../src/features/2_SearchResults/SearchBar/SearchBar';


describe("Unit Test Feature 1",()=>{
    it('test validateQuery',() => {
        const missing_location = {
          'id': 'abcd',
          'location': '',
          'checkIn': undefined,
          'checkOut': undefined}
        
        const missing_checkin = {
          'id': 'efgh',
          'location': 'Singapore',
          'checkIn': null,
          'checkOut': null
        }
        const proper_checkin = {
          'id': 'efgh',
          'location': 'Singapore',
          'checkIn': new Date().getTime(),
          'checkOut': new Date().getTime()
        }
        const null_checkin = {
          'id': '',
          'location': 'Singapore',
          'checkIn': NaN,
          'checkOut': NaN
        }
      assert.deepEqual(validateQuery(missing_location),[1,2])
      assert.deepEqual(validateQuery(missing_checkin), [2])
      assert.deepEqual(validateQuery(proper_checkin),[])
      assert.deepEqual(validateQuery(null_checkin),[1,2])
    }),
    it('test setErrorMessages',() => {
      const locationinvalid = [1];
      const dateinvalid = [2];
      const valid = [];
      const invalid = [1,2];
      assert.deepEqual(setErrorMessages(locationinvalid),{"locationValid":false, "dateValid":true});
      assert.deepEqual(setErrorMessages(dateinvalid),{"locationValid":true, "dateValid":false});
      assert.deepEqual(setErrorMessages(valid),{"locationValid":true, "dateValid":true});
      assert.deepEqual(setErrorMessages(invalid),{"locationValid":false, "dateValid":false});
    })
    it('test getDestDetails',()=>{
      const Destinations =     [{
        "id": 19890,
        "term": "Fashion Museum (MUM), Canela, RS, Brazil",
        "uid": "078E",
        "lat": -29.36019,
        "lng": -50.845543,
        "type": "museums"
    },
    {
      "id": 19990,
      "term": "Fashion Museum (MUM), Canela, RS, Brazil",
      "uid": "078E",
      "lat": -29.36019,
      "lng": -50.845543,
      "type": "museums"
  }]
    const DestTest = getDestDetails("Fashion Museum (MUM), Canela, RS, Brazil", Destinations)
    assert.typeOf(DestTest[0],'string','uid is of type string')
    assert.typeOf(DestTest[1],'string', 'dest is of type string')
    assert.typeOf(DestTest[2],'number','lng is of type number')
    assert.typeOf(DestTest[3],'number', 'lat is of type number')
    assert.deepEqual(getDestDetails("Fashion Museum (MUM), Canela, RS, Brazil", Destinations), ["078E","Fashion Museum (MUM), Canela, RS, Brazil", -50.845543, -29.36019])
    assert.deepEqual(getDestDetails('',Destinations),['','',0,0])
    assert.deepEqual(getDestDetails("Fashion Museum (MUM), Canela, RS, Brazil",[]),['','',0,0])
    })
    it('test getDefaultDates',()=>{
      assert.typeOf(getDefaultDates(), 'Array', "getDefaultDates() is of type Array");
      assert.typeOf(getDefaultDates()[0], 'Date', 'getDefaultDates()[0] is of type Date');
      assert.typeOf(getDefaultDates()[1], 'Date', 'getDefaultDates()[1] is of type Date');
      let datetest = new Date();
      datetest.setDate(datetest.getDate() + 7);
      let datetest2 = new Date();
      datetest2.setDate(datetest2.getDate() + 8);

      assert.deepEqual(getDefaultDates(),[datetest,datetest2])

    })
    it('test getMinDate',()=>{
      //assert type of getMinDate
      assert.typeOf(getMinDate(),'Date', 'getMinDate() is of type Date')
      let min_date_test = new Date();
      min_date_test.setDate(min_date_test.getDate() + 7);
      //Assert correct getMinDate formula
      assert.deepEqual(getMinDate(),min_date_test)
      //Date cannot be before current date
      let impossible_date = new Date()
      impossible_date.setDate(impossible_date.getDate() - 7);
      assert.isAbove(getMinDate().getTime(), impossible_date.getTime());
    })
})