var productsRouter = require('express').Router();
const fs = require('fs')
const path = require("path");
var _ = require('lodash');
var jsonFilePath = "../data/products.json";
var products = [];
productsRouter.get("/", async (request, response) => {
   fs.readFile((path.resolve(__dirname, jsonFilePath)), 'utf8', (err, data) => {
    if (err) {
      response.json({ Error: "File read failed" });
    }
    products = JSON.parse(JSON.stringify(data));
    response.send(products);
  });  
});
module.exports = productsRouter;