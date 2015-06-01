var TEXT_SIZE = 200;
var flashcardController;

$(document).ready(function () 
{  
	var init = function()
	{
		flashcardController = new FlashcardController();
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