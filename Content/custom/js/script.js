$(document).ready(function(){
	$("body>*").wrapAll( "<div class='wrapper' />"); //wrap all body inside a div

	console.log("attaching header");
	$.get(window.location.pathname+"../html/header.html", function (data) {
		console.log(data.outerHeight());
		$("body").prepend(data);
	});
	console.log("attaching footer");
	///Attach the footer to DashMainPanel_13 as otherwise it is not visible.  
	$.get(window.location.pathname+"../html/footer.html", function (data) {
		$("#DashMainPanel_13").append(data);
	});
	
	///We now need to move everything around by the height of the header.
	var headHeight = data.outerHeight(); //this is the height of the header
	var menuHeight = 56; //this is set by other CSS - it doesn't change
	var topHeight = headHeight + menuHeight + 1; //they currently move it by 57, so 56+1, so we add 1 here
	$("head").append("<style>#BodyPanel_12 {top:"+topHeight+"px;} .as-spa-header {top:"+headHeight+"px;}"); //this adds the style ready for the page to finish loading.
});