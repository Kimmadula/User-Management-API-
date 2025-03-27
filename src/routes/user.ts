// routes/items.js
const express = require('express');
const router = express.Router();

// Sample data stored in an array
let items = [];

// GET request - Retrieve an item by id
router.get('/:id', (req, res) => {
  const itemId = parseInt(req.params.id);

  // Find the item by id
  const item = items.find(item => item.id === itemId);

  if (!item) {
    return res.status(404).send('Item not found');
  }

  res.json(item);
});

// GET request - Retrieve all items
router.get('/', (req, res) => {
  res.json(items);
});

// POST request - Add a new item
router.post('/', (req, res) => {
  const newItem = req.body;

  // Validate that the required fields exist (firstname, lastname, and age)
  if (!newItem.firstname || !newItem.lastname || !newItem.age) {
    return res.status(400).send('Firstname, lastname, and age are required');
  }

  // Validate that age is a number
  if (isNaN(newItem.age)) {
    return res.status(400).send('Age must be a number');
  }

  newItem.id = items.length + 1; // Simple id assignment
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT request - Update an item by id
router.put('/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedData = req.body;

  // Validate that the required fields exist (firstname, lastname, and age)
  if (!updatedData.firstname || !updatedData.lastname || !updatedData.age) {
    return res.status(400).send('Firstname, lastname, and age are required');
  }

  // Validate that age is a number
  if (isNaN(updatedData.age)) {
    return res.status(400).send('Age must be a number');
  }

  // Find the item by id
  const itemIndex = items.findIndex(item => item.id === itemId);

  if (itemIndex === -1) {
    return res.status(404).send('Item not found');
  }

  // Update the item
  items[itemIndex] = { ...items[itemIndex], ...updatedData };
  res.json(items[itemIndex]);
});

// DELETE request - Delete an item by id
router.delete('/:id', (req, res) => {
  const itemId = parseInt(req.params.id);

  // Find the index of the item by id
  const itemIndex = items.findIndex(item => item.id === itemId);

  if (itemIndex === -1) {
    return res.status(404).send('Item not found');
  }

  // Remove the item from the array
  const deletedItem = items.splice(itemIndex, 1);

  res.json({ message: 'Item deleted', item: deletedItem });
});

module.exports = router;
