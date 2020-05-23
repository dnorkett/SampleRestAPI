const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
require('dotenv/config');

app.use(bodyParser.json());

//Import Routes
const postsRoute = require('./routes/posts');
//Middlewear
//Function that executes when routes are being hit
//Parameters - route, callback function
app.use('/posts', postsRoute);



app.get('/', (req, res) => {
    res.send('We are on home');
});



//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, 
{ useNewUrlParser: true, useUnifiedTopology: true},
() => console.log('connected to DB')
);


//Starts the server and instructs it to listen via the specified port
app.listen(PORT);

