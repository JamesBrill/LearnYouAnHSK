var createFlashcardController = function (scope, interactionController, textSize) {
  var flashcardView;

  var startNewFlashcard = function () {
    wordsInitialised.then(function () {
      flashcardView.clearFlashcard();
      if (memoryWordSession.updateMemoryWords() !== "SessionComplete") {
        var memoryWord = memoryWordSession.getCurrentWord();
        flashcardView.displayQuestion(memoryWord);
        interactionController.beginAwaitingSpacebar();
      }
    });
  }

  var markFlashcardAsEasy = function () {
    wordsInitialised.then(function () {
      memoryWordSession.markCurrentWordAsEasy();
      var discardedCards = memoryWordSession.numberOfDiscardedCards();
      var remainingCards = memoryWordSession.numberOfRemainingCards();
      flashcardView.setCounters(discardedCards, remainingCards);
    });
  }

  var revealAnswer = function () {
    wordsInitialised.then(function () {
      var memoryWord = memoryWordSession.getCurrentWord();
      flashcardView.displayAnswer(memoryWord);
      interactionController.beginAwaitingDifficultyKey();
    });
  }

  scope.markEasy = function () {
    markFlashcardAsEasy();
    startNewFlashcard();
  }
  scope.showAnswer = revealAnswer;
  scope.markHard = startNewFlashcard;

  flashcardView = createFlashcardView(scope, textSize);

  var memoryWordSession = createMemoryWordSession(scope);
  var wordsInitialised = memoryWordSession.initWords();
  wordsInitialised.then(function () {
    var remainingCards = memoryWordSession.numberOfRemainingCards();
    flashcardView.setCounters(0, remainingCards);
    flashcardView.showCounters();
  });

  return {
    startNewFlashcard : startNewFlashcard,
    markFlashcardAsEasy : markFlashcardAsEasy,
    revealAnswer : revealAnswer,
    resetAnswerBoxes : function () {
      flashcardView.resetAnswerBoxes();
    },
    clear : function () {
      flashcardView.clear();
    }
  };
}
