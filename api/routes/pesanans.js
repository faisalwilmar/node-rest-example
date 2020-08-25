const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const PesananController = require('../controllers/pesanans');

router.get('/', PesananController.pesanans_get_all)

router.post('/', checkAuth, PesananController.pesanans_create_new)

router.get('/:pesananId', PesananController.pesanans_get_single)

router.delete('/item/:pesananId/:itemId', checkAuth, PesananController.pesanans_remove_item)

router.delete('/:pesananId', checkAuth, PesananController.pesanans_delete_single)

module.exports = router;