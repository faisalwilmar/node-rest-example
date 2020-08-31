const mongoose = require('mongoose');
const Product = require('../models/product');

const CacheConnector = require('../util/cache-connector');

exports.products_get_all = async (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 3;
    let totalProducts;
    let docs;

    try {
        totalProducts = await Product.find().countDocuments();
        docs = await Product.find()
            .skip((currentPage - 1) * perPage)
            .limit(perPage);
        // pagination applied
        
        const cacheConnector = new CacheConnector();
        await cacheConnector.setValue(`productsPage:${currentPage}`, JSON.stringify(docs),3600);
        await cacheConnector.setValue('totalProducts', totalProducts,3600);

        const response = {
            totalProducts: totalProducts,
            products: docs.map(doc => { //you can pass 'docs' instead but this is how we add metadata, just optional
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    productImage: doc.productImage,
                    requestDetail: {
                        type: 'GET',
                        url: "http://localhost:3000/products/" + doc._id
                    }
                }
            })
        }
        res.status(200).json(response);
    } catch (err) {
        throw err;
    }
}

exports.products_get_single = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('name price _id productImage')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
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

exports.products_create_new = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product.save().then(result => {
        res.status(201).json({
            message: "Product successfully created",
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                productImage: result.productImage,
                requestDetail: {
                    type: 'GET',
                    url: "http://localhost:3000/products/" + result._id
                }
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

exports.products_patch_single = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    // PATCH request must be like this!!! It will update only the properties that need to be updated. It won't add new properties if the properties isn't available
    // [ 
    //     { "propName": "price", "value": "150000" }
    // ]
    Product.update({ _id: id }, updateOps)
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Product with ID " + id + " successfuly updated"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        });
}

exports.products_delete_single = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Product with ID " + id + " successfuly deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        });
}