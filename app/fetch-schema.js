const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const API_ENPOINT = process.env["REACT_APP_API_ENDPOINT"];
if (!API_ENPOINT) {
  throw new Error(
    "Api endpoint is not set. Provide a value for env variable REACT_APP_API_ENDPOINT"
  );
}

console.log(`... Fetching ${API_ENPOINT}`);

fetch(API_ENPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `
  })
})
  .then(result => result.json())
  .then(result => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(
      type => type.possibleTypes !== null
    );
    result.data.__schema.types = filteredData;

    const filepath = path.join(__dirname, "./src/config/fragmentTypes.json");
    const data = JSON.stringify(result.data, 0, 2);

    fs.writeFile(filepath, data, err => {
      if (err) {
        console.error("Error writing fragmentTypes file", err);
      } else {
        console.log(
          `\n${data}\n\nFragment types successfully extracted.\n${filepath}\n`
        );
      }
    });
