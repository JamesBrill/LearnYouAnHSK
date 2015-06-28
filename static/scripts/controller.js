function Controller() 
{
	this.states = 
	[
		"ConfigForm",
		"DelegateToFlashcardController",
		"SessionComplete"
	];
	this.stateIndex = 0;
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
			completeSessionView.clear();
			beginSessionView.displayBeginSessionMenu();
			break;
		case "DelegateToFlashcardController":
			beginSessionView.clear();
			flashcardController = new FlashcardController();
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
	beginSessionView.resetButtons();
}

Controller.prototype.repeatSession = function()
{
	this.nextState();
}

Controller.prototype.newSession = function()
{	
	this.nextState();
}