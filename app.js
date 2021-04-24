var express = require('express'),
    path = require('path'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    {Client} = require('pg'),
    fs = require('fs');  
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
            res.render('index', {recipes: result.rows});
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

// Look at a file in another directory and display a config value found inside it 
fs.readFile('C:\\Users\\Christine.Hjelmfelt\\Documents\\Code\\JEMS JS Interface\\config.txt', 'utf8', function(err, data){ 
    if(err){
        console.log(err);
    }else{
        var thing = data;
        var place = thing.search("space")
        var space = thing.slice(place + 6, place + 7)
        console.log("Space Available: " + space + " Gb");
    }        
});