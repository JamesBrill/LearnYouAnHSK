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
	else
	{
		InteractionController.handleDifficultyKey(code);
	}
}

InteractionController.difficultyKeyHandler = function(e)
{
	var code = e.keyCode || e.which;
	InteractionController.handleDifficultyKey(code);
}

InteractionController.handleDifficultyKey = function(code)
{
	if (code == KeyCode.Q)
	{
		flashcardController.markFlashcardAsEasy();
	}	
	else if (code == KeyCode.W)
	{
		flashcardController.markFlashcardAsHard();
	}
}