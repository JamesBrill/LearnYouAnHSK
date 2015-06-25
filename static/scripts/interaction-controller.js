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

InteractionController.prototype.beginAwaitingSessionCompleteKey = function()
{
	$(document).off();
	$(document).keypress(InteractionController.sessionCompleteKeyHandler);
}


InteractionController.spacebarHandler = function(e)
{
	var code = e.keyCode || e.which;
	if (code == KeyCode.SPACEBAR)
	{
		flashcardController.revealAnswer();
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

InteractionController.sessionCompleteKeyHandler = function(e)
{
	var code = e.keyCode || e.which;
	InteractionController.handleSessionCompleteKey(code);
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

InteractionController.handleSessionCompleteKey = function(code)
{
	if (code == KeyCode.R)
	{
		controller.repeatSession();
	}	
	else if (code == KeyCode.N)
	{
		controller.newSession();
	}
}