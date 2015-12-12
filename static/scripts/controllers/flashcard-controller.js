var createFlashcardController = function (interactionController, flashcardView) {
  var memoryWordSession = createMemoryWordSession();
  var wordsInitialised = memoryWordSession.initWords();
  wordsInitialised.then(function () {
    var remainingCards = memoryWordSession.numberOfRemainingCards();
    flashcardView.setCounters(0, remainingCards);
    flashcardView.showCounters();
  });

  return {
    startNewFlashcard : function () {
      wordsInitialised.then(function () {
        flashcardView.clearFlashcard();
        if (memoryWordSession.updateMemoryWords() !== "SessionComplete") {
          var memoryWord = memoryWordSession.getCurrentWord();
          flashcardView.displayQuestion(memoryWord);
          interactionController.beginAwaitingSpacebar();
        }
      });
    },
    markFlashcardAsEasy : function () {
      wordsInitialised.then(function () {
        memoryWordSession.markCurrentWordAsEasy();
        var discardedCards = memoryWordSession.numberOfDiscardedCards();
        var remainingCards = memoryWordSession.numberOfRemainingCards();
        flashcardView.setCounters(discardedCards, remainingCards);
      });
    },
    revealAnswer : function () {
      wordsInitialised.then(function () {
        var memoryWord = memoryWordSession.getCurrentWord();
        flashcardView.displayAnswer(memoryWord);
        interactionController.beginAwaitingDifficultyKey();
      });
    }
  };
}
