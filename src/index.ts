console.log("Hello TypeScript");

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
];

const articles: { title: string; url: string; source: string }[] = [];

newspapers.forEach((newspaper) => {
  axios.get(newspaper.address).then((response: { data: any }) => {
    const html = response.data;
    const $ = cheerio.load(html);

    $('a:contains("cost")', html).each(function () {
      const title: string = $(this).text();
      const url: string = $(this).attr("href");

      articles.push({
        title: title,
        url: `${newspaper.base}${url}`,
        source: newspaper.name,
      }); // pass in the base for when the url response misses the base url
      console.log(articles);
    });
  });
});

// path
app.get("/", (req: any, res: { json: (arg0: string) => void }) => {
  res.json("Welcome to Common News API");
});

app.get("/news", (req: any, res: any) => {
  res.json(articles); // the port will have this json when we visit
  // Use JSON Viewer chrome extension to display JSON results formatted
});

// listen through nodemon - dist/index.js
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
}); // [1] server running at http://localhost:8000
