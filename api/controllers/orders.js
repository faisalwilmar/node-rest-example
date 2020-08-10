const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

exports.orders_get_all = (req, res, next) => {
    Order.find()
        .select('_id product quantity')
        .populate('product', 'name price') //This will join the product _id and populate the return with product info. See "product" in Order's Schema
        .exec()
        .then(docs => {
            console.log(docs);
            const response = {
                count: docs.length,
                orders: docs.map(doc => { //you can pass 'docs' instead but this is how we add metadata, just optional
                    return {
                        _id: doc._id,
                        quantity: doc.quantity,
                        product: doc.product,
                        requestDetail: {
                            type: 'GET',
                            url: "http://localhost:3000/orders/" + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        });
}

exports.orders_get_single = (req, res, next) => {
    const id = req.params.orderId;
    // .select('_id quantity product') this will only take id, quantity, and productId that stored in Orders
    // .populate('product') this will populate the product (which only productId) with product's data, including name and price
    // .populate('product', 'name') if this second argument passed, mongoose will populate with only product's name
    Order.findById(id)
        .select('_id quantity product')
        .populate('product')
        .exec()
        .then(order => {
            if (order) {
                res.status(200).json(order);
            } else {
                res.status(404).json({
                    message: "No result found for provided ID"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        });
}

exports.orders_create_new = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product that you requested did not exist"
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                product: req.body.productId,
                quantity: req.body.quantity
            });
            return order.save();
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        })
        .then(result => {
            res.status(201).json({
                message: "Order stored with ID number " + result._id,
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                requestDetail: {
                    type: 'GET',
                    url: "http://localhost:3000/orders/" + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        });
}

exports.orders_delete_single = (req, res, next) => {
    const id = req.params.orderId;
    Order.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Order with ID " + id + " successfuly deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        });
}