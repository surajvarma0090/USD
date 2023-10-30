
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const jsonFile = require('./data.json');
const url = "https://www.google.com/finance/quote/USD-INR?sa=X&ved=2ahUKEwjhyIvs1J2CAxVPd2wGHdLyD58QmY0JegQIBRAr"
const express = require('express');
const app = express()

app.get('/', function(req, res) {

  res.json(jsonFile)

})

app.listen(3000)


let run = async () => {

  let res = await axios.get(url)

  let $ = await cheerio.load(res.data)

  let title = $('.fxKbKc').text()
  let data = [{
    "USD": 1,
    "INR": title
  }
  ]

  fs.writeFileSync('data.json', JSON.stringify(data))

}

run()
setInterval(() => {
  run()

}, 20000)
