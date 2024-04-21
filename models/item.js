const Datastore = require('nedb');
const db = new Datastore({ filename: 'data/items.db', autoload: true });

// Create a new item
function createItem(item, callback) {
  db.insert(item, callback);
}

// Get all items
function getAllItems(callback) {
  db.find({}, callback);
}

// Create a new item with user information
function createItem(item, userId, callback) {
    const newItem = { ...item, userId };
    db.insert(newItem, callback);
  }
  
  // Get all available items
  function getAvailableItems(callback) {
    db.find({ selected: false, expiryDate: { $gt: new Date() } }, callback);
  }
  
  // Select an item
function selectItem(itemId, userId, callback) {
    db.update(
      { _id: itemId, selected: false },
      { $set: { selected: true, userId: userId } },
      {},
      callback
    );
  }
  
  // Delete an item
function deleteItem(itemId, callback) {
    db.remove({ _id: itemId }, {}, callback);
  }
  
  module.exports = {
    createItem,
    getAllItems,
    getAvailableItems,
    selectItem,
    deleteItem,
  };
  
