"use strict"
let mysql = require('mysql');
let conn;
let db_name;
let table_name = "users"; 
function conn_db(){
	conn = mysql.createConnection({
			user:"root",
			host:"localhost",
			password:"test",
			database:"spareparts",
			multipleStatements:true
		});
	return conn
}


function get_years(){
	let conn = conn_db();
	conn.query(` select * from ${'model_year'}`,function(err,res){
		if(err){
			console.log(err);
		} else {
			console.log(res);
		}
	});
	conn.end();
}

function get_cars_model(){
	let conn = conn_db();
	conn.query(` select * from ${'car_chasse'}`,function(err,res){
		if(err){
			console.log(err);
		} else {
			console.log(res);
		}
	});
	conn.end();
}

function get_chasse(){
	let conn = conn_db();
	conn.query(` select chasse_name from  car_chasse cc  inner join cars_model cm on cm.id = cc.car_id  inner join model_year my on my.id = cc.year_id where cc.car_id=1 and cc.year_id=1;`,function(err,res){
		if(err){
			console.log(err);
		} else {
			console.log(res);
		}
	});
	conn.end();
}

//get_years();
//get_cars_model() 
get_chasse();
