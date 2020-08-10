const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const BarangController = require('../controllers/barangs');

router.get('/', checkAuth, BarangController.barangs_get_all)

module.exports = router;