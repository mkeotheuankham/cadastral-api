const db = require('../config/db');

module.exports = {
  findByDistrict: async (district, limit = 1000) => {
    const { rows } = await db.query(
      `SELECT id, ST_AsGeoJSON(geom)::json as geometry, land_code, area_size 
       FROM cadastral_parcels 
       WHERE district = $1
       ORDER BY land_code
       LIMIT $2`,
      [district, limit]
    );
    return rows;
  },

  searchByLandCode: async (code, limit = 100) => {
    const { rows } = await db.query(
      `SELECT id, ST_AsGeoJSON(geom)::json as geometry, land_code, area_size, district
       FROM cadastral_parcels 
       WHERE land_code LIKE $1
       ORDER BY land_code
       LIMIT $2`,
      [`%${code}%`, limit]
    );
    return rows;
  },

  // ... methods ອື່ນໆ
};