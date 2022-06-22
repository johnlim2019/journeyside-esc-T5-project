export class SearchBar {
    constructor() {
    }
    validateQuery(queryObj: any) {
        // Error codes 
        // empty arr - correct
        // 1 - location error
        // 2 - invalid date 

        let outcome = [];
        console.log("HELP " + queryObj.id);
        console.log("HELP " + queryObj.location);
        console.log("HELP " + queryObj.checkIn);
        console.log("HELP " + queryObj.checkOut);
        if ((queryObj.location.length === 0) || (queryObj.id.length === 0)) {
            outcome.push(1);
        }
        if ((queryObj.checkIn === null) || (queryObj.checkOut === null)) {
            outcome.push(2);
        }
        console.log("HELP" + outcome);
        return outcome;
    }
    setErrorMessages(outcomes: number[]) {
        let output = {
            "locationValid": true,
            "dateValid": true
        };
        for (let i = 0; i < outcomes.length; i++) {
            if (outcomes[i] === 1) {
                output['locationValid'] = false;
            }
            if (outcomes[i] === 2) {
                output['dateValid'] = false;
            }
        }
        return output;
    }


    getDestDetails(location: string, destinations: any) {
        // load the destination details
        let id = "";
        let dest = "";
        let lng = 0;
        let lat = 0;
        for (let i of destinations) {
            if (i.term === location) {
                id = i.uid;
                dest = i.term;
                lng = i.lng;
                lat = i.lat;
            }
        }
        return [id, dest, lng, lat];
    }
    getDefaultDates() {
        let date = new Date();
        date.setDate(date.getDate() + 7);
        let date2 = new Date();
        date2.setDate(date.getDate() + 1);
        return [date, date2];
    }
    getMinDate() {
        let minDate = new Date();
        minDate.setDate(minDate.getDate() + 7);
        return minDate;
    }
}
