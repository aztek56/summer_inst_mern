const express = require('express');
const router = express.Router();

// deals with avatar for the user
const gravatar = require('gravatar');
// encrypt data
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../../models/User');

// @route   GET api/user/test
// @desc    Tests user route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "User works!"}));

// @route   GET api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', (req,res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                return res.status(400).json({ email: 'Email already exists' });
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',   // size of image
                    r: 'pg',    // rating
                    d: 'mm'     // default image
                });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                });
            }
        });
});

module.exports = router;