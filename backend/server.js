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

const walletRouter = require('./routes/wallets');
const lossesRouter = require('./routes/losses');
const incomesRouter = require('./routes/incomes');
const usersRouter = require('./routes/users');

app.use('/api/wallet', walletRouter);
app.use('/api/losses', lossesRouter);
app.use('/api/incomes', incomesRouter);
app.use('/api/users', usersRouter);

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
