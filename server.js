//Import modules, Express, Mongoose, dotenv
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const morgan = require("morgan");


const app = express();

//-------------------------------------------------------------------------------------\\
//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => { 
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
});

//Import the Shoe model
const Shoe = require('./models/shoe.js');


//--------------------------------------------------------------------------------------\\
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method')); 
app.use(morgan('dev')); 


//-------------------------------------------------------------------------------------\\
app.get('/', async (req, res) => {
    res.render('index.ejs')
})

app.get('/shoes/new', (req, res) => {
    res.render('shoes/new.ejs');
});

//POST /shoes
app.post('/shoes', async (req,res) => {
    if (req.body.hasYouBoughtYet === 'on') {
        req.body.hasYouBoughtYet = true;
    } else {
        req.body.hasYouBoughtYet = false;
    }
    console.log(req.body);
    await Shoe.create(req.body);
    res.redirect('/shoes');
})

//GET, Index route
app.get('/shoes', async (req,res) => {
    const allShoes = await Shoe.find();                  //Retrieving all data from the database
    //console.log(allShoes);
    res.render('shoes/index.ejs', { shoes: allShoes});     //The first argument is a string specifying the path to the EJS template we wish to render. The second argument is an object containing the data we want to pass to the template. 
});


app.get('/shoes/:shoeId', async (req,res) => {
    const foundShoe = await Shoe.findById(req.params.shoeId);         //Retrieving a single document based on its unique identifier.
    res.render('shoes/show.ejs', { shoe: foundShoe });
});

//DELETE
app.delete('/shoes/:shoeId', async (req, res) => {
    await Shoe.findByIdAndDelete(req.params.shoeId);
    res.redirect('/shoes');
});

app.get('/shoes/:shoeId/edit', async (req,res) => {
    const foundShoe = await Shoe.findById(req.params.shoeId);
    //console.log(foundShoe);
    res.render('shoes/edit.ejs', {
        shoe: foundShoe,
    });
});

//PUT
app.put('/shoes/:shoeId', async (req,res) => {
    if ( req.body.hasYouBoughtYet === 'on') {
        req.body.hasYouBoughtYet = true
    } else {
        req.body.hasYouBoughtYet = false
    }
    await Shoe.findByIdAndUpdate(req.params.shoeId, req.body);
    res.redirect(`/shoes/${req.params.shoeId}`);
});

//-------------------------------------------------------------------------------------\\
app.listen(4000, () => {
    console.log("Listening on port 4000 🎧🎵!")
})

