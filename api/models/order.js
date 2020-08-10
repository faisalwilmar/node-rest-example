const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, //setting up relational with Product (Model name as reference)
    quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model("Order", orderSchema); //for model name, use Uppercase