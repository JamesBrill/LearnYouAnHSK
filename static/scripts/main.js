var TEXT_SIZE = window.innerWidth / 10;
var FLASHCARD_DISPLAY_MODE = "CHARACTERS_AND_PINYIN";
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