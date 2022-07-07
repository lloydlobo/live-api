"use strict";
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
    {
        name: "cityam",
        address: "https://www.cityam.com/markets-economics/",
        base: "",
    },
    {
        name: "nyt",
        address: "https://www.nytimes.com/international/section/business",
        base: "",
    },
    {
        name: "latimes",
        address: "https://www.latimes.com/business",
        base: "",
    },
    {
        name: "smh",
        address: "https://www.smh.com.au/business",
        base: "https://www.smh.com.au",
    },
    {
        name: "un",
        address: "https://www.un.org/development/desa/financing/news",
        base: "",
    },
    {
        name: "bbc",
        address: "https://www.bbc.co.uk/news/business",
        base: "https://www.bbc.co.uk",
    },
    {
        name: "es",
        address: "https://www.standard.co.uk/esmoney",
        base: "https://www.standard.co.uk",
    },
    {
        name: "sun",
        address: "https://www.thesun.co.uk/money/",
        base: "",
    },
    {
        name: "dm",
        address: "https://www.dailymail.co.uk/news/business",
        base: "",
    },
    {
        name: "nyp",
        address: "https://nypost.com/business/",
        base: "",
    },
];
var articles = [];
newspapers.forEach(function (newspaper) {
    axios
        .get(newspaper.address)
        .then(function (response) {
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
    })
        .catch(function (err) { return console.error(err); });
});
app.get("/", function (req, res) {
    res.json("Welcome to Common News API");
});
app.get("/news", function (req, res) {
    res.json(articles);
});
app.get("/news/:newspapersId", function (req, res) {
    var newspaperId = req.params.newspapersId;
    var newspaperAddress = newspapers.filter(function (newspaper) { return newspaper.name === newspaperId; })[0].address;
    var newspaperBase = newspapers.filter(function (newspaper) { return newspaper.name === newspaperId; })[0].base;
    axios
        .get(newspaperAddress)
        .then(function (response) {
        var html = response.data;
        var $ = cheerio.load(html);
        var articlesSpecific = [];
        $('a:contains("cost")', html).each(function () {
            var title = $(this).text();
            var url = $(this).attr("href");
            articlesSpecific.push({
                title: title,
                url: "".concat(newspaperBase).concat(url),
                source: newspaperId,
            });
        });
        res.json(articlesSpecific);
    })
        .catch(function (err) { return console.error(err); });
});
app.listen(PORT, function () {
    console.log("server running at http://localhost:".concat(PORT));
});
