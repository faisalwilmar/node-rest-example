const CacheConnector = require('../util/cache-connector');
// https://dzone.com/articles/a-brief-introduction-to-caching-with-nodejs-and-re

exports.cache_products = async (req, res, next) => {
    const currentPage = req.query.page || 1;

    const connector = new CacheConnector();

    const docs = await connector.getValue(`productsPage:${currentPage}`);
    const totalProducts = await connector.getValue('totalProducts');

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