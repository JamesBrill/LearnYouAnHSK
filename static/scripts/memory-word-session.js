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
		controller.nextState();
		return "SessionComplete";
	}
	this.setHardWord();	
}

MemoryWordSession.prototype.setHardWord = function()
{
	var index = Math.floor(Math.random() * this.hardWords.length);
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