require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');


const app = express();
app.use(express.json());

const users = [
    {
        username: 'Juan',
        deparment: 'IT'
    },

    {
        username: 'Sherr',
        department: 'Administration'
    },

    {
        username: 'Daniel',
        department: 'Accounting'
    }


]

app.post('/api/register', (req, res) => {

})

app.post('/api/login', (req, res) => {

    const username = req.body.username;
    const user = {name: username }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    
    res.json({ token: accessToken})

})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)


    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)

        req.user = user
        next()
    })


}

app.get('/api/users', authenticateToken, (req, res) => {
    res.json(users.filter(user => user.username === req.user.name))
})

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Server running on port, ${PORT}`)

})