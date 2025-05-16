const turf = require('@turf/turf');

module.exports = {
  // ກວດສອບຂໍ້ມູນ geometry
  validateGeometry: (geom) => {
    if (!geom || !geom.type || !geom.coordinates) {
      return false;
    }

    try {
      const feature = turf.feature(geom);
      return turf.booleanValid(feature);
    } catch (err) {
      return false;
    }
  },

  // ຄິດໄລ່ພື້ນທີ່ໃນຕາລາງເດີ່ນ
  calculateArea: (geom) => {
    try {
      const feature = turf.feature(geom);
      return turf.area(feature);
    } catch (err) {
      return 0;
    }
  },

  // ປ່ຽນ bbox ເປັນ polygon
  bboxToPolygon: (bbox) => {
    try {
      const [minX, minY, maxX, maxY] = bbox.split(',').map(parseFloat);
      return turf.bboxPolygon([minX, minY, maxX, maxY]);
    } catch (err) {
      return null;
    }
  },

  // ກວດສອບວ່າ geometry ຢູ່ໃນເມືອງທີ່ກຳນົດ
  checkDistrict: async (geom, district) => {
    // ສາມາດເພີ່ມການກວດສອບຕາມຂອບເຂດເມືອງ
    return true;
  }
};