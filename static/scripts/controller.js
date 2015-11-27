var controller = function (interactionController, 
						   flashcardView, 
						   beginSessionView, 
						   completeSessionView) {
	var states = 
	[
		"ConfigForm",
		"DelegateToFlashcardController",
		"SessionComplete"
	];
	var hskAnalytics = analytics(hskWordList, FLASHCARD_DISPLAY_MODE);
	var stateIndex = 0;	
	canvas.getBackground().mouseover(function() { resetAnswerBoxes(); });

	var resetAnswerBoxes = function () {
		completeSessionView.resetSessionCompleteButtons();
		flashcardView.resetAnswerBoxes();
		beginSessionView.resetButtons();
	}

	return {
		nextState : function () {
			var numberOfStates = states.length;
			stateIndex = (stateIndex + 1) % numberOfStates;
			this.processState();
		},
		processState : function () {
			var state = states[stateIndex];
			switch (state)
			{
				case "ConfigForm":			
					completeSessionView.clear();
					beginSessionView.displayBeginSessionMenu();
					break;
				case "DelegateToFlashcardController":
					hskAnalytics = analytics(hskWordList, FLASHCARD_DISPLAY_MODE);
					hskAnalytics.reportBeginSession();
					beginSessionView.clear();
					beginSessionView.showCreateNewSessionButton();
					hskFlashcardController = flashcardController(interactionController, flashcardView);
					hskFlashcardController.startNewFlashcard();
					break;
				case "SessionComplete":
					hskAnalytics.reportCompleteSession();
					flashcardView.clear();
					hskFlashcardController = null;
					interactionController.beginAwaitingSessionCompleteKey();
					completeSessionView.displaySessionCompleteMenu();
					break;
				default: 
					alert("Invalid state.");
			}
		},
		repeatSession : function () {
			completeSessionView.clear();
			stateIndex = 1;
			this.processState();
		},
		newSession : function () {
			completeSessionView.clear();
			beginSessionView.clear();
			beginSessionView.hideCreateNewSessionButton();
			flashcardView.clear();
			stateIndex = 0;
			this.processState();
		}
	};
}