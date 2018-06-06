
let express = require('express')
let cors = require('cors')
let bodyParser = require('body-parser')

// GET DATA FROM THIRD PARTY API
let axios = require('axios')

axios.get(`https://swapi.co/api/people/1`)
.then(response => {
  // console.log(response.data)
})

// IMPORT DATA FROM FILE
let fake_data = require('./fake_data')

const app = express();
app.use(cors())
app.use(bodyParser.json())


app.get('/fake_data', (req, res) => {
  res.status(200).send(fake_data)
});

app.patch('/editSurvey/:index', (req, res) => {
  fake_data.splice(req.params.index, 1, req.body.survey)
  res.status(200).send(req.body.survey)
})

app.delete('/deleteSurvey/:index', (req, res) => {
  fake_data.splice(req.params.index)
  res.status(200).send(req.params.index)
})


let port = 3100;
app.listen(port, () => {console.log(`listening on port ${port}`)})