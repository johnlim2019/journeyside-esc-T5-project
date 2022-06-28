import { Firebase } from '../../Firebase-Storage';
import { writeEncryptedJson, readEncryptedJson } from "../../Firebase-Functions";
import { generateKeys } from "../../Encryption";
import { Key } from 'node-rsa';

function makeBooking() {
    const db = Firebase();
    var testData: any = 
    {
      "firstName":"Tan",
      "lastName":"Beng Seng",
      "phone":"98684420",
      "email":"bengseng@seng.com",
      "specialReq":"",
      "cardNum":"4569403961014710",
      "expiryMonth":6,
      "expiryYear":24,
      "expiryDate":1717171200000,
      "cvv":152,
      "address":"8 Somapah Road",
      "bookingKey":"-N5_oW3Xp7aKNfIz4UxN",
      "location":"Singapore, Singapore (SIN-Changi)",
      "locationId":"WD0M",
      "checkIn":1656944642141,
      "checkOut":1657031042141,
      "adults":"2",
      "children":"0",
      "rooms":"1",
      "hotelId":"izGr",
      "hotelName":"RedDoorz near Marine Parade Central",
      "hotelAddr":"400 East Coast Road Marine Parade",
      "hotelPrice":136.000750686,
      "supplierId":"XXXXX"};
    const [publicKey, privateKey] = generateKeys(db);
    const newChildKey = writeEncryptedJson(db, "testUser", testData, publicKey);
    return [newChildKey, privateKey];
}

function getBooking(newChildKey: string, privateKey: Key) {
    const db = Firebase();
    var decryptedJSON = readEncryptedJson(db, "testUser", newChildKey, privateKey);
    if (decryptedJSON !== null) {

        // DOES NOT REACH DUE TO EVENT LOOP
        // maybe display decrypted json directly to BookingData when page is refreshed?
        console.log(decryptedJSON);
        return decryptedJSON;


    } else {
        setTimeout(getBooking, 3000);
    }
}

export function userMakesBooking() {
    const [newChildKey, privateKey] = makeBooking();

    // UNDEFINED
    console.log(getBooking(newChildKey, privateKey));
}