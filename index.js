const express = require('express');

const db = require('./data/db');

const server = express();
const PORT = 4000;

//endpoints

server.get('/api/users', (req, res) => {
  db.find()
    .then((users) => {
      res.json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({message: "failed to get users"});
    });
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ message: "user does not exist"});
      }
      
    })
    .catch(err => {
      res
      .status(500)
      .json({message: "failed to get user"});
    })

});

server.post('/api/users', (req, res) => {
  const user = req.body;
  db.insert(user).then(idInfo => {
    res.json(idInfo);
  })
  .catch(err => {
    res
    .status(500)
    .json({message: "failed insert in user db"});
  });
});

// DELETE
server.delete('/api/users/:id', (req, res) => {
  const {id} = req.params;
  db.remove(id).then(count => {
    if (count) {
      // we would like to send back the user
      res.json({message: "successfully deleted"});
    } else {
      res
        .status(404)
        .json({ message: "invalid id"});
    }
    
  })
  .catch(err => {
    res
    .status(500)
    .json({message: "failed to delete use"});
  });
});


// PUT
server.put('/api/users/:id', (req, res) => {
  const user = req.body;
  const { id } = req.params;

  if (user.name && user.bio) {
    db.update(id, user).then(count =>{
      if (count) {
        db.findById(id).then(user => {
          res.json(user);
        });
      } else {
        // 404 invalid id:
        res
          .status(404)
          .json({ message: 'invalid id'});
      }
    }).catch(err => {
      // 500 something else went wrong
        res
          .status(500)
          .json({message: "failed to delete user"});
    });
  } else {
    // 400 name or bio is missing
      res
        .status(400)
        .json({message: "missing name or bio"})
  }
});

// query string
server.get("/search", (req, res) => {
  // /endpoint?
  // num=30 source=hp
  // syntax https://www.google.com/search?num=30&source=hp
  // localhost:4000/search?keyword=ferret&num=10
  console.log('query', req.query)
  res.send("searching...");
  // res.send(`searching for ${req.query.num} ${req.query.ferrets}${req.query.keyword}`);
});

//listening

server.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`);
});