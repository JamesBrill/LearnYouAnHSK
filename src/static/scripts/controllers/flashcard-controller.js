let createFlashcardController = function (scope, canvas, interactionController, wordList, textSize) {
  let flashcardView;

  let startNewFlashcard = function () {
    wordsInitialised.then(function () {
      flashcardView.clearFlashcard();
      if (memoryWordSession.updateMemoryWords() !== "SessionComplete") {
        let memoryWord = memoryWordSession.getCurrentWord();
        flashcardView.displayQuestion(memoryWord);
        interactionController.beginAwaitingSpacebar();
      }
    });
  }

  let markFlashcardAsEasy = function () {
    wordsInitialised.then(function () {
      memoryWordSession.markCurrentWordAsEasy();
      let discardedCards = memoryWordSession.numberOfDiscardedCards();
      let remainingCards = memoryWordSession.numberOfRemainingCards();
      flashcardView.setCounters(discardedCards, remainingCards);
    });
  }

  let revealAnswer = function () {
    wordsInitialised.then(function () {
      let memoryWord = memoryWordSession.getCurrentWord();
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

  flashcardView = createFlashcardView(scope, canvas, textSize);

  let memoryWordSession = createMemoryWordSession(scope, wordList);
  let wordsInitialised = memoryWordSession.initWords();
  wordsInitialised.then(function () {
    let remainingCards = memoryWordSession.numberOfRemainingCards();
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
