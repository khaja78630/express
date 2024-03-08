const express = require('express');
const userRouter = express.Router();

const User = require('./userModel');

userRouter.get('/', (request, response) => {

    User.find().then(
        users => response.send(JSON.stringify(users))
    )
        .catch(err => response.send(JSON.stringify(err)))


});

userRouter.get('/:userId', (request, response) => {

    User.find({userId : request.params.userId}).then(
        users => response.send(JSON.stringify(users))
    )
        .catch(err => response.send(JSON.stringify(err)))


});


userRouter.post('/addUser', (request, response) => {
    const userObj = new User(request.body);
    if (request.body && request.body.userId !== null && request.body.userName !== null) {
        userObj.save().then(() => {
            response.send(JSON.stringify({ Status: 'User added successfully' }));
        })
            .catch(err => response.status(400).send(JSON.stringify({ Status: 'User not added', err: err })));
    } else {
        response.status(400).send(JSON.stringify({ Status: 'User not added successfully' }));
    }



})

module.exports = userRouter;