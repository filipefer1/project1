const express = require('express');
const mongoose = require('mongoose')

const routes = require('./routes');

const app = express();
app.use(express.json());

app.use(routes);

mongoose.connect(`mongodb+srv://filipe:255287@noqslmodule-kf7s8.mongodb.net/project1?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(3333);
})
.catch(err => console.log(err));
