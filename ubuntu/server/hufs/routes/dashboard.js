const express = require('express')
const router = express.Router()
const dashboard = require('../controllers/dashboard')

router.get('/', dashboard.dashboard) //로그인후 대시보드 들오왔을때 최근검색매장에 출력되는 100개 데이터
router.get('/brief', dashboard.brief) // 매장 전체 통계 데이터불러오기
router.post('/query', dashboard.queryList) //매장목록 쿼리post
router.post('/collect', dashboard.collectStore) //매장 수집post
router.post('/cat_1', dashboard.cat_1) //1차 카테고리 목록post
router.post('/cat_2', dashboard.cat_2) //2차 카테고리 목록post
router.post('/cat_3', dashboard.cat_3) //3차 카테고리 목록post
router.post('/addr_1', dashboard.addr_1) //1차 지역 목록post
router.post('/addr_2', dashboard.addr_2) //2차 지역 목록post
router.post('/addr_3', dashboard.addr_3) //3차 지역 목록post
/*
router.("/", dashboard.);
*/
module.exports = router
