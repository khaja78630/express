const express = require('express');
const app = express();

const cors= require('cors');
const bodyParser = require('body-parser');
const fs= require('fs')

app.use(bodyParser.json())
app.use(cors());

const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/mydb');

// user - id, name

const UserSchema =new mongoose.Schema({
    userId : {type: Number, required: true},
    userName: {type: String, required: true}
})

const User = mongoose.model('User', UserSchema);


app.post('/addUser', (request, response) => {
   const userObj = new User(request.body); //{userId : '123', userName : 'Khaja'}

   userObj.save().then(() =>{
    response.send(JSON.stringify(request.body));
   })
   .catch(err => response.send(JSON.stringify(err)));

   
   
})

app.get('/users', (request, response) => {

    User.find().then(
        users => response.send(JSON.stringify(users))
    )
        .catch(err => response.send(JSON.stringify(err)))

})

app.get('/getUsersById', (request, response) => {

    User.find({userId  :123}).then(
        users => response.send(JSON.stringify(users))
    )
        .catch(err => response.send(JSON.stringify(err)))

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



