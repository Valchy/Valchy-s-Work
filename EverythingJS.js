console.log ('JavaScript is Loaded with JQuery...');
var buttonClick = new Audio ('buttonclick.mp3');
var sectionCheck;
var ShowHideSearch = 1;
var OnOffDiv = 1;
var OnOffSideBar = 1;
var OnOffSideBarActive = 1;
var pageInformation = 1;
var pageSlider = 1;
var accountForm = 1;
var invalidInputCounter = 0;
var arrayCounterHelp = 0;
var openCheckHelp = 0;
var userLAT;
var userLON;
var addOrCancel = false;
var onFocus = false;
var arrayHelp = ['Press the 5th icon on the top bar going left to right for the color change', 'hello people', 'I am 15 years old xd :D', 'Guys idk', 'last thing'];
var theArray = [{'name': 'Home', 'url': 'index.html'},{'name': 'Accordion', 'url': 'Accordion.html'},{'name': 'AddOrMinus', 'url': 'AddOrMinus.html'},{'name': 'Added Arrays', 'url': 'Added%20Arrays.html'},{'name': 'Advanced CSS & SASS', 'url': 'AdvancedCSSandSASS.html'},{'name': 'AlertifyJS', 'url': 'AlertifyJS.html'},{'name': 'ArayOnlyNumbers', 'url': 'ArayOnlyNumbers.html'},{'name': 'Array Drawing', 'url': 'Array%20Drawing.html'},{'name': 'Array Squared', 'url': 'Array%20Squared.html'},{'name': 'Array', 'url': 'Array.html'},{'name': 'ASDF', 'url': 'ASDF.html'},{'name': 'Balls Task', 'url': 'BallsTask.html'},{'name': 'Balls Full Task', 'url': 'BallsFullTask.html'},{'name': 'Between 10 - 20', 'url': 'Between%2010%20-%2020.html'},{'name': 'BinaryToDecimal', 'url': 'BinaryToDecimal.html'},{'name': 'Button Customising', 'url': 'Button%20Customising.html'},{'name': 'Button', 'url': 'Button.html'},{'name': 'Calender Form', 'url': 'CalenderForm.html'},{'name': 'CircleRadius', 'url': 'CircleRadius.html'},{'name': 'Clock', 'url': 'Clock.html'},{'name': 'Cloning Array', 'url': 'Cloning%20Array.html'},{'name': 'CombiningMassives', 'url': 'CombiningMassives.html'},{'name': 'Concat F_A', 'url': 'Concat%20F_A.html'},{'name': 'ConcatValue', 'url': 'ConcatValue.html'},{'name': 'Console Numbers', 'url': 'Console%20Numbers.html'},{'name': 'Current Date', 'url': 'Current%20Date.html'},{'name': 'Custom Search Bar', 'url': 'CustomSearch.html'},{'name': 'Date Converter', 'url': 'Date%20Converter.html'},{'name': 'Drag & Drop', 'url': 'DragDrop.html'},{'name': 'Drawing Circles', 'url': 'Drawing%20Circles.html'},{'name': 'Drawing', 'url': 'Drawing.html'},{'name': 'EditableDiv', 'url': 'EditableDiv.html'},{'name': 'Everything W3S', 'url': 'EverythingW3S.html'},{'name': 'Fill Array', 'url': 'Fill%20Array.html'},{'name': 'Finding Lowest and Highest Array', 'url': 'Finding%20Lowest%20and%20Highest%20Array.html'},{'name': 'FindMinimalNumber', 'url': 'FindMinimalNumner.html'},{'name': 'FirstLetterUp', 'url': 'FirstLetterUp.html'},{'name': 'Form Text', 'url': 'FormText.html'},{'name': 'Form Text Movement', 'url': 'Form%20Text%20Movement.html'},{'name': 'FunctionN', 'url': 'FunctionN.html'},{'name': 'Fun Puzzle', 'url': 'FunPuzzle.html'},{'name': 'GeometricFigures', 'url': 'GeometricFigures.html'},{'name': 'Google API Features', 'url': 'GoogleAPIExtraFeatures.html'},{'name': 'Google Icons', 'url': 'Google%20Icons.html'},{'name': 'Handlebars.js', 'url': 'HandlebarsJS.html'},{'name': 'Hello', 'url': 'Hello.html'},{'name': 'Hello Angular World', 'url': 'HelloAngularJSWorld.html'},{'name': 'Integer Multiples', 'url': 'IntegerMultiples.html'},{'name': 'JSON & AJAX', 'url': 'JSONAJAX.html'},{'name': 'JavaScript Things', 'url': 'JavaScriptThings.html'},{'name': 'JS Objects', 'url': 'JS%20Objects.html'},{'name': 'KOM', 'url': 'KOM.html'},{'name': 'Lader', 'url': 'Lader.html'},{'name': 'Length of Object', 'url': 'Length%20of%20Object.html'},{'name': 'Letter Color Changing', 'url': 'Letter%20Color%20Changing.html'},{'name': 'Mac - Processor and Hard Drive', 'url': 'Mac%20-%20Processor%20and%20Hard%20Drive.html'},{'name': 'Multiple-Step Form', 'url': 'MultipleStepForm.html'},{'name': 'Music', 'url': 'Music.html'},{'name': 'Most Common Array', 'url': 'Most%20Common%20Array.html'},{'name': 'NewArray', 'url': 'NewArray.html'},{'name': 'NoSpace', 'url': 'NoSpace.html'},{'name': 'Numbers 1 - 100', 'url': 'Numbers%201%20-%20100.html'},{'name': 'Object Types', 'url': 'ObjectTypes.html'},{'name': 'On/Off Switch', 'url': 'OnOffSwitch.html'},{'name': 'Password Validation', 'url': 'PasswordValidation.html'},{'name': 'Personal ThreeJS Project', 'url': 'PersonalThreeJSProject.html'},{'name': 'Picture Coordinates', 'url': 'PictureCoordinates.html'},{'name': 'Progress Bar', 'url': 'ProgressBar.html'},{'name': 'RepeatString', 'url': 'RepeatString.html'},{'name': 'Row Change', 'url': 'Row%20Change.html'},{'name': 'Seconds', 'url': 'Seconds.html'},{'name': 'Select Menu', 'url': 'Select.html'},{'name': 'Sending Mail', 'url': 'SendingMail.html'},{'name': 'String Caps', 'url': 'String%20Caps.html'},{'name': 'Sudoku', 'url': 'Sudoku.html'},{'name': 'TableAdding', 'url': 'TableAdding.html'},{'name': 'TableFunction', 'url': 'TableFunction.html'},{'name': 'TableFunction2', 'url': 'TableFunction2.html'},{'name': 'TableFunction3', 'url': 'TableFunction3.html'},{'name': 'Tennis Game', 'url': 'Tennis%20Game.html'},{'name': 'Target JavaScript', 'url': 'TargetJavaScript.html'},{'name': 'Three.js', 'url': 'ThreeJS.html'},{'name': 'Using Google Icons', 'url': 'Using%20Google%20Icons.html'},{'name': 'Weather & Time', 'url': 'WeatherTime.html'},{'name': 'Weekend & Date Object', 'url': 'Is%20it%20weekend_date%20obj.html'},{'name': 'Windsurfing App', 'url': 'WindsurfApp.html'},{'name': 'While Loops', 'url': 'WhileLoops.html'},{'name': 'WordFunction', 'url': 'WordFunction.html'}];
var arraySVG = [[{'url': 'https://valchy.github.io/EverythingSVG/avatar_woman.svg'}, {'url': 'https://valchy.github.io/EverythingSVG/avatar_man.svg'}], [{'url': 'https://valchy.github.io/EverythingSVG/male_avatar_default.svg', 'changes': ['avatar-background', 'avatar-neck', 'avatar-glasses', 'avatar-shirt', 'avatar-face', 'avatar-frame', 'avatar-stripes']}, {'url': 'https://valchy.github.io/EverythingSVG/male_avatar_alien.svg', 'changes': ['avatar-background', 'avatar-shirt', 'avatar-neck', 'avatar-face', 'avatar-ears', 'avatar-mask', 'avatar-horn']}, {'url': 'https://valchy.github.io/EverythingSVG/male_avatar_glasses.svg', 'changes': ['avatar-background', 'avatar-neck', 'avatar-bottom-shirt', 'avatar-top-shirt', 'avatar-face', 'avatar-hair', 'avatar-frame', 'avatar-glasses']}], [{'url': 'https://valchy.github.io/EverythingSVG/female_avatar_default.svg', 'changes': ['avatar-background', 'avatar-hair', 'avatar-shirt', 'avatar-top-shirt', 'avatar-neck', 'avatar-face', 'avatar-lips', 'avatar-glasses']}, {'url': 'https://valchy.github.io/EverythingSVG/female_avatar_nurse.svg', 'changes': ['avatar-background', 'avatar-hair', 'avatar-shirt', 'avatar-top-shirt', 'avatar-bottom-shirt', 'avatar-face', 'avatar-lips', 'avatar-neck', 'avatar-hat']}, {'url': 'https://valchy.github.io/EverythingSVG/female_avatar_ninja.svg', 'changes': ['avatar-background', 'avatar-shirt', 'avatar-face', 'avatar-eye', 'avatar-eyelashes']}]];
// Better to have the arrey minified so it doesnt take so much space :D

window.onload = function ()	{
	titleChange ();
	accountPageChanger ();
	loadGenderSVG();

	if ($('#mainBar').length) {
		$('body').attr('onresize', 'sideBarWidthHeight (); titleChange ();');
	}
	else {
		$('body').attr('onresize', 'sideBarWidthHeight ();');
	}

	$(function () {
		$('#about').show();
		$('#future').hide();
		$('#youtube').hide();
		$('.myYouTubeVideo').hide();
		$('.myYouTubeVideoDiv').hide();
		$('.theWeatherDiv, #theTimeDiv').hide().delay(900).fadeToggle(100);

		if (pageInformation == 1) {
			$('#homePageInformation').show();
			$('#buildPageInformation').hide();
			$('#shopPageInformation').hide();
			$('#helpPageInformation').hide();
		}
		else if (pageInformation == 2) { // REMOVE THIS WHEN DONE
			$('#homePageInformation').hide();
			$('#buildPageInformation').show();
			$('#shopPageInformation').hide();
			$('#helpPageInformation').hide();
		}
		// This is for the google custom search placeholder
		$('.gsc-input').attr('placeholder', 'Search for Something...');
	});

	$(function () {
		for (var obj in theArray) {
			$('#theUl').append($("<li/>", {'onmouseover': 'addRemoveArrow (this, true)', 'onmouseout': 'addRemoveArrow (this, false)', 'onclick': 'location.href="'+theArray[obj].url+'"', 'html': theArray[obj].name}));
		}	// The pageSlider is optional depending if you want full 'reload' or not
		$("#theUl li:first-child").addClass("theTitle").addClass("liHighlight").attr('onclick', 'buttonClick.play(); pageInformation = 1; pageSlider = 1; finishInformationSwitch (); finishPageSwich ();').attr('id', 'home-click');
		$("#theUl li:last-child").addClass("lastList");
		$("#theUl li:nth-child(2").css({'padding-top': '20px'});
	});

	// Have screen scrolling upon li click?
	$(function () {
		for (var i = 1; i <=5; i++) {
			$('#section'+i).append($('<div/>').append($('<ul/>').append($('<li/>', {'id': 'liHelp'+i+i, 'class': 'theLiHelp'}).append($('<hr>')))));
			$('#liHelp'+i+i).append($('<p/>', {'html': arrayHelp[arrayCounterHelp]}));
			arrayCounterHelp++;
		}
	});

	if ($('#mainBar').length) {
		$(function () {
			$('.man-avatar-choose').append($('<table/>', {'id': 'CMA'}));
			for (var i = 1; i <= 3; i++) {
				$('#CMA').append($('<tr/>', {'id': 'CMA'+i}));
				for (var t = 1; t <= 3; t++) {
					var temp = arraySVG[1][i-1].url;
					temp.toString();
					$('#CMA'+i).append($('<td/>', {'class': 'CMA'+i+t, 'onclick': 'chosenSVG(this, arraySVG[1]['+i+'-1].changes);', 'html': loadSVG(temp, 2, 'CMA'+i+t)}));
				}
			}

			$('.woman-avatar-choose').append($('<table/>', {'id': 'CWA'}));
			for (var i = 1; i <= 3; i++) {
				$('#CWA').append($('<tr/>', {'id': 'CWA'+i}));
				for (var t = 1; t <= 3; t++) {
					var temp = arraySVG[2][i-1].url;
					temp.toString();
					$('#CWA'+i).append($('<td/>', {'class': 'CWA'+i+t, 'onclick': 'chosenSVG(this, arraySVG[2]['+i+'-1].changes);', 'html': loadSVG(temp, 2, 'CWA'+i+t)}));
				}
			}
		});
	}

	$(function () {
		if ($('#mainBarOthers').length) {
	 		var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			document.getElementById ('mainBarOthers').style.cssText = 'height:' + height;
		}
		else if ($('#mainBar').length) { // && OnOffSideBar == 1
			var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			height = height-50;
			document.getElementById ('mainBar').style.cssText = 'height:' + height;
		}
	});

	if ($('#mainBar').length) {
		$('#loading').fadeOut(700);
		$('#everythingDiv').css({display: 'block', 'overflow-y': 'auto'});
	} // You can create a animation 'animate ({css properties}, 700)'

	$(function () {
		$('#mainPageDiv').hide().delay(100).slideDown(900);
		$('#topBarDiv').hide().delay(100).show('slide', {direction: 'right'}, 900);
	});
}

function titleChange () {
	var w = window.outerWidth;
	if (w > 1130 && w < 1375) {
		$('#topBarSpan').html('The ValchyGaming Site');
	}
	else if (w > 1375) {
		$('#topBarSpan').html('Welcome to the ValchyGaming Site');
	}

	if (w < 1130) {
		$('#topBarSpan').html('');
	}
}

// add event listen reload
$(function(){
	$('#nextPageButton').click(function () {
		buttonClick.play();
		if (pageSlider == 3){
			pageSlider = 1;
		}
		else {
			pageSlider++;
		}
		finishPageSwich ();
	});
		
	$('#previousPageButton').click(function () {
		buttonClick.play();
		if (pageSlider == 1){
			pageSlider = 3;
		}
		else {
			pageSlider--;
		}
		finishPageSwich ();
	});

	$('#dropDownFuture, #dropDownMore').click(function () {
		finishPageSwich ();
	});

	$('#help-center-click, #build-click, #shop-click').click(function () {
		finishInformationSwitch ();
	});

	for (var i in theArray) {
		$('#theList').append($('<li/>', {'html': theArray[i].name, 'onclick': 'location.href="'+theArray[i].url+'"'}));
	}
});

window.addEventListener('keypress', function (e) {
	if (e.keyCode == 13 && pageInformation == 2) {
		checkAccountInput ();
	}
	else {
		return;
	}
});

function regExp (theHTML) {
	var check = theHTML.value;
	var tempArray = [];
	var tmpArray = [];
	$('#theList').html('');

	for (var i in theArray) {
		var tmp = theArray[i].name;
		var theMatch = tmp.match(new RegExp(check, 'i'));
		if (theMatch != '' && theMatch != null) {
			tempArray.push(theArray[i].name);
			tmpArray.push(theArray[i].url);
			$('#theList').html('');
			for (var i in tempArray) {
				$('#theList').append($('<li/>', {'html': tempArray[i], 'onclick': 'location.href="'+tmpArray[i]+'"'}));
			}
		}
		else if (theHTML.value === '') {
			$('#theList').html('');
			for (var i in theArray) {
				$('#theList').append($('<li/>', {'html': theArray[i].name, 'onclick': 'location.href="'+theArray[i].url+'"'}));
			}
		}
	}
	if (tempArray.length < 1 && theHTML.value != '') {
		$('#theList').html('');
		$('#theList').append($('<li/>', {'html': 'No match found'}));
	}
}

// Can you simply .focus or just 'focus' and it will still work
$('#searchBar').on('focusin', function () {
	if (addOrCancel === false) {
		$('.listDiv').show();
	}
	else {
		$('.listDiv').hide();
	}
});

$('#searchBar').on('focusout', function () {
	if (onFocus === false) {
		$('.listDiv').hide();
	}
	else {
		$('.listDiv').show();
	}
});

function finishInformationSwitch () {
	if (pageInformation == 1) {
		if ($('#mainBarOthers').length) {
			window.location.href = "index.html";
		}
		else {
			$('#homePageInformation').show();
			$('#buildPageInformation').hide();
			$('#helpPageInformation').hide();
			$('#shopPageInformation').hide();
			$('#theParentButtonDiv').show();
		}
	}
	else if (pageInformation == 2) {
		$('#homePageInformation').hide();
		$('#buildPageInformation').show();
		$('#helpPageInformation').hide();
		$('#shopPageInformation').hide();
		$('#theParentButtonDiv').hide();
	}
	else if (pageInformation == 3) {
		$('#homePageInformation').hide();
		$('#buildPageInformation').hide();
		$('#helpPageInformation').show();
		$('#shopPageInformation').hide();
		$('#theParentButtonDiv').hide();
	}
	else if (pageInformation == 4) {
		$('#homePageInformation').hide();
		$('#buildPageInformation').hide();
		$('#helpPageInformation').hide();
		$('#shopPageInformation').show();
		$('#theParentButtonDiv').hide();
	}
}

function finishPageSwich () {
	if (pageSlider == 1){ // Show About
		$('#about').show();
		$('#future').hide();
		$('#youtube').hide();
		$('.myYouTubeVideo').hide();
		$('.myYouTubeVideoDiv').hide();
	}
	else if (pageSlider == 2){ // Show Future
		$('#about').hide();
		$('#future').show();
		$('#youtube').hide();
		$('.myYouTubeVideo').hide();
		$('.myYouTubeVideoDiv').hide();
	}
	else if (pageSlider == 3){ // Show YouTube
		$('#about').hide();
		$('#future').hide();
		$('#youtube').show();
		$('.myYouTubeVideo').show();
		$('.myYouTubeVideoDiv').show();
	}
}

var menuSave = '';
function addRemoveArrow (a, checkEvent) {
	if (a.innerHTML == 'Home') return;

	if (checkEvent) {
		if (a.innerHTML.indexOf('➤') > -1) {
			return;
		}
		else { // Might need to remove span to fix...
			menuSave = a.innerHTML;
			$(a).html('');
			$(a).append($('<span/>', {'html': '&#10148; '}).css({'color': 'red', 'font-size': '13px'}));
			var temp = a.innerHTML;
			$(a).html(temp+menuSave);
		}
	}
	else {
		a.innerHTML = menuSave;
	}
}
// Finish it off make all colors switch normally without bugs
var colorSwitch = 1;
function toggleColors () {
	if (colorSwitch == 1) {
		$(function () {
			$('.topBar').css({'background-color': 'white'});
			$('.topBar sub').css({'color': 'black'});
			$('#topBarSpan').css({'color': 'black'});
			colorSwitch--;
		});
	}
	else {
		$(function () {
			$('.topBar').css({'background-color': '#555555'});
			$('.topBar sub').css({'color': 'white'});
			$('#topBarSpan').css({'color': 'white'});
			colorSwitch++;
		});
	}
}

function showSectionHelp () {
	$(function () {
		if ($('#section'+sectionCheck).hasClass('activeHelp')) {
			$('#section'+sectionCheck).removeClass('activeHelp');
			$('#span'+sectionCheck).html('&#8674;');
			$('#liHelp'+sectionCheck+sectionCheck).removeClass('highlightHelp');
			$('#li'+sectionCheck).removeClass('highlightHelp');
			openCheckHelp--;
		}
		else {
			if (openCheckHelp == 1) {
				for (var i = 1; i <= 5; i++) {
					$('#section'+i).removeClass('activeHelp');
					$('#span'+i).html('&#8674;');
					$('#liHelp'+i+i).removeClass('highlightHelp');
					$('#li'+i).removeClass('highlightHelp');
				}
				$('#span'+sectionCheck).html('&#8675;');
				$('#section'+sectionCheck).addClass('activeHelp');
				$('#liHelp'+sectionCheck+sectionCheck).addClass('highlightHelp');
				$('#li'+sectionCheck).addClass('highlightHelp');
			}
			else {
				$('#section'+sectionCheck).addClass('activeHelp');
				$('#liHelp'+sectionCheck+sectionCheck).addClass('highlightHelp');
				$('#li'+sectionCheck).addClass('highlightHelp');
				$('#span'+sectionCheck).html('&#8675;');
				openCheckHelp++;
			}
		}
	});
}

function contactMe () {
	// Change this so that it goes to a help center page where is scrolls down on the page and goes exactly on the specific part etc.. create button call me eg.
	window.alert ('My phone number is: \n +359888123456');
}

// You could make it qith jQuery and add a animation on showing/hiding...
function hideUi () {
	$('#theSearch').fadeToggle(400);
	$('#buildButton').fadeToggle(400);
	$('#shoppingButton').fadeToggle(400);
	$('#colorsButton').fadeToggle(400);
}

function showUi () {
	$('#theSearch').fadeToggle(400);
	$('#buildButton').fadeToggle(400);
	$('#shoppingButton').fadeToggle(400);
	$('#colorsButton').fadeToggle(400);
}

function sideBarWidthHeight () {
	$(function () {
		if ($('#mainBarOthers').length) {
	 		var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			document.getElementById ('mainBarOthers').style.cssText = 'height:' + height;
		}
		else if ($('#mainBar').length) { // && OnOffSideBar == 1
			var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			height = height-50;
			document.getElementById ('mainBar').style.cssText = 'height:' + height;
		}
	});

	var w = window.outerWidth;
	if (w > 1175) {
		$("#mainPageDiv").delay(250).queue(function (next) {$(this).css({"margin-left": "18%", "transition": "all 0.5s ease 0s"}); next ();});
		$("#bottomBar").delay(250).queue(function (next) {$(this).css({marginLeft: '18%', transition: "all 0.5s ease 0s"}); next ();});
	}
	else {
		$("#mainPageDiv").delay(250).queue(function (next) {$(this).css({"margin-left": "0px", "transition": "all 0.5s ease 0s"}); next ();});
		$("#bottomBar").delay(250).queue(function (next) {$(this).css({marginLeft: '0px', transition: "all 0.5s ease 0s"}); next ();});
	}
}

// Fix bug spamming the showHideSideBar button (disabel w8 delay() so animation is over then eneble etc)
function showHideSideBar () {

	if (OnOffSideBarActive || OnOffSideBar > 2) return;
	var w = window.outerWidth;

	if (w < 1175) {
		$('#mainBar').removeClass('mainBar').addClass('mainBarActive');
		if (OnOffSideBarActive == 1) {
			OnOffSideBarActive = 5;
			$('.mainBarActive').slideToggle(500);
			OnOffSideBarActive = 0;
		}
		else if (OnOffSideBarActive == 0) {
			OnOffSideBarActive = 5;
			$('#mainBar').slideToggle(500);
			OnOffSideBarActive = 1;
		}
	} 
	else {
		$('#mainBar').removeClass('mainBarActive').addClass('mainBar');
		if (OnOffSideBar == 1) {
			OnOffSideBar = 5;
			$("#mainBar").slideToggle(500);
			$("#mainPageDiv").delay(250).queue(function (next) {$(this).css({"margin-left": "0px", "transition": "all 0.5s ease 0s"}); next ();});
			$("#bottomBar").delay(250).queue(function (next) {$(this).css({marginLeft: '0px', transition: "all 0.5s ease 0s"}); next ();});
			OnOffSideBar = 0;
		}
		else if (OnOffSideBar == 0) {
			OnOffSideBar = 5;
			$("#mainBar").slideToggle(500);
			$("#mainPageDiv").css({"margin-left": "18%", "transition": "all 0.5s ease 0s"});
			$("#bottomBar").css({marginLeft: '18%', "transition": "all 0.5s ease 0s"});
			OnOffSideBar = 1;
		}
	}
}

function showHideSearch () {
	var w = window.outerWidth;

	if (ShowHideSearch == 1) {
		if (w < 620) {
			$('#headlineButton').hide();
			$('#settingsButton').hide();
			$('#buildButton').hide();
			$('#shoppingButton').hide();
			$('#colorsButton').hide();
			$('#theSearchIcon').hide();
			$('.buttonSearch').show();
			$('.dropDownMenuSearch').css({marginLeft: '0px'});
			$('#dropDownMenuSearch').css({display: 'grid'}); // may need to be block
			$('#gsc-div').css({visibility: 'visible'});
			ShowHideSearch--;
		}
		else {
			$('#theSearchIcon').hide();
			$('.buttonSearch').show();
			$('.dropDownMenuSearch').css({marginLeft: '18%'});
			$('#dropDownMenuSearch').css({display: 'grid'}); // may need to be block
			$('#gsc-div').css({visibility: 'visible'});
			ShowHideSearch--;
		}
	}
	else if (ShowHideSearch == 0) {
		$('#headlineButton').show();
		$('#settingsButton').show();
		$('#buildButton').show();
		$('#shoppingButton').show();
		$('#colorsButton').show();
		$('#theSearchIcon').show();
		$('.buttonSearch').hide();
		$('.dropDownMenuSearch').css({marginLeft: '18%'});
		$('#dropDownMenuSearch').css({display: 'none'});
		$('#gsc-div').css({visibility: 'hidden'});
		$('.gsc-input').val(''); // check not sure if correct
		ShowHideSearch++;
	}
}

function stl (a) {
	if (a == 1) {
		$('#lineOne').css({display: 'block', 'margin-right': '-10px'});
	}
	else if (a == 2) {
		$('#lineTwo').css({display: 'block', 'margin-right': '-10px'});
	}
}

function uploadImage () {
	var x = document.getElementById("theUploadedImage");
  $('#the-avatar-img').attr('src', 'EverythingSVG/'+x.value.substring(12));
}

function showHideDropDownMenuDiv () {
	if (OnOffDiv == 1) {
		document.getElementById ('dropDownMenuUlDiv').style.cssText = "display: block";
		OnOffDiv = 0;
	}
	else if (OnOffDiv == 0) {
		document.getElementById ('dropDownMenuUlDiv').style.cssText = "display: none";
		OnOffDiv = 1;
	}
}

function isNumberKey (evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    } 
    else {
    	return true;
    }
}
// return explenation...? how does it help?
function isLetterKey (evt) {
    evt = (evt) ? evt : event;
    var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
    if (charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && (charCode != 32)) {
   		return false;
   	} 
   	else {
    	return true;
   	}
}

function copyText () {
	var theCopiedText = document.getElementById('acc-input-7');
	theCopiedText.select();
	document.execCommand('Copy');
}


function validateInput (a) {
	if (a.value === '') {
		a.style.cssText = 'background-color: #ffdddd';
	}
	else {
		a.style.cssText = 'background-color: #fff';
	}
}

function showHidePassword () {
var inputPassword = document.getElementById('acc-input-9');
var inputConfirmPassword = document.getElementById('acc-input-10');

	if (inputPassword.type === 'password') {
		inputPassword.type = 'text';
		inputConfirmPassword.type = 'text';
	}
	else {
		inputPassword.type = 'password';
		inputConfirmPassword.type = 'password';
	}
}

if ($('#mainBar').length) {
	document.getElementById('acc-input-9').onfocus = function() {
		$('#fix-something-div').html('').hide();
	    $('#password-requierments').addClass('password-requierments');
	    $('#fix-something-container').addClass('password-validation-div');
	    $('#requierments-password').addClass('requierments-password');
	    $('#fix-something-container').css({'margin-top': '0px'});
	}

	document.getElementById('acc-input-9').onblur = function() {
		$('#fix-something-div').html('').hide();
	    $('#password-requierments').removeClass('password-requierments');
	    $('#fix-something-container').removeClass('password-validation-div');
	    $('#requierments-password').removeClass('requierments-password');
	    $('#fix-something-container').css({'margin-top': '2px'});
	}

	document.getElementById('acc-input-10').onfocus = function() {
		$('#fix-something-div').html('').hide();
	    $('#password-requierments').addClass('password-requierments');
	    $('#fix-something-container').addClass('password-validation-div');
	    $('#requierments-password').addClass('requierments-password');
	    $('#fix-something-container').css({'margin-top': '0px'});
	}

	document.getElementById('acc-input-10').onblur = function() {
		$('#fix-something-div').html('').hide();
	    $('#password-requierments').removeClass('password-requierments');
	    $('#fix-something-container').removeClass('password-validation-div');
	    $('#requierments-password').removeClass('requierments-password');
	    $('#fix-something-container').css({'margin-top': '2px'});
	}
}

function thePasswordCheck () {
var passwordInput = document.getElementById('acc-input-9');
var confirmPasInput = document.getElementById('acc-input-10').value;
var upperCaseLetters = /[A-Z]/g;
var numberCharacters = /[1-9]/g;

	if (passwordInput.value === confirmPasInput) {
		$('#in-valid-content-4').attr('class', 'valid-password-requierment');
	}
	else {
		$('#in-valid-content-4').attr('class', 'invalid-password-requierment');
	}

	if (passwordInput.value.match(upperCaseLetters)) {
		$('#in-valid-content-2').attr('class', 'valid-password-requierment');
	}
	else {
		$('#in-valid-content-2').attr('class', 'invalid-password-requierment');
	}

	if (passwordInput.value.match(numberCharacters)) {
		$('#in-valid-content-3').attr('class', 'valid-password-requierment');
	}
	else {
		$('#in-valid-content-3').attr('class', 'invalid-password-requierment');
	}

	if (passwordInput.value.length >= 8) {
		$('#in-valid-content-1').attr('class', 'valid-password-requierment');
	}
	else {
		$('#in-valid-content-1').attr('class', 'invalid-password-requierment');
	}
}

if ($('#mainBar').length) {
	document.getElementById('acc-input-9').onkeyup = function() {
		thePasswordCheck ();
	}

	document.getElementById('acc-input-10').onkeyup = function() {
		thePasswordCheck ();
	}
}

$("input[name='poll-avatar']").on('click', function () {
	if ($(this).is(':checked')) {
		if ($(this).attr('id') == 'poll-avatar-2') {
			$('#the-avatar-img').attr('src', 'EverythingSVG/female_avatar_default.svg');
		}
		else {
			$('#the-avatar-img').attr('src', 'EverythingSVG/male_avatar_work.svg');
		}
	}
	else {
		$('#the-avatar-img').attr('src', 'EverythingSVG/male_avatar_work.svg');
	}
});

function accountPageChanger () {

	if (accountForm == 1) {
		$('.create-an-account-form, #fix-something-div, #personal-info-div').show();
		$('#birthday-info-div, #account-info-div, #extra-info-div, .account-created-div, .create-an-account-button-previous, #processing-div').hide();
		$('#dot-1').removeClass('dot dot-finish').addClass('dot-active');
		$('#dot-2, #dot-3, #dot-4').removeClass('dot-active dot-finish').addClass('dot');
		$('#check_circle-1 img, #check_circle-2 img, #check_circle-3 img, #check_circle-4 img').attr('src', 'check_circle.svg');
		$('#check_circle-1 span span, #check_circle-2 span span, #check_circle-3 span span, #check_circle-4 span span').html('Uncompleted');
		$('.create-an-account-button-next').html('Next').css({width: '76px'});
	}
	else if (accountForm == 2) {
		$('#birthday-info-div, .create-an-account-button-previous, #fix-something-div').show();
		$('#personal-info-div, #account-info-div, #extra-info-div, #processing-div').hide();
		$('#dot-2').removeClass('dot dot-finish').addClass('dot-active');
		$('#dot-3, #dot-4').removeClass('dot-active dot-finish').addClass('dot');
		$('#dot-1').removeClass('dot-active dot').addClass('dot-finish');
		$('#check_circle-1 img').attr('src', 'check_circle_completed.svg');
		$('#check_circle-1 span span').html('Completed');
		$('#check_circle-2 img, #check_circle-3 img, #check_circle-4 img').attr('src', 'check_circle.svg');
		$('#check_circle-2 span span, #check_circle-3 span span, #check_circle-4 span span').html('Uncompleted');
	}
	else if (accountForm == 3) {
		$('#account-info-div, #fix-something-div').show();
		$('#birthday-info-div, #personal-info-div, #extra-info-div, #processing-div').hide();
		$('#dot-3').removeClass('dot dot-finish').addClass('dot-active');
		$('#dot-4').removeClass('dot-active dot-finish').addClass('dot');
		$('#dot-1, #dot-2').removeClass('dot-active dot').addClass('dot-finish');
		$('#check_circle-1 img, #check_circle-2 img').attr('src', 'check_circle_completed.svg');
		$('#check_circle-1 span span, #check_circle-2 span span').html('Completed');
		$('#check_circle-3 img, #check_circle-4 img').attr('src', 'check_circle.svg');
		$('#check_circle-3 span span, #check_circle-4 span span').html('Uncompleted');
	}
	else if (accountForm == 4) {
		$('#extra-info-div, #fix-something-div').show();
		$('#birthday-info-div, #personal-info-div, #account-info-div, #processing-div').hide();
		$('#dot-4').removeClass('dot dot-finish').addClass('dot-active');
		$('#dot-1, #dot-2, #dot-3').removeClass('dot-active dot').addClass('dot-finish');
		$('#check_circle-1 img, #check_circle-2 img, #check_circle-3 img').attr('src', 'check_circle_completed.svg');
		$('#check_circle-1 span span, #check_circle-2 span span, #check_circle-3 span span').html('Completed');
		$('#check_circle-4 img').attr('src', 'check_circle.svg');
		$('#check_circle-4 span span').html('Uncompleted');
	}
	else if (accountForm == 5) {
		$('#processing-div, #fix-something-div').show();
		$('#birthday-info-div, #personal-info-div, #account-info-div, #extra-info-div, .create-an-account-button-previous').hide();
		$('#dot-1, #dot-2, #dot-3, #dot-4').removeClass('dot-active dot').addClass('dot-finish');
		$('#check_circle-1 img, #check_circle-2 img, #check_circle-3 img, #check_circle-4 img').attr('src', 'check_circle_completed.svg');
		$('#check_circle-1 span span, #check_circle-2 span span, #check_circle-3 span span, #check_circle-4 span span').html('Completed');
		$('.create-an-account-button-next').fadeToggle(0).html('Submit').attr('type', 'submit').css({width: 'auto'}).delay(4000).fadeToggle(1000);
		$('.processing-gif-flex').delay(4000).fadeOut(1000);
		$('.done-processing-img').delay(5000).show(100);
	}
}

function avatarMenu () {
	$('.button-for-avatar-div').hide();
	$('.div-for-avatar').hide();
	$('.choose-avatar-div').show();
	$('.avatar-div').css({'align-items': 'flex-start'});
}

function checkAccountInput () {
var email = document.getElementById('acc-input-7').value;
var emailConfirm = document.getElementById('acc-input-8').value;
var emailValidation = document.getElementById('acc-input-7').value;
invalidInputCounter = 0;
$('#fix-something-div').html('').hide();

	if (accountForm == 1) {
		$('#personal-info-div input').each(function (i) {
			if ($(this).val() == '') {
				$(this).css({'background-color': '#ffdddd'});
				invalidInputCounter++;
			}
			else {
				$(this).css({'background-color': '#fff'});
			}
		});


		if ($('#acc-input-3').val().length != 2) {
			$('#acc-input-3').css({'background-color': '#ffdddd'}); 
			invalidInputCounter++;
		}
		if ($('#acc-input-4').val().length != 2) {
			$('#acc-input-4').css({'background-color': '#ffdddd'}); 
			invalidInputCounter++;
		}
		if ($('#acc-input-5').val().length != 4) {
			$('#acc-input-5').css({'background-color': '#ffdddd'}); 
			invalidInputCounter++;
		}
		if (invalidInputCounter >= 1) {
			if ($('.alertWarning').is(':visible')) return;
			$('.alertWarning').show('slide', {direction: 'left'}, 900).delay(5000).fadeOut(600);
			accountPageChanger();
		}
		else {
			accountForm++;
			accountPageChanger();
		}
	}
	else if (accountForm == 2) {
		$('#birthday-info-div input').each(function (i) {
			if ($(this).val() == '') {
				$(this).css({'background-color': '#ffdddd'});
				invalidInputCounter++;
			}
			else {
				$(this).css({'background-color': '#fff'});
			}
		});

		if ($('#acc-input-6').val().length < 6) { 
			$('#acc-input-6').css({'background-color': '#ffdddd'});
			$('#fix-something-div').html('• User name has to be longer than 6 Characters!').show();
			invalidInputCounter++;
		}

		if ($('#acc-input-8').val() == $('#acc-input-7').val()) { // need explenation
			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValidation)) {
  			}
  			else {
	  			if ($('#fix-something-div').html() == '') {
	  				$('#acc-input-7').css({'background-color': '#ffdddd'});
					$('#fix-something-div').html('• Given email is invalid or miss-typed!').show();
					invalidInputCounter++;
				}
				else {
					$('#acc-input-7').css({'background-color': '#ffdddd'});
					$('#fix-something-div').html('• User name has to be longer than 6 Characters! <br> • Given email is invalid or miss-typed!').show();
					invalidInputCounter++;
				}
			}
		}
		else {
			$('#acc-input-8').css({'background-color': '#ffdddd'});
			if ($('#fix-something-div').html() == '') {
				$('#fix-something-div').html('• Invalid email confirmation!').show();
			}
			else {
				$('#fix-something-div').html('• User name has to be longer than 6 Characters! <br> • Invalid email confirmation!').show();
			}
			invalidInputCounter++;
		}

		if (invalidInputCounter >= 1) {
			if ($('.alertWarning').is(':visible')) return;
			$('.alertWarning').show('slide', {direction: 'left'}, 900).delay(5000).fadeOut(600);
			accountPageChanger();
		}
		else {
			accountForm++;
			accountPageChanger();
		}
	}
	else if (accountForm == 3) {
		$('#accountForm-info-div input').each(function (i) {
			if ($(this).val() == '') {
				$(this).css({'background-color': '#ffdddd'});
				invalidInputCounter++;
			}
			else {
				$(this).css({'background-color': '#fff'});
			}
		});

		for (var i = 1; i <= 4; i++) {
			if ($('#in-valid-content-'+i).hasClass('invalid-password-requierment')) invalidInputCounter++;
		}

		if (invalidInputCounter >= 1) {
			$('#fix-something-div').html('• Invalid password information!').show();
			accountPageChanger();
		}
		else {
			accountForm++;
			accountPageChanger();
		}
	}
	else if (accountForm == 4) {		
		if (invalidInputCounter >= 1) {
			if ($('.alertWarning').is(':visible')) return;
			$('.alertWarning').show('slide', {direction: 'left'}, 900).delay(5000).fadeOut(600);
			accountPageChanger();
		}
		else {
			accountForm++;
			accountPageChanger();
		}
	}
}

function getLocation () {
	if (navigator.geolocation) {
       var userData = navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        $('.theWeatherDiv').html("Geolocation is not supported by this browser :(");
    }

    addWeather();
}

function showPosition(position) {
    userLON = position.coords.longitude;
    userLAT = position.coords.latitude;

    if (userLON.length < 1 || userLAT.length < 1) {
    	$('.theWeatherDiv').html('Local Coordinates: Blocked by user');
    }
    else {
    	$('.theWeatherDiv').html('Local Coordinates: '+position.coords.longitude+' and '+position.coords.latitude);
    }
}

// Error Handling
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            $('.theWeatherDiv').html('User denied the request for Geolocation.');
            break;
        case error.POSITION_UNAVAILABLE:
            $('.theWeatherDiv').html('Location information is unavailable.');
            break;
        case error.TIMEOUT:
            $('.theWeatherDiv').html('The request to get user location timed out.');
            break;
        case error.UNKNOWN_ERROR:
            $('.theWeatherDiv').html('An unknown error occurred.');
            break;
    }
}

function addWeather () {
	var userLocalTimeHours = new Date().getHours();
	var userLocalTimeMinutes = new Date().getMinutes();

	if (userLocalTimeHours <= 9) {
		userLocalTimeHours = '0'+userLocalTimeHours;
	}
	else if (userLocalTimeMinutes <= 9) {
		userLocalTimeMinutes = '0'+userLocalTimeMinutes;
	}
	document.getElementById('theTimeDiv').innerHTML += ' '+userLocalTimeHours+':'+userLocalTimeMinutes;

	var data = new XMLHttpRequest();
	data.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat='+userLAT+'&lon='+userLON+'&appid=ce08873d7abcedcca577c81c3a1d0689');

	data.onload = function () {
		if (data.status >= 200 && data.status < 400) {
			var ourData = JSON.parse(data.responseText);
			$('.theWeatherDiv').html();
		}
		else {
			$('.theWeatherDiv').html('Server failure, please try again!');
		}
	};

	data.onerror = function () {
		$('.theWeatherDiv').html('Connection error ocurred, please try again!');
	}
}

function loadGenderSVG () {
	var theLoadMan = new XMLHttpRequest();
	theLoadMan.open('GET', 'https://valchy.github.io/EverythingSVG/avatar_man.svg');
	theLoadMan.onload = function () {
		if (theLoadMan.status >= 200 && theLoadMan.status < 400) {
			var info = theLoadMan.responseText;
			$('#div-man-avatar').html(info);
		}
		else {
			$('#insertSVG').html('Server failure '+theLoadMan.status+' , please try again!');
		}
	}	
	theLoadMan.send();

	var theLoadWoman = new XMLHttpRequest();
	theLoadWoman.open('GET', 'https://valchy.github.io/EverythingSVG/avatar_woman.svg');
	theLoadWoman.onload = function () {
		if (theLoadWoman.status >= 200 && theLoadWoman.status < 400) {
			var info = theLoadWoman.responseText;
			$('#div-woman-avatar').html(info);
		}
		else {
			$('#insertSVG').html('Server failure '+theLoadWoman.status+' , please try again!');
		}
	}	
	theLoadWoman.send();
}

function loadSVG (url, pos, id) {
	if (pos == 1) {
		var theLoad = new XMLHttpRequest();
	
		theLoad.open('GET', url);
		theLoad.onload = function () {
			if (theLoad.status >= 200 && theLoad.status < 400) {
				var info = theLoad.responseText;
				$('#theSVGdivoto').html(info);
			}
			else {
				$('#theSVGdivoto').html('Server failure '+theLoad.status+' , please try again!');
			}
		}	
		theLoad.send();
	}
	else if (pos == 2) {
		var theLoad = new XMLHttpRequest();
	
		theLoad.open('GET', url);
		theLoad.onload = function () {
			if (theLoad.status >= 200 && theLoad.status < 400) {
				var info = theLoad.responseText;
				$('.'+id).html(info);
			}
			else {
				$('.'+id).html('Server failure '+theLoad.status+' , please try again!');
			}
		}	
		theLoad.send();
	}
}

function openAvatarChoose (sex) {
$('#theSVGdivoto').html('');
var gender;

	if (sex === 'man') {
		gender = 1;

		for (var i = 0; i < arraySVG[gender].length; i++) {
			var temp = arraySVG[gender][i].url;
			//temp.toString();
			loadSVG(temp, 2);
			$('#insertSVG, .woman-avatar-choose, .choose-avatar-div').hide();
			$('#avatar-selection-div, .man-avatar-choose').show();
		}
	}
	else if (sex === 'woman') {
		gender = 2;

		for (var i = 0; i < arraySVG[gender].length; i++) {
			var temp = arraySVG[gender][i].url;
			// temp.toString();
			loadSVG(temp, 2);
			$('#insertSVG, .man-avatar-choose, .choose-avatar-div').hide();
			$('#avatar-selection-div, .woman-avatar-choose').show();
		}
	}
}

// Make it so when user clicks out of window the color pannel to hide
function changeAvatarColor (color, nb) {
	var theHTML = document.getElementById('SpanHTML'+nb).innerHTML;
	$('.'+theHTML).css({fill: color.value});
}

function chosenSVG (html, ac) {
var tmp = html.innerHTML;

	$('#theSVGdivoto').html(tmp).show();
	$('.div-for-avatar').show();
	$('#avatar-selection-div').hide();
	loadAvatarCustomisation(ac);
}

function loadAvatarCustomisation (specs) {
	for (var i = 1; i <= specs.length; i++) {
		$('.flex-container-avatar-color').append($('<div/>', {'class': 'avatar-color-flex', 'id': 'LAC'+i}).append($('<span/>', {'id': 'SpanHTML'+i, 'html': specs[i-1]})));
		var theHTML = document.getElementById('SpanHTML'+i).innerHTML;
		var RGBvalue = $('.'+theHTML).css('fill');
		var hex = rgb2hex(RGBvalue);
		$('#LAC'+i).append($('<input/>', {'type': 'color', 'value': hex, 'class': 'color-picker-profile-picture', 'oninput': 'changeAvatarColor (this, '+i+');'}));
	}
}

function rgb2hex (rgb) {
	rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	return (rgb && rgb.length === 4) ? "#" +
	("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
	("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
	("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}