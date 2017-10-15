var express = require('express');
var router = express.Router();
var superagent = require('superagent');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.art');
});


router.post('/getGoogle', function(req, res, next) {

	var betaJSON = {
		code: 200,
		html: '<p style="font-size:40px;color:#333;">): 加载失败，我可能是个假服务器。</p>'
		
	}
	function getGoogleBase(keyword){
		return 'https://www.google.co.jp/search?q='+keyword+'&oq='+keyword+'&aqs=chrome..69i57j69i60l5.988j0j7&sourceid=chrome&ie=UTF-8'
	}

	if(req.body.keyword){

		superagent.get(getGoogleBase(req.body.keyword))
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


