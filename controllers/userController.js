const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = (req, res) => {
    const { username, password } = req.body;
    
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: err });
        
        User.create(username, hash, (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ message: 'User registered' });
        });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    User.findByUsername(username, (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ message: 'Authentication failed' });

        const user = results[0];
        bcrypt.compare(password, user.password, (err, match) => {
            if (!match) return res.status(401).json({ message: 'Authentication failed' });

            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        });
    });
};