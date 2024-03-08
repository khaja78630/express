const express = require('express');

const userRouterv2 = express.Router();

const User = require('../models/userModel');

userRouterv2.get('/:userName', (request, response) => { //api/v1/users/100

    User.find({userName  :request.params.userName}).then(
        users => response.send(JSON.stringify(users))
    )
        .catch(err => response.send(JSON.stringify(err)))

});
module.exports = userRouterv2;