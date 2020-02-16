require('dotenv/config');

const express = require('express');
const mongoose = require('mongoose')

const routes = require('./routes');

const app = express();
app.use(express.json());

app.use(routes);

app.use((error, req, res, next) => {
    console.log("Here");
    const {message, data, statusCode} = error;
    console.log(error)
    return res.status(statusCode).json({message, data});
})

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(3333);
})
.catch(err => console.log(err));
