const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/mydb');



// async function connect(){
//     await mongoose.connect('mongodb+srv://khaja78635:v5ea0t9E0Ag3VsH8@express.lqrhmgj.mongodb.net/mydb?retryWrites=true&w=majority&appName=express/mydb');
//     console.log('connection success');
// }
// connect();
const UserSchema =new mongoose.Schema({
    userId : {type: Number, required: true},
    userName: {type: String, required: true}
})

const User = mongoose.model('User', UserSchema); 

module.exports = User;