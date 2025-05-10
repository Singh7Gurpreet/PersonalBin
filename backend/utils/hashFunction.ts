import { createHash } from "crypto";

function getHash(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

export default getHash;