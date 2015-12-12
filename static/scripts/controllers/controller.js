var createController = function (interactionController, flashcardDisplayMode, textSize) {
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

  var flashcardView = createFlashcardView(displayModeGetter, textSize);
  var beginSessionView = createBeginSessionView(displayModeSetter, textSize);
  var completeSessionView = createCompleteSessionView(textSize);

  return {
    beginSession : function () {
      hskAnalytics = createAnalytics(hskWordList, flashcardDisplayMode);
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