// console.log("Hello TypeScript");
// import cheerio from "cheerio";

const PORT = 8000;

// initialize
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

// routing in express: calling express and saving as app
const app = express();

// Build a cache of several websites
const newspapers = [
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

const articles: { title: string; url: string; source: string }[] = [];

newspapers.forEach((newspaper) => {
  axios
    .get(newspaper.address)
    .then((response: { data: any }) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $('a:contains("cost")', html).each(function (this: cheerio.Element) {
        const title: string = $(this).text();
        const url: string = $(this).attr("href");

        articles.push({
          title: title,
          url: `${newspaper.base}${url}`,
          source: newspaper.name,
        }); // pass in the base for when the url response misses the base url

        console.log(articles);
      });
    })
    .catch((err: any) => console.error(err));
});

// path
app.get("/", (req: any, res: { json: (arg0: string) => void }) => {
  res.json("Welcome to Common News API");
});

app.get("/news", (req: any, res: any) => {
  res.json(articles); // the port will have this json when we visit
  // Use JSON Viewer chrome extension to display JSON results formatted
});

// get response for a particular news/ url
app.get("/news/:newspapersId", (req: any, res: any) => {
  // console.log(req.params.newspapersId);
  const newspaperId = req.params.newspapersId;

  // filter and get the the json that matches the `:newspapersId` url
  // const newspaperAddress = newspaper[0].address;
  const newspaperAddress = newspapers.filter(
    (newspaper) => newspaper.name === newspaperId
  )[0].address;
  // const newspaperBase = newspaper[0].base;
  const newspaperBase = newspapers.filter(
    (newspaper) => newspaper.name === newspaperId
  )[0].base;

  // visit news/guardian --> just get info from guardian
  axios
    .get(newspaperAddress)
    .then((response: { data: any }) => {
      const html = response.data;
      const $ = cheerio.load(html);

      const articlesSpecific: { title: any; url: string; source: any }[] = [];
      $('a:contains("cost")', html).each(function (this: cheerio.Element) {
        const title = $(this).text();
        const url = $(this).attr("href");

        articlesSpecific.push({
          title: title,
          url: `${newspaperBase}${url}`,
          source: newspaperId,
        });
      });

      res.json(articlesSpecific);
    })
    .catch((err: any) => console.error(err));
});

// listen through nodemon - dist/index.js
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
}); // [1] server running at http://localhost:8000
