const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()

const url = 'https://dura-online.com/?online'

axios(url)
  .then(response => {
    const html = response.data
    const $ = cheerio.load(html)

    const nowOnline = [];
    $("#online > div.Border_2 > div > div > table:nth-child(3) > tbody > tr").each((index, element) => {
      const tds = $(element).find("td");
      const Name = $(tds[0]).text();
      const Level = $(tds[1]).text();
      const Vocation = $(tds[2]).text();
      const Character = { Name, Level, Vocation };
      nowOnline.push(Character);
    });
    console.log(nowOnline);
  }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))