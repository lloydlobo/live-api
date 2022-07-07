# Live API

A quick API to scrape relevant information for educational purpose or as one sees fit.

![rapidapi_money-live_preview](https://user-images.githubusercontent.com/76430758/177684627-6a294c02-12f3-4782-a910-1e9e589ec0be.png)

## Deploy

### Heroku

  - `heroku login`
  - Connect GitHub Repository
  - Set Node version in package.json
    - ```json
      "engines": {
      "node": "16.x"
      },
      ```
  - Build and Deploy App
  
### RapidAPI

- Use the Heroku App's URL for RapidAPI
- Set Endpoints
  - `/news`
- Set parameters 
  - `/news/{newspaperId}`
  - Test endpoints and set request statuses (optional)
  - Set billing plan (optional)
  - Make it public (optional)


## Technology

### Dependency

- Axios
- Express
- Nodemon
- Cheerio
- rimraf
- body-parser
- dotenv
- cross-env

### Development
- Concurrently


## Credits

- Ania Kubów for the [instructions](https://youtu.be/GK4Pl-GmPHk).

## Resources

- [Typescript Node Express Setup](https://ultimatecourses.com/blog/setup-typescript-nodejs-express).
