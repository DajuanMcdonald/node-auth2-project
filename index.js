require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

app.post('/api/register', (req, res) => {

})

app.post('/api/login', (req, res) => {

    const username = req.body.username;
    const user = {name: username }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    
    res.json({ token: accessToken})

})

app.get('/api/users', (req, res) => {


})

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Server running on port, ${PORT}`)

})