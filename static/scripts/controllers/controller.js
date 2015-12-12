var createController = function (interactionController, flashcardDisplayMode, textSize) {
  var scope = {
    getDisplayMode : function () {
      return flashcardDisplayMode;
    },
    setDisplayMode : function (value) {
      flashcardDisplayMode = value;
    }
  };

  var hskAnalytics = createAnalytics(hskWordList, flashcardDisplayMode);
  var beginSessionView = createBeginSessionView(scope.setDisplayMode, textSize);
  var completeSessionView = createCompleteSessionView(textSize);

  var resetAnswerBoxes = function () {
    completeSessionView.resetSessionCompleteButtons();
    if (flashcardController) {
      flashcardController.resetAnswerBoxes();
    };
    beginSessionView.resetButtons();
  }

  canvas.getBackground().mouseover(function () { resetAnswerBoxes(); });

  return {
    beginSession : function () {
      hskAnalytics = createAnalytics(hskWordList, flashcardDisplayMode);
      hskAnalytics.reportBeginSession();
      completeSessionView.clear();
      beginSessionView.clear();
      beginSessionView.showCreateNewSessionButton();
      flashcardController = createFlashcardController(scope, interactionController, textSize);
      flashcardController.startNewFlashcard();
    },
    completeSession : function () {
      hskAnalytics.reportCompleteSession();
      if (flashcardController) {
        flashcardController.clear();
      }
      interactionController.beginAwaitingSessionCompleteKey();
      completeSessionView.displaySessionCompleteMenu();
    },
    newSession : function () {
      beginSessionView.clear();
      beginSessionView.hideCreateNewSessionButton();
      if (flashcardController) {
        flashcardController.clear();
      }
      completeSessionView.clear();
      beginSessionView.displayBeginSessionMenu();
    }
  };
}
