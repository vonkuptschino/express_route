const { get } = require('axios');
const express = require('express');
const bodyParser = require('body-parser')

const PORT = 4321;
const app = express();

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended:true}))
  .use('/my', require('./routes/my')(express))
  .use('/users', require('./routes/us')(express))
  .get('/', r => r.res.send('HOME'))
  .set('view engine', 'pug')
  .listen(PORT, () => console.log('server is started!'))