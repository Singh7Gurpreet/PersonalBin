export enum TYPE_OF_FILE {
  STORAGE = "storage",
  CLIPBOARD = "clipboard"
}
export function getEnumType(type:String):TYPE_OF_FILE {
  if(type === "storage") {
    return TYPE_OF_FILE.STORAGE;
  } else if (type == "clipboard") {
    return TYPE_OF_FILE.CLIPBOARD;
  } else {
    throw Error("Invalid type of file");
  }
}