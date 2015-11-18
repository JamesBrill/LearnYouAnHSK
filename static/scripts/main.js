var TEXT_SIZE = window.innerWidth / 10;
var FLASHCARD_DISPLAY_MODE = FlashcardDisplayMode.CHARACTERS_AND_PINYIN;
var hskWordList = new WordList(1);
var controller;
var flashcardController;
var interactionController;
var beginSessionView;
var flashcardView;
var completeSessionView;
var canvas;

$(document).ready(function () 
{  
	var init = function()
	{
		canvas = canvas();
		controller = new Controller();
		controller.processState();
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