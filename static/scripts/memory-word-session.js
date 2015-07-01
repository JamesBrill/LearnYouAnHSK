function MemoryWordSession() 
{
	this.currentWord;
	this.currentDifficulty;
	this.easyWords = [];
	this.hardWords = (HSK_WORDLIST == 1) ? HSK1MemoryWords.slice() : HSK2MemoryWords.slice();
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
	this.currentDifficulty = "hard";	
}

MemoryWordSession.prototype.markCurrentWordAsEasy = function()
{
	this.hardWords.splice($.inArray(this.currentWord, this.hardWords), 1);
	console.log(this.currentWord.meaning + " moved from HARD to EASY");
	this.easyWords.push(this.currentWord);
}