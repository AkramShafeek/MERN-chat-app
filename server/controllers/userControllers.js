const User = require('../models/UserModel');

const login = (req, res) => {
    console.log(req.body);
    throw new Error('test error');
    // res.send('ok');
}
const register = async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        throw new Error('Bad request, user credentials not provided');

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists)
        throw new Error('User already exists');

    let user = await User.create(req.body);
    user.password = undefined;
    
    console.log(user);
    res.status(200).json(user);
}


module.exports = { login, register };