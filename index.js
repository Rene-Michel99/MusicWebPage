const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
var bodyParser = require('body-parser');

var urlencoded = bodyParser.urlencoded({extended:false})

app.use(express.static(path.join(__dirname+"/public")));

router.get('/',function(req,res){
	res.sendFile(path.join(__dirname+"/index.html"));
});

router.get('/login.html',function(req,res){
	res.sendFile(path.join(__dirname+"/login.html"));
});

router.get('/cadastrar.html',function(req,res){
	res.sendFile(path.join(__dirname+"/cadastrar.html"));
});

router.post('/cadastro',urlencoded,function(req,res){
	if(req.body.name != "" && req.body.email != "" && req.body.pass != "" && req.body.confirm_pass != ""){
		if(req.body.pass == req.body.confirm_pass)
			res.sendFile(path.join(__dirname+'/login.html?success'));
		else
			res.redirect('/cadastrar.html?passwd');
	}
	else
		res.redirect('/cadastrar.html?none');
});

router.post('/login',urlencoded,function(req,res){
	if(req.body.email != "" && req.body.passwd != ""){
		console.log(req.body);
	}
	else
		res.redirect('/login.html?none');
});

app.use('/',router);
app.listen(process.env.port || 3000);
console.log('Server iniciado');