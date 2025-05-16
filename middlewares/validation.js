const { check, param } = require('express-validator');

module.exports = {
  validateDistrict: [
    param('district')
      .isString()
      .isIn(['chanthaburi', 'sisattanak', 'sikodtabong', 'saisettha', 
             'saithani', 'hadsaifong', 'naisaithong', 'sangthong', 'pakngum'])
      .withMessage('Invalid district')
  ],

  validateLandCode: [
    param('code')
      .isString()
      .isLength({ min: 3, max: 20 })
      .withMessage('Land code must be 3-20 characters')
  ]
};