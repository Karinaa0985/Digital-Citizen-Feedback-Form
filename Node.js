const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock database (for demonstration only)
const users = [];

// Sign-up route
app.post('/signup', (req, res) => {
    const { username, email, address, contact, password } = req.body;

    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: 'User already exists.' });
    }

    users.push({ username, email, address, contact, password });
    console.log('New User:', { username, email, address, contact });
    res.status(201).json({ message: 'User registered successfully!' });
});

// Sign-in route
app.post('/signin', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    res.status(200).json({ message: 'Sign-in successful!', user });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
