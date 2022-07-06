"use strict";
console.log("Hello TypeScript");
var PORT = 8000;
// initialize
var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
// routing in express
// calling express and saving as app
var app = express();
var articles = [];
// path
app.get("/", function (req, res) {
    res.json("Welcome to Common News API");
});
app.get("/news", function (req, res) {
    axios
        .get("https://www.theguardian.com/uk/money")
        .then(function (response) {
        var html = response.data;
        console.log(html); // go visit http://localhost:8000/news -> html of the url websites comes back to the terminal
        // use cheerio to pickup the elements
        var $ = cheerio.load(html); // allows to pickup elements from html received
        $('a:contains("cost")', html).each(function () {
            // grab text of each a that contains the words 'cost' from html
            var title = $(this).text();
            var url = $(this).attr("href");
            //  now declare a global variable pointing to array 'articles[]'
            articles.push({ title: title, url: url });
        });
        res.json(articles); // the port will have this json when we visit
        // Use JSON Viewer chrome extension to display JSON results formatted
    });
});
// listen through nodemon - dist/index.js
app.listen(PORT, function () {
    console.log("server running at http://localhost:".concat(PORT));
}); // [1] server running at http://localhost:8000
