const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles(), usersController.getAllUsers)
    .delete(verifyRoles(), usersController.deleteUser)
    .put(verifyRoles(),usersController.updateUsertoAdmin);
router.route('/special')
    .get(verifyRoles(), usersController.getUser);

module.exports = router;