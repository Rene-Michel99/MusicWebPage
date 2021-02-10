const express = require('express');
require('dotenv').config({path: __dirname + '/.env'});
const app = express();
const path = require('path');
const router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect(process.env["DATABASE"],{ useNewUrlParser: true,useUnifiedTopology:true }).then(()=>{
	console.log("MongoDB conectado!");
}).catch((err)=>{
	console.log("Error: "+err);
});

const User = mongoose.Schema({
	email:{
		type:String
	},
	name:{
		type:String
	},
	passwd:{
		type:String
	},
	birthday:{
		type:String
	},
	gender:{
		type:String
	}
});

mongoose.model('usuarios',User);


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
	console.log(req.body);
	var verify = true;
	const user = mongoose.model('usuarios');

	user.findOne({ 'email': req.body.email }, function (err, person) {
	  if (err) return handleError(err);
	  
	  console.log(person);
	  if(person == null){
	  	var date = req.body.day+"/"+req.body.month+"/"+req.body.year;
		new user({
			name:req.body.name,
			email:req.body.email,
			passwd:req.body.pass,
			birthday:date,
			gender:req.body.gender
		}).save().then(()=>{
			console.log("Usuário cadastrado com sucesso!");
		}).catch((err)=>{
			console.log("Error:"+err);
		})
		
		res.redirect('/login.html?success');
	  }
	  else
	  	res.redirect("/cadastrar.html?exists");
	});
		
});

router.post('/login',urlencoded,function(req,res){
	console.log(req.body);
	const user = mongoose.model('usuarios');

	user.findOne({"email":req.body.email,"passwd":req.body.passwd},function(err,person){
		if (err) return handleError(err);

		console.log(person);
		if(person != null)
			res.sendFile(path.join(__dirname+"/musicply.html"));
		else
			res.redirect("/login.html?wrong_account");
	})
});

app.use('/',router);
app.listen(process.env.port || 3000);
console.log('Server iniciado');