const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const homeRoute = require('./routes/home');

const app = express();
// Set EJS as the view engine
app.set('view engine', 'ejs');

// Use the home route
app.use('/', homeRoute);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const users = [];
const port = 3000

// Register route
app.post('/register', async (req, res) => {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = { username: req.body.username, email: req.body.email, password: hashedPassword };
      users.push(user);
      const token = jwt.sign({ user }, 'my_secret_key');
      res.json({ token });
    } catch (error) {
      res.status(500).send();
    }
  });
  
  // Login route
  app.post('/login', async (req, res) => {
    const user = users.find((user) => user.username === req.body.username);
    if (!user) return res.status(400).send('Cannot find user');
  
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({ user }, 'my_secret_key');
        res.json({ token });
      } else {
        res.status(401).send('Incorrect password');
      }
    } catch (error) {
      res.status(500).send();
    }
  });

// Start the server
app.listen(port, function() {
  console.log(`Server is listening on port ${port}`);
});
