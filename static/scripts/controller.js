function Controller() 
{
	this.states = 
	[
		"ConfigForm",
		"DelegateToFlashcardController",
		"SessionComplete"
	];
	this.stateIndex = 0;
	completeSessionView = new CompleteSessionView();
	flashcardView = new FlashcardView();
	interactionController = new InteractionController();	
	canvas.background.mouseover(function() { this.resetAnswerBoxes(); }.bind(this));
}

Controller.prototype.nextState = function()
{
	var numberOfStates = this.states.length;
	this.stateIndex = (this.stateIndex + 1) % numberOfStates;
	this.processState();
}

Controller.prototype.processState = function()
{
	var state = this.states[this.stateIndex];
	switch (state)
	{
		case "ConfigForm":
			console.log("A");
			this.nextState();
			break;
		case "DelegateToFlashcardController":
			flashcardController = new FlashcardController();
			flashcardController.performPhase();
			break;
		case "SessionComplete":
			console.log("B");
			flashcardView.clear();
			flashcardController = null;
			completeSessionView.displaySessionCompleteMenu();
			break;
		default: 
			alert("Invalid state.");
	}
}

Controller.prototype.resetAnswerBoxes = function()
{
	completeSessionView.resetSessionCompleteButtons();
	flashcardView.resetAnswerBoxes();
}

Controller.prototype.repeatSession = function()
{
	completeSessionView.clear();
	this.stateIndex = 1;
	this.processState();
}

Controller.prototype.newSession = function()
{
	completeSessionView.clear();	
	this.stateIndex = 1;
	this.processState();
}