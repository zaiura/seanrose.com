// Doc's BBQ API Server
const express = require('express');
const app = express();

// Set the port to listen on. 3000 in this case
app.set('port', process.env.PORT || 3000);

// Setup to serve static files
app.use(express.static(__dirname + '/public'));

// Add BodyParser to read HTTP message body
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Morgan for logging
const morgan = require('morgan');
app.use(morgan(':date :remote-addr :method :url :status :response-time ms - :res[content-length]'));

// Kill cache 304 response
app.disable('etag');

// CORS for cross origin calls
// Study link: https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
const cors = require('cors');
app.use(cors());

// =============================================================================
// Postgres
// =============================================================================
var config = {
  user: 'appuser', 				          // env var: PGUSER
  database: 'seanmrose', 	// env var: PGDATABASE
  password: 'appuserpass1', 			  // env var: PGPASSWORD
  host: 'localhost', 				        // Server hosting the postgres database
  port: 5432, 						          // env var: PGPORT ** CHECK YOUR PORT
  max: 10, 							            // max number of clients in the pool
  idleTimeoutMillis: 30000	 		    // how long a client is allowed to remain idle before being closed
};
var Pool = require('pg-pool')
global.pool = new Pool(config)

// attach an error handler to the pool for when a connected, idle client
// receives an error by being disconnected, etc
pool.on('error', function(error, client) {
  // handle this in the same way you would treat process.on('uncaughtException')
  // it is supplied the error as well as the idle client which received the error
  console.log('Pool received an error: ' + error)
});


//-----------------------------------------
// Startup the server
app.listen(app.get('port'), function(){
	console.log( 'The API Server is running at http://localhost:3000');
});

module.exports = app;

//-----------------------------------------
// API routes
//-----------------------------------------
/*
//-----------------------------------------
// Customers

var customers = require('./routes/customers');

// Create
app.post('/api/customer', customers.createCustomer);

// Get all customers
app.get('/api/customers/', customers.readCustomers);

// Get specific customer
app.get('/api/customer/:id', customers.readCustomer);

// Update
app.put('/api/customer', customers.updateCustomer);

// Delete
app.delete('/api/customer/:id', customers.deleteCustomer);

// Login
app.post('/api/login/', customers.loginCustomer);

// Version
app.get('/api/customer-version/', customers.readCustomerVersion);

//-----------------------------------------
// Orders

var orders = require('./routes/orders');
/*
// Add an item and quantity
app.post('/api/cart', cart.addCart);

// Get all items for a specific customer
app.get('/api/cart/:id_customer', cart.readCart);

// Update
app.put('/api/cart', cart.updateCart);

// Delete
app.delete('/api/cart/:id', cart.deleteCartLine);

// Version
app.get('/api/cart-version/', cart.readCartVersion);

//-----------------------------------------
// Products

var products = require('./routes/products');

// Create
app.post('/api/product', products.createProduct);

// Read all
app.get('/api/products', products.readProducts);

// Read all best sellers
app.get('/api/bestsellers', products.readBestSellers);

// Read one
app.get('/api/product/:id', products.readProduct);

// Update
app.put('/api/product', products.updateProduct);

// Delete
app.delete('/api/product', products.deleteProduct);

// Find one with LIKE
app.get('/api/like_product/:partial_name', products.searchProduct);
*/

//-----------------------------------------
// Finally If no routes match, send 404
app.use(function(req,res) {
	res.status(404).json({result: 'not found', data:{}});
});

