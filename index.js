const express = require('express');
const app = express();

const cors= require('cors');
const bodyParser = require('body-parser');
const fs= require('fs')

app.use(bodyParser.json())
app.use(cors());

const users = [
    {id : 1, name : 'Vinay'},
    {id : 2, name : 'Sai'},
    {id : 3, name : 'Khaja'}
]

app.post('/addUser', (request, response) => {
    users.push(request.body);
   
    response.send(JSON.stringify(users))
})

app.get('/users', (request, response) => {

response.send(JSON.stringify(users))
})

app.post('/login', (req, res) => {
    console.log(req.body);
    //DB call
    if(req.body.userId === 123 && req.body.pasword === 'Test'){
        res.send(JSON.stringify({isUserPresent : true})) 
    } else {
        res.send(JSON.stringify({isUserPresent : false})) 
    }
   
})
app.listen(3001, () => {
    console.log('server is running on port number 3000')
})

// www.abc.com/users

// create server folder
// npm init --y (run)
// npm install express cors

// run server - node index.js



