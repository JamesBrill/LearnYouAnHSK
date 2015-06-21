function FlashcardController() 
{
	this.flashcardPhases = 
	[
		"DisplayQuestion",
		"AwaitSpacebar",
		"DisplayAnswer",
		"AwaitDifficultyKey",
		"ClearFlashcard"
	];
	this.flashcardPhaseIndex = 0;
	this.interactionController = new InteractionController();
	this.flashcardView = new FlashcardView();
	this.memoryWordSession = new MemoryWordSession();
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
			this.flashcardView.displayQuestion(memoryWord);
			this.nextPhase();
			break;
		case "AwaitSpacebar":
			this.interactionController.beginAwaitingSpacebar();
			break;
		case "DisplayAnswer":
			var memoryWord = this.memoryWordSession.currentWord;
			this.flashcardView.displayAnswer(memoryWord);
			this.nextPhase();
			break;
		case "AwaitDifficultyKey":
			this.interactionController.beginAwaitingDifficultyKey();
			break;
		case "ClearFlashcard":
			this.flashcardView.clearFlashcard();
			this.memoryWordSession.updateMemoryWords();
			this.nextPhase();
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