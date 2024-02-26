const express = require('express');
const app = express();
const cors= require('cors');

app.use(cors());

app.get('/users', (request, response) => {
const users = [
    {id : 1, name : 'Vinay'},
    {id : 2, name : 'Sai'},
    {id : 3, name : 'Khaja'}
]
response.send(JSON.stringify(users))
})
app.listen(3001, () => {
    console.log('server is running on port number 3000')
})

// www.abc.com/users

// create server folder
// npm init --y (run)
// npm install express cors

// run server - node index.js



