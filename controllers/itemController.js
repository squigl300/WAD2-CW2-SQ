const Item = require('../models/item');

// Get all items
function getAllItems(req, res) {
  Item.getAllItems((err, items) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    res.render('items', { items });
  });
}

// Render the item creation form
function renderItemCreationForm(req, res) {
    res.render('createItem', { csrfToken: req.csrfToken() });
  }
  
  // Handle item creation
  function createItem(req, res) {
    const { name, description, expiryDate } = req.body;
    const userId = req.session.userId;
    const newItem = { name, description, expiryDate, selected: false };
  
    Item.createItem(newItem, userId, (err, item) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      res.redirect('/items');
    });
  }
  
  // Get available items
  function getAvailableItems(req, res) {
    Item.getAvailableItems((err, items) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      res.render('items', { items });
    });
  }
  
 // Select an item
function selectItem(req, res) {
    const itemId = req.params.id;
    const userId = req.session.userId; // Get the user ID from the session
  
    Item.selectItem(itemId, userId, (err, numUpdated) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      res.redirect('/items');
    });
  }
  
// Render the item management page
function renderItemManagementPage(req, res) {
  Item.getAllItems((err, items) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    res.render('itemManagement', { items, csrfToken: req.csrfToken() });
  });
}
  
  // Delete an item
  function deleteItem(req, res) {
    const itemId = req.params.id;
  
    Item.deleteItem(itemId, (err, numRemoved) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      res.redirect('/admin/items');
    });
  }

  // Handle item creation (admin)
function createItem(req, res) {
    const { name, description, expiryDate } = req.body;
    const newItem = { name, description, expiryDate, selected: false };
    Item.createItem(newItem, (err, item) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      res.redirect('/admin/items');
    });
  }
  
  module.exports = {
    getAllItems,
    renderItemCreationForm,
    createItem,
    getAvailableItems,
    selectItem,
    renderItemManagementPage,
    deleteItem,
  };
