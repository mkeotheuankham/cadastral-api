# cadastral-api

1. ໂຄງສ້າງໂປຣເຈັກ

![1  ໂຄງສ້າງໂປຣເຈັກ](https://github.com/user-attachments/assets/31c604a6-af06-491d-8992-2db9311c0499)


2. ຄຸນສົມບັດລະບົບ
2.1 ການຄຸ້ມຄອງຂໍ້ມູນ
- ຂໍ້ມູນທີ່ດິນ: ຈັດການຂໍ້ມູນພື້ນທີ່, ລະຫັດທີ່ດິນ, ເຈົ້າຂອງ

- ຂໍ້ມູນຜູ້ໃຊ້: ຈັດການບັນຊີຜູ້ໃຊ້ ແລະ ສິດທິ

2.2 ຄວາມປອດໄພ
- Authentication: JWT Token

- Authorization: Role-based (Admin, Editor, Viewer)

- Rate Limiting: ຈຳກັດຈຳນວນ Request

- Data Validation: ກວດສອບຂໍ້ມູນກ່ອນບັນທຶກ

2.3 ຄວາມສາມາດ
- ຄົ້ນຫາ: ຕາມເມືອງ, ລະຫັດທີ່ດິນ, ຂອບເຂດພື້ນທີ່

- ລາຍງານ: ບັນທຶກການເຄື່ອນໄຫວ

- ການສະແດງຜົນ: GeoJSON format

3. ການນຳໃຊ້ API
3.1 ການເຂົ້າລະບົບ

   POST /api/auth/login
{
  "username": "admin",
  "password": "yourpassword"
}

3.2 ຂໍ້ມູນທີ່ດິນ (Public)

GET /api/cadastral/public/district/chanthaburi

GET /api/cadastral/public/search/LP123

GET /api/cadastral/public/within?bbox=102.1,17.8,102.2,17.9

3.3 ຂໍ້ມູນທີ່ດິນ (Protected)

POST /api/cadastral/add

PUT /api/cadastral/update/:id

DELETE /api/cadastral/delete/:id

4. ຂໍ້ມູນຕັ້ງຄ່າ
4.1 ຕິດຕັ້ງ Package

   npm install express pg postgis @turf/turf bcryptjs jsonwebtoken helmet cors express-rate-limit express-validator dotenv morgan

4.2 ຕັ້ງຄ່າ PostGIS

CREATE DATABASE lao_cadastral;

CREATE EXTENSION postgis;

5. ຂໍ້ດີຂອງລະບົບ
1. ມາດຕະຖານ: RESTful API ທີ່ສອດຄ່ອງ

2. ຄວາມປອດໄພ: ການຄຸ້ມຄອງສິດທິຢ່າງເຂັ້ມງວດ

3. ປະສິດທິພາບ: Spatial Indexing ແລະ Query Optimization

4. ຄວາມຍືດຫຍຸ່ນ: ສາມາດຂະຫຍາຍພື້ນທີ່ເພີ່ມເຕີມ

ລະບົບນີ້ສາມາດນຳໃຊ້ເພື່ອຈັດການຂໍ້ມູນທີ່ດິນໃນນະຄອນຫຼວງວຽງຈັນ ແລະ ສາມາດປັບປຸງເພີ່ມເຕີມໄດ້ຕາມຄວາມຕ້ອງການ.
