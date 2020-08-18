const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const BarangController = require('../controllers/barangs');

router.get('/', checkAuth, BarangController.barangs_get_all)
router.post('/', checkAuth, BarangController.post_add_barangs)
router.get('/:barangId', BarangController.barangs_get_single)

module.exports = router;