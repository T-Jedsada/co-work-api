require('dotenv').config();

var name_database = process.env.DB_DATABASE;
var name_username = process.env.DB_USERNAME;
var name_password = process.env.DB_PASSWORD;

var database = mongojs('mongodb://'+name_username+':'+name_password+'@ds245228.mlab.com:45228/cowork', [name_database]);