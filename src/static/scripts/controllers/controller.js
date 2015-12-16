let createController = function (flashcardDisplayMode, textSize) {
  let flashcardController;

  let resetAnswerBoxes = function () {
    completeSessionView.resetSessionCompleteButtons();
    if (flashcardController) {
      flashcardController.resetAnswerBoxes();
    };
    beginSessionView.resetButtons();
  }

  let canvas = createCanvas();
  canvas.getBackground().mouseover(function () { resetAnswerBoxes(); });

  let wordList = createWordList(1);
  let hskAnalytics = createAnalytics(wordList, flashcardDisplayMode);

  let beginSession = function () {
    hskAnalytics = createAnalytics(wordList, flashcardDisplayMode);
    hskAnalytics.reportBeginSession();
    completeSessionView.clear();
    beginSessionView.clear();
    beginSessionView.showCreateNewSessionButton();
    flashcardController = createFlashcardController(scope,
                                                    canvas,
                                                    interactionController,
                                                    wordList,
                                                    textSize);
    flashcardController.startNewFlashcard();
  }

  let completeSession = function () {
    hskAnalytics.reportCompleteSession();
    if (flashcardController) {
      flashcardController.clear();
    }
    interactionController.beginAwaitingSessionCompleteKey();
    completeSessionView.displaySessionCompleteMenu();
  }

  let newSession = function () {
    beginSessionView.clear();
    beginSessionView.hideCreateNewSessionButton();
    if (flashcardController) {
      flashcardController.clear();
    }
    interactionController.disable();
    completeSessionView.clear();
    beginSessionView.displayBeginSessionMenu();
  }

  let scope = {
    getDisplayMode : function () {
      return flashcardDisplayMode;
    },
    setDisplayMode : function (value) {
      flashcardDisplayMode = value;
    },
    beginSession : beginSession,
    completeSession : completeSession,
    newSession : newSession
  };

  let beginSessionView = createBeginSessionView(scope, canvas, wordList, textSize);
  let completeSessionView = createCompleteSessionView(scope, canvas, textSize);

  let interactionController = createInteractionController(scope);

  return {
    beginSession : beginSession,
    completeSession : completeSession,
    newSession : newSession
  };
}
