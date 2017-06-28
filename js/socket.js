var sock=null;
function findServers(port, ipBase, ipLow, ipHigh, maxInFlight, timeout, cb) {
    var ipCurrent = +ipLow, numInFlight = 0, servers = [];
    ipHigh = +ipHigh;

    function tryOne(ip) {
        ++numInFlight;
        var address = "ws://" + ipBase + ip + ":" + port;
        var socket = new WebSocket(address);
        var timer = setTimeout(function() {
            console.log(address + " timeout");
            var s = socket;
            socket = null;
            s.close();
            --numInFlight;
            next();
        }, timeout);
        socket.onopen = function() {
            if (socket) {
                alert(address + " success");
				sock=socket;
                clearTimeout(timer);
                servers.push(socket.url);
				--numInFlight;
                next();
            }
        };
        socket.onerror = function(err) {
            if (socket) {
                console.log(address + " error");
                clearTimeout(timer);
                --numInFlight;
                next();
            }
        }
    }

    function next() {
        while (ipCurrent <= ipHigh && numInFlight < maxInFlight) {
            tryOne(ipCurrent++);
        }
        // if we get here and there are no requests in flight, then
        // we must be done
        if (numInFlight === 0) {
            console.log(servers);
            cb(servers);
        }
    }

    next();
}

window.onload = function() {
	findServers(9000, "192.168.1.", 1, 20, 255, 4000, function(servers) {
    console.log(servers);
	});
}


/*----- LIVING ROOM ------*/
 function l1() {
	var msg = document.getElementById("l_pendt").name;
	//alert(msg);
	if (sock) {
		if(status == 0){				
			sock.send("L1T4");
			document.getElementById("l_pendt").style.backgroundImage = 'url("icons/Button-Pendant-Active.png")';
			//status = 1;
		}else{
			sock.send("L1F4");
			document.getElementById("l_pendt").style.backgroundImage = 'url("icons/Button-Pendant.png")';			
			//status = 0;
		}
	   //alert("Sent: " + msg);
	} else {
	   alert("Not connected.");
	}
	
	sock.onmessage = function(e) {
		alert("Got echo: " + e.data);
		if(e.data == "L1T4U" || e.data== "L1T0U"){
			status=1;
		}else{
			status=0;
		}
	}

 };
	
	
 function l2() {
	var msg = document.getElementById("l_wlight").name;
	if (sock) {
		if(status == 0){				
			sock.send("L2T4");
			document.getElementById("l_wlight").style.backgroundImage = 'url("icons/Button-Wall-Active.png")';
			status = 1;
		}else{
			sock.send("L2F4");
			document.getElementById("l_wlight").style.backgroundImage = 'url("icons/Button-Wall.png")';
			status = 0;
		}
	} else {
	   alert("Not connected.");
	}
	
	sock.onmessage = function(e) {
		//alert("Got echo: " + e.data);
	}

 };

/*----- KITCHEN ------*/
 function k1() {
	var msg = document.getElementById("k_pendt").name;
	//alert(msg);
	if (sock) {
		if(status == 0){				
			sock.send("K1T4");
			document.getElementById("k_pendt").style.backgroundImage = 'url("icons/Button-Pendant-Active.png")';
			//status = 1;
		}else{
			sock.send("K1F4");
			document.getElementById("k_pendt").style.backgroundImage = 'url("icons/Button-Pendant.png")';			
			//status = 0;
		}
	   //alert("Sent: " + msg);
	} else {
	   alert("Not connected.");
	}
	
	sock.onmessage = function(e) {
		alert("Got echo: " + e.data);
		if(e.data == "K1T4U" || e.data== "K1T0U"){
			status=1;
		}else{
			status=0;
		}
	}

 };
	
	
 function k2() {
	var msg = document.getElementById("k_wlight").name;
	if (sock) {
		if(status == 0){				
			sock.send("K2T4");
			document.getElementById("k_wlight").style.backgroundImage = 'url("icons/Button-Wall-Active.png")';
			status = 1;
		}else{
			sock.send("K2F4");
			document.getElementById("k_wlight").style.backgroundImage = 'url("icons/Button-Wall.png")';
			status = 0;
		}
	   //alert("Sent: " + msg);
	} else {
	   alert("Not connected.");
	}
	
	sock.onmessage = function(e) {
		//alert("Got echo: " + e.data);
	}

 };
  
/*-------- BedRoom-----------*/
function b1() {
	var msg = document.getElementById("b_tlight").name;
	//alert(msg);
	if (sock) {
		if(status == 0){				
			sock.send("B1T4");
			document.getElementById("b_tlight").style.backgroundImage = 'url("icons/Button-TableLight-Active.png")';
			//status = 1;
		}else{
			sock.send("B1F4");
			document.getElementById("b_tlight").style.backgroundImage = 'url("icons/Button-TableLight.png")';			
			//status = 0;
		}
	   //alert("Sent: " + msg);
	} else {
	   alert("Not connected.");
	}
	
	sock.onmessage = function(e) {
		alert("Got echo: " + e.data);
		if(e.data == "B1T1U" || e.data== "B1T1U"){
			status=1;
		}else{
			status=0;
		}
	}

 };
	
	
 function b2() {
	var msg = document.getElementById("b_pendt").name;
	if (sock) {
		if(status == 0){				
			sock.send("B2T4");
			document.getElementById("b_pendt").style.backgroundImage = 'url("icons/Button-Pendant-Active.png")';
			status = 1;
		}else{
			sock.send("B2F4");
			document.getElementById("b_pendt").style.backgroundImage = 'url("icons/Button-Pendant.png")';
			status = 0;
		}
	   //alert("Sent: " + msg);
	} else {
	   alert("Not connected.");
	}
	
	sock.onmessage = function(e) {
		//alert("Got echo: " + e.data);
	}

 };
  
   
/*-------- Rest Room-----------*/
function r1() {
	var msg = document.getElementById("r_vlight").name;
	//alert(msg);
	if (sock) {
		if(status == 0){				
			sock.send("R1T4");
			document.getElementById("r_vlight").style.backgroundImage = 'url("icons/Button-VanityLight-Active.png")';
			//status = 1;
		}else{
			sock.send("R1F4");
			document.getElementById("r_vlight").style.backgroundImage = 'url("icons/Button-VanityLight.png")';			
			//status = 0;
		}
	   //alert("Sent: " + msg);
	} else {
	   alert("Not connected.");
	}
	
	sock.onmessage = function(e) {
		alert("Got echo: " + e.data);
		if(e.data == "R1T1U" || e.data== "R1T1U"){
			status=1;
		}else{
			status=0;
		}
	}

 };
	
	
 function r2() {
	var msg = document.getElementById("r_pendt").name;
	if (sock) {
		if(status == 0){				
			sock.send("R2T4");
			document.getElementById("r_pendt").style.backgroundImage = 'url("icons/Button-Wall-Active.png")';
			status = 1;
		}else{
			sock.send("R2F4");
			document.getElementById("r_pendt").style.backgroundImage = 'url("icons/Button-Wall.png")';
			status = 0;
		}
	   //alert("Sent: " + msg);
	} else {
	   alert("Not connected.");
	}
	
	sock.onmessage = function(e) {
		//alert("Got echo: " + e.data);
	}

 };
