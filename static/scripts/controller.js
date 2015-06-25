function Controller() 
{
	flashcardController = new FlashcardController();
}

Controller.prototype.performPhase = function()
{
	this.flashcardController.performPhase();
}