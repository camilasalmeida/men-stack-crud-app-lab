//Import modules, Express, Mongoose, dotenv
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

//-------------------------------------------------------------------------------------\\
//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => { 
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
});

//Import the Shoe model
const Shoe = require('./models/shoe.js');


app.use(express.urlencoded({ extended: false }));







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
    res.redirect('/shoes/new');
})




//-------------------------------------------------------------------------------------\\
app.listen(4000, () => {
    console.log("Listening on port 4000 🎧!")
})

