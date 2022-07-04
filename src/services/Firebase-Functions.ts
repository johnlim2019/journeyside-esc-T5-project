import { ref, update, Database, get } from "firebase/database";
import { Key } from "node-rsa";
import { encryptJson, decryptJson } from "./Encryption";

export function writeEncryptedJson(db: Database, userId: string, unencrypted: any, dataPath: string, publicKey: Key) {
    writeKey(db, publicKey, "keys/public/" + userId + "/" + dataPath);
    const updates: { [key: string]: any} = {};
    const encrypted = encryptJson(unencrypted, publicKey)
    updates["/user-data/" + userId + "/booking/" + dataPath] = encrypted;
    update(ref(db), updates);
}

export async function updateEncryptedJson(db: Database, userId: string, unencrypted: any, dataPath: string) {
    const publicKey = readKey(db, "keys/public/" + userId + "/" + dataPath);
    const updates: { [key: string]: any} = {};
    const encrypted = encryptJson(unencrypted, await publicKey)
    updates["/user-data/" + userId + "/booking/" + dataPath] = encrypted;
    update(ref(db), updates);
}


export async function readEncryptedJson(db: Database, userId: string, bookingKey: string) {
    const dataRef = ref(db, "/user-data/" + userId + "/booking/" + bookingKey);
    const encryptedData = await get(dataRef);
    // const keyRef = ref(db, "keys/private/" + userId + "/" + bookingKey);
    // const snapshot = await get(keyRef);
    const privateKey = readKey(db, "keys/private/" + userId + "/" + bookingKey);
    const deCryptedData = decryptJson(encryptedData.val(), await privateKey);
    console.log(deCryptedData);
    return deCryptedData;
}

export async function readEncryptedBookings(db: Database, userId: string, dataPath: string) {
    const dataRef = ref(db, "/user-data/" + userId + "/" + dataPath);
    const encryptedData = await get(dataRef);
    // console.log(encryptedData.val());
    return encryptedData.val();
}

export function writeKey(db: Database, RSAkey: Key, dataPath: string) {
    const updates: { [key: string]: any} = {};
    const encrypted = RSAkey
    updates[dataPath] = encrypted;
    update(ref(db), updates);
}

export async function readKey(db: Database, dataPath: string) {
    const keyRef = ref(db, dataPath);
    var key: any;
    const snapshot = await get(keyRef);
        // key = (await snapshot).val();
    // console.log(snapshot.val());
    return snapshot.val();
}
