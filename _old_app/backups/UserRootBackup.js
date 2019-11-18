const User = require('../models/User');
const SHA2 = require('sha2');

let user_name = "admin"
let password = "admin"
let email = "admin@email"

let encryptedPass = SHA2["SHA-512"](password)
User.create({
    user_name: user_name,
    password: encryptedPass.toString('hex'),
    email: email,
})
    .then(() => console.log("Completed"))
    .catch(err => console.log(err))