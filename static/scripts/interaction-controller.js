function InteractionController() {}

InteractionController.prototype.beginAwaitingSpacebar = function()
{
	$(document).off();
	$(document).keypress(InteractionController.spacebarHandler);
}

InteractionController.prototype.beginAwaitingDifficultyKey = function()
{
	$(document).off();
	$(document).keypress(InteractionController.difficultyKeyHandler);
}

function KeyCode() {}

KeyCode.SPACEBAR = 32;

InteractionController.spacebarHandler = function(e)
{
	var code = e.keyCode || e.which;
	if (code == KeyCode.SPACEBAR)
	{
		flashcardController.nextPhase();
	}
}

KeyCode.A = 97;
KeyCode.S = 115;
KeyCode.D = 100;

InteractionController.difficultyKeyHandler = function(e)
{
	var code = e.keyCode || e.which;
	if (code == KeyCode.A)
	{
		flashcardController.markFlashcardAsEasy();
	}	
	else if (code == KeyCode.S)
	{
		flashcardController.markFlashcardAsMedium();
	}	
	else if (code == KeyCode.D)
	{
		flashcardController.markFlashcardAsHard();
	}	
}


