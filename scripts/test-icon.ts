import { generateIcon } from "../src/lib/iconArt";

const name = process.argv[2] ?? "pony";
console.log(`=== ${name} ===`);
console.log(generateIcon(name));
