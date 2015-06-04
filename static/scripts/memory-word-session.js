function MemoryWordSession() 
{
	this.currentWord = MemoryWords[0];
	this.currentDifficulty = "hard";
	this.easyWords = [];
	this.mediumWords = [];
	this.hardWords = MemoryWords.slice();
}

MemoryWordSession.prototype.updateMemoryWords = function()
{
	if (this.mediumWords.length == 0 && this.hardWords.length == 0)
	{
		alert("SESSION COMPLETE. WELL DONE!");
		return;
	}

	if (this.mediumWords.length == 0)
	{		
		this.setHardWord();
		return;
	}

	if (this.hardWords.length == 0)
	{
		this.setMediumWord();
		return;
	}

	var difficulty = this.getRandomDifficulty();
	if (difficulty == 0)
	{
		this.setMediumWord();
	}
	else
	{
		this.setHardWord();		
	}
}

MemoryWordSession.prototype.setHardWord = function()
{
	var index = Math.floor(Math.random() * this.hardWords.length);
	this.currentWord = this.hardWords[index];
	this.currentDifficulty = "hard";	
}

MemoryWordSession.prototype.setMediumWord = function()
{
	var index = Math.floor(Math.random() * this.mediumWords.length);
	this.currentWord = this.mediumWords[index];
	this.currentDifficulty = "medium";	
}

MemoryWordSession.prototype.getRandomDifficulty = function()
{
	var difficultyRange = Math.max(20 / this.mediumWords.length, 3);
	return Math.floor(Math.random() * difficultyRange);
}

MemoryWordSession.prototype.markCurrentWordAsEasy = function()
{
	if (this.currentDifficulty == "hard")
	{
		this.hardWords.splice($.inArray(this.currentWord, this.hardWords), 1);
		console.log(this.currentWord.meaning + " moved from HARD to EASY");
	}
	else if (this.currentDifficulty == "medium")
	{
		this.mediumWords.splice($.inArray(this.currentWord, this.mediumWords), 1);
		console.log(this.currentWord.meaning + " moved from MEDIUM to EASY");
	}
	this.easyWords.push(this.currentWord);
}

MemoryWordSession.prototype.markCurrentWordAsMedium = function()
{
	if (this.currentDifficulty == "hard")
	{
		this.hardWords.splice($.inArray(this.currentWord, this.hardWords), 1);
		this.mediumWords.push(this.currentWord);
		console.log(this.currentWord.meaning + " moved from HARD to MEDIUM");
	}
}

MemoryWordSession.prototype.markCurrentWordAsHard = function()
{
	if (this.currentDifficulty == "medium")
	{
		this.mediumWords.splice($.inArray(this.currentWord, this.mediumWords), 1);
		this.hardWords.push(this.currentWord);	
		console.log(this.currentWord.meaning + " moved from MEDIUM to HARD");
	}
}