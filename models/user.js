const Datastore = require('nedb');
const db = new Datastore({ filename: 'data/users.db', autoload: true });

// Create a new user
function createUser(user, callback) {
  db.insert(user, callback);
}

// Find a user by email
function findUserByEmail(email, callback) {
  db.findOne({ email }, callback);
}

// Get all users
function getAllUsers(callback) {
    db.find({}, callback);
  }
  
  // Delete a user
  function deleteUser(userId, callback) {
    db.remove({ _id: userId }, {}, callback);
  }
  
 // Find a user by ID
function findUserById(userId, callback) {
    db.findOne({ _id: userId }, callback);
  }
  
  module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
    getAllUsers,
    deleteUser,
  };
