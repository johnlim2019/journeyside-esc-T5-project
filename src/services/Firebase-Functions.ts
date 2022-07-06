import { ref, update, Database, get, remove } from "firebase/database";
import { Key } from "node-rsa";
import { encryptJson, decryptJson } from "./Encryption";

export function writeEncryptedJson(db: Database, userId: string, unencrypted: any, bookingKey: string, publicKey: Key) {
    writeKey(db, publicKey, "keys/public/" + userId + "/" + bookingKey);
    const updates: { [key: string]: any} = {};
    const encrypted = encryptJson(unencrypted, publicKey)
    updates["/user-data/" + userId + "/booking/" + bookingKey] = encrypted;
    update(ref(db), updates);
}

export async function updateEncryptedJson(db: Database, userId: string, unencrypted: any, bookingKey: string) {
    const publicKey = readKey(db, "keys/public/" + userId + "/" + bookingKey);
    const updates: { [key: string]: any} = {};
    const encrypted = encryptJson(unencrypted, await publicKey)
    updates["/user-data/" + userId + "/booking/" + bookingKey] = encrypted;
    update(ref(db), updates);
}


export async function readEncryptedJson(db: Database, userId: string, bookingKey: string) {
    const dataRef = ref(db, "/user-data/" + userId + "/booking/" + bookingKey);
    const encryptedData = await get(dataRef);
    const privateKey = readKey(db, "keys/private/" + userId + "/" + bookingKey);
    const deCryptedData = decryptJson(encryptedData.val(), await privateKey);
    console.log(deCryptedData);
    return deCryptedData;
}

export async function readEncryptedBookings(db: Database, userId: string, bookingKey: string) {
    const dataRef = ref(db, "/user-data/" + userId + "/" + bookingKey);
    const encryptedData = await get(dataRef);
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
    return snapshot.val();
}

export function deleteBookings(db: Database, userId: string) {
    const dataRef = ref(db, "/user-data/" + userId);
    const publicRef = ref(db, "/keys/public/" + userId);
    const privateRef = ref(db, "/keys/private/" + userId);
    remove(dataRef);
    remove(publicRef);
    remove(privateRef);
}
