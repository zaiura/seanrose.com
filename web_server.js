// Doc's BBQ Web Server
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 80);

// Setup to serve static files
app.use(express.static(__dirname + '/public'));

// Morgan for logging
const morgan = require('morgan');
app.use(morgan(':date :remote-addr :method :url :status :response-time ms - :res[content-length]'));

// Add / Setup handlebars view engine
const handlebars = require('express-handlebars');

// Point to a default template
app.engine('handlebars', handlebars({defaultLayout: 'main'}));

// Add handlebars to the app
app.set('view engine', 'handlebars');

// Kill cache 304 response
app.disable('etag');

//-----------------------------------------
// Startup the server
app.listen(app.get('port'), function(){
	console.log( 'The Web Server is running. Open a browser and navigate to: http://localhost/');
});

//-----------------------------------------
// Cart routes 
//-----------------------------------------
// Default page
app.get('/', function(req, res) {
	res.render('home');
});
/*
// Menu Page
app.get("/menu", function (req, res) {
	res.render('menu');
});

// Upcoming Events Page
app.get("/upcoming", function (req, res) {
	res.render('upcoming');
});

// About Us Page
app.get("/about", function (req, res) {
	res.render('about');
});

// Admin Page
app.get("/admin", function (req, res) {
	res.render('admin');
});

// Construction
app.get('/construction', function(req, res) {
	res.render('construction');
});
 */
app.use(function(req,res) {
	res.status(404);
	res.render('404');
});