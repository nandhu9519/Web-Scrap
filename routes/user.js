const express = require('express');
const router = express.Router();
const controllers= require('../controllers/userControllers')

router.get('/',controllers.home)
router.post('/submit',controllers.submitLink)
router.get('/history',controllers.linksHistory)
router.patch('/favoriteStatus',controllers.favoriteStatus)
router.delete('/deleteHistory',controllers.deleteRecord)

module.exports = router;