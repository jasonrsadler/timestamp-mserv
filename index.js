const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: 'false'}));
app.use(bodyParser.json());

app.get('/api/timestamp/:date_string', function (req, res, next) {
  let date
  if (!req && !req.params && (!req.params.date_string || req.params.date_string === '')) {
    date = new Date()
  }
  date = new Date(req.params.date_string)
  if (isNaN(date)) {
    date = new Date(parseInt(req.params.date_string))
  }
  if (isNaN(date)) {
    res.json({error: 'Invaid Date'})
    return
  }
  res.json({unix: date.getTime(), utc: date.toUTCString()})
})

app.get('/api/timestamp/', function (req, res, next) {
  let date = new Date()
  res.json({unix: date.getTime(), utc: date.toUTCString()})
})

var listener = app.listen(process.env.PORT || 3000 , function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app