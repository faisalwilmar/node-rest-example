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

exports.post_add_barangs = (req, res, next) => {
    const id = req.body.id;
    const nama_barang = req.body.nama_barang;
    const harga = req.body.harga;

    const barang = new Product(id, nama_barang, harga);
    barang.save()
        .then(result => {
            res.status(201).json({
                message: "Barang successfully created",
                createdBarang: {
                    id: result.id,
                    nama_barang: result.nama_barang,
                    harga: result.harga
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        });
}

exports.barangs_get_single = (req, res, next) => {
    const id = req.params.barangId
    Product.findById(id)
        .then(([barang]) => {
            const response = {
                id: barang[0].id,
                nama_barang: barang[0].nama_barang,
                harga: barang[0].harga
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