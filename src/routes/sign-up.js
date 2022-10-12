const { signUpForm } = require("../templates.js");
const bcrypt = require('bcryptjs')

function get(req, res){
    const content = signUpForm();
    res.send(content);
}

function post(req, res) {
    const { name, email, password } = req.body;
    
    // bcrypt.hash(password, 12).then((hash) => {
    //     const userId = 
    // })
}

module.exports = { get, post }