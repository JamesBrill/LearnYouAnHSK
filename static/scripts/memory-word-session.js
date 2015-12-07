function MemoryWordSession()
{
	this.currentWord;
	this.easyWords = [];
	this.hardWords = this.buildWordList();
	this.updateMemoryWords();
}

MemoryWordSession.prototype.updateMemoryWords = function()
{
	if (this.hardWords.length == 0)
	{
		controller.completeSession();
		return "SessionComplete";
	}
	this.setHardWord();
}

MemoryWordSession.prototype.setHardWord = function()
{
	var index;
	var currentWordHardListIndex = $.inArray(this.currentWord, this.hardWords);
	if (currentWordHardListIndex != -1 && this.hardWords.length > 1)
	{
		var copyList = this.hardWords.slice(0);
		copyList.splice(currentWordHardListIndex, 1);
		var copyIndex = Math.floor(Math.random() * copyList.length);
		var cardChosenFromCopyList = copyList[copyIndex];
		index = $.inArray(cardChosenFromCopyList, this.hardWords);
	}
	else
	{
		index = Math.floor(Math.random() * this.hardWords.length);
	}
	this.currentWord = this.hardWords[index];
}

MemoryWordSession.prototype.markCurrentWordAsEasy = function()
{
	this.hardWords.splice($.inArray(this.currentWord, this.hardWords), 1);
	console.log(this.currentWord.meaning + " moved from HARD to EASY");
	this.easyWords.push(this.currentWord);
}

MemoryWordSession.prototype.buildWordList = function()
{
	var wordList = [];
	if (hskWordList.isHskVersionActive(1))
	{
		$.merge(wordList, HSK1MemoryWords);
	}
	if (hskWordList.isHskVersionActive(2))
	{
		$.merge(wordList, HSK2MemoryWords);
	}
	return wordList;
}

MemoryWordSession.prototype.numberOfDiscardedCards = function()
{
	return this.easyWords.length;
}

MemoryWordSession.prototype.numberOfRemainingCards = function()
{
	return this.hardWords.length;
}
