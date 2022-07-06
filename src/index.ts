console.log("Hello TypeScript");

const PORT = 8000;

// initialize
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

// routing in express
// calling express and saving as app
const app = express();
const articles: { title: string; url: string }[] = [];
// path
app.get("/", (req: any, res: { json: (arg0: string) => void }) => {
  res.json("Welcome to Common News API");
});

app.get("/news", (req: any, res: any) => {
  axios
    .get(`https://www.theguardian.com/uk/money`)
    .then((response: { data: any }) => {
      const html = response.data;
      console.log(html); // go visit http://localhost:8000/news -> html of the url websites comes back to the terminal

      // use cheerio to pickup the elements
      const $ = cheerio.load(html); // allows to pickup elements from html received

      $('a:contains("cost")', html).each(function () {
        // grab text of each a that contains the words 'cost' from html
        const title: string = $(this).text();
        const url: string = $(this).attr("href");
        //  now declare a global variable pointing to array 'articles[]'

        articles.push({ title, url });
      });

      res.json(articles); // the port will have this json when we visit
      // Use JSON Viewer chrome extension to display JSON results formatted
    });
});

// listen through nodemon - dist/index.js
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
}); // [1] server running at http://localhost:8000
