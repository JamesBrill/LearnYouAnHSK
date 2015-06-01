var width;
var height;
var draw;
var TEXT_SIZE = 200;
var flashcardController = new FlashcardController();

$(document).ready(function () 
{  
	var init = function()
	{
		$('#drawing').height("95vh");
		width = $('#drawing').width();
		height = $('#drawing').height();
		draw = SVG('drawing').size("100%", "100%");
		var background = draw.rect("100%", "100%");
		flashcardController.performPhase();
	}

	if (SVG.supported)
	{
		init();
	}
	else
	{
		alert('SVG not supported');
	}
});