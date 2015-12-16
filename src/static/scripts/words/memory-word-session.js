let createMemoryWordSession = function (scope, wordList) {
  let currentWord;
  let easyWords = [];
  let hardWords = [];

  let updateMemoryWords = function () {
    if (hardWords.length == 0) {
      scope.completeSession();
      return "SessionComplete";
    }
    setHardWord();
  }

  let setHardWord = function () {
    let index;
    let currentWordHardListIndex = $.inArray(currentWord, hardWords);
    if (currentWordHardListIndex != -1 && hardWords.length > 1) {
      let copyList = hardWords.slice(0);
      copyList.splice(currentWordHardListIndex, 1);
      let copyIndex = Math.floor(Math.random() * copyList.length);
      let cardChosenFromCopyList = copyList[copyIndex];
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
