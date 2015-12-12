var createInteractionController = function (scope) {
  var SPACEBAR = 32;
  var Q = 113;
  var W = 119;
  var R = 114;
  var N = 110;

  var spacebarHandler = function (e) {
    var code = e.keyCode || e.which;
    if (code == SPACEBAR) {
      scope.showAnswer();
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
      scope.markEasy();
    }
    else if (code == W) {
      scope.markHard();
    }
  }

  var handleSessionCompleteKey = function (code) {
    if (code == R) {
      scope.beginSession();
    }
    else if (code == N) {
      scope.newSession();
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
    },
    disable : function () {
      $(document).off();
    }
  };
}
