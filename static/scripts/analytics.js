function Analytics() {}

Analytics.reportBeginSession = function(wordList, displayMode)
{
	Analytics.reportSessionEvent("begin", wordList, displayMode);
}

Analytics.reportCompleteSession = function(wordList, displayMode)
{
	Analytics.reportSessionEvent("complete", wordList, displayMode);	
}

Analytics.reportSessionEvent = function(action, wordList, displayMode)
{
	var wordList = Analytics.getHskWordListForAnalytics(wordList);
	var displayMode = Analytics.getDisplayModeForAnalytics(displayMode);
	ga('send', 'event', 'sessions', action, wordList);
	ga('send', 'event', 'sessions', action, displayMode);	
}

Analytics.getHskWordListForAnalytics = function(wordList)
{
	var hsk1Active = wordList.isHskVersionActive(1);
	var hsk2Active = wordList.isHskVersionActive(2);
	if (hsk1Active && hsk2Active)
	{
		return "HSK_1_and_2";
	}
	if (hsk1Active)
	{
		return "HSK_1";
	}
	return "HSK_2";
}

Analytics.getDisplayModeForAnalytics = function(displayMode)
{
	switch (displayMode)
	{
		case FlashcardDisplayMode.CHARACTERS:
			return "Characters";
		case FlashcardDisplayMode.PINYIN:
			return "Pinyin";
		case FlashcardDisplayMode.ENGLISH:
			return "English";
		case FlashcardDisplayMode.CHARACTERS_AND_PINYIN:
			return "Characters_and_pinyin";
	}
}