const express = require('express');
const router = express.Router();
const { addPage } = require('../views/')

router.get('/', (req, res, next) =>{
  res.send("you have reached the /wiki/ GET route");
});

router.post('/', (req, res, next) => {
  res.send("you have reached the /wiki/ POST route")
});

router.get('/add/', (req, res, next) => {
  res.send(addPage())
})

module.exports = router;
