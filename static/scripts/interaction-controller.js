var interactionController = function () {
  var SPACEBAR = 32;
  var Q = 113;
  var W = 119;
  var R = 114;
  var N = 110;

  var spacebarHandler = function (e) {
    var code = e.keyCode || e.which;
    if (code == SPACEBAR) {
      flashcardController.revealAnswer();
    }
    else {
      handleDifficultyKey(code);
    }
  }

  var difficultyKeyHandler = function (e) {
    var code = e.keyCode || e.which;
    handleDifficultyKey(code);
  }

  var sessionCompleteKeyHandler = function (e) {
    var code = e.keyCode || e.which;
    handleSessionCompleteKey(code);
  }

  var handleDifficultyKey = function (code) {
    if (code == Q) {
      flashcardController.markFlashcardAsEasy();
    }
    else if (code == W) {
      flashcardController.markFlashcardAsHard();
    }
  }

  var handleSessionCompleteKey = function (code) {
    if (code == R) {
      controller.repeatSession();
    }
    else if (code == N) {
      controller.newSession();
    }
  }

  return {
    beginAwaitingSpacebar : function () {
      $(document).off();
      $(document).keypress(spacebarHandler);
    },
    beginAwaitingDifficultyKey : function () {
      $(document).off();
      $(document).keypress(difficultyKeyHandler);
    },
    beginAwaitingSessionCompleteKey : function () {
      $(document).off();
      $(document).keypress(sessionCompleteKeyHandler);
    }
  };
}