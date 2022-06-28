import { ref, child, push, update, Database, get } from "firebase/database";
import { Key } from "node-rsa";
import { encryptJson, decryptJson } from "./Encryption";

export function writeEncryptedJson(db: Database, userId: string, unencrypted: any, publicKey: Key) {
    const newChildKey = push(child(ref(db), "user-data")).key;
    const updates: { [key: string]: any} = {};
    const encrypted = encryptJson(unencrypted, publicKey)
    updates["/user-data/" + userId + "/booking/" + newChildKey] = encrypted;
    update(ref(db), updates);
    return newChildKey;
}

export async function readEncryptedJson(db: Database, userId: string, newChildKey: string, privateKey: Key) {
    const dataRef = ref(db, "/user-data/" + userId + "/booking/" + newChildKey);
    const encryptedData = await get(dataRef);
    const deCryptedData = decryptJson(encryptedData.val(), privateKey);
    return deCryptedData;
}

// export function writeKey(db: Database, RSAkey: any, keyType: string) {
//     const updates: { [key: string]: any} = {};
//     const encrypted = RSAkey
//     updates["/keys/" + keyType] = encrypted;
//     return update(ref(db), updates);
// }

// export async function readKey(db: Database, keyType: string) {
//     const keyRef = ref(db, "/keys/" + keyType);
//     var key: any;
//     const snapshot = get(keyRef);
//         key = (await snapshot).val();
//         return key;
// }
