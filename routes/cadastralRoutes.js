const express = require('express');
const router = express.Router();
const cadastralController = require('../controllers/cadastralController');
const { authenticate, authorize } = require('../middlewares/security');
const { validateDistrict, validateLandCode } = require('../middlewares/validation');

// Public routes
router.get('/public/district/:district', 
  validateDistrict,
  cadastralController.getPublicByDistrict
);

router.get('/public/search/:code',
  validateLandCode,
  cadastralController.searchPublicByLandCode
);

// Protected routes
router.use(authenticate);

router.post('/add', 
  authorize(['admin', 'editor']),
  cadastralController.addParcel
);

// ... routes ອື່ນໆ

module.exports = router;