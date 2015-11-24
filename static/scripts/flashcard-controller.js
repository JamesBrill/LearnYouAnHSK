function FlashcardController(interactionController) 
{
	this.flashcardPhases = 
	[
		"DisplayQuestion",
		"AwaitSpacebar",
		"DisplayAnswer",
		"AwaitDifficultyKey",
		"ClearFlashcard"
	];
	this.interactionController = interactionController;
	this.flashcardPhaseIndex = 0;
	this.memoryWordSession = new MemoryWordSession();
	var remainingCards = this.memoryWordSession.numberOfRemainingCards();	
	flashcardView.setCounters(0, remainingCards);
	flashcardView.showCounters();
}

FlashcardController.prototype.nextPhase = function()
{
	var numberOfPhases = this.flashcardPhases.length;
	this.flashcardPhaseIndex = (this.flashcardPhaseIndex + 1) % numberOfPhases;
	this.performPhase();
}

FlashcardController.prototype.performPhase = function()
{
	var phase = this.flashcardPhases[this.flashcardPhaseIndex];
	switch (phase)
	{
		case "DisplayQuestion":
			var memoryWord = this.memoryWordSession.currentWord;
			flashcardView.displayQuestion(memoryWord);
			this.nextPhase();
			break;
		case "AwaitSpacebar":
			this.interactionController.beginAwaitingSpacebar();
			break;
		case "DisplayAnswer":
			var memoryWord = this.memoryWordSession.currentWord;
			flashcardView.displayAnswer(memoryWord);
			this.nextPhase();
			break;
		case "AwaitDifficultyKey":
			this.interactionController.beginAwaitingDifficultyKey();
			break;
		case "ClearFlashcard":
			flashcardView.clearFlashcard();
			if (this.memoryWordSession.updateMemoryWords() != "SessionComplete")
			{
				this.nextPhase();
			}
			break;
		default: 
			alert("Invalid flashcard phase.");
	}
}

FlashcardController.prototype.markFlashcardAsEasy = function()
{
	var phase = this.flashcardPhases[this.flashcardPhaseIndex];
	if (phase == "AwaitSpacebar")
	{
		this.flashcardPhaseIndex += 2;
	}
	this.memoryWordSession.markCurrentWordAsEasy();
	var discardedCards = this.memoryWordSession.numberOfDiscardedCards();
	var remainingCards = this.memoryWordSession.numberOfRemainingCards();
	flashcardView.setCounters(discardedCards, remainingCards);
	this.nextPhase();
}

FlashcardController.prototype.markFlashcardAsHard = function()
{
	var phase = this.flashcardPhases[this.flashcardPhaseIndex];
	if (phase == "AwaitSpacebar")
	{
		this.flashcardPhaseIndex += 2;
	}
	this.nextPhase();
}

FlashcardController.prototype.revealAnswer = function()
{
	var phase = this.flashcardPhases[this.flashcardPhaseIndex];
	if (phase == "AwaitSpacebar")
	{
		this.nextPhase();
	}	
}