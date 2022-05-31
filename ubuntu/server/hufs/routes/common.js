const express = require("express");
const router = express.Router();
const common = require("../controllers/common");

router.get("/ping", common.ping);
router.post("/login", common.login);//로그인
router.get("/logout", common.logout);//logout
router.post("/register", common.register);//회원가입
router.post("/detail", common.detail);//상세페이지
router.get("/user", common.user);//유저 데이터
/*
router.("/", common.);
*/
module.exports = router;
