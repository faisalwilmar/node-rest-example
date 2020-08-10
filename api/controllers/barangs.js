const Product = require('../models/barang');

exports.barangs_get_all = (req, res, next) => {
    Product.fetchAll()
    .then(([rows, metaData]) => {
        console.log(rows);
        const response = {
            count: rows.length,
            barangs: rows.map(barang => {
                return {
                    id: barang.id,
                    name: barang.nama_barang,
                    price: barang.harga
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