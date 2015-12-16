let createInteractionController = function (scope) {
  const SPACEBAR = 32;
  const Q = 113;
  const W = 119;
  const R = 114;
  const N = 110;

  let spacebarHandler = function (e) {
    let code = e.keyCode || e.which;
    if (code == SPACEBAR) {
      scope.showAnswer();
    }
    else {
      handleDifficultyKey(code);
    }
  }

  let difficultyKeyHandler = function (e) {
    let code = e.keyCode || e.which;
    handleDifficultyKey(code);
  }

  let sessionCompleteKeyHandler = function (e) {
    let code = e.keyCode || e.which;
    handleSessionCompleteKey(code);
  }

  let handleDifficultyKey = function (code) {
    if (code == Q) {
      scope.markEasy();
    }
    else if (code == W) {
      scope.markHard();
    }
  }

  let handleSessionCompleteKey = function (code) {
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
