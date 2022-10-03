const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8000;

main().catch(err=>console.log(err));
async function main(){
    await mongoose.connect('mongodb+srv://dbuser:dbpassword@mymongodb.5qsjipo.mongodb.net/Dance?retryWrites=true&w=majority')
console.log('started successfully')};

const userSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    address: String,
    desc: String
});

const contactus = mongoose.model('contactus', userSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

// ENDPOINTS
app.get('/', (req, res)=>{
    res.status(200).render('home.pug')
});

app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug')
})

app.post('/contact', (req, res)=>{
   contactus.create(req.body).then(()=>{res.send("This item has been saved to the database")
}).catch(()=>{
    res.status(400).send("Item was not saved to the database")
})
});

app.listen(port, ()=>{
    console.log(`This application started successfully on port ${app.get('port')}`)
});
