import { createHash } from "crypto";

function getHash(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

function weave(email:string) : string {
  let result:string = "";
  
  let i:number = 0;
  let j:number = 0;

  let key = process.env.RANDOM_KEY!;

  while(i < email.length && j < key.length) {
    result = result + email[i++];
    result = result + key[j++];
  }

  while(j < key.length) {
    result = result + key[j++];
  }
  return result;
}

function readyKey(email:string) : string {
  return getHash(weave(email));
}
export default readyKey;