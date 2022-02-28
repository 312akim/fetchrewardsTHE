const express = require('express');
const router = express.Router();
const pointController = require('../controllers/pointsController');

router.post('/addTransaction', pointController.addTransaction);
router.post('/spendPoints', pointController.spendPoints);

router.get('/returnPoints', pointController.returnPoints);

module.exports = router;