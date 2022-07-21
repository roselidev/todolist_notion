var express = require('express'); // import server engine
const getDatabase = require('./modules/notion').getDatabase; // import function from notion api caller 
const addDatabase = require('./modules/notion').addDatabase; // import function from notion api caller 
const bodyParser = require('body-parser'); // import middleware used to parse response after POST
const PORT = 3000; // set server port

const app = express(); // create server
var http = require('http').Server(app); // import http and create http server

app.use(express.static(__dirname + '/public')); // allow access to public folder
app.use(express.urlencoded({extended: true,})); // allow db fetch
app.use(bodyParser.json()); // for parsing POST response
app.use(bodyParser.urlencoded({ extended: true })); // for parsing POST response

app.get('/notion', async (req, res) => { // fetch db
    const notion = await getDatabase();
    res.json(notion);
});

app.get('/', function(req, res){  // listen to end-user access
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/', async (req, res) => { // listen to end-user form submit
    const res_add = await addDatabase(req);
    if(res_add === 200){
        res.redirect("/");
    }
});

http.listen(PORT, function(){ // run
  console.log('Server is running');
});