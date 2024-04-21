const Message = require('../models/message');

// Handle contact form submission
function handleContactFormSubmission(req, res) {
  const { name, email, message } = req.body;
  const newMessage = { name, email, message, date: new Date() };

  Message.createMessage(newMessage, (err, message) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/');
  });
}

module.exports = {
  handleContactFormSubmission,
};
