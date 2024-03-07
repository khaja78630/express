const express = require('express');
const app = express();

const cors= require('cors');
const bodyParser = require('body-parser');
const fs= require('fs')

app.use(bodyParser.json())
app.use(cors());
const userRouter = require('./routes/userRoutes');
const userRouterv2 = require('./routes/userRoutesv2');

app.use('/api/v1/users', userRouter);

app.use('/api/v2/users', userRouterv2);


app.listen(3001, () => {
    console.log('server is running on port number 3000')
})




