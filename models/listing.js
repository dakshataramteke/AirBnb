const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type:String,
        // required: true,
    },
    description: String,
    image:{ 
        type:String,
        default:'https://www.dreamstime.com/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-image130247647',
    set:(v)=> v === "" ? "https://www.dreamstime.com/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-image130247647" : v},
    price: Number,
    location: String,
    country : String
})

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;