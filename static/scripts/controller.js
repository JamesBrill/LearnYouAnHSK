var controller = function (interactionController, 
                           flashcardView, 
                           beginSessionView, 
                           completeSessionView) {
  var resetAnswerBoxes = function () {
    completeSessionView.resetSessionCompleteButtons();
    flashcardView.resetAnswerBoxes();
    beginSessionView.resetButtons();
  }

  var hskAnalytics = analytics(hskWordList, FLASHCARD_DISPLAY_MODE);
  canvas.getBackground().mouseover(function() { resetAnswerBoxes(); });

  return {
    beginSession : function () {
      hskAnalytics = analytics(hskWordList, FLASHCARD_DISPLAY_MODE);
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