var TEXT_SIZE = window.innerWidth / 10;
var FLASHCARD_DISPLAY_MODE = FlashcardDisplayMode.CHARACTERS_AND_PINYIN;
var hskWordList = new WordList(1);
var hskController;
var hskFlashcardController;
var beginSessionView;
var completeSessionView;
var canvas;

$(document).ready(function () 
{  
	var init = function()
	{
		canvas = canvas();
		hskController = controller(interactionController(), new FlashcardView());
		hskController.processState();
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