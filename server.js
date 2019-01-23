const express = require('express')
// const bodyParser = require('body-parser')
const app = express()

// app.use(bodyParser.json())

// app.set('port', process.env.PORT || 3000)
app.locals.title = 'Colorcraze'

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
});