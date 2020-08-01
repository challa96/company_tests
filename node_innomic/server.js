let express = require('express');
const Db_operations = require('./db_operations');
let app = express();
let bodyParser = require('body-parser');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt'); 
const saltRounds = 10;


//app.set('views',path.join(__dirname,'views'));

/*         Database connection                */

let db_oprs = new Db_operations(); 

function compare_inputs(val1,val2,db_val1,db_val2){
	let res1 = bcrypt.compareSync(val1,db_val1);
	let res2 = bcrypt.compareSync(val2,db_val2);
	if(res1 && res2){
		return true;
	} else {
		return false;
	}
}


//app.use(bodyParser.json({
	//inflate:true,
	//limit:'100kb',
	//type:'*/*',
	//strict:false
//}));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,'public')));

router.get('/',function(req,res){
	res.sendFile(path.join(__dirname,"index.html"));
});






router.post('/login',async function(req,res,next){
	let uname = req.body.username;
	let pwd = req.body.password;

	if(uname === "test@gmail.com" && pwd === "test@123"){
		res.json({"message":"success"});
	} else{
		res.status(401).send("wrong crediantials");
	} 
	
});



router.get("/api/years",async function (req,res){
	try{
		let results = await db_oprs.get_years('model_year');
		res.send(results);
	} catch(e){
		res.status(502).send("Bad gateway");	
	}	
});

router.get("/api/models", async function(req,res){
	try{
		let results = await db_oprs.get_car_models("cars_model");
		res.send(results);
	} catch(e){
		res.status(502).send("bad gateway");
	}
});

router.get('/api/find_chasse', async function(req,res){
	console.log(req.query)
	let id1  = req.query.id1;
	let id2 = req.query.id2;
	try{
		let result = await db_oprs.get_chasse(id1,id2) 
		res.send(result);
	} catch(e){
		console.log(e);
		res.status(502).send("bad gateway");
	} 
});





app.use('/',router);

app.listen("4000",function(err,msg){
	console.log("http://www.localhost:4000/");
});



