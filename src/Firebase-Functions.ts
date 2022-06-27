import { ref, child, push, update, onValue, Database } from "firebase/database";

export function writeEncryptedJson(db: Database, userId: string, encrypted: string) {
    const newChildKey = push(child(ref(db), "data")).key;
    const updates: { [key: string]: any} = {};
    updates["/user-data/" + userId + "/" + newChildKey] = encrypted;
    return update(ref(db), updates);
}

export function readEncryptedJson(db: Database, userId: string) {
    const dataRef = ref(db, "/user-data/" + userId);
    onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        return data;
    } )
}
