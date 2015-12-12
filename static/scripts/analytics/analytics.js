var createAnalytics = function (sessionWordList, sessionDisplayMode) {
  var getHskWordListForAnalytics = function () {
    var hsk1Active = sessionWordList.isHskVersionActive(1);
    var hsk2Active = sessionWordList.isHskVersionActive(2);
    if (hsk1Active && hsk2Active) {
      return "HSK_1_and_2";
    }
    if (hsk1Active) {
      return "HSK_1";
    }
    return "HSK_2";
  }

  var getDisplayModeForAnalytics = function () {
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

  var reportSessionEvent = function (action) {
    ga('send', 'event', 'sessions', action, sessionWordListName);
    ga('send', 'event', 'sessions', action, sessionDisplayModeName);
  }

  var sessionWordListName = getHskWordListForAnalytics();
  var sessionDisplayModeName = getDisplayModeForAnalytics();

  return {
    reportBeginSession : function () {
      reportSessionEvent("begin");
    },
    reportCompleteSession : function () {
      reportSessionEvent("complete");
    }
  }
}
