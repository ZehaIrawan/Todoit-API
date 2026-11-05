const { connectDB, closeDB } = require('../config/db');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.handler = async function (event) {

  // perform  validation
  // check('firstName', 'Name is required').not().isEmpty(),
  // check('email', 'Please include a valid email').isEmail(),
  // check(
  //   'password',
  //   'Please enter a password with 6 or more characters',
  // ).isLength({ min: 6 }),

  const { email, password, firstName } = JSON.parse(event.body);

  try {
    await connectDB();
    let user = await User.findOne({ email });

    if (user) {
      return {
        statusCode: 400,
        body: JSON.stringify(['User already exists']),
      };
    }

    user = new User({
      firstName,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    let token = jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: '5 days',
    });

    return { statusCode: 200, body: JSON.stringify(token) };
  } catch (err) {
    console.log(err);
  } finally {
    await closeDB();
  }
};
