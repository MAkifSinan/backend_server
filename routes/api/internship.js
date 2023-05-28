const express = require('express');
const router = express.Router();
const verifyRoles = require('../../middleware/verifyRoles');
const InternshipController = require('../../controllers/internshipController');
router.route('/')
    .get(InternshipController.getAllInternship) // maybe admin ?
    .post(InternshipController.createnewInternship)
    
    .delete(verifyRoles(), InternshipController.deleteInternship)
    .put( InternshipController.updateInternship); // oluşturulmadı


router.route('/bystudent')
    .get(InternshipController.getInternshipbyStudentName);

router.route('/bycompany')
    .get(InternshipController.getInternshipbyCompanyName);

module.exports = router;