function Controller() 
{
	this.states = 
	[
		"ConfigForm",
		"DelegateToFlashcardController",
		"SessionComplete"
	];
	this.stateIndex = 0;
	sessionView = new SessionView();
	flashcardView = new FlashcardView();
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
			sessionView.displaySessionCompleteMenu();
			break;
		default: 
			alert("Invalid state.");
	}
}

Controller.prototype.resetAnswerBoxes = function()
{
	sessionView.resetAnswerBoxes();
	flashcardView.resetAnswerBoxes();
}

Controller.prototype.repeatSession = function()
{
	sessionView.clear();
	this.stateIndex = 1;
	this.processState();
}

Controller.prototype.newSession = function()
{
	sessionView.clear();	
	this.stateIndex = 1;
	this.processState();
}