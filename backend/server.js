const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userModel = require('./models/user')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'organizationalhierarchy@gmail.com', // Replace with your email
      pass: 'zeumfctzxxrkndvc'     // Replace with your app password
  }
});

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://arjunrajputcsh23:2fqpBG7ihY5NTER6@cluster0.oy1mw.mongodb.net/login?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.post('/login', async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Check if email is verified
      if (!user.isVerified) {
        return res.status(401).json({ message: 'Please verify your email before logging in.' });
      }
  
      // Add console.log for debugging
      console.log('Comparing passwords:');
      console.log('Input password:', req.body.password);
      console.log('Stored hashed password:', user.password);
  
      const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
      
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
  
      const userWithoutPassword = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified
      };
  
      res.json({ message: 'Success', user: userWithoutPassword });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Server error occurred.' });
    }
  });



app.post('/register', async (req, res) => {
  try {
      const existingUser = await userModel.findOne({ email: req.body.email });
      if (existingUser) {
          return res.status(400).json({ status: 'email_exists', message: 'Email already registered.' });
      }

      // Generate verification token
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create user with verification token
      const newUser = await userModel.create({
          ...req.body,
          password: hashedPassword,
          verificationToken,
          isVerified: false
      });

      console.log('Generated verification token:', verificationToken);

      // Send verification email
      const verificationLink = `http://localhost:5173/verify-email/${verificationToken}`;

      console.log('Verification link:', verificationLink);

      const mailOptions = {
        from: 'organizationalhierarchy@gmail.com',
        to: req.body.email,
        subject: 'Email Verification',
        html: `
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
            <h1 style="color: #333; text-align: center;">Welcome to Our Platform!</h1>
            <div style="background-color: #f9f9f9; border-radius: 10px; padding: 20px; margin: 20px 0;">
              <h2 style="color: #2193b0; margin-bottom: 20px;">Verify Your Email</h2>
              <p style="color: #666; line-height: 1.6;">
                Thank you for registering! Please click the button below to verify your email address:
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationLink}" 
                   style="background-color: #2193b0; 
                          color: white; 
                          padding: 12px 30px; 
                          text-decoration: none; 
                          border-radius: 5px; 
                          display: inline-block;
                          font-weight: bold;">
                  Verify Email Address
                </a>
              </div>
              <p style="color: #888; font-size: 14px; text-align: center; margin-top: 20px;">
                If you didn't create an account, you can safely ignore this email.
              </p>
            </div>
            <div style="text-align: center; color: #888; font-size: 12px; margin-top: 20px;">
              <p>This is an automated email, please do not reply.</p>
            </div>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log('Verification email sent to:', req.body.email);

      res.status(201).json({
          status: 'success',
          message: 'Registration successful. Please check your email to verify your account.'
      });
  } catch (err) {
      console.error("Error in /register:", err.message);
      res.status(500).json({ status: 'error', message: 'Internal server error.' });
  }
});



app.get('/check-verification/:token', async (req, res) => {
  try {
      // Find user by email associated with token (you'll need to store this temporarily)
      const user = await userModel.findOne({ 
          $or: [
              { verificationToken: req.params.token },
              { lastVerificationToken: req.params.token } // New field to track last used token
          ]
      });
      
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json({ isVerified: user.isVerified });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error' });
  }
});



app.get('/verify-email/:token', async (req, res) => {
  try {
      const user = await userModel.findOneAndUpdate(
          { verificationToken: req.params.token },
          { 
              isVerified: true,
              lastVerificationToken: req.params.token, // Store the token before removing it
              $unset: { verificationToken: "" }
          },
          { new: true }
      );
      
      if (!user) {
          return res.status(404).json({ message: 'Invalid verification token' });
      }

      res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error' });
  }
});


app.listen(3001, () => {
    console.log("Server is listening on port 3001...")
})