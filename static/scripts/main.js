var TEXT_SIZE = window.innerWidth / 10;
var hskWordList = new WordList(1);
var hskController;
var hskFlashcardController;
var canvas;

$(document).ready(function ()
{
	var init = function()
	{
		canvas = canvas();
    var flashcardDisplayMode = FlashcardDisplayMode.CHARACTERS_AND_PINYIN;;
		hskController = controller(interactionController(),
								   new FlashcardView(),
								   new BeginSessionView(),
								   new CompleteSessionView(),
                   flashcardDisplayMode);
		hskController.newSession();
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
