function Controller() 
{
	this.states = 
	[
		"ConfigForm",
		"DelegateToFlashcardController",
		"SessionComplete"
	];
	this.stateIndex = 0;
	this.hskVersion = 1;
	beginSessionView = new BeginSessionView();
	flashcardView = new FlashcardView();
	completeSessionView = new CompleteSessionView();
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
			break;
		case "DelegateToFlashcardController":
			flashcardController = new FlashcardController(this.hskVersion);
			flashcardController.performPhase();
			break;
		case "SessionComplete":
			flashcardView.clear();
			flashcardController = null;
			interactionController.beginAwaitingSessionCompleteKey();
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
	beginSessionView.resetRadioButtons();
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

Controller.prototype.setHSKWordList = function(wordListVersion)
{
	this.hskVersion = wordListVersion;
}