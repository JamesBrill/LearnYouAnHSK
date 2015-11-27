var flashcardController = function (interactionController, flashcardView) {
  var memoryWordSession = new MemoryWordSession();
  var remainingCards = memoryWordSession.numberOfRemainingCards(); 
  flashcardView.setCounters(0, remainingCards);
  flashcardView.showCounters();

  return {
    startNewFlashcard : function () {
      flashcardView.clearFlashcard();
      if (memoryWordSession.updateMemoryWords() !== "SessionComplete") {
        var memoryWord = memoryWordSession.currentWord;
        flashcardView.displayQuestion(memoryWord);
        interactionController.beginAwaitingSpacebar();
      } 
    },
    markFlashcardAsEasy : function () {
      memoryWordSession.markCurrentWordAsEasy();
      var discardedCards = memoryWordSession.numberOfDiscardedCards();
      var remainingCards = memoryWordSession.numberOfRemainingCards();
      flashcardView.setCounters(discardedCards, remainingCards);
    },
    revealAnswer : function () {
      var memoryWord = memoryWordSession.currentWord;
      flashcardView.displayAnswer(memoryWord);
      interactionController.beginAwaitingDifficultyKey();
    }
  };
}