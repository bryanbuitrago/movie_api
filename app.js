const express = require('express');
const app = express();
const request = require('request');
const APIKEY = 'thewdb';
const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');

app.get('/', (req, res)=> {
  res.render('search');
})

app.get('/results', (req, res)=> {
  // console.log(req.query.search);
  let query = req.query.search;
  let url = `http://www.omdbapi.com/?s=${query}&apikey=${APIKEY}`;

  request(url, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.
  let data = JSON.parse(body);
  // res.send(results["Search"][0]["Title"]);
  if(data === 'undefined'){
    res.send('Wrong entry');
  }
  res.render('results', {data});
});

});

app.listen(port, ()=> {
  console.log(`Movie app has started on port ${port}`);
});
