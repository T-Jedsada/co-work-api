const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

app.get('', function(req, res){
    res.send('Hallo world');
});

app.listen(3000);
console.log('Run on port localhost:3000')
