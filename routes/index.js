var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var betaJSON = {
	code: 200,
	html: '<p style="font-size:40px;color:#333;">): 加载失败，我可能是个假服务器。</p>'
}

const LocationUrl_Node = 'https://www.google.com.hk';

function getGoogleBase(keyword,start){
	return LocationUrl_Node+'/search?q='+keyword+'&oq='+keyword+'&start='+start+'&aqs=chrome..69i57j69i60l3j69i65l2.956j0j7&sourceid=chrome&ie=UTF-8'
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.art');
});
router.get('/search', function(req, res, next) {
  res.render('index.art',{
  	keyword: req.query.q || '',
  	start: req.query.start || ''
  });
});

router.get('/getGoogle', function(req, res, next) {
	if(req.query.keyword){

		superagent.get(getGoogleBase(req.query.keyword,req.query.start))
				  .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8')
				  .set('Accept-Language', 'zh-CN,zh;q=0.8,en;q=0.6')
				  .set('User-Agent', req.headers['user-agent'] || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Safari/537.36')
				  .end(function(err, data){
			if(err){
				betaJSON.code = 500
			}else{
				betaJSON.html = data.text;
			}
			res.json(betaJSON);
		})		

	}else{

		res.json(betaJSON);

	}

});

module.exports = router;


