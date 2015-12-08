var createController = function (interactionController, flashcardDisplayMode) {
  var resetAnswerBoxes = function () {
    completeSessionView.resetSessionCompleteButtons();
    flashcardView.resetAnswerBoxes();
    beginSessionView.resetButtons();
  }

  var hskAnalytics = createAnalytics(hskWordList, flashcardDisplayMode);
  canvas.getBackground().mouseover(function () { resetAnswerBoxes(); });

  var displayModeGetter = function () {
    return flashcardDisplayMode;
  }

  var displayModeSetter = function (value) {
    flashcardDisplayMode = value;
  }

  var flashcardView = createFlashcardView(displayModeGetter);
  var beginSessionView = createBeginSessionView(displayModeSetter);
  var completeSessionView = createCompleteSessionView();

  return {
    beginSession : function () {
      hskcreateAnalytics = createAnalytics(hskWordList, flashcardDisplayMode);
      hskAnalytics.reportBeginSession();
      completeSessionView.clear();
      beginSessionView.clear();
      beginSessionView.showCreateNewSessionButton();
      flashcardController = createFlashcardController(interactionController, flashcardView);
      flashcardController.startNewFlashcard();
    },
    completeSession : function () {
      hskAnalytics.reportCompleteSession();
      flashcardView.clear();
      flashcardController = null;
      interactionController.beginAwaitingSessionCompleteKey();
      completeSessionView.displaySessionCompleteMenu();
    },
    newSession : function () {
      beginSessionView.clear();
      beginSessionView.hideCreateNewSessionButton();
      flashcardView.clear();
      flashcardController = null;
      completeSessionView.clear();
      beginSessionView.displayBeginSessionMenu();
    }
  };
}
