const express = require('express'),
    path = require('path'),
    handlebars = require('express-handlebars'),
    {Client} = require('pg'),
    fetch = require("node-fetch"),
    fs = require('fs');  

var app = express();

//Sets our app to use the handlebars engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
//app.engine('handlebars', handlebars({layoutsDir: __dirname + '/views/layouts'}));

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true})); // <--- middleware configuration

var jsondata = "";
const myURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';  // fun
const myURL2 = 'https://jsonplaceholder.typicode.com/users/1/todos';  // latin placeholder4
var space = 0;

async function getJson(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}



// Routes
app.get('/', async function(req, res) {   
    // Query postgres
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'ui_testing',
        password: 'atg123',
        port: 5432
    });
    client.connect()
    client.query('SELECT * from test2', function(err, result){
        if(err){
            console.log(err);
        } else{
            res.render('main', {layout : 'index', recipes: result.rows, team: jsondata, space: space});
        }        
        client.end()
    });            
});


app.post('/add', function(req, res) {
    // Query postgres
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'ui_testing',
        password: 'atg123',
        port: 5432,
    });
    client.connect()
    client.query("INSERT INTO test2(name, date, directions) VALUES($1, $2, $3)", 
    [req.body.name, req.body.date, req.body.directions], function(err, result){
        if(err){
            console.log(err);
        } else { 
            res.redirect('/');
        }
        client.end()
    });
});

app.delete('/delete/:id', function(req, res){
    // Query postgres
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'ui_testing',
        password: 'atg123',
        port: 5432,
    });
    client.connect()
    client.query("DELETE FROM test2 WHERE id = $1", [req.params.id], function(err, result){
        if(err){
            console.log(err);
        } else {
            res.sendStatus(200);
        }            
        client.end()
    });        
});

app.post('/edit', function(req, res){
    // Query postgres
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'ui_testing',
        password: 'atg123',
        port: 5432,
    });
    client.connect()
        host: 'localhost',
        client.query("UPDATE test2 SET name=$2, date=$3, directions=$4 WHERE id = $1", 
        [req.body.id, req.body.name, req.body.date, req.body.directions], function(err, result){
        if(err){
            console.log(err);
        } else {
            res.redirect('/');
        }            
        client.end()
    });  
    
});
   

// Server 
app.listen(3000, function() {
    console.log("Server started on route 3000");
});

        
async function main() {
    // get json data
    jsondata = await getJson(myURL2);
    
    //console.log(jsondata[1].title);

    // I was trying to use this for json display (I still need to learn helpers and partials):
    // this is the syntax for regular handlebars - you need the express-handlebars version
    // which involves the layouts>partial folder and a partials template in there
    // also somehow pass the jsondata over there - I think you can pass it through the main 
    // layout since you call your partial inside it
    //var partialSrc = jsondata.squadName;
}
main();


// Look at a file in another directory and display a config value found inside it 
fs.readFile('C:\\Users\\Chris\\Documents\\config.txt', 'utf8', function(err, data){ 
    if(err){
        console.log(err);
    }else{
        var thing = data;
        var place = thing.search("space")
        space = thing.slice(place + 6, place + 7)
        console.log("Space Available: " + space + " Gb");
    }        
});