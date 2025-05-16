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


ຕົວຢ່າງໄຟລ໌ .env ສຳລັບໂຄງການ Cadastral API

![ENV](https://github.com/user-attachments/assets/8b09a9db-0cb4-4618-9249-4acfbd991fdf)


ຄຳອະທິບາຍຕົວແປຕ່າງໆ:
1. ການຕັ້ງຄ່າຖານຂໍ້ມູນ:

- DB_HOST: ເຊີບເວີຖານຂໍ້ມູນ

- DB_PORT: ພອດຖານຂໍ້ມູນ (ໂດຍປົກກະຕິ 5432 ສຳລັບ PostgreSQL)

- DB_USER ແລະ DB_PASSWORD: ຂໍ້ມູນການເຂົ້າລະບົບ

2. ການຕັ້ງຄ່າ JWT:

- JWT_SECRET: ລະຫັດລັບສຳລັບການເຮັດວຽກຂອງ Token

- JWT_EXPIRES_IN: ເວລາຫມົດອາຍຸຂອງ Token (8h = 8 ຊົ່ວໂມງ)

3. ການຕັ້ງຄ່າເຊີບເວີ:

- PORT: ພອດທີ່ເຊີບເວີຈະໃຊ້

- NODE_ENV: ສະພາບແວດລ້ອມ (development/production)

4. ການຕັ້ງຄ່າ CORS:

- ສຳລັບການພັດທະນາແອັບພລິເຄຊັນເວັບໄຊທ໌ທີ່ເຂົ້າເຖິງ API

5. ການຕັ້ງຄ່າ Rate Limiting:

- ຈຳກັດຈຳນວນ request ຕໍ່ IP

6. ການຕັ້ງຄ່າເມືອງ:

- ລາຍຊື່ເມືອງທີ່ຮອງຮັບ

7. ການຕັ້ງຄ່າຜູ້ໃຊ້ເບື້ອງຕົ້ນ:

- ຂໍ້ມູນຜູ້ໃຊ້ admin ເບື້ອງຕົ້ນ

