const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://tymofii:vNau4leD3Qw1lGv0@cluster0.mopamsc.mongodb.net/?retryWrites=true&w=majority');


const secretKey = crypto.randomBytes(32).toString('hex');

const User = mongoose.model('User', {
  username: String,
  password: String,
});

app.post('/api/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body);
    
    const hashedPassword = await bcrypt.hash(String(password), 10);
    const user = new User({ username: String(username), password: hashedPassword });
    console.log(user);
    await user.save();
    res.status(201).send('User registered successfully.');
 
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: String(username)});
    console.log(user);
    if (!user) {
      return res.status(401).send('Invalid username or password.');
    }

    const passwordMatch = await bcrypt.compare(String(password), user.password);

    if (!passwordMatch) {
      return res.status(401).send('Invalid username or password.');
    }

    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send('Error logging in.');
  }
});



// Будет работать через строк
app.post('/api/login', async (req, res) => {
    const date = req.body.date;
  
    try {
      const user = await User.findOne({ username: String(username)});
      console.log(user);
      if (!user) {
        return res.status(401).send('Invalid username or password.');
      }
  
      const passwordMatch = await bcrypt.compare(String(password), user.password);
  
      if (!passwordMatch) {
        return res.status(401).send('Invalid username or password.');
      }
  
      const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).send('Error logging in.');
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
