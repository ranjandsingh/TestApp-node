const csv = require("csv-parser");
const fs = require("fs");

const dataLoc = "./testdata.csv";

const ParsedData = [];
let chunk = [];

fs.createReadStream(dataLoc)
  .on("error", () => {
    console.log("Error Reading File");
  })
  .pipe(csv())
  .on("data", (row) => {
    console.log(row);
    if (chunk.length < 6) chunk.push(row);
    else {
      ParsedData.push(...chunk, row);
      chunk = [];
    }
  })

  .on("end", () => {
    if (chunk.length > 0) ParsedData.push(...chunk);
    console.log(`${ParsedData.length} items parssed successfully`);
  });
