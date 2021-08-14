const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

//registering
router.post('/register', validInfo, async (req,res) => {
    try {
        //destructure the req.body(name, email, password)
        const { name, email, password } = req.body;

        //check if user exists (if user exists then throw error)
        const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
            email
        ]);

        if (user.rows.length !== 0) {
            return res.status(401).json('User already exists');
        }
        
        //bcrypt the user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        //enter the new user into the database
        const newUser = await pool.query('INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *', [
            name, email, bcryptPassword
        ]);

        //generate jwt token
        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//login route
router.post('/login', validInfo, async (req, res) => {
    try {
        //destructure the req.body
        const { email, password } = req.body;

        //check if user doesn't exist (if not then throw error)
        const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
            email
        ]);

        if (user.rows.length === 0) {
            return res.status(401).json('Invalid Credentials');
        }

        //check that provided password matches database password
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if (!validPassword) {
            return res.status(401).json('Invalid Credentials');
        };

        //give the user jwt token
        const token = jwtGenerator(user.rows[0].user_id);

        res.json({ token });

    } catch (err) {
        console.error(err.message);
    }
});

router.get('/is-verify', authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});

module.exports = router;