const client = require('../util/redis');

exports.cache_products = (req, res, next) => {
    const currentPage = req.query.page || 1;
    let totalProducts, docs = null;

    client.get(`productsPage:${currentPage}`, function (err, reply) {
        if (err) {
            throw err;
        }

        docs = JSON.parse(reply);
    });

    client.get('totalProducts', function (err, reply) {
        if (err) {
            throw err;
        }

        totalProducts = reply;
    });

    if (totalProducts !== null && docs !== null) {
        const response = {
            totalProducts: totalProducts,
            products: docs.map(doc => { 
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
    } else {
        next();
    }
}