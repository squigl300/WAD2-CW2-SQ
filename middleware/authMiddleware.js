function isAuthenticated(req, res, next) {
    if (req.session.userId) {
      next();
    } else {
      res.redirect('/login');
    }
  }
  
  function isAdmin(req, res, next) {
    if (req.session.isAdmin) {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  }
  
  module.exports = {
    isAuthenticated,
    isAdmin,
  };
  