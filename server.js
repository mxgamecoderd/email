// Import dependencies
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// Create the app
const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define port
const port = process.env.PORT || 3000;

// Create a route to handle POST requests from the contact form
app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;

    // Validate if all fields are provided
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',  // or you can use another service like Yahoo, Outlook, etc.
        auth: {
            user: 'olamilekandamilaraa@gmail.com',  // Your email address
            pass: 'Olamilekan2007',   // Your email password (or an app password for Gmail)
        },
    });

    // Set up the email data
    const mailOptions = {
        from: email,
        to: 'olamilekandamilaraa@gmail.com',  // The email address where you want to receive messages
        subject: `New Contact Form Message from ${name}`,
        text: `You have a new message from the contact form:\n\nName: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Failed to send email' });
        }
        console.log('Message sent: ' + info.response);
        res.status(200).json({ message: 'Message sent successfully' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
