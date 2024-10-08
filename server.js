const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');  
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());  
app.use('/api/users', userRoutes)

mongoose.connect(process?.env?.MONGODB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));