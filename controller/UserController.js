const jwt = require('jsonwebtoken');
const hash = require('object-hash');
const User = require('../models/User');
const {
    body,
    validationResult
} = require('express-validator/check');
const {
    sanitizeBody
} = require('express-validator/filter');
var ObjectId = require('mongoose').Types.ObjectId;
const app_key = process.env.APP_KEY || "gZdT4kxSYTFFubWOzkOlyzNo73xAtbxT";



exports.register = [
    body('first_name', 'Invalid first name').isLength({min:1}),
    body('last_name', 'Invalid last name').isLength({min:1}),
    body('email', 'Invalid user email').isEmail(),
    body('password', 'Invalid password').isLength({min:3}),

    async (req, res, next) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                // There are errors. Render form again with sanitized values/errors messages.
                res.status(400).json({
                    "message": "invalid parameters",
                    "payload": errors.array()
                });
                return;
            }
            // Check if appid already exist
            user = await User.findOne({
                'email': req.body.email
            })


            if (user) {
                res.status(201).json({
                    'message': "User already registered, Try to login with that details",
                    'payload': user
                });
                return;
            }

            const secret = app_key;
            const salt = hash(secret+Math.random()+Date.now(), { algorithm: 'sha1'});
            const password = hash(req.body.password+salt, { algorithm: 'sha256'});

            var user = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: password,
                salt: salt,
            });

            console.log("starting to save");

            user.save((err, savedUser) => {
                if (err) {
                    console.log("save error");
                    res.status(400).json({
                        "message": err.message,
                        "payload": {}
                    });
                    return
                } else {

                    // create a token start
                    var token = jwt.sign({ id: user._id }, app_key, {
                        expiresIn: 2592000 // expires in 30 days
                    });
                    // create a token end
                  
                            res.json({
                                "message": "User registered successfully",
                                "token": token,
                                "payload": savedUser
                            });
                            return
                        
                    
                }
            });

        } catch (e) {
            console.log('error in userrovalAction')
            res.status(500).json({
                'message': 'Something went wrong. Please try again.',
                'payload': []
            });
            return

        }
    }
];

// Login function
exports.login = [


    async (req, res, next) => {
        try{
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.status(400).json({
                    "message": "invalid parameters",
                    "payload": errors.array()
                });
                return;
            }

            // Check user registered or not
            user = await User.findOne({
                'email': req.body.email
            })
            if (!user) {
                res.status(400).json({
                    'message': 'User not found',
                    'payload': []
                });
                return;
            }
            else{
                const secret = app_key;
                const salt = hash(secret+Math.random()+Date.now(), { algorithm: 'sha1'});
                const password = hash(req.body.password+salt, { algorithm: 'sha256'});

                if(hash(req.body.password+user.salt, { algorithm: 'sha256'}) == user.password){

                    // create a token start
                    var token = jwt.sign({ id: user._id }, app_key, {
                        expiresIn: 2592000 // expires in 30 days
                    });
                    // create a token end

                    
                            res.json({
                                "message": "User Login successfully",
                                "token": token,
                                "payload": user
                            });
                            return
                        }
                
                else{
                    res.json({
                        'message': "Invalid email/password"
                    });
                    return;
                }
            }
        }   catch (e) {
            console.log('error in update user',e.message)
            res.status(500).json({
                'message': 'Something went wrong. Please try again.',
                'payload': []
            });
            return

        }
    }
];
