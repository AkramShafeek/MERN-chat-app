const User = require('../models/UserModel');
const generateToken = require('../database/generateToken');

const login = async (req, res) => {
  // console.log('server was hit');
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    user.password = undefined;
    const token = generateToken(user._id);
    res.status(200).json({ token, user });
  }
  else {
    throw new Error('Invalid Email or Password');
  }

}
const register = async (req, res) => {

  const { name, email, password } = req.body;
  if (!name || !email || !password)
    throw new Error('Bad request, user credentials not provided');

  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    throw new Error('User already exists');

  let user = await User.create(req.body);
  user.password = undefined;

  // console.log(user);
  res.status(200).json(user);
}

const getAllUsers = async (req, res) => {
  const keyword = req.query.searchuser ? {
    $or: [
      { name: { $regex: req.query.searchuser, $options: "i" } },
      { email: { $regex: req.query.searchuser, $options: "i" } }
    ]
  } : {};

  const users = await User.find(keyword);

  res.status(200).send(users);
}


module.exports = { login, register, getAllUsers };