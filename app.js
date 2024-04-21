const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const userController = require('./controllers/userController');
const itemController = require('./controllers/itemController');
const authMiddleware = require('./middleware/authMiddleware');
const csrf = require('csurf');
const NedbStore = require('nedb-session-store')(session);
const logger = require('./utils/logger');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');
const messageController = require('./controllers/messageController');
const cookieParser = require('cookie-parser');


const app = express();
const port = 3000;


// Setup cookie parser 
app.use(cookieParser());

// Set up Mustache as the template engine
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Set up session middleware
app.use(
  session({
    secret: 'Nh2m4Ve5FB',
    resave: false,
    saveUninitialized: true,
    store: new NedbStore({
      filename: 'data/sessions.db',
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Set up Helmet middleware
app.use(helmet());

// Set up csrf Protection
const csrfProtection = csrf({ sessionKey: 'session'});
app.use((req, res, next) => {
    if (req.path === '/') {
      // Exclude the landing page route from CSRF protection
      next();
    } else {
      csrfProtection(req, res, next);
    }
  });

// Define routes
app.get('/', (req, res) => {
  res.render('index');
});

// Register routes
app.get('/register', userController.renderRegistrationForm);
app.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  userController.registerUser
);

// Login routes
app.get('/login', csrfProtection, userController.renderLoginForm);
app.post(
  '/login',
  csrfProtection,
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('login', { errors: errors.array(), csrfToken: req.csrfToken() });
    }
    next();
  },
  userController.loginUser
);


// Item routes
app.get('/items', itemController.getAvailableItems);
app.get('/items/create', authMiddleware.isAuthenticated, itemController.renderItemCreationForm);
app.post('/items', authMiddleware.isAuthenticated, itemController.createItem);
app.post('/items/:id/select', authMiddleware.isAuthenticated, itemController.selectItem);

// About Us route
app.get('/about', (req, res) => {
  res.render('about');
});

// Contact Us route
app.get('/contact', (req, res) => {
  res.render('contact');
});
app.post('/contact', messageController.handleContactFormSubmission);

// Admin routes
app.get('/admin/users', authMiddleware.isAuthenticated, authMiddleware.isAdmin, userController.renderUserManagementPage);
app.post('/admin/users/:id/delete', authMiddleware.isAuthenticated, authMiddleware.isAdmin, csrfProtection, userController.deleteUser);
app.get('/admin/items', authMiddleware.isAuthenticated, authMiddleware.isAdmin, itemController.renderItemManagementPage);
app.post('/admin/items/:id/delete', authMiddleware.isAuthenticated, authMiddleware.isAdmin, csrfProtection, itemController.deleteItem);

// Admin dashboard route
app.get('/admin', authMiddleware.isAuthenticated, authMiddleware.isAdmin, (req, res) => {
    res.render('adminDashboard');
  });

// Admin user creation route
app.post(
    '/admin/users',
    authMiddleware.isAuthenticated,
    authMiddleware.isAdmin,
    csrfProtection,
    userController.createUser
  );

  // Admin item creation route
app.post(
    '/admin/items',
    authMiddleware.isAuthenticated,
    authMiddleware.isAdmin,
    csrfProtection,
    itemController.createItem
  );

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
