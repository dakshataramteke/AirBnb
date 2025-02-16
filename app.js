const express = require('express');
const db = require('./models/db');
const Listing = require('./models/listing');
const ejs = require('ejs');
const path = require('path');
const app = express();
const port = 8080;
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

app.set("view engine","ejs" );
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({ extended:true}));
app.use(express.json());
app.use(methodOverride('_method'))
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"public")));
// Index Route 
app.get("/listings",async(req,res)=>{
    const allListings = await Listing.find({});
   res.render("listings/index.ejs", {allListings})
})

// New Route
app.get("/listings/new",async(req,res)=>{
    res.render("listings/new.ejs");
})

//Create Route
app.post("/listings",async(req,res)=>{
    let listing = req.body.listing;
    const listings = new Listing({ 
        title: listing.title,
        description: listing.description,
        image: listing.image,
        price: listing.price,
        location: listing.location,
        country: listing.country
     });
    await listings.save();
    res.redirect("listings");
})

// Edit Route
app.get('/listings/:id/edit',async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})
//UPDATE ROUTE
app.put('/listings/:id',async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
    })

// Delete Route 
app.delete('/listings/:id',async(req,res)=>{
    let {id} = req.params;
    const deletelisting = await Listing.findByIdAndDelete(id);
    console.log(deletelisting);
    res.redirect('/listings');
})
// Show Route 
app.get("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    const listings = await Listing.findById(id);
    res.render("listings/show.ejs",{listings})
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})