require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Painting = require('./models/Painting');

const app = express();
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

//Get all paintings
app.get('/api/paintings', async (req, res) => {
  const paintings = await Painting.find().sort({ Title: 1 });
  res.json(paintings);
});

//Update one painting
app.put('/api/paintings/:id', async (req, res) => {
  const updated = await Painting.findOneAndUpdate(
    { PaintingID: req.params.id },
    req.body,
    { new: true }
  );
  res.json(updated);
});

app.listen(3000, () => console.log('http://localhost:3000'));