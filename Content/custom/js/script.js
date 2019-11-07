$(document).ready(function(){
	$("body").bind("DOMSubtreeModified", function() {
		if (!$("#header").length) {
			$.get(window.location.pathname+"/Content/custom/js/top.html", function (data) {
				$("body").prepend(data);
			});
		}
		if (!$("#footer").length) {
			///Attach the footer to DashMainPanel_13 as otherwise it is not visible.  
			$.get(window.location.pathname+"/Content/custom/js/bottom.html", function (data) {
				$("#DashMainPanel_13").append(data);
			});
		}
		//a safeguard - often two or more are appended, so we remove them here.
		$( "#header+#header" ).remove();
		$( "#footer+#footer" ).remove();
		///We now need to move everything around by the height of the header.
		$("#header").ready(function(){
			var headHeight = $("#header").outerHeight(true); //this is the height of the header
			var menuHeight = 56; //this is set by other CSS - it doesn't change
			var topHeight = headHeight + menuHeight + 1; //they currently move it by 57, so 56+1, so we add 1 here
			$("head").append("<style>#BodyPanel_12 {top:"+topHeight+"px;} .as-spa-header {top:"+headHeight+"px;}div.as-spa-dash-main-secondary{height:auto;}"); 
			//above adds the style ready for the page to finish loading - it also removes the height 100% from the wide screen version of the secondaries, so the footer is visible.
		});
	});
});