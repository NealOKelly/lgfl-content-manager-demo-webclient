$(document).ready(function(){
	// Select the node that will be observed for mutations
	//const targetNode = document.getElementById('bodyContent');
	const targetNode = document.getElementById('bodyContent');

	// Options for the observer (which mutations to observe)
	const config = { attributes: true, childList: true, subtree: true };

	// Callback function to execute when mutations are observed
	const callback = function(mutationsList, observer) {
		// Use traditional 'for loops' for IE 11
		for(let mutation of mutationsList) {
			if (mutation.type === 'childList') {

					// set #set #splash-screen to display: none; when dashboard panel has loaded.
					if($("#DashMainPanel_13").length){
					$("#custom-loader").fadeOut(3000);
					$("#splash-screen").fadeOut(5000);
						//alert("The dash panel has loaded.");
					}

			}
			else if (mutation.type === 'attributes') {
				console.log('The ' + mutation.attributeName + ' attribute was modified.');
			}
		}
	};

	// Create an observer instance linked to the callback function
	const observer = new MutationObserver(callback);

	// Start observing the target node for configured mutations
	observer.observe(targetNode, config);


	// Later, you can stop observing
	//observer.disconnect();

	// add splsh screen
	$("body").prepend("<div id='splash-screen'><div id='custom-loader' class='loader'></div></div>");
	});

	// add custom stylesheets AFTER the in-built custom.css
	$("head link[rel='stylesheet']").last().after("<link rel='stylesheet' href='/ContentManager/Content/custom/css/custom.css' type='text/css' media='screen'>");
	$("head link[rel='stylesheet']").last().after("<link rel='stylesheet' href='/ContentManager/Content/custom/css/role-specific-styles.css' type='text/css' media='screen'>");


	// Add customheader html
	jQuery.get(window.location.pathname+"Content/custom/html/custom-header.html").then(function(text, status, xhr){
		$("#splash-screen").after(text);
		//$("body").prepend(text);
	}).then(function(){
			// we really only need to do this once - consider rewriting
			var headHeight = $("#custom-header").outerHeight(true); //this is the height of the header
			var menuHeight = 56; //this is set by other CSS - it doesn't change
			var topHeight = headHeight + menuHeight + 1; //they currently move it by 57, so 56+1, so we add 1 here
			$("head").append("<style>#BodyPanel_12 {top:"+topHeight+"px;} .as-spa-header {top:"+headHeight+"px;}div.as-spa-dash-main-secondary{height:auto;}"); 
		
		})

	// Add footer
	jQuery.get(window.location.pathname+"Content/custom/html/custom-footer.html").then(function(text, status, xhr){
		$("#bodyContent").after(text);
	})


