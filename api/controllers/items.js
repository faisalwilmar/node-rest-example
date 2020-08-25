const Item = require('../models/item');
// const { resource } = require('../../app');

exports.items_get_all = (req, res, next) => {
    Item.findAll()
        .then(items => {
            console.log(items);
            const response = {
                count: items.length,
                items: items.map(item => {
                    return {
                        title: item.title,
                        price: item.price,
                        imageUrl: item.imageUrl,
                        description: item.description
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

exports.items_create_new = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.file.url;
    const description = req.body.description;

    Item.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    })
        .then(result => {
            res.status(201).json({
                message: "Item successfully created",
                createdItem: {
                    id: result.id,
                    title: result.title,
                    price: result.price,
                    imageUrl: result.imageUrl,
                    description: result.description
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

exports.items_get_single = (req, res, next) => {
    const id = req.params.itemId
    Item.findByPk(id)
        .then(item => {
            if (item) {
                const response = {
                    title: item.title,
                    price: item.price,
                    imageUrl: item.imageUrl,
                    description: item.description
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

exports.items_update_single = (req, res, next) => {
    const id = req.params.itemId

    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;

    Item.findByPk(id)
        .then(item => {
            item.title = updatedTitle,
                item.price = updatedPrice,
                item.imageUrl = updatedImageUrl,
                item.description = updatedDescription
            return item.save();
        })
        .then(result => {
            res.status(200).json({
                message: "Item Updated",
                updatedItem: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        });
}

exports.items_delete_single = (req, res, next) => {
    const id = req.params.itemId

    Item.findByPk(id)
        .then(item => {
            return item.destroy();
        })
        .then(result => {
            res.status(200).json({
                message: "Item Deleted",
                deletedItem: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message
            });
        });
}