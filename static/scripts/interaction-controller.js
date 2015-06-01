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

InteractionController.spacebarHandler = function(e)
{
	var code = e.keyCode || e.which;
	if (code == KeyCode.SPACEBAR)
	{
		flashcardController.nextPhase();
	}
}

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