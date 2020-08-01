let mysql = require("mysql");
let db_details = require('./db_con');
//let db_creation = require("./create_db");
//let table_creation = require("./create_table");

class Db_operations{
	constructor(){
		this.host = db_details["host"];
		this.user = db_details['user'];
		this.password = db_details['password'];
		this.database = db_details['database'];
	}

	db_conn (){
		let conn = mysql.createConnection({
			host:this.host,
			user:this.user,
			password:this.password,
			database:this.database,
			multipleStatements:true
		});
		return conn;
	}
 

	get_years(table_name){
		let conn = this.db_conn();
		return new Promise((resolve,reject)=>{
			conn.query(`select * from ${table_name}`,function(err,res){
				if(err){
					reject(err);
				} else {
					resolve(res);
				}
			});
			conn.end();
		});
	}
	get_car_models(table_name){
		let conn = this.db_conn();
		return new Promise((resolve,reject)=>{
			conn.query(`select * from ${table_name}`,function(err,res){
				if(err){
					reject(err);
				} else {
					resolve(res);
				}
			});
			conn.end();
		});
	}
	get_chasse(model_id,year_id){
		let conn = this.db_conn();
		return new Promise((resolve,reject)=>{
			conn.query(` select chasse_name  from car_chasse cc  inner join cars_model cm on cm.id = cc.car_id  inner join model_year my on my.id = cc.year_id where cc.car_id= ${model_id} and cc.year_id= ${year_id};`,function(err,res){
				if(err){
					reject(err);
				} else {
					resolve(res);
				}
			});
			conn.end();
		});
	}
	
}


module.exports = Db_operations;
