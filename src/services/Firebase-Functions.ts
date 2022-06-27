import { ref, child, push, update, onValue, Database } from "firebase/database";

export function writeEncryptedJson(db: Database, userId: string, encrypted: string, dataCategory: string) {
    const updates: { [key: string]: any } = {};
    updates["/user-data/" + userId + "/" + dataCategory] = encrypted;
    return update(ref(db), updates);
}

export function readEncryptedJson(db: Database, userId: string, dataCategory: string) {
    const dataRef = ref(db, "/user-data/" + userId + "/" + dataCategory);
    var res = "";
    onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        res = data;
    })
    res = JSON.parse(res);
    return res;
}

