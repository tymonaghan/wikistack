const express = require('express');
const morgan = require('morgan');
const path = require('path');
const html = require('html-template-tag');
const {db, Pages, Users} = require('./models');
const {cyan} = require('chalk');
const app = express();
const { addPage, editPage, main, userList, userPages, wikiPage } = require('./views');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users');
// const bodyParser = require('body-parser');


const staticMiddleware = express.static(path.join(__dirname, 'public'));


app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(staticMiddleware);
db.authenticate()
  .then(() => {
    console.log(cyan('connected to the database'));
  });

app.get('/', async (req, res) => {
  res.redirect('/wiki')
})

app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

app.use((req, res, next) => {
  try {
    res.send("404")
  } catch (error) {
    next(error)
  } 
})

app.use((err, req, res, next) => {
  console.log(err.stack);
})

const init = async () => {
  await db.sync();
  // make sure that you have a PORT constant
  app.listen(3000, () => {
    console.log(cyan('app is listening on localhost:3000'))
  });
}

init();
