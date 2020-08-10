const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');

router.get('/', checkAuth, OrdersController.orders_get_all) //this will be /orders, coz /orders already mentioned in app.js middleware

router.post('/', checkAuth, OrdersController.orders_create_new)

router.get('/:orderId', checkAuth, OrdersController.orders_get_single)

router.delete('/:orderId', checkAuth, OrdersController.orders_delete_single)

module.exports = router;