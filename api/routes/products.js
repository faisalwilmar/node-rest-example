const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/products');

const checkAuth = require('../middleware/check-auth');

const multer = require('multer'); //allow us to accept file. Just like body parser but Form-Data body
//For Azure Blob Storage, use multer-azure https://developer.aliyun.com/mirror/npm/package/multer-azure-blob

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/'); //define where the file will be stored
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname); //this will use date as file name so it will be unique, and replace : with - since windows doesnt accept :
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false); //null means no throwback error, just ignore it
    }
}

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1204 * 5
    },
    fileFilter: fileFilter
}); //start the multer and define which storage strategy to use

const Product = require('../models/product');

router.get('/', ProductController.products_get_all) //this will be /products, coz /products already mentioned in app.js middleware

router.post('/', checkAuth, upload.single('productImage'), ProductController.products_create_new) //upload.single will be executed first before products_create_new. productImage is the field name for file

router.get('/:productId', ProductController.products_get_single)

router.patch('/:productId', checkAuth, ProductController.products_patch_single)

router.delete('/:productId', checkAuth, ProductController.products_delete_single)

module.exports = router;