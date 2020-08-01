function check_username(){
    //let email_pattern = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/;
    let uname = document.getElementById('mail_id').value;
	event.preventDefault();
    if(uname !== "test@gmail.com"){
        document.getElementById('error_mail').style.display="block";
		document.getElementById('lgn').disabled = true;
    } else {
        document.getElementById('error_mail').style.display="none";
	}
};

function check_pwd(){
    //let pswd_pattern = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    let pwd   = document.getElementById('pswd').value;
	event.preventDefault();
    if (pwd !== "test@123"){
        document.getElementById("error_pwd").style.display="block";
		document.getElementById('lgn').disabled = true;
    } else{
        document.getElementById("error_pwd").style.display="none";
		document.getElementById('lgn').disabled = false;
	}
}

function check_user_type(){
	let type = document.getElementById('userType').value;
	event.preventDefault();
	if(type !==  "admin"){
		document.getElementById('error_type').style.display = "block";
	} else {
		document.getElementById('error_type').style.display = "none";
	}  
}

function check_lgn(){
    //let email_pattern = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/;
    //let pswd_pattern = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    let uname = document.getElementById('mail_id').value;
    let pwd   = document.getElementById('pswd').value;
	let type = document.getElementById('userType').value;
    //if(!(email_pattern.test(uname))){
        //return false;
    //} else if (!(pswd_pattern.test(pwd))){
        //document.getElementById("error_pwd").style.display="block";
        //return false;
	if(uname === "test@gmail.com" && pwd === 'test@123' && type === "admin"){
        let xhr = new XMLHttpRequest();
        //hash.name = CryptoJs.MD5(uname);
        //alert(CryptoJs);
        //hash.pwd = CryptoJs.MD5(pwd);
        //alert(hash);
        event.preventDefault();
        //event.stopPropagation();
        xhr.open('POST','/login',true);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4 && xhr.status == 200){
                location.href="/views/spareParts.html";
            } else if(xhr.readyState==4 && xhr.status == 401){
                document.getElementById("error_details").innerHTML = xhr.responseText;
                document.getElementById("error_details").style.display = "block";
			} 
        };
		xhr.onerror = function(){
			console.log("error occured");
		}
        xhr.send(`username=${uname}&password=${pwd}`);
    } else{
		return false;
	}
	
	
}
