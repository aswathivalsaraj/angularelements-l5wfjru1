var express = require("express");
var productsRouter = require("./routers/products.router")
var bodyParser = require('body-parser');
var config = require('./config/config.json');
var app = express();

app.use(express.static('client'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,recording-session");
    next();
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/products', productsRouter);
app.listen(config.port);
console.log("Running app on port port. Visit: http://localhost:" + config.port + "/");
