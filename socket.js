 var sock = null;
 var ellog = null;
 var i=0;
 window.onload = function() {
	var wsuri;
	wsuri = "ws://192.168.1.10:8500";
	if ("WebSocket" in window) {
	   sock = new WebSocket(wsuri);
	} else if ("MozWebSocket" in window) {
	   sock = new MozWebSocket(wsuri);
	} else {
	   alert("Browser does not support WebSocket!");
	}
	
	if (sock) {
	   sock.onopen = function() {
		  alert("Connected to " + wsuri);
	   }
	   sock.onclose = function(e) {
		  alert("Connection closed (wasClean = " + e.wasClean + ", code = " + e.code + ", reason = '" + e.reason + "')");
		  sock = null;
		  alert("rejected" + i);
	   }
	   sock.onmessage = function(e) {
		  alert("Got echo: " + e.data);
	   }
	}
};
/*
 function broadcast() {
	var l1 = document.getElementById("pendt").name;
	alert(msg + "t0");
	if (sock) {
	   sock.send(msg + "t0");
	   alert("Sent: " + msg);
	} else {
	   alert("Not connected.");
	}
*/
 function l1() {
	var msg = document.getElementById("pendt").name;
	alert(msg);
	if (sock) {
	   sock.send(msg + "t4");
	   alert("Sent: " + msg);
	} else {
	   alert("Not connected.");
	}
 };
	
	
 function l2() {
	var msg = document.getElementById("vlight").name;
	alert(msg);
	if (sock) {
	   sock.send(msg + "t4");
	   alert("Sent: " + msg);
	} else {
	   alert("Not connected.");
	}
 };
 
