import { ref, update, onValue, Database, get, child } from "firebase/database";



export function writeEncryptedJson(db: Database, userId: string, encrypted: string, dataCategory: string) {
    const updates: { [key: string]: any } = {};
    updates["/user-data/" + userId + "/" + dataCategory] = encrypted;
    return update(ref(db), updates);
}

export function readEncryptedJson(db: Database, userId: string, dataCategory: string) {
    const dataRef = ref(db, "/user-data/" + userId + "/" + dataCategory);
    var res: object = {};
    onValue(dataRef, (snapshot) => {
        if (snapshot.exists()){
        const data = snapshot.val();
        res = data;
        }
        else {
            res = {};
        }
    })
    return res;
}

export function readOnceEncryptedJson(db: Database, userId: string, dataCategory: string) {
    var res: object = {};
    get(child(ref(db), "/user-data/" + userId + "/" + dataCategory)).then(
        (snapshot) => {
            if (snapshot.exists()){
                res = snapshot.val();
            }
            else {
                console.log("firebase read once call, snapshot does not exist");
            }
        }).catch((error) =>{
            console.error(error);
        });
        return res;
}
