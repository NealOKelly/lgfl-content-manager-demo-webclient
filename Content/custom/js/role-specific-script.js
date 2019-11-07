function addUserClass(){
	$("body").addClass($("#globalSearch [data-bind='text:profileUserType']").text().replace(" ", ""));
}
$(document).ready(function(){
	$("body").click(function(){
		addUserClass();
	});
	$("body").mouseover(function(){
		addUserClass();
	});
});