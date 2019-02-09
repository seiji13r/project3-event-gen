const uuidv4 = require('uuid/v4');
const axios = require("axios")
uuidv4(); // ⇨ '10ba038e-48da-487b-96e8-8d3b99b6d18a'
// E2801160600002073A3024E1

const epcs = [];
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

const cardNumber = 2000;

for (let i = 0; i < cardNumber; i+=1){
  let event;

  const epc = uuidv4().replace(/-/g, "").toUpperCase().slice(-24);

  event = {
    "epc": epc,
    "antenna_port": "1",
    "event_time": new Date()
  }

  events.push(event)
  epcs.push(epc)
}

epcs.forEach(epc => {
  let product = {}
  let randProduct = productsInfo[Math.floor(Math.random()*productsInfo.length)]
  // console.log(randProduct)
  product = {...randProduct, epc}
  // console.log(product);
  products.push(product);
});


console.log(events);
console.log(epcs);

// const eventsURL = "https://seiji-recordjson.herokuapp.com/" 
// const productsURL = "https://project3-assets-overlord.herokuapp.com/api/products/" 

products.forEach(product=>{
  axios.post(productsURL, product)
    .then(response => response)
    .catch(error => console.log(error))
})


axios.post(eventsURL, events)
  .then(response => {
    console.log(response);
  })
  .catch(error => console.log(error));