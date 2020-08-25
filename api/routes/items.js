const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const ItemController = require('../controllers/items');

router.get('/', ItemController.items_get_all)

router.post('/', checkAuth, ItemController.items_create_new)

router.get('/:itemId', ItemController.items_get_single)

router.put('/:itemId', checkAuth, ItemController.items_update_single)

router.delete('/:itemId', checkAuth, ItemController.items_delete_single)

module.exports = router;