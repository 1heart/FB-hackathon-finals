var express = require('express');
var app = express();
var bodyParser = require('body-parser'); 

app.get('/', function(req, res) {
	res.send('hello world');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider());

/* GET home page. */
app.get('/', function(req, res, next) {

	res.send({"names" : web3.eth.accounts});
});

app.post('/putVideo', function(req, res) {
	var video = req.body.videoHashes;
	var url = req.body.url;
	var redirect = req.body.redirect;

	var ret = {};
	var hash = web3.eth.sendTransaction({
		from: web3.eth.accounts[0],
		to: web3.eth.accounts[0],
		data: video
	}, function(error, address){
		if (error) {
			console.log(error);
		} else {
			if (putVideo(address, video) && putUrl(address, url)
					&& putRedirect(address, redirect)) {
				res.send({"addr": address});
			} else {
				res.send({"status":"failed"});
			}
		}
	});
});

app.get('/getAllData', function(req, res){
	var trans_list = web3.eth.getBlock('pending').transactions;
	var ret = [];

	for (var i = 0; i<trans_list.length; i++) {
		var h = trans_list[i];
		var ob = getUrl(h);
		var rb = getVideo(h);
		var sb = getRedirect(h);
		var tm = {
			redirect: sb,
			videoHash: rb,
			srcurl: ob
		};
		ret.push(tm);
	}

	res.send({"data": ret});
});


function putVideo(hash, str) {
	return web3.db.putString('test', hash, str);
}

function putUrl(hash, str) {
	return web3.db.putString('url', hash, str);
}

function putRedirect(hash, str) {
	return web3.db.putString('redirect', hash, str);
}

function getVideo(hash) {
	return web3.db.getString('test', hash);
}

function getUrl(hash) {
	return web3.db.getString('url', hash);
}

function getRedirect(hash) {
	return web3.db.getString('redirect', hash);
}

var server = app.listen(3000,"0.0.0.0", function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});

