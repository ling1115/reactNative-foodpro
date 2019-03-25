var express = require('express');
var router = express.Router();
var foodlist = require('../index.json')
var hotlist = require('../hotlist.json')
var category = require('../categorylist.json')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 写美食请求数据接口
router.get('/food',(req,res,next)=>{
  res.json(foodlist)
})
// 分类接口
router.get('/category',(req,res,next)=>{
  res.json(category)
})
// 热门接口
router.get('/hotlist',(req,res,next)=>{
  res.json(hotlist)
})

module.exports = router;
