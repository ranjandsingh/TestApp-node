const csv = require("csv-parser");
const fs = require("fs");

const dataLoc = "./testdata.csv";

const ParsedData = [];
let chunk = [];
let i = 1;
const SteamSource = fs.createReadStream(dataLoc, { highWaterMark: 256 * 1024 });

SteamSource.on("error", () => {
  console.log("Error Reading File");
});
//.pipe(csv())
SteamSource.on("data", (row) => {
  SteamSource.pause();
  console.log(row.toString());
  SteamSource.resume();
  /* if (chunk.length < 6) chunk.push(row);
    else {
      ParsedData.push(...chunk, row);
      chunk = [];
    }*/
});
SteamSource.on("end", () => {
  if (chunk.length > 0) ParsedData.push(...chunk);
  console.log(`${ParsedData.length} items parssed successfully`);
});
