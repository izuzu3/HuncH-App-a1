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

 function l1() {
	var msg = document.getElementById("pendt").name;
	//alert(msg);
	if (sock) {
		if(status == 0){				
			sock.send("L1T4");
			document.getElementById("pendt").style.backgroundImage = 'url("icons/Button-Pendant-Active.png")';
			status = 1;
		}else{
			sock.send("L1F4");
			document.getElementById("pendt").style.backgroundImage = 'url("icons/Button-Pendant.png")';			
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
	
	
 function l2() {
	var msg = document.getElementById("wlight").name;
	if (sock) {
		if(status == 0){				
			sock.send("L2T4");
			document.getElementById("wlight").style.backgroundImage = 'url("icons/Button-Wall-Active.png")';
			status = 1;
		}else{
			sock.send("L2F4");
			document.getElementById("wlight").style.backgroundImage = 'url("icons/Button-Wall.png")';
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
 
