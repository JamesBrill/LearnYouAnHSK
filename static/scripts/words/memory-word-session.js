var createMemoryWordSession = function (scope, wordList) {
  var currentWord;
  var easyWords = [];
  var hardWords = [];

  var updateMemoryWords = function () {
    if (hardWords.length == 0) {
      scope.completeSession();
      return "SessionComplete";
    }
    setHardWord();
  }

  var setHardWord = function () {
    var index;
    var currentWordHardListIndex = $.inArray(currentWord, hardWords);
    if (currentWordHardListIndex != -1 && hardWords.length > 1) {
      var copyList = hardWords.slice(0);
      copyList.splice(currentWordHardListIndex, 1);
      var copyIndex = Math.floor(Math.random() * copyList.length);
      var cardChosenFromCopyList = copyList[copyIndex];
      index = $.inArray(cardChosenFromCopyList, hardWords);
    }
    else {
      index = Math.floor(Math.random() * hardWords.length);
    }
    currentWord = hardWords[index];
  }

  return {
    initWords : function () {
      return wordList.getWordList().then(function (words) {
        hardWords = words;
        updateMemoryWords();
      });
    },
    updateMemoryWords : updateMemoryWords,
    markCurrentWordAsEasy : function () {
      hardWords.splice($.inArray(currentWord, hardWords), 1);
      console.log(currentWord.meaning + " moved from HARD to EASY");
      easyWords.push(currentWord);
    },
    numberOfDiscardedCards : function () {
      return easyWords.length;
    },
    numberOfRemainingCards : function () {
      return hardWords.length;
    },
    getCurrentWord : function () {
      return currentWord;
    }
  };
}
