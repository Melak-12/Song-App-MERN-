const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const cors = require('cors');

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ origin: 'https://songapp-ten.vercel.app' }));

app.use('/api/songs', require('./routes/songRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.get('/', (req, res) => {
    res.send('welcome to songs app  :)');
});

console.log("ready for frontend");
app.listen(port, () => console.log(`server started at port ${port}`.bgGreen.white));
