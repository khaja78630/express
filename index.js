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
    if (request.body && request.body.userId !== null && request.body.userName !== null) {
        userObj.save().then(() => {
            response.send(JSON.stringify({Status : 'User added successfully'}));
        })
        .catch(err => response.status(400).send(JSON.stringify({Status : 'User not added', err: err})));
    } else {
        response.status(400).send(JSON.stringify({Status : 'User not added successfully'}));
    }
    // 2XX - 200 - success
    //4XX - 400 - bad request
    // 404 - not found
    // 403 - forbidden
    // 500 - 504 gatewaytimeoutnode
// nginx - client 123.456.789.0 server /admin /

   
   
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


app.put('/updateUser/:userId', (request, response) => {
    const id = request.params.userId;
    if(id){
        User.find({userId : id}).then(
            user =>{
                console.log(user);
                if(user.length > 0){
                    User.updateMany({userId : id}, {userId : id, userName : request.body.userName}).then(
                        user => {
                            if(user){
                                response.send('User updated successfully') 
                            }
                        }
                    )
                    .catch(error => {
                        response.send(JSON.stringify(error)) 
                    })
                } else {
                    response.status(404).send('userId not found') 
                }
            }
        )
        .catch(error => {
            response.send(JSON.stringify(error)) 
        })
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

//db.users.find()





