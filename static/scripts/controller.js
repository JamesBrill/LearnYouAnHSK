var controller = function (interactionController, 
						   flashcardView, 
						   beginSessionView, 
						   completeSessionView) {
	var resetAnswerBoxes = function () {
		completeSessionView.resetSessionCompleteButtons();
		flashcardView.resetAnswerBoxes();
		beginSessionView.resetButtons();
	}

	var configureForm = function () {
		beginSessionView.clear();
		beginSessionView.hideCreateNewSessionButton();
		flashcardView.clear();
		hskFlashcardController = null;
		completeSessionView.clear();
		beginSessionView.displayBeginSessionMenu();
	}

	var delegateToFlashcardController = function () {
		hskAnalytics = analytics(hskWordList, FLASHCARD_DISPLAY_MODE);
		hskAnalytics.reportBeginSession();
		completeSessionView.clear();
		beginSessionView.clear();
		beginSessionView.showCreateNewSessionButton();
		hskFlashcardController = flashcardController(interactionController, flashcardView);
		hskFlashcardController.startNewFlashcard();
	}

	var completeSession = function () {
		hskAnalytics.reportCompleteSession();
		flashcardView.clear();
		hskFlashcardController = null;
		interactionController.beginAwaitingSessionCompleteKey();
		completeSessionView.displaySessionCompleteMenu();
	}

	var hskPhases = [ "ConfigForm", "DelegateToFlashcardController", "SessionComplete"	];
	var hskPhaseActions = [ configureForm, delegateToFlashcardController, completeSession ];
	var phases = phaseIterator(hskPhases, hskPhaseActions);

	var hskAnalytics = analytics(hskWordList, FLASHCARD_DISPLAY_MODE);
	canvas.getBackground().mouseover(function() { resetAnswerBoxes(); });

	return {
		beginSession : function () {
			phases.gotoPhase("DelegateToFlashcardController");
		},
		completeSession : function () {
			phases.gotoPhase("SessionComplete");
		},
		newSession : function () {
			phases.gotoPhase("ConfigForm");
		}
	};
}