const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://127.0.0.1/Assignment8', { useNewUrlParser: true, useUnifiedTopology: true });
const User = mongoose.model('User', {
  fullName: String,
  email: String,
  password: String,
});


app.use(bodyParser.json());

app.post('/user/create', async (req, res) => {
try {
  const { fullName, email, password } = req.body;

  
  if (!checkEmail(email) || !checkPassword(password)) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  var check = await User.findOne({ email });
  if (check){
    return res.status(400).json({ message: 'User with same email already exists' });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ fullName, email, password: hashedPassword });

  
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.put('/user/edit', async (req, res) => {
  const { fullName, password } = req.body;
  const email = req.query.email;

  if (!checkPassword(password)) {
    return res.status(400).json({ message: 'Invalid password, password length should be greater than 8' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User with given mail doesn't exist" });
    }

    user.fullName = fullName;
    user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.json({ message: 'User details updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

app.delete('/user/delete', async (req, res) => {
  const {email} = req.body;

  try {
    const user = await User.findOneAndDelete({ email });

    if (!user) {
      return res.status(404).json({ message: "User with given mail doesn't exist" });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

app.get('/user/getAll', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
});

function checkPassword(password) {
  return password.length >= 12;
}

function checkEmail(email) {
  return /^[a-zA-Z0-9._-]+@northeastern\.edu$/.test(email);
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
