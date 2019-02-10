const uuidv4 = require('uuid/v4');
const axios = require("axios")
uuidv4(); // ⇨ '10ba038e-48da-487b-96e8-8d3b99b6d18a'
// E2801160600002073A3024E1

const eventsURL = "https://project3-assets-overlord.herokuapp.com/epc-events" 
const productsURL = "https://project3-assets-overlord.herokuapp.com/api/products"

// Number of Tags to be Simulated
const amountOfTags = 10;

// Time Interval of Moving Products
const timeInterval = 5 * 1000;

// The Speed of Moving elements: higher value Slow, lower value Fast
const speedFactor = 8;

// Reader Data Pending to Implement
// reader1 = {
//   name: "Entry 1",
//   mac: "AB:12:CD:34:EF:56",
//   ip: "192.168.0.1",
//   firmware: "2.3.3",
//   antenna_port: "1",
//   brand: "Impinj",
//   model: "Speedway",
//   location: "Warehouse A",
//   notes: "Antenna is mounted on top of the door.",
// };

// reader2 = {
//   name: "Exit 1",
//   mac: "ZX:34:FD:54:PL:87",
//   ip: "192.168.0.2",
//   firmware: "2.3.3",
//   antenna_port: "1",
//   brand: "Impinj",
//   model: "Speedway",
//   location: "Warehouse B",
//   notes: "Antenna is mounted beside the door.",
// };

// Adrian Will Provide Actual EPCs
const epcs = [
  "AAAA",
  "BBBB"
];
const events = [];
const products = [];

const productsInfo = [
  {
    name: "Iphone X",
    sku: "1234987124076",
    category: "Electronics"
  },
  {
    name: "Led TV",
    sku: "890789707870",
    category: "Electronics"
  },
  {
    name: "Modern Chair",
    sku: "8305705723583",
    category: "Furniture"
  },
  {
    name: "Cat Food",
    sku: "2985723089752",
    category: "Pets"
  },
  {
    name: "Washing Machine",
    sku: "9872085762398765",
    category: "Home"
  },
  {
    name: "Kennel",
    sku: "3969283659825235",
    category: "Pets"
  },
  {
    name: "Rustic Table",
    sku: "9870983158296",
    category: "Furniture"
  },
  {
    name: "Lego Duplo 200pzs Set",
    sku: "08306876378652",
    category: "Kids"
  },
  {
    name: "Square Pants",
    sku: "0987892735086",
    category: "Clothing"
  },
  {
    name: "Blender",
    sku: "908770987245",
    category: "Home"
  },
  {
    name: "Barbie",
    sku: "870235086235872",
    category: "Kids"
  },
  {
    name: "Leather Jacket",
    sku: "87098752098751234",
    category: "Clothing"
  }
]


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

// Assign A Product to Each EPC
epcs.forEach(epc => {
  let product = {}
  let randProduct = productsInfo[Math.floor(Math.random()*productsInfo.length)]
  // console.log(randProduct)
  product = {...randProduct, epc}
  // console.log(product);
  products.push(product);
});


// console.log(events);
// console.log(epcs);
const deleteProducts = () => {
  console.log(productsURL);
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
deleteEvents();
// Delete Stored Products in the Server
deleteProducts();
// Populate Products
populateProducts(products);

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

