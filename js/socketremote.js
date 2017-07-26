var sock=null;
var myVar;
var devName;
var LogInStatus;
var serverStatus = 0;
var messagedata = null;
var l1status = 0; var l2status = 0; var k1status = 0; var k2status = 0;
var b1status = 0; var b2status = 0; var r1status = 0; var r2status = 0;
var lpstatus=0; var bpstatus=0; var kpstatus=0; var rpstatus=0;
var h_power = 0; var h_hours=0; 
var ltpower; var lthours; var btpower; var bthours; var ktpower; var kthours; var rtpower; var rthours;
var address = "ws://13.58.235.223:9101";
var socket = new WebSocket(address);

//opening a web socket
//and connecting to the remote address
socket.onopen = function() {
	if (socket) {
		alert(address + " success");
		document.getElementById('localAddress').innerHTML += address;
		sock=socket;
		serverStatus = 1;
		sock.send("*-"+ devName +"-M01-VAN001");  //sends device authentication to the remote server
		l_getstatus(); //function to recieve the appliance status
	}
};
socket.onerror = function(err) {
	if (socket) {
		console.log(address + " error");
	}
}
//function to convert the time into particular format required by the UI
function timeFormat(hours){
	var temphours1 = parseFloat(hours).toFixed(2);
	var temphours = temphours1.toString();
	temphours = temphours.replace(".",":");
	return temphours;
}
//function to convert seconds to hours
function getHours(data){
	return ((data)/3600.00).toFixed(2);
}
//function to convert seconds to minutes
function getMins(data){
	return ((data)/60.00).toFixed(2);
}
//function to convert volts into watts/hour
function getWh(data){
	return ((data)/1000.00).toFixed(2);
}
//function to generate cost based on the units
//the default rate is set to 7rs/unit
function getCost(data){
	return ((data)*7).toFixed(2)	
}

//This function sends a socket to
//every room and gathers the status
function loadPower(){
	sock.send('uLPT4');
	sock.onmessage = function(e){ //the websocket responses are caughts using sock.onmessage()
		var power = e.data.split(",");
		
		if (power[0] == "['l'"){
			l_powerstatus(e.data);
		}
		else if (power[0] =="['b'"){
			b_powerstatus(e.data);
		}
		else if (power[0] == "['k'"){
			k_powerstatus(e.data);
		}
		else if (power[0] =="['r'"){
			r_powerstatus(e.data);
		}	
		h_powerstatus()
	}
}


function l_powerstatus(str){	
	var power = str.split(",");

	var l_temp_str = power[4];
	l_pwr_dev2 = l_temp_str.substring(0, l_temp_str.length - 1);
	
	var l_time_dev1= power[1];
	var l_time_dev2 = power[2];
	var l_pwr_dev1= power[3];

	var l_hour_dev1 = getHours(l_time_dev1);
	var l_mins_dev1 = getMins(l_hour_dev1);
	var l_wh_dev1 = getWh(l_pwr_dev1);
	var l_cost_dev1 = getCost(l_wh_dev1);
	
	var l_hour_dev2 = getHours(l_time_dev2);
	var l_mins_dev2 = getMins(l_time_dev2);
	var l_wh_dev2 = getWh(l_pwr_dev2);
	var l_cost_dev2 = getCost(l_wh_dev2);
	
	var l_hours = parseFloat(l_hour_dev1) + parseFloat(l_hour_dev2);
	var l_power = parseFloat(l_wh_dev1) + parseFloat(l_wh_dev2);

	ltpower = (l_power);
	lthours = (l_hours);
	
	document.getElementById('l_hour').innerHTML = timeFormat(l_hours);
	document.getElementById('l_pwr').innerHTML = l_power.toFixed(2);		

	document.getElementById('l_dev1_cost').innerHTML = l_cost_dev1;
	document.getElementById('l_dev1_time').innerHTML = timeFormat(l_hour_dev1);

	document.getElementById('l_dev2_cost').innerHTML = l_cost_dev2;
	document.getElementById('l_dev2_time').innerHTML = timeFormat(l_hour_dev2);		

	lpstatus =1;
	powerdata_check();
}

function b_powerstatus(str){
	var power = str.split(",");

	var b_temp_str = power[4];
	b_pwr_dev2 = b_temp_str.substring(0, b_temp_str.length - 1);
	
	var b_time_dev1= power[1];
	var b_time_dev2 = power[2];
	var b_pwr_dev1= power[3];

	var b_hour_dev1 = getHours(b_time_dev1);
	var b_mins_dev1 = getMins(b_hour_dev1);
	var b_wh_dev1 = getWh(b_pwr_dev1);
	var b_cost_dev1 = getCost(b_wh_dev1);

	var b_hour_dev2 = getHours(b_time_dev2);
	var b_mins_dev2 = getMins(b_hour_dev2);
	var b_wh_dev2 = getWh(b_pwr_dev2);
	var b_cost_dev2 = getCost(b_wh_dev2);

	var b_hours = parseFloat(b_hour_dev1) + parseFloat(b_hour_dev2);
	var b_power = parseFloat(b_wh_dev1) + parseFloat(b_wh_dev2);
	
	
	btpower = parseFloat(b_power);
	bthours = parseFloat(b_hours);
	
	document.getElementById('b_hour').innerHTML = timeFormat(b_hours);
	document.getElementById('b_pwr').innerHTML = b_power.toFixed(2);		

	document.getElementById('b_dev1_cost').innerHTML = b_cost_dev1;
	document.getElementById('b_dev1_time').innerHTML = timeFormat(b_hour_dev1);

	document.getElementById('b_dev2_cost').innerHTML = b_cost_dev2;
	document.getElementById('b_dev2_time').innerHTML = timeFormat(b_hour_dev2);		

	bpstatus = 1;
	powerdata_check();
}

function r_powerstatus(str){
	var power = str.split(",");

	var r_temp_str = power[4];
	r_pwr_dev2 = r_temp_str.substring(0, r_temp_str.length - 1);
	
	var r_time_dev1= power[1];
	var r_time_dev2 = power[2];
	var r_pwr_dev1= power[3];

	var r_hour_dev1 = getHours(r_time_dev1);
	var r_mins_dev1 = getMins(r_mins_dev1);
	var r_wh_dev1 = getWh(r_pwr_dev1);
	var r_cost_dev1 = getCost(r_wh_dev1);

	var r_hour_dev2 = getHours(r_time_dev2);
	var r_mins_dev2 = getMins(r_time_dev2);
	var r_wh_dev2 = getWh(r_pwr_dev2);
	var r_cost_dev2 = getCost(r_wh_dev2);

	var r_hours = parseFloat(r_hour_dev1) + parseFloat(r_hour_dev2);
	var r_power = parseFloat(r_wh_dev1) + parseFloat(r_wh_dev2);

	rtpower = parseFloat(r_power);
	rthours = parseFloat(r_hours);
	
	document.getElementById('r_hour').innerHTML = timeFormat(r_hours);
	document.getElementById('r_pwr').innerHTML = r_power.toFixed(2);		

	document.getElementById('r_dev1_cost').innerHTML = r_cost_dev1;
	document.getElementById('r_dev1_time').innerHTML = timeFormat(r_hour_dev1);

	document.getElementById('r_dev2_cost').innerHTML = r_cost_dev2;
	document.getElementById('r_dev2_time').innerHTML = timeFormat(r_hour_dev2);		
	
	rpstatus = 1;
	powerdata_check();
}

function k_powerstatus(str){
	var power = str.split(",");

	var k_temp_str = power[4];
	k_pwr_dev2 = k_temp_str.substring(0, k_temp_str.length - 1);
	
	var k_time_dev1= power[1];
	var k_time_dev2 = power[2];
	var k_pwr_dev1= power[3];

	var k_hour_dev1 = getHours(k_time_dev1);
	var k_mins_dev1 = getMins(k_time_dev1);
	var k_wh_dev1 = getWh(k_pwr_dev1);
	var k_cost_dev1 = getCost(k_wh_dev1);

	var k_hour_dev2 = getHours(k_time_dev2);
	var k_mins_dev2 = getMins(k_time_dev2);
	var k_wh_dev2 = getWh(k_pwr_dev2);
	var k_cost_dev2 = getCost(k_wh_dev2);
	
	var k_hours = parseFloat(k_hour_dev1) + parseFloat(k_hour_dev2);
	var k_power = parseFloat(k_wh_dev1) + parseFloat(k_wh_dev2);
			
	document.getElementById('k_hour').innerHTML = timeFormat(k_hours);
	document.getElementById('k_pwr').innerHTML = k_power.toFixed(2);		
	
	
	ktpower = parseFloat(k_power);
	kthours = parseFloat(k_hours);
	
	document.getElementById('k_dev1_cost').innerHTML = k_cost_dev1;
	document.getElementById('k_dev1_time').innerHTML = timeFormat(k_hour_dev1);

	document.getElementById('k_dev2_cost').innerHTML = k_cost_dev2;
	document.getElementById('k_dev2_time').innerHTML = timeFormat(k_hour_dev2);		

	kpstatus =1;
	powerdata_check();
}

//This function check whether the websocket
//has received the statuses of all the rooms.
//If not it sends requests to the particular room.
//This function works alongside loadPower().
function powerdata_check()
{
	if (lpstatus == 0){
		sock.send("uLPT4");
	}
	else if (bpstatus == 0){
		sock.send("uBPT4");
	}
	else if (rpstatus == 0){
		sock.send("uRPT4");
	}
	else if (kpstatus == 0){
		sock.send("uKPT4");
	}
}

//This function performs addition on all the
//values obtained to generate the power and billing
//status of entire home.
function h_powerstatus(){
	h_hours = lthours + bthours + rthours + kthours;
	h_power = ltpower + btpower + rtpower + ktpower;
	document.getElementById('h_hour').innerHTML = timeFormat(h_hours);
	document.getElementById('h_pwr').innerHTML = h_power.toFixed(2);		
	hpstatus =1;
}


function l_getstatus(){
	if(sock){
		sock.send("uLST4");
	}
	
	sock.onmessage = function(e) {
		var array = e.data.split("'"); // Used to split the sock.onmessage() obtained to get power and hour status.
		
		if (e.data[0] == '[')
		{
			if(array[1] == 'F'){
			document.getElementById("l_pendt").style.backgroundImage = 'url("icons/Button-Pendant.png")';	
		    }
			else if(array[1] == 'T'){
			document.getElementById("l_pendt").style.backgroundImage = 'url("icons/Button-Pendant-Active.png")';
			l1status = 1;
			}
		
		
		if(array[3] == 'F'){
			document.getElementById("l_wlight").style.backgroundImage = 'url("icons/Button-Wall.png")';
			}
		else{
			document.getElementById("l_wlight").style.backgroundImage = 'url("icons/Button-Wall-Active.png")';
			l2status = 1;
		}
		}
		
		
		if (e.data[0] != '['){
			hunchres(e.data);
		}
	}
};

function b_getstatus(){
	if(sock){
		sock.send("uBST4");
	}
	sock.onmessage = function(e) {
		var array = e.data.split("'");	
		
		if (e.data[0] == '[')
		{
			if(array[1] == 'F'){
			document.getElementById("b_tlight").style.backgroundImage = 'url("icons/Button-TableLight.png")';
			}else if(array[1] == 'T'){
			document.getElementById("b_tlight").style.backgroundImage = 'url("icons/Button-TableLight-Active.png")';
			b1status = 1;
			}	
		

			if(array[3] == 'F'){
			document.getElementById("b_wlight").style.backgroundImage = 'url("icons/Button-Wall.png")';
			}else{
			document.getElementById("b_wlight").style.backgroundImage = 'url("icons/Button-Wall-Active.png")';
			b2status = 1;
			}
		}
		
		if (e.data[0] != '['){
			hunchres(e.data);
		}
	}
};

function k_getstatus(){
	if(sock){
		sock.send("uKST4");
	}
	
	sock.onmessage = function(e) {
		var array = e.data.split("'");
		
		if (e.data[0] == '['){
			if(array[1] == 'F'){
				document.getElementById("k_pendt").style.backgroundImage = 'url("icons/Button-Pendant.png")';	
			}else if(array[1] == 'T'){
				document.getElementById("k_pendt").style.backgroundImage = 'url("icons/Button-Pendant-Active.png")';
				l1status = 1;
			}
			
			
			if(array[3] == 'F'){
				document.getElementById("k_wlight").style.backgroundImage = 'url("icons/Button-Wall.png")';
			}else{
				document.getElementById("k_wlight").style.backgroundImage = 'url("icons/Button-Wall-Active.png")';
				l2status = 1;
			}
		}
		
		if (e.data[0] != '['){
			hunchres(e.data);
		}
	}
};

function r_getstatus(){
	if(sock){
		sock.send("uRST4");
	}
	sock.onmessage = function(e) {
		var array = e.data.split("'");
		
		if (e.data[0] == '['){		
			if(array[1] == 'F'){
				document.getElementById("r_vlight").style.backgroundImage = 'url("icons/Button-VanityLight.png")';
			}else if(array[1] == 'T'){
				document.getElementById("r_vlight").style.backgroundImage = 'url("icons/Button-VanityLight-Active.png")';
				r1status = 1;
			}
			
			
			if(array[3] == 'F'){
				document.getElementById("r_wlight").style.backgroundImage = 'url("icons/Button-Wall.png")';
			}else{
				document.getElementById("r_wlight").style.backgroundImage = 'url("icons/Button-Wall-Active.png")';
				r2status = 1;
			}
		}
		
		if (e.data[0] != '['){
			hunchres(e.data);
		}
	}
};

//This function handles button image toggling.
//This uses sock.onmessage() status to determine which 
//icon to be used.
function hunchres(state){
	if(messagedata =="L1T4U" || state == "L1T4U"){
				l1status=1;
				document.getElementById("l_pendt").style.backgroundImage = 'url("icons/Button-Pendant-Active.png")';
	}else if(messagedata == "L1F4U" || state == "L1F4U"){
				l1status=0;
				document.getElementById("l_pendt").style.backgroundImage = 'url("icons/Button-Pendant.png")';	
	}else if(messagedata=="L2T4U" || state == "L2T4U"){
				document.getElementById("l_wlight").style.backgroundImage = 'url("icons/Button-Wall-Active.png")';
				l2status=1;
	}else if(messagedata == "L2F4U" || state == "L2F4U"){
				document.getElementById("l_wlight").style.backgroundImage = 'url("icons/Button-Wall.png")';
				l2status=0;
	}else if(messagedata =="K1T4U" || state == "K1T4U"){
				k1status=1;
				document.getElementById("k_pendt").style.backgroundImage = 'url("icons/Button-Pendant-Active.png")';
	}else if(messagedata == "K1F4U" || state == "K1F4U"){
				k1status=0;
				document.getElementById("k_pendt").style.backgroundImage = 'url("icons/Button-Pendant.png")';	
	}else if(messagedata=="K2T4U" || state == "K2T4U"){
				document.getElementById("k_wlight").style.backgroundImage = 'url("icons/Button-Wall-Active.png")';
				k2status=1;
	}else if(messagedata == "K2F4U" || state == "K2F4U"){
				document.getElementById("k_wlight").style.backgroundImage = 'url("icons/Button-Wall.png")';
				k2status=0;
	}	else if(messagedata=="B1T4U" || state == "B1T4U"){
			b1status=1;
			document.getElementById("b_tlight").style.backgroundImage = 'url("icons/Button-TableLight-Active.png")';
	}else if(messagedata== "B1F4U" || state == "B1F4U"){
			b1status=0;
			document.getElementById("b_tlight").style.backgroundImage = 'url("icons/Button-TableLight.png")';	
	}else if(messagedata=="B2T4U" || state == "B2T4U"){
			document.getElementById("b_wlight").style.backgroundImage = 'url("icons/Button-Wall-Active.png")';
			b2status=1;
	}else if(messagedata== "B2F4U" || state == "B2F4U"){
			document.getElementById("b_wlight").style.backgroundImage = 'url("icons/Button-Wall.png")';
			b2status=0;
	}else if(messagedata=="R1T4U" || state == "R1T4U"){
			r1status=1;
			document.getElementById("r_vlight").style.backgroundImage = 'url("icons/Button-VanityLight-Active.png")';
	}else if(messagedata== "R1F4U" || state == "R1F4U"){
			r1status=0;
			document.getElementById("r_vlight").style.backgroundImage = 'url("icons/Button-VanityLight.png")';	
	}else if(messagedata=="R2T4U" || state == "R2T4U"){
			document.getElementById("r_wlight").style.backgroundImage = 'url("icons/Button-Wall-Active.png")';
			r2status=1;
	}else if(messagedata== "R2F4U" || state == "R2F4U"){
			document.getElementById("r_wlight").style.backgroundImage = 'url("icons/Button-Wall.png")';
			r2status=0;
	}	
}	

/*----- LIVING ROOM ------*/
//These function sends on/off function
//to the Hunch using sock.send()
 function l1() { 
	if (sock) {
			if(l1status == 0){				
				sock.send("uL1T4");
	}else{
				sock.send("uL1F4");
	}
	} else {
	   alert("Not connected.");
	}
	
	
	sock.onmessage = function(e) {
		messagedata = e.data;
		hunchres();
	}
};

 function l2() {
	if (sock) {
		if(l2status == 0){				
			sock.send("uL2T4");
		}else{
			sock.send("uL2F4");
		}
	} else {
	   alert("Not connected.");
	}
	
	
	sock.onmessage = function(e) {
		messagedata = e.data;
		hunchres();
	}
 };

/*----- KITCHEN ------*/
 function k1() { 
	if (sock) {
			if(k1status == 0){				
				sock.send("uK1T4");
	}else{
				sock.send("uK1F4");
	}
	} else {
	   alert("Not connected.");
	}
	
	
	sock.onmessage = function(e) {
		messagedata = e.data;
		hunchres();
	}
};

 function k2() {
	if (sock) {
		if(k2status == 0){				
			sock.send("uK2T4");
		}else{
			sock.send("uK2F4");
		}
	} else {
	   alert("Not connected.");
	}
	
	
	sock.onmessage = function(e) {
		messagedata = e.data;
		hunchres();
	}
 };
 
/*-------- BedRoom-----------*/
function b1() {
	if (sock) {
		if(b1status == 0){				
			sock.send("uB1T4");
		}else{
			sock.send("uB1F4");
		}
	} else {
	   alert("Not connected.");
	}
	
	sock.onmessage = function(e) {
		messagedata = e.data;
		hunchres();
	}
 };
	
	
 function b2() {
	if (sock) {
		if(b2status == 0){				
			sock.send("uB2T4");
		}else{
			sock.send("uB2F4");
		}
	} else {
	   alert("Not connected.");
	}
	
	sock.onmessage = function(e) {
		messagedata = e.data;
		hunchres();
	} 
};
  
   
/*-------- Rest Room--------*/
function r1() {
	if (sock) {
		if(r1status == 0){				
			sock.send("uR1T4");
		}else{
			sock.send("uR1F4");
		}
	} else {
	   alert("Not connected.");
	}
	
	sock.onmessage = function(e) {
		messagedata = e.data;
		hunchres();
	} 
 };
	
	
 function r2() {
	if (sock) {
		if(r2status == 0){				
			sock.send("uR2T4");
		}else{
			sock.send("uR2F4");
		}
	} else {
	   alert("Not connected.");
	}
	
	sock.onmessage = function(e) {
		messagedata = e.data;
		hunchres();
	} 
 };
//This onload function checks whether the device
//has previously logged in. If not it directs to
//addDname.html. This page contains device login page.
 window.onload = function() {  
		LogInStatus = localStorage.getItem("LoggedIn");
		devName = localStorage.getItem("devName");
		if(LogInStatus != 1){
			alert("Device Not Found");
			window.location.replace("addDname.html");
		}
 }
