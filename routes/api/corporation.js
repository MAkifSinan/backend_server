const express = require('express');
const router = express.Router();
const verifyRoles = require('../../middleware/verifyRoles');
const corporationController = require('../../controllers/corporationController');
router.route('/')
    .get(corporationController.getAllCorporation)
    .post(corporationController.createnewCorporation)
    .delete(verifyRoles(), corporationController.deleteCorporation)
    .put(verifyRoles(), corporationController.updateCorporation);


router.route('/reachcorp')
    .get(corporationController.getCorporation);

module.exports = router;