const mongoose = require('mongoose');
const Listing = require('../models/listing');
const { data } = require('./data.js'); // Destructure to get the data property

main().then(res => console.log('Database Connected'))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Airbnb');
}

const initData = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(data); // Use the destructured data here
  console.log("Data is initialized !!");
}

initData();