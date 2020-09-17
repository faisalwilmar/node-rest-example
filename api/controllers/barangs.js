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
            res.status(400).json({
                message: err.message
            })
        });
}

exports.post_add_barangs = async (req, res, next) => {
    const id = req.body.id;
    const nama_barang = req.body.nama_barang;
    const harga = req.body.harga;

    if (id == undefined || nama_barang == undefined || harga == undefined) {
        const error = new Error();
        error.message = "Request Body Incomplete";
        throw error;
    }

    const barang = new Product(id, nama_barang, harga);
    try {
        const result = await barang.saveTransac();
        if (result) {
            res.status(201).json({
                message: "Barang successfully created",
                createdBarang: {
                    id: id,
                    nama_barang: nama_barang,
                    harga: harga
                }
            })
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }

    // barang.save()
    //     .then(result => {
    //         res.status(201).json({
    //             message: "Barang successfully created",
    //             createdBarang: {
    //                 id: id,
    //                 nama_barang: nama_barang,
    //                 harga: harga
    //             }
    //         })
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         err.status = 500;
    //         throw err;
    //     });
}

exports.barangs_get_single = (req, res, next) => {
    const id = req.params.barangId
    Product.findById(id)
        .then(([barang]) => {
            if (barang[0] == undefined) {
                const error = new Error();
                error.status = 404;
                error.message = "Barang not found";
                throw error;
            }

            const response = {
                id: barang[0].id,
                nama_barang: barang[0].nama_barang,
                harga: barang[0].harga
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                message: err.message
            })
        });
}