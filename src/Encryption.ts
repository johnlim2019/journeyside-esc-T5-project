import { Database } from 'firebase/database';
import NodeRSA, { Key } from 'node-rsa';
// import { writeKey, readKey } from './Firebase-Functions';

export function generateKeys(db: Database) {
    const NodeRSA = require("node-rsa");
    const key = new NodeRSA({b: 512});
    key.generateKeyPair();
    const publicKey = key.exportKey("pkcs8-public-pem");
    const privateKey = key.exportKey("pkcs1-pem");
    return [publicKey, privateKey];
}

export function encryptJson(db: Database, jsonObj: JSON,  publicKey: Key) {
    const key = new NodeRSA();
    key.importKey(publicKey, "pkcs8-public-pem");
    const encrypted = key.encrypt(JSON.stringify(jsonObj), "base64");
    return encrypted;
}

export function decryptJson(db: Database, encrypted: string, privateKey: Key) {
    const key = new NodeRSA();
    key.importKey(privateKey, "pkcs1-pem");
    const deCryptString = key.decrypt(encrypted, "utf8");
    console.log(deCryptString);
    const deCryptObj = JSON.parse(deCryptString);
    console.log(deCryptObj);
    return deCryptObj;
}
