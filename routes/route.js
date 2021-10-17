const express = require('express')
const router = express.Router();
const fs = require('fs');
const userAccountsRoutes = require('./user-account.js')


router.use(userAccountsRoutes)


module.exports = router;