const express = require('express');

const db = require('./data/db');

const srever = express();
const PORT = 4000;

//endpoints

srever.get('/api/users', (req, res) => {
  db.find()
    .then((users) => {
      res.json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({message: "failed to get users"});
    })
})

server.get('/api/users/:id', (req, res) => {
const { id} = req.params;
db.findById()
  .then((user)=>{
    res.json(user);
  })
  .catch(err => {
      res
        .status(500)
        .json({message: "failed to get user"});
  })
})

//listening
server.listen(PORT, () =>
console.log)