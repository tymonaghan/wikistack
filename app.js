const express = require('express');
const morgan = require('morgan');
const path = require('path');
const html = require('html-template-tag');
const {db, Pages, Users} = require('./models');
const {cyan} = require('chalk');
const app = express();
const { addPage, editPage, main, userList, userPages, wikiPage } = require('./views');

const staticMiddleware = express.static(path.join(__dirname, 'public'));


app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(staticMiddleware);
db.authenticate()
  .then(() => {
    console.log(cyan('connected to the database'));
  });

app.get('/', async (req, res) => {
  const returnHtml = html`
  <!DOCTYPE HTML>
  <head>
    <title>Hello World</title>
  </head>
  <body>
    <p>Hello World!</p>
  </body>
  `
  console.log(returnHtml);
  res.send(returnHtml);
})

const init = async () => {
  await db.sync();
  // make sure that you have a PORT constant
  app.listen(3000, () => {
    console.log(cyan('app is listening on localhost:3000'))
  });
}

init();
