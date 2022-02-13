const express = require('express');
const router = express.Router();
const controllers= require('../controllers/userControllers')


router.get('/',controllers.home)
router.post('/submit',controllers.submitLink)
router.get('/history',controllers.linksHistory)
router.post('/favoriteStatus',controllers.favoriteStatus)
module.exports = router;