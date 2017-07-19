var menu = "close";

$(document).ready(function() {
$(".mobile-four .menu-toggle").hover(function() {
    
    if (menu === "close") {
      	$(this).parent().next(".mobile-nav").css("transform", "translate(0, 0)");
		$(this).parent().next(".mobile-nav").css("transition-duration", "0.5s");
		$(this).parent().next(".mobile-nav").css("transition-delay", "1s");
		menu = "open";
    } else {
      	$(this).parent().next(".mobile-nav").css("transform", "translate(0, -999%)");
		$(this).parent().next(".mobile-nav").css("transition-duration", "1s");
		$(this).parent().next(".mobile-nav").css("transition-delay", "1s");
		menu = "close";
	}
});
});


