const Datastore = require('nedb');
const db = new Datastore({ filename: 'data/messages.db', autoload: true });

// Create a new message
function createMessage(message, callback) {
  db.insert(message, callback);
}

module.exports = {
  createMessage,
};
