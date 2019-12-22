$(document).ready(function(){

	
	// Options for the observers (which mutations to observe)
	const config = { attributes: true, childList: true, subtree: true };

	// CREATE OBSERVER FOR CHANGES TO THE #bodyContent <DIV>
	// Callback function to execute when mutations are observed
	const bodyContentObserverCallback = function(mutationsList, bodyContentObserver) {
		// Use traditional 'for loops' for IE 11
		for(let mutation of mutationsList) {
			if (mutation.type === 'childList') {

				// set #set #splash-screen to display: none; when dashboard panel has loaded.
				//if($("#DashMainPanel_13").length){
				$("#custom-loader").fadeOut(3000);
				$("#splash-screen").fadeOut(5000);

				//}
				
				if(!$("#custom-new-record-button").length){
					//alert($("#custom-new-record-button").length);
					$(".Searchbar-logo-toggle").append('<div id="custom-new-record-button" class="navbar-product-name navbar-text"><a><img style="margin-left:-22px; padding:5px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAT0lEQVQ4y+2RSw4AMAQFadz/yrqSCNX0se3sNIxPiYawD1RVnwuZOQluRHkSVN0tMebY+0K6e5mx0BWiRJCDnZDu8eAVKr6gKfA/MZ5gzAYUNRwmN05++wAAAABJRU5ErkJggg=="><span tabindex="0" title="New Record" style="font-weight:bold" aria-label="New Record">NEW RECORD</span></a></div>');
					
				};
				
				
				// remove the object_selector button and replace with phantom div.
				if(!$("#rm4ed-phantom-object-selector").length){
				$("button[title='Record']").css("display", "none");
				$("button[title='Record']").after("<div id='rm4ed-phantom-object-selector' style='width: 96px; height: 32px; padding-left: 10px; padding-right: 10px;'></div>");
				};
				
				// hide unwanted items from the option selector
				$("#searchBuilder").css("display", "none");
				$("a[title='Filter']").parent().css("display", "none"); // this is different because there is a duplicate id.
				$("#options").css("display", "none");
				
				
				// the rm4ed universal search input box and remove hide the standard search query box.
				if(!$("#rm4ed-global-search-input").length){
					$("#global-search-input").after('<input title="Enter Search Query >" class="clearable x" id="rm4ed-global-search-input" aria-label="< Enter Search Query >" type="search" placeholder="Enter your search" autocomplete="off">');
					$("#global-search-input").css("display", "none");
				};

				
				if(!$(".filter-by-record-type-was-opened").length){
					//alert("Calling this once");
					if(!$("[id*='overlay_SearchRecordTypeFilterModal']").length){
					
						$("#hprm-dynamic-search-modal").addClass("filter-by-record-type-was-opened");

						//alert("Hey over there!");
						$("#rm4ed-folders-only-checkbox").css("background-color", "lime");
						$("a[title='Filter Record Types']").css("background-color", "lime");

						// Open the Record Type Filter overlay. This will trigger knockoutjs to populate the model view.  No, I can't find another way to do it!
						$("a[title='Filter Record Types']").trigger("click");

					
					};
					
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
	bodyContentObserver.observe(document.getElementById('bodyContent'), config);


	// Later, you can stop observing
	//bodyContentObserver.disconnect();
	
	// END -- OBSERVER FOR #bodyContent

		
	// CREATE OBSERVER FOR CHANGES TO THE #hprm-dynamic-search-modal <DIV>
	// Callback function to execute when mutations are observed
	const hprmDynamicModalObserverCallback = function(mutationsList, hprmDynamicModalObserver) {
		// Use traditional 'for loops' for IE 11
		for(let mutation of mutationsList) {
			if (mutation.type === 'childList') {
				
				// hide "Filter" tab from search form.
				if($("a[href='#formSearchFilter']").length){
					$("a[href='#formSearchFilter']").css("display", "none");
				}
				
			}
			else if (mutation.type === 'attributes') {
			console.log('The ' + mutation.attributeName + ' attribute was modified.');
			}
		}
	};

	// Create an observer instance linked to the callback function
	const hprmDynamicModalObserver = new MutationObserver(hprmDynamicModalObserverCallback);

	// Start observing the target node for configured mutations
	hprmDynamicModalObserver.observe(document.getElementById('hprm-dynamic-modal'), config);


	// Later, you can stop observing
	//hprmDynamicModalObserver.disconnect();
	
	// END -- OBSERVER FOR  #hprm-dynamic-modal
	

	
	
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

	//Universal search
	$(document).ready(function(){
	
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
			// this handles the scenarion where the user has added search information and subsequently deleted it from the search box.
			$(document).on('click', ".global-search-btn", function (){
				alert($("#global-search-input").val());
				if($("#global-search-input").val()=='content:"" Or anyWord:'){
					$("#global-search-input").val("");
					event.preventDefault();
				   }
				})
   	});
	

	// "click" event for New Record button
	$(document).on('click', "#custom-new-record-button", function (){
		$("a[title='New Record']").trigger("click");
	})
		
	// "click" event for Advanced Search button - Open Search
	$(document).on('click', "#rm4ed-advanced-search", function (){
		$("#SearchForm_1 > a").trigger("click");
	})
		
});
