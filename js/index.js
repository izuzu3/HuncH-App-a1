$(document).ready(function() {

//MOBILE FOUR
var menu = "close";
$(".mobile-four .menu-toggle").click(function() {
    
    if (menu === "close") {
      	$(this).parent().next(".mobile-nav").css("transform", "translate(0, 0)");
     	 menu = "open";
    } else {
      	$(this).parent().next(".mobile-nav").css("transform", "translate(0, -999%)");
      	menu = "close";
    }
});
});
