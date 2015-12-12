var createController = function (flashcardDisplayMode, textSize) {
  var flashcardController;

  var resetAnswerBoxes = function () {
    completeSessionView.resetSessionCompleteButtons();
    if (flashcardController) {
      flashcardController.resetAnswerBoxes();
    };
    beginSessionView.resetButtons();
  }

  var canvas = createCanvas();
  canvas.getBackground().mouseover(function () { resetAnswerBoxes(); });

  var wordList = createWordList(1);
  var hskAnalytics = createAnalytics(wordList, flashcardDisplayMode);

  var beginSession = function () {
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

  var completeSession = function () {
    hskAnalytics.reportCompleteSession();
    if (flashcardController) {
      flashcardController.clear();
    }
    interactionController.beginAwaitingSessionCompleteKey();
    completeSessionView.displaySessionCompleteMenu();
  }

  var newSession = function () {
    beginSessionView.clear();
    beginSessionView.hideCreateNewSessionButton();
    if (flashcardController) {
      flashcardController.clear();
    }
    interactionController.disable();
    completeSessionView.clear();
    beginSessionView.displayBeginSessionMenu();
  }

  var scope = {
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

  var beginSessionView = createBeginSessionView(scope, canvas, wordList, textSize);
  var completeSessionView = createCompleteSessionView(scope, canvas, textSize);

  var interactionController = createInteractionController(scope);

  return {
    beginSession : beginSession,
    completeSession : completeSession,
    newSession : newSession
  };
}
