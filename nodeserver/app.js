var express = require('express');
var app = express();

rser = require('body-parser');

app.get('/', function(req, res) {
	res.send('hello world');
});

Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res, next) {

	res.send({"names" : web3.eth.accounts});
});

app.post('/transaction', function(req, res) {
	var video = req.body.huge_string;
	console.log(web3.eth.accounts[0]);

	var ret = {};
	var hash = web3.eth.sendTransaction({
		from: web3.eth.accounts[0],
		to: web3.eth.accounts[0],
		data: video
	}, function(error, address){
		if (error) {
			console.log(error);
		} else {
			if (putString(address, video)) {
				res.send({"addr": address});
			} else {
				res.send({"status":"failed"});
			}
		}
	});
});

app.get('/gethashes', function(req, res){
	var trans_list = web3.eth.getBlock('pending').transactions;
	var ret = [];

	for (var i = 0; i<trans_list.length; i++) {
		var h = trans_list[i];
		ret.push(getString(h));
	}

	res.send({"hash_list": ret});
});


function putString(hash, str) {
	return web3.db.putString('test', hash, str);
}

function getString(hash) {
	return web3.db.getString('test', hash);
}

var server = app.listen(3000,"0.0.0.0", function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
