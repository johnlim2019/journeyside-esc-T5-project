interface searchBarInterface {
    locationId: string,
    location: string,
    lng: number,
    lat: number,
    checkIn: number,
    checkOut: number,
    adults: string,
    children: string,
    rooms: string,
    pageItems: number,
    pageStart: number,
    selectHotelId: string,
    selectHotelObj: any,
    sortByCat: string,
    isLoading: boolean,
    hotelData: {
        locationId: string,
        hotels: any[],
    },
    destinationsObjLs: any[],
    autocompleteLs: string[],
}



export function validateCache(jsonString: string) {
    // check for corrupted data
    try {
        let object = JSON.parse(jsonString) as searchBarInterface;
        // check hotels 
        let hotel_0 = object.hotelData.hotels[0];
        // check hotel address, name and id and price
        let hotelName: string = hotel_0.name;
        let hotelAddr: string = hotel_0.address;
        let hotelPrice: number = hotel_0.converted_price;
        return true;
    } catch (error) {
        return false;
    }
}


export function loadState(key: string) {
    try {
        const serialisedState = localStorage.getItem(key);
        if (!serialisedState) return undefined;
        if (!validateCache(serialisedState)) return undefined;
        console.log("LOCALSTORAGE able to load");
        console.log()
        return JSON.parse(serialisedState);
    }
    catch (e) {
        console.log("could not load")
        console.log(e);
        return undefined;
    }
}

export function saveState(state: any, key: string) {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem(key, serialisedState);
        console.log("LOCALSTORAGE able to save");
    } catch (e) {
        console.log("unable to save");
        console.log(e);
    }
}

export function saveSession(state: any, key: string) {
    try {
        const serialisedState = JSON.stringify(state);
        sessionStorage.setItem(key, serialisedState);
        console.log("session able to save");
    } catch (e) {
        console.log("unable to save");
        console.log(e);
    }
}

export function loadSession(key: string) {
    try {
        const serialisedState = sessionStorage.getItem(key);
        if (!serialisedState) return undefined;
        console.log("session able to load");
        console.log()
        return JSON.parse(serialisedState);
    }
    catch (e) {
        console.log("could not load")
        console.log(e);
        return undefined;
    }
}