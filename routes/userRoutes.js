const express = require('express');

const userRouter = express.Router();

const User = require('../models/userModel');

userRouter.get('/', (request, response) => { // api/v1/users/

    User.find({}).then(
        users => response.send(JSON.stringify(users))
    )
        .catch(err => response.send(JSON.stringify(err)))


})

userRouter.get('/:userId', (request, response) => { //api/v1/users/100

    User.find({userId  :request.params.userId}).then(
        users => response.send(JSON.stringify(users))
    )
        .catch(err => response.send(JSON.stringify(err)))

});

userRouter.put('/:userId', (request, response) => { //api/v1/users/100
    const id = request.params.userId;
    if(id){
        User.find({userId : id}).then(
            user =>{
                console.log(user);
                if(user.length > 0){
                    User.updateMany({userId : id}, {userName : request.body.userName}).then(
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

});

userRouter.post('/', (request, response) => {
    const userObj = new User(request.body); //{userId : '123', userName : 'Khaja'}
    if (request.body && request.body.userId !== null && request.body.userName !== null) {
        userObj.save().then(() => {
            response.send(JSON.stringify({Status : 'User added successfully'}));
        })
        .catch(err => response.status(400).send(JSON.stringify({Status : 'User not added', err: err})));
    } else {
        response.status(400).send(JSON.stringify({Status : 'User not added successfully'}));
    }
   
   
})


userRouter.delete('/:userId', (request, response) => { //
    if (request.params.userId !== "") {
        User.deleteOne({userId : request.params.userId }).then((result) => {
            console.log('khaja', result)
            if(result && result.deletedCount > 0){
                response.send(JSON.stringify({Status : 'User deleted  successfully'}));
            } else {
                response.status(404).send(JSON.stringify({Status : 'User not deleted successfully'}))
            }
            
        })
        .catch(err => response.status(400).send(JSON.stringify({Status : 'User not added', err: err})));
    } else {
        response.status(400).send(JSON.stringify({Status : 'User not deleted successfully'}));
    }
   
   
})

module.exports = userRouter;
