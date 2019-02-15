const uuidv4 = require("uuid/v4");
const axios = require("axios");
uuidv4();

const production = false;

let eventsURL = "http://localhost:3001/epc-events";

if (production) {
  eventsURL = "https://project3-assets-overlord.herokuapp.com/epc-events";
}

const deleteAll = () => {
  axios
    .delete(eventsURL, {})
    .then(response => console.log(response))
    .catch(error => console.log(error));
};

// Delete Events Products and Readers
deleteAll();

console.log("All Objects Deleted");
