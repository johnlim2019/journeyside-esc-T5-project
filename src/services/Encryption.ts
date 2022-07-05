import { Database } from 'firebase/database';
import NodeRSA, { Key } from 'node-rsa';

export function generateKeys(db: Database) {
    const NodeRSA = require("node-rsa");
    const key = new NodeRSA({b: 512});
    key.generateKeyPair();
    const publicKey = key.exportKey("pkcs8-public-pem");
    const privateKey = key.exportKey("pkcs1-pem");
    return [publicKey, privateKey];
}

export function encryptJson(jsonObj: JSON,  publicKey: Key) {
    const key = new NodeRSA();
    key.importKey(publicKey, "pkcs8-public-pem");
    const encrypted = key.encrypt(JSON.stringify(jsonObj), "base64");
    return encrypted;
}

export function decryptJson(encrypted: string, privateKey: Key) {
    const key = new NodeRSA();
    key.importKey(privateKey, "pkcs1-pem");
    const deCryptString = key.decrypt(encrypted, "utf8");
    const deCryptObj = JSON.parse(deCryptString);
    return deCryptObj;
}
