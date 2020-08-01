function location_match(){
	let ent_loc = document.getElementById('user_loc').value;
	if(ent_loc.toLocaleLowerCase() !== "mumbai"){
		document.getElementById("error_loc").style.display = "block";
	} else{
		 document.getElementById("error_loc").style.display = "none";
		load_car_models();
	}
}







function load_car_models(){
    let xhr = new XMLHttpRequest();
    event.preventDefault();
    event.stopPropagation();
    xhr.open("GET", "/api/models", true);
    xhr.onreadystatechange = function(){
        if((xhr.readyState==4) && (xhr.status==200)){
            let res = JSON.parse(xhr.responseText);
            load_models('cars_info',res);
			load_year_made();
        }  
    }
    xhr.onerror = function(){
        console.log("Error occured in users");
    }
    xhr.send();
}
function load_models(id,res){
	let main_ele = document.getElementById(id); 	
	main_ele.style.display = "block";
	let sel_child = main_ele.children;
	if(sel_child.length > 0 && res.length == sel_child.length){
		for(let kk = 0; kk< sel_child.length; kk++){
			sel_child[kk].value = res[kk].id;
			sel_child[kk].innerHTML = res[kk].name;
		}
	}
}

function load_year_made(){
	let xhr = new XMLHttpRequest();
    event.preventDefault();
    event.stopPropagation();
    xhr.open("GET", "/api/years", true);
    xhr.onreadystatechange = function(){
        if((xhr.readyState==4) && (xhr.status==200)){
            let res = JSON.parse(xhr.responseText);
            load_models('year_info',res);
			document.getElementById('cars_info').onclick = load_chasse;
		}
    }
    xhr.onerror = function(){
        console.log("Error occured in users");
    }
    xhr.send();

}

function load_chasse(){
	let xhr = new XMLHttpRequest();
	let id1 = document.getElementById('cars_info').value;	
	let id2 = document.getElementById('year_info').value;	
	let params = `id1=${id1}&id2=${id2}`;
	if(id1 && id2){
    	event.preventDefault();
    	event.stopPropagation();
    	xhr.open("GET", "/api/find_chasse"+"?"+params, true);
    	xhr.onreadystatechange = function(){
			if((xhr.readyState==4) && (xhr.status==200)){
				let res = JSON.parse(xhr.responseText);
				document.getElementById('chasse_info').innerHTML = res[0].chasse_name;
				alert("Spare part found...")
			}       
		}
		xhr.onerror = function(){
			console.log("Error occured in users");
		}
		xhr.send();
	} else {
		alert("select option from drop box");
	}
}
