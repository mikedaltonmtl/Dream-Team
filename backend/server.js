require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

// express app
const app = express();

// middleware
app.use(express.json()); // parses incoming JSON requests and puts the parsed data in req.body

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/workouts', workoutRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listening for requests (no point listening until db connection has been made)
    app.listen(process.env.PORT, () => {
      console.log(`connected to MongoDB, listening on port ${process.env.PORT}`);
    });
  })
  .catch(error => {
    console.log(error);
  });

