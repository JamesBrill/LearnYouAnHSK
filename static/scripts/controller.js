function Controller() 
{
	this.states = 
	[
		"ConfigForm",
		"DelegateToFlashcardController",
		"SessionComplete"
	];
	this.stateIndex = 0;
	flashcardView = new FlashcardView();
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
			this.nextState();
			break;
		default: 
			alert("Invalid state.");
	}
}