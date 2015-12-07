var controller = function (interactionController,
                           beginSessionView,
                           completeSessionView,
                           flashcardDisplayMode) {
  var resetAnswerBoxes = function () {
    completeSessionView.resetSessionCompleteButtons();
    flashcardView.resetAnswerBoxes();
    beginSessionView.resetButtons();
  }

  var hskAnalytics = analytics(hskWordList, flashcardDisplayMode);
  canvas.getBackground().mouseover(function () { resetAnswerBoxes(); });

  var displayModeGetter = function () {
    return flashcardDisplayMode;
  }

  var displayModeSetter = function (value) {
    flashcardDisplayMode = value;
  }

  var flashcardView = createFlashcardView(displayModeGetter);
  beginSessionView.init(displayModeSetter);

  return {
    beginSession : function () {
      hskAnalytics = analytics(hskWordList, flashcardDisplayMode);
      hskAnalytics.reportBeginSession();
      completeSessionView.clear();
      beginSessionView.clear();
      beginSessionView.showCreateNewSessionButton();
      hskFlashcardController = flashcardController(interactionController, flashcardView);
      hskFlashcardController.startNewFlashcard();
    },
    completeSession : function () {
      hskAnalytics.reportCompleteSession();
      flashcardView.clear();
      hskFlashcardController = null;
      interactionController.beginAwaitingSessionCompleteKey();
      completeSessionView.displaySessionCompleteMenu();
    },
    newSession : function () {
      beginSessionView.clear();
      beginSessionView.hideCreateNewSessionButton();
      flashcardView.clear();
      hskFlashcardController = null;
      completeSessionView.clear();
      beginSessionView.displayBeginSessionMenu();
    }
  };
}
