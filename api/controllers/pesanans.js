const Pesanan = require('../models/pesanan');
const Item = require('../models/item');

exports.pesanans_get_all = (req, res, next) => {
    Pesanan.findAll()
        .then(pesanans => {
            console.log(pesanans);
            const response = {
                count: pesanans.length,
                pesanans: pesanans.map(pesanan => {
                    return {
                        id: pesanan.id,
                        address: pesanan.address,
                        payment: pesanan.payment,
                        createdAt: pesanan.createdAt
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

exports.pesanans_create_new = (req, res, next) => {
    const address = req.body.address;
    const payment = req.body.payment;
    const arrayItems = req.body.items;

    let createdPesanan;

    Pesanan.create({
        address: address,
        payment: payment
    })
        .then(result => {
            createdPesanan = result;
            arrayItems.map(item => {
                Item.findByPk(item.id)
                    .then(result => {
                        if (result) {
                            createdPesanan.addItem(result);
                        }
                    })
                    .catch(err => { console.log(err); });
            });
            res.status(201).json({ result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        });
}

exports.pesanans_get_single = (req, res, next) => {
    const id = req.params.pesananId
    Pesanan.findByPk(id, { include: Item })
        .then(pesanan => {
            if (pesanan) {
                const response = {
                    id: pesanan.id,
                    address: pesanan.address,
                    payment: pesanan.payment,
                    createdAt: pesanan.createdAt,
                    items: pesanan.items.map(item => {
                        return {
                            id: item.id,
                            title: item.title,
                            price: item.price,
                            imageUrl: item.imageUrl,
                            description: item.description
                        }
                    })
                }
                res.status(200).json(response);
            }
            res.status(404).json({
                message: "Item not found"
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        });
}

exports.pesanans_remove_item = (req, res, next) => {
    const itemId = req.params.itemId;
    const pesananId = req.params.pesananId;
    Pesanan.findByPk(pesananId)
        .then(pesanan => {
            return pesanan.getItems({ where: { id: itemId } });
        })
        .then(items => {
            item = items[0];
            return item.Item_Pesanan.destroy();
        })
        .then(result => {
            res.status(200).json({
                message: "Item from Pesenan Removed",
                deletedItems: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        });

}

exports.pesanans_delete_single = (req, res, next) => {
    const id = req.params.pesananId

    Pesanan.findByPk(id)
        .then(pesanan => {
            return pesanan.destroy();
        })
        .then(result => {
            res.status(200).json({
                message: "Pesanan Deleted",
                deletedPesanan: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        });
}