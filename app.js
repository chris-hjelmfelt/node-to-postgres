var express = require('express'),
    path = require('path'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    {Client} = require('pg');
var app = express();


// Assign Dust Engine to .dust files
app.engine('dust', cons.dust);

// Set .dust as the default extension
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false })); // <--- middleware configuration


 // Routes
app.get('/', function(req, res) {   
    res.render('index');
});


// Server 
app.listen(3000, function() {
    console.log("Server started on route 3000");
});
