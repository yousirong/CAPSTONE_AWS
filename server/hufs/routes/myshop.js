const express = require("express");
const router = express.Router();

const myshop = require("../controllers/myshop");

router.get("/", myshop.myShop);//My shop
router.post("/prog", myshop.businessProgress);//진행상황 업데이트
router.post("/delete", myshop.deleteCollection);//수집된 매장 삭제
router.post("/delete/all", myshop.deleteAll);//수집된 매장 전체 삭제
//router.post("/edit", myshop.edit);//매장 추가

/*
router.("/", myshop.);
*/
module.exports = router;