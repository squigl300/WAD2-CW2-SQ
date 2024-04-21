const User = require('../models/user');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Render the login form
function renderLoginForm(req, res) {
    res.render('login', { csrfToken: req.csrfToken() });
  }
  

// Handle user login
function loginUser(req, res) {
    const { email, password } = req.body;
  
    User.findUserByEmail(email, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      if (!user) {
        return res.status(401).send('Invalid email or password');
      }
  
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
        if (result) {
            req.session.userId = user._id;
            req.session.isAdmin = user.isAdmin; // Set the isAdmin flag in the session
            res.redirect(user.isAdmin ? '/admin' : '/items'); // Redirect to admin dashboard if the user is an admin
          } else {
          res.status(401).send('Invalid email or password');
        }
      });
    });
  }

// Render the registration form
function renderRegistrationForm(req, res) {
    res.render('register', { csrfToken: req.csrfToken() });
  }

// Handle user registration
function registerUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('register', { errors: errors.array() });
    }
  
    const { name, email, password } = req.body;
  
    User.findUserByEmail(email, (err, existingUser) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
  
      if (existingUser) {
        return res.status(400).render('register', { error: 'Email already exists' });
      }
  
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
  
        const newUser = { name, email, password: hashedPassword, isAdmin: false };
  
        User.createUser(newUser, (err, user) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
          }
          res.redirect('/login');
        });
      });
    });
  }

// Render the user management page
function renderUserManagementPage(req, res) {
    User.getAllUsers((err, users) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      res.render('userManagement', { users, csrfToken: req.csrfToken() });
    });
  }
  
  // Delete a user
  function deleteUser(req, res) {
    const userId = req.params.id;
  
    User.deleteUser(userId, (err, numRemoved) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      res.redirect('/admin/users');
    });
  }

  // Create a new user (admin)
function createUser(req, res) {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      const newUser = { name, email, password: hashedPassword, isAdmin: false };
      User.createUser(newUser, (err, user) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
        res.redirect('/admin/users');
      });
    });
  }
  
  module.exports = {
    renderRegistrationForm,
    registerUser,
    renderLoginForm,
    loginUser,
    renderUserManagementPage,
    deleteUser,
    createUser,
  };
