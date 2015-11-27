var flashcardController = function (interactionController, flashcardView) {
  var memoryWordSession = new MemoryWordSession();
  var remainingCards = memoryWordSession.numberOfRemainingCards(); 
  flashcardView.setCounters(0, remainingCards);
  flashcardView.showCounters();

  var displayNextQuestion = function () { 
    flashcardView.clearFlashcard();
    if (memoryWordSession.updateMemoryWords() !== "SessionComplete") {
      var memoryWord = memoryWordSession.currentWord;
      flashcardView.displayQuestion(memoryWord);
      interactionController.beginAwaitingSpacebar();
    }
  }

  var displayAnswer = function () {
    var memoryWord = memoryWordSession.currentWord;
    flashcardView.displayAnswer(memoryWord);
    interactionController.beginAwaitingDifficultyKey();
  }

  var flashcardPhases = [ "DisplayNextQuestion", "DisplayAnswer" ];
  var flashcardPhaseActions = [ displayNextQuestion, displayAnswer ];
  var phases = phaseIterator(flashcardPhases, flashcardPhaseActions);

  return {
    startNewFlashcard : function () {
      phases.gotoPhase("DisplayNextQuestion");  
    },
    markFlashcardAsEasy : function () {
      memoryWordSession.markCurrentWordAsEasy();
      var discardedCards = memoryWordSession.numberOfDiscardedCards();
      var remainingCards = memoryWordSession.numberOfRemainingCards();
      flashcardView.setCounters(discardedCards, remainingCards);
      this.startNewFlashcard();
    },
    revealAnswer : function () {
      var phase = phases.currentPhase();
      if (phase == "DisplayNextQuestion")
      {
        phases.gotoPhase("DisplayAnswer");
      } 
    }
  };
}