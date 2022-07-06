"use strict";
console.log("Hello TypeScript");
var PORT = 8000;
var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var app = express();
var newspapers = [
  {
    name: "thetimes",
    address: "https://www.thetimes.co.uk/business",
    base: "",
  },
  {
    name: "guardian",
    address: "https://www.theguardian.com/uk/money",
    base: "",
  },
  {
    name: "telegraph",
    address: "https://www.telegraph.co.uk/money",
    base: "https://telegraph.co.uk",
  },
];
var articles = [];
newspapers.forEach(function (newspaper) {
  axios.get(newspaper.address).then(function (response) {
    var html = response.data;
    var $ = cheerio.load(html);
    $('a:contains("cost")', html).each(function () {
      var title = $(this).text();
      var url = $(this).attr("href");
      articles.push({
        title: title,
        url: "".concat(newspaper.base).concat(url),
        source: newspaper.name,
      });
      console.log(articles);
    });
  });
});
app.get("/", function (req, res) {
  res.json("Welcome to Common News API");
});
app.get("/news", function (req, res) {
  res.json(articles);
});
app.listen(PORT, function () {
  console.log("server running at http://localhost:".concat(PORT));
});
