const uuidv4 = require('uuid/v4');
const axios = require("axios")
uuidv4();

const production = false;

let eventsURL = "http://localhost:3001/epc-events" 
let productsURL = "http://localhost:3001/api/products"
let readersURL = "http://localhost:3001/api/readers"

if (production) {
  eventsURL = "https://project3-assets-overlord.herokuapp.com/epc-events" 
  productsURL = "https://project3-assets-overlord.herokuapp.com/api/products"
  readersURL = "https://project3-assets-overlord.herokuapp.com/api/readers"
}

const deleteAll = () => {
  axios.delete(eventsURL, {})
    .then(response => console.log(response))
    .catch(error => console.log(error))
}

// Delete Events Products and Readers
deleteAll();

console.log("All Objects Deleted")