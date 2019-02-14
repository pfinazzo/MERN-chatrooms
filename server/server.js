const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use("/users", require('./routes/user'));

app.listen(3001);