const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const auth = require('./middleware/auth');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.post('/register', userController.register);
app.post('/login', userController.login);

// Protected route example
app.get('/protected', auth, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});