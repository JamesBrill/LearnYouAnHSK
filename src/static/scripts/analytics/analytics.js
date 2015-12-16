let createAnalytics = function (sessionWordList, sessionDisplayMode) {
  let getHskWordListForAnalytics = function () {
    let hsk1Active = sessionWordList.isHskVersionActive(1);
    let hsk2Active = sessionWordList.isHskVersionActive(2);
    if (hsk1Active && hsk2Active) {
      return "HSK_1_and_2";
    }
    if (hsk1Active) {
      return "HSK_1";
    }
    return "HSK_2";
  }

  let getDisplayModeForAnalytics = function () {
    switch (sessionDisplayMode) {
      case FlashcardDisplayMode.CHARACTERS :
        return "Characters";
      case FlashcardDisplayMode.PINYIN :
        return "Pinyin";
      case FlashcardDisplayMode.ENGLISH :
        return "English";
      case FlashcardDisplayMode.CHARACTERS_AND_PINYIN :
        return "Characters_and_pinyin";
    }
  }

  let reportSessionEvent = function (action) {
    ga('send', 'event', 'sessions', action, sessionWordListName);
    ga('send', 'event', 'sessions', action, sessionDisplayModeName);
  }

  let sessionWordListName = getHskWordListForAnalytics();
  let sessionDisplayModeName = getDisplayModeForAnalytics();

  return {
    reportBeginSession : function () {
      reportSessionEvent("begin");
    },
    reportCompleteSession : function () {
      reportSessionEvent("complete");
    }
  }
}
