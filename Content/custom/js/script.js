

// Options for the observers (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

function addObserverIfDesiredNodeAvailable(desiredNode, observerName) {
	if(!desiredNode) {
		//The node we need does not exist yet.
		//Wait 500ms and try again
		window.setTimeout(addObserverIfDesiredNodeAvailable,500);
		return;
	}
	observerName.observe(desiredNode, config);
};


$(document).ready(function(){

	// Callback function to execute when mutations to #bodyContent are observed
	const bodyContentObserverCallback = function(mutationsList, bodyContentObserver) {
		// Use traditional 'for loops' for IE 11
		for(let mutation of mutationsList) {
			if (mutation.type === 'childList') {

				// Fade out splash screen
				$("#custom-loader").fadeOut(3000);
				$("#splash-screen").fadeOut(5000);
				
				if(!$("#custom-new-record-button").length){
					$(".Searchbar-logo-toggle").append('<div id="custom-new-record-button" class="rm4ed-new-record-button navbar-text"><a><img style="margin-left:-22px; padding:5px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAT0lEQVQ4y+2RSw4AMAQFadz/yrqSCNX0se3sNIxPiYawD1RVnwuZOQluRHkSVN0tMebY+0K6e5mx0BWiRJCDnZDu8eAVKr6gKfA/MZ5gzAYUNRwmN05++wAAAABJRU5ErkJggg=="><span tabindex="0" title="New Record" style="font-weight:bold" aria-label="New Record">NEW RECORD</span></a></div>');
					
				};
				// remove the object_selector button and replace with phantom div.
				if(!$("#rm4ed-phantom-object-selector").length){
					$("button[title='Record']").css("display", "none");
					$("button[title='Record']").after("<div id='rm4ed-phantom-object-selector' style='width: 96px; height: 32px; padding-left: 10px; padding-right: 10px;'></div>");
				};
				
				// hide unwanted items from the option selector
				if(!$("#searchBuilder").css("display")=="none"){
					$("#searchBuilder").css("display", "none");
					$("a[title='Filter']").parent().css("display", "none"); // this is different because there is a duplicate id.
					$("#options").css("display", "none");
				}
				
				// the rm4ed universal search input box and remove hide the standard search query box.
				if(!$("#rm4ed-global-search-input").length){
					$("#global-search-input").after('<input title="Enter Search Query >" class="clearable x" id="rm4ed-global-search-input" aria-label="< Enter Search Query >" type="search" placeholder="Enter your search" autocomplete="off">');
					$("#global-search-input").css("display", "none");
				};
				
				// style error messages
				if($(".field-error-display").length){
					 $(".field-error-display").css("color", "#33cccc !important");
					 }
				/style record properties link
				if($(".btn-properties").length){
					$(".btn-properties").css("color", "#33cccc");
				}
				
			}
			else if (mutation.type === 'attributes') {
				//console.log('The ' + mutation.attributeName + ' attribute was modified.');
			}
		}
	};
	
	// Create an observer instance linked to the callback function
	const bodyContentObserver = new MutationObserver(bodyContentObserverCallback);
	// Start observing the target node for configured mutations
	addObserverIfDesiredNodeAvailable(document.getElementById('bodyContent'), bodyContentObserver);

	//bodyContentObserver.disconnect();
	
	// Callback function to execute when mutations are observed
	const hprmDynamicModalObserverCallback = function(mutationsList, hprmDynamicModalObserver) {
		// Use traditional 'for loops' for IE 11
		for(let mutation of mutationsList) {
			if (mutation.type === 'childList') {
				
				// hide "Filter" tab from search form.
				if($("a[href='#formSearchFilter']").length){
					$("a[href='#formSearchFilter']").parent().css("display", "none");
				}
				
				// placeholder for customising the saved search form
				if($("div[id*='overlay_SavedSearchForm']").length){
					//$("div[id*='overlay_SavedSearchForm']").find("input[type='checkbox']").css("background-color", "lime");
				}
					
				
			}
			else if (mutation.type === 'attributes') {
			//console.log('The ' + mutation.attributeName + ' attribute was modified.');
			}
		}
	};

	// Create an observer instance linked to the callback function
	const hprmDynamicModalObserver = new MutationObserver(hprmDynamicModalObserverCallback);
	// Start observing the target node for configured mutations
	addObserverIfDesiredNodeAvailable(document.getElementById('hprm-dynamic-modal'), hprmDynamicModalObserver);
	//hprmDynamicModalObserver.disconnect();
	
	
	// add splsh screen
	$("body").prepend("<div id='splash-screen'><div id='custom-loader' class='loader'></div></div>");
	});

	// add custom stylesheets AFTER the in-built custom.css
	$("head link[rel='stylesheet']").last().after("<link rel='stylesheet' href='Content/custom/css/custom.css' type='text/css' media='screen'>");
	$("head link[rel='stylesheet']").last().after("<link rel='stylesheet' href='Content/custom/css/role-specific-styles.css' type='text/css' media='screen'>");


	// Add customheader html
	jQuery.get(window.location.pathname+"Content/custom/html/custom-header.html").then(function(text, status, xhr){
		$("#splash-screen").after(text);
		
	}).then(function(){
			// we really only need to do this once - consider rewriting
//			var headHeight = $("#custom-header").outerHeight(true); //this is the height of the header
//			var menuHeight = 56; //this is set by other CSS - it doesn't change
//			var topHeight = headHeight + menuHeight + 1; //they currently move it by 57, so 56+1, so we add 1 here
//			$("head").append("<style>#BodyPanel_10 {top:"+topHeight+"px;} .as-spa-header {top:"+headHeight+"px;}div.as-spa-dash-main-secondary{height:auto;}"); 
		
			
		})

	// Add footer
	$("#bodyContent").css("height", "95%");
	jQuery.get(window.location.pathname+"Content/custom/html/custom-footer.html").then(function(text, status, xhr){
		$("#bodyContent").after(text);;
	})

	$(document).ready(function(){
		
		// "click" event for logo (got to home)
		$(document).on('click', ".navbar-logofix", function (){
			$("div.tabbable").find("a[title='Home']").trigger("click");
		})
		
		
		// "click" event for Advanced Search button - Open Search
		$(document).on('click', "#rm4ed-advanced-search", function (){
			$("a[title='Record']").trigger("click");
			$('#SearchForm_1 > a')[0].click();
			
		})
		
		// "click" event for hprm-dynamic-search-modal Record button
		$(document).on('click', "#custom-new-record-button", function (){
			$("a[title='New Record']").trigger("click");
		})

		// Populate the #global-search-input from the custom rm4ed search box
		$(document).on('change', "#rm4ed-global-search-input", function (){
			var str = $("#rm4ed-global-search-input").val();
        	var strSearchQuery = 'content:"'+str+'" Or anyWord:'+str;
			$("#global-search-input").val(strSearchQuery);
			
			// Simulate a keydown event in the global-search-input box.  This tricks knockoutjs into updating the view model.
			var e = jQuery.Event("keydown");
			e.which = 50; // # Some key code value
			e.keyCode = 50
			$("#global-search-input").trigger(e);
			
			// control when Save Search button is displayed
			if($("#global-search-input").val()=='content:"" Or anyWord:'){
				//alert("Hellow World");
				
				$("#show-saved-searches").css("display", "none");
			}
			else{
				$("#show-saved-searches").css("display", "inline-block");
			}
			
			return false;
		});
		
		//submit a search when user presses the enter key inside the search box
		$(document).on("keyup", "#rm4ed-global-search-input", function(e){
			$("#rm4ed-global-search-input").trigger("change");	
        	if(e.which == 13){
			var x = $("#rm4ed-global-search-input").val().length;
			if(x>0){
					$( ".global-search-btn" ).trigger( "click" );
        		}
			}
		// THIS STILL DOESN'T WORK AS INTENDED
		// The issue is that there is a second event hndler (in knoutjs that will proceed with the click.  The answer would be to enclose the button in a new div by amending GlobalSearchPanel.tmpl.html
		// We could then use this kind of idea to trap the venet at the div level.  https://www.bennadel.com/blog/1751-jquery-live-method-and-event-bubbling.htm
		// this handles the scenarion where the user has added search information and subsequently deleted it from the search box.
		  $(".global-search-btn").click(function(e){
    		//alert('clicked!');
  			if($("#global-search-input").val()=='content:"" Or anyWord:'){
				//alert('Query is crud, do not search.');
				$("#global-search-input").val("");
				e.preventDefault();
				e.stopPropagation();
				}
		  });
	});
});