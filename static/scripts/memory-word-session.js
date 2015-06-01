function MemoryWordSession() 
{
	this.currentIndex = 0;
}

MemoryWordSession.prototype.getMemoryWord = function()
{
	return MemoryWords[this.currentIndex];
}

MemoryWordSession.prototype.updateMemoryWords = function()
{
	this.currentIndex = Math.floor(Math.random() * MemoryWords.length);
}