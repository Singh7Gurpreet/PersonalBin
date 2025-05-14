import { createHash } from "crypto";
function getHash(text) {
    return createHash("sha256").update(text).digest("hex");
}
function weave(email) {
    let result = "";
    let i = 0;
    let j = 0;
    let key = process.env.RANDOM_KEY;
    while (i < email.length && j < key.length) {
        result = result + email[i++];
        result = result + key[j++];
    }
    while (j < key.length) {
        result = result + key[j++];
    }
    return result;
}
function readyKey(email) {
    return getHash(weave(email));
}
export default readyKey;
