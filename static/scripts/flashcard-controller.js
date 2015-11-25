function FlashcardController(interactionController) 
{
	var that = this;
	var flashcardPhases = 
	[
		"DisplayNextQuestion",
		"DisplayAnswer"
	];
	var flashcardPhaseActions = 
	[
		function () {
			flashcardView.clearFlashcard();
			if (that.memoryWordSession.updateMemoryWords() !== "SessionComplete") {
				var memoryWord = that.memoryWordSession.currentWord;
				flashcardView.displayQuestion(memoryWord);
				that.interactionController.beginAwaitingSpacebar();
			}
		},
		function () {
			var memoryWord = that.memoryWordSession.currentWord;
			flashcardView.displayAnswer(memoryWord);
			that.interactionController.beginAwaitingDifficultyKey();
		}
	];
	this.phaseIterator = phaseIterator(flashcardPhases, flashcardPhaseActions);
	this.interactionController = interactionController;
	this.memoryWordSession = new MemoryWordSession();
	var remainingCards = this.memoryWordSession.numberOfRemainingCards();	
	flashcardView.setCounters(0, remainingCards);
	flashcardView.showCounters();
}

FlashcardController.prototype.startNewFlashcard = function() 
{
	this.phaseIterator.gotoPhase("DisplayNextQuestion");	
}

FlashcardController.prototype.markFlashcardAsEasy = function()
{
	this.memoryWordSession.markCurrentWordAsEasy();
	var discardedCards = this.memoryWordSession.numberOfDiscardedCards();
	var remainingCards = this.memoryWordSession.numberOfRemainingCards();
	flashcardView.setCounters(discardedCards, remainingCards);
	this.startNewFlashcard();
}

FlashcardController.prototype.markFlashcardAsHard = function()
{
	this.startNewFlashcard();
}

FlashcardController.prototype.revealAnswer = function()
{
	var phase = this.phaseIterator.currentPhase();
	if (phase == "DisplayNextQuestion")
	{
		this.phaseIterator.gotoPhase("DisplayAnswer");
	}	
}