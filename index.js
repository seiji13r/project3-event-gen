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

// Use Real and Simulated Tags
const useRealEPCs = false;
const useSimulatedEPCs = true;

// Number of Tags to be Simulated
const amountOfTags = 60;

// Time Interval of Moving Products in milliseconds
const timeInterval = 5 * 1000;

// The Speed of Moving elements: higher value Slow, lower value Fast
const speedFactor = 2;

readers = [
  {
    name: "Entry 1",
    mac: "AB:12:CD:34:EF:56",
    ip: "192.168.0.1",
    firmware: "2.3.3",
    antenna_port: "1",
    brand: "Impinj",
    model: "Speedway",
    location: "Warehouse A",
    notes: "Antenna is mounted on top of the door.",
  },
  {
    name: "Exit 1",
    mac: "ZX:34:FD:54:PL:87",
    ip: "192.168.0.2",
    firmware: "2.3.3",
    antenna_port: "2",
    brand: "Impinj",
    model: "Speedway",
    location: "Warehouse B",
    notes: "Antenna is mounted beside the door.",
  }
]

// EPC Array Definition
let epcs = [];

// Adrian Will Provide Actual EPCs
if(useRealEPCs){
  epcs = [
    "E2801160600002073A3024A1",
    "E2801160600002073A3024D1",
    "E2801160600002073A3024C1",
    "E2801160600002073A3024B1",
    "E2801160600002073A3024E1",
    "E2801160600002073A3058F0",
    "E2801160600002073A308A30",
    "E2801160600002073A308A20",
    "E2801160600002073A308A40",
    "E2801160600002073A308A70",
    "E2801160600002073A308A60",
    "E2801160600002073A308A90",
    "E2801160600002073A308A50",
    "E2801160600002073A308A10",
    "E2801160600002073A308AA0",
    "E2801160600002073A308AC1",
    "E2801160600002073A308AB0",
    "E2801160600002073A308AE1",
    "E2801160600002073A308AA1",
    "E2801160600002073A308A91",
    "E2801160600002073A308AB1",
    "E2801160600002073A308A81",
    "E2801160600002073A308AD0",
    "E2801160600002073A308AF1",
    "E2801160600002073A308A71",
    "E2801160600002073A308A61",
    "E2801160600002073A308A41",
    "E2801160600002073A3058E1",
    "E2801160600002073A308A21",
    "E2801160600002073A3058F1",
    "E2801160600002073A308A11",
    "E2801160600002073A3058C1",
    "E2801160600002073A308A31",
    "E2801160600002073A308A51",
    "E2801160600002073A308A01",
    "E2801160600002073A305811",
    "E2801160600002073A305821",
    "E2801160600002073A305801",
    "E2801160600002073A305831",
    "E2801160600002073A3024F1",
    "E2801160600002073A305841",
    "E2801160600002073A305891",
    "E2801160600002073A3058B1",
    "E2801160600002073A3058A1",
    "E2801160600002073A3058D1"
  ];
}

const events = [];
const products = [];

const productsInfo = [
  {
    name: "Iphone X",
    sku: uuidv4().slice(0,18),
    category: "Electronics"
  },
  {
    name: "Led TV",
    sku: uuidv4().slice(0,18),
    category: "Electronics"
  },
  {
    name: "Modern Chair",
    sku: uuidv4().slice(0,18),
    category: "Furniture"
  },
  {
    name: "Cat Food",
    sku: uuidv4().slice(0,18),
    category: "Pets"
  },
  {
    name: "Washing Machine",
    sku: uuidv4().slice(0,18),
    category: "Home"
  },
  {
    name: "Kennel",
    sku: uuidv4().slice(0,18),
    category: "Pets"
  },
  {
    name: "Rustic Table",
    sku: uuidv4().slice(0,18),
    category: "Furniture"
  },
  {
    name: "Lego Duplo 200pzs Set",
    sku: uuidv4().slice(0,18),
    category: "Kids"
  },
  {
    name: "Square Pants",
    sku: uuidv4().slice(0,18),
    category: "Clothing"
  },
  {
    name: "Blender",
    sku: uuidv4().slice(0,18),
    category: "Home"
  },
  {
    name: "Barbie",
    sku: uuidv4().slice(0,18),
    category: "Kids"
  },
  {
    name: "Leather Jacket",
    sku: uuidv4().slice(0,18),
    category: "Clothing"
  }
]

if(useSimulatedEPCs){
  for (let i = 0; i < amountOfTags; i+=1){
    let event;
    let epc;
  
    epc = uuidv4().replace(/-/g, "").toUpperCase().slice(-24);
  
    event = {
      "epc": epc,
      "antenna_port": null,
      "event_time": new Date()
    }
  
    events.push(event)
    epcs.push(epc)
  }
}

// Assign A Product to Each EPC
epcs.forEach(epc => {
  let product = {}
  let randProduct = productsInfo[Math.floor(Math.random()*productsInfo.length)]
  // console.log(randProduct)
  product = {...randProduct, epc}
  // console.log(product);
  products.push(product);
});

// Check used EPCs and Generated Products
// console.log(epcs)
// console.log(products);

const deleteAll = () => {
  axios.delete(eventsURL, {})
    .then(response => response)
    .catch(error => console.log(error))
}

const populateReaders = (readers) => {
  readers.forEach(reader=>{
    axios.post(readersURL, reader)
      .then(response => response)
      .catch(error => console.log(error))
  })
}

const populateProducts = (products) => {
  products.forEach(product=>{
    axios.post(productsURL, product)
      .then(response => response)
      .catch(error => console.log(error))
  })
}

const deleteEvents = () => {
  axios.get(`${eventsURL}/delete`)
    .then(response => {
      // console.log(response);
      console.log("Delete Events Status Code: ", response.status);
    })
    .catch(error => console.log(error));
}

const postEvents = (events) => {
  axios.post(eventsURL, events)
    .then(response => {
      // console.log(response);
      console.log("Post Array Status Code: ", response.status);
    })
    .catch(error => console.log(error));
}

const changeAntenna = (eventArray, antenna) => {
  eventArray.forEach(event => {
    event["antenna_port"] = antenna;
    event["event_time"] = new Date();
  });
}


// This Function Moves a Random number of Elements, randomly selected from one Array to the Other
const moveObjects = (arrOrigin, arrTarget) => {
  const numToBeMoved = Math.floor(Math.random() * arrOrigin.length / speedFactor + 1);
  // console.log("Number of Elements to be Moved", numToBeMoved);

  for(let i = 0; i < numToBeMoved; i+=1){
    const randPosistion = Math.floor(Math.random()*arrOrigin.length);
    // console.log("New Array Length", arrOrigin.length);
    // console.log("Random Postiion", randPosistion);
    let elementToMove = arrOrigin.splice(randPosistion, 1)[0];
    arrTarget.push(elementToMove);
  }
}

const logArrays = (verbose = false) => {
  if(verbose){
    console.log("\n\n\n");
    console.log("**********************OUTSIDE_TAGS******************", events.length, "\n", events);
    console.log("**********************ENTRY_PORT********************", inEntryPort.length, "\n", inEntryPort);
    console.log("**********************EXIT_PORT*********************", inExitPort.length, "\n", inExitPort);
  } else {
    console.log("\n");
    console.log("**********************OUTSIDE_TAGS******************", events.length);
    console.log("**********************ENTRY_PORT********************", inEntryPort.length);
    console.log("**********************EXIT_PORT*********************", inExitPort.length);
  }
}

const inEntryPort = [];
const inExitPort = [];

// Delete Stored Events in the Server
// deleteEvents();

// Delete Events Products and Readers
deleteAll();

// Populate Products
populateProducts(products);

// Populate Readers
populateReaders(readers);

logArrays(false);

setInterval(function() {

  if(inEntryPort.length!==0){
    moveObjects(inEntryPort, inExitPort);
  }

  if(events.length!==0){
    moveObjects(events, inEntryPort);
  }

  if(inEntryPort.length!==0){
    // Update the Antenna Port
    changeAntenna(inEntryPort, "1");
    // Send event Array to the Endpoint
    postEvents(inEntryPort);
  } else {
    console.log("[inEntryPort] Array is Empty");
  }

  if(inExitPort.length!==0){
    // Update the Antenna Port
    changeAntenna(inExitPort, "2");
    // Send event Array to the Endpoint
    postEvents(inExitPort);
  } else {
    console.log("[inExitPort] Array is Empty");
  }

  // Stop When All Elements are in ExitPort
  if(inEntryPort.length===0 && events.length===0){
    clearInterval(this);
  }

  logArrays(false);
}, timeInterval)

