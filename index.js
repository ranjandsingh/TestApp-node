const csv = require("csv-parser");
const fs = require("fs");

const dataLoc = "./testdata.csv";

const ParsedData = [];

fs.createReadStream(dataLoc)
  .on("error", () => {
    console.log("Error Reading File");
  })
  .pipe(csv())
  .on("data", (row) => {
    console.log(row);
    ParsedData.push(row);
  })

  .on("end", () => {
    console.log(`${ParsedData.length} items parssed successfully`);
  });
