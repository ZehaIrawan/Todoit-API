const { connectDB, closeDB } = require('../config/db');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.handler = async function (event) {
  // perform  validation  // perform  validation
  // check('firstName', 'Name is required').not().isEmpty(),
  // check('email', 'Please include a valid email').isEmail(),
  // check(
  //   'password',
  //   'Please enter a password with 6 or more characters',
  // ).isLength({ min: 6 }),
  // check('email', 'Please include a valid email').isEmail(),
  // check(
  //   'password',
  //   'Please enter a password with 6 or more characters',
  // ).isLength({ min: 6 }),

  const { email, password } = JSON.parse(event.body);


  console.log(email);
  try {
    await connectDB();
    let user = await User.findOne({ email });

    //response if user not found
    if (!user) {
      return {
        statusCode: 400,
        body: JSON.stringify(['Invalid Credentials']),
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    //response if password not match
    if (!isMatch) {
      return {
        statusCode: 400,
        body: JSON.stringify(['Invalid Credentials']),
      };
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    //generate token
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
