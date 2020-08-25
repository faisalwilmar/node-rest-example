const express = require('express');
const router = express.Router();

const ItemController = require('../controllers/items');

const checkAuth = require('../middleware/check-auth');

const multer = require('multer')
const MulterAzureStorage = require('multer-blob-storage').MulterAzureStorage;
// https://www.npmjs.com/package/multer-blob-storage

const azureStorage = new MulterAzureStorage({
    connectionString: process.env.AZURE_BLOB_CONN_STRING,
    accessKey: process.env.AZURE_BLOB_KEY,
    accountName: 'nodejstrials',
    containerName: 'items',
    metadata: '{author: noderesttrial}',
    containerAccessLevel: 'blob',
    urlExpirationTime: 60
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: azureStorage,
    limits: {
        fileSize: 1024 * 1204 * 5
    },
    fileFilter: fileFilter
});



router.get('/', ItemController.items_get_all)

router.post('/', checkAuth, upload.single('itemImage'), ItemController.items_create_new)

router.get('/:itemId', ItemController.items_get_single)

router.put('/:itemId', checkAuth, ItemController.items_update_single)

router.delete('/:itemId', checkAuth, ItemController.items_delete_single)

module.exports = router;