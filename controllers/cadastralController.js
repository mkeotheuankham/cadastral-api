const parcelModel = require('../models/parcelModel');
const { apiResponse } = require('../utils/apiResponse');
const { validationResult } = require('express-validator');

module.exports = {
  getPublicByDistrict: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse(res, 400, { errors: errors.array() });
      }

      const { district } = req.params;
      const data = await parcelModel.findByDistrict(district);
      apiResponse(res, 200, data);
    } catch (err) {
      console.error(err);
      apiResponse(res, 500, { error: 'Internal server error' });
    }
  },

  // ... methods ອື່ນໆ
};