function FlashcardView() 
{
	this.question;
	this.answer;
	this.FLASHCARD_TOP = 0.1 * canvas.height;
	this.discardedCounter = canvas.drawText(0.1 * canvas.width, 0.4 * canvas.height, "Discarded: 0", "Helvetica", 0.25 * TEXT_SIZE);
	this.remainingCounter = canvas.drawText(0.1 * canvas.width, 0.5 * canvas.height, "Remaining: 0", "Helvetica", 0.25 * TEXT_SIZE);
	this.answerBoxes;
	this.answerBoxSize = 1.2 * TEXT_SIZE;
	if (FLASHCARD_DISPLAY_MODE == FlashcardDisplayMode.CHARACTERS_AND_PINYIN)
	{
		this.initAnswerBoxes(this.FLASHCARD_TOP + 3.6 * TEXT_SIZE);
	}
	else
	{
		this.initAnswerBoxes(this.FLASHCARD_TOP + 2.5 * TEXT_SIZE);
	}
	this.hideAnswerBoxes();
	this.hideCounters();
}

FlashcardView.prototype.displayQuestion = function(memoryWord)
{
	var question;
	switch (FLASHCARD_DISPLAY_MODE)
	{
		case FlashcardDisplayMode.CHARACTERS:
			question = this.drawChinese(memoryWord.characters, this.FLASHCARD_TOP);
			break;
		case FlashcardDisplayMode.PINYIN:
			question = this.drawChinese(memoryWord.pinyin, this.FLASHCARD_TOP);
			break;
		case FlashcardDisplayMode.ENGLISH:
			question = this.drawEnglish(memoryWord.meaning, this.FLASHCARD_TOP);
			break;
		case FlashcardDisplayMode.CHARACTERS_AND_PINYIN:
			var question = canvas.draw.group();
			question.add(this.drawChinese(memoryWord.characters, this.FLASHCARD_TOP));
			question.add(this.drawChinese(memoryWord.pinyin, this.FLASHCARD_TOP + TEXT_SIZE));
			break;
		default:
			console.log("Invalid flashcard display mode.")
	}
	this.question = question;
	this.showAnswerBoxes();
}

FlashcardView.prototype.initAnswerBoxes = function(height)
{
	var easyBoxElements = this.drawAnswerBox(0.3 * canvas.width, 
											 height, 
											 ["Too easy [Q]"], 
											 "green", 
											 0.15 * this.answerBoxSize,
											 function() { flashcardController.markFlashcardAsEasy(); });
	var showAnswerBoxElements = this.drawAnswerBox(0.5 * canvas.width, 
												   height, 
												   ["Show answer", "[Space]"], 
												   "gray", 
												   0.05 * this.answerBoxSize,
												   function() { flashcardController.revealAnswer(); });
	var hardBoxElements = this.drawAnswerBox(0.7 * canvas.width, 
											 height, 
											 ["Not easy [W]"], 
											 "red", 
											 0.15 * this.answerBoxSize,
											 function() { flashcardController.markFlashcardAsHard(); });
	this.answerBoxes = [ easyBoxElements, showAnswerBoxElements, hardBoxElements ];
}

FlashcardView.prototype.drawAnswerBox = function(x, y, text, colour, offset, clickHandler)
{
	return canvas.drawButton(x, y, text, colour, offset, clickHandler, this.answerBoxSize);
}

FlashcardView.prototype.resetAnswerBoxes = function()
{
	for (var i = 0; i < 3; i++)
	{
		this.answerBoxes[i].box.attr({ stroke: null });
	}	
}

FlashcardView.prototype.showAnswerBoxes = function()
{
	for (var i = 0; i < 3; i++)
	{
		this.answerBoxes[i].box.show();
		this.answerBoxes[i].text.show();	
	}
}

FlashcardView.prototype.hideAnswerBoxes = function()
{
	for (var i = 0; i < 3; i++)
	{
		this.answerBoxes[i].box.hide();
		this.answerBoxes[i].text.hide();	
	}
}

FlashcardView.prototype.showCounters = function()
{
	this.discardedCounter.show();
	this.remainingCounter.show();
}

FlashcardView.prototype.hideCounters = function()
{
	this.discardedCounter.hide();
	this.remainingCounter.hide();
}

FlashcardView.prototype.setCounters = function(discardedCards, remainingCards)
{
	this.discardedCounter.text("Discarded: " + discardedCards);
	this.remainingCounter.text("Remaining: " + remainingCards);
}

FlashcardView.prototype.displayAnswer = function(memoryWord)
{
	var answer;
	switch (FLASHCARD_DISPLAY_MODE)
	{
		case FlashcardDisplayMode.CHARACTERS:
		case FlashcardDisplayMode.PINYIN:
			answer = this.drawEnglish(memoryWord.meaning, this.FLASHCARD_TOP + 1.2 * TEXT_SIZE);
			break;
		case FlashcardDisplayMode.ENGLISH:
			answer = this.drawChinese(memoryWord.pinyin, this.FLASHCARD_TOP + 0.75 * TEXT_SIZE);
			break;
		case FlashcardDisplayMode.CHARACTERS_AND_PINYIN:
			answer = this.drawEnglish(memoryWord.meaning, this.FLASHCARD_TOP + 2.4 * TEXT_SIZE);
			break;
		default:
			console.log("Invalid flashcard display mode.")
	}
	this.answer = answer;
}

FlashcardView.prototype.drawChinese = function(chinese, height)
{
	return canvas.drawText(0.5 * canvas.width, height, chinese, "SimHei", TEXT_SIZE);
}

FlashcardView.prototype.drawEnglish = function(english, height)
{
	var englishSize = (english.length > 15) ? 0.5 * TEXT_SIZE : 0.75 * TEXT_SIZE;
	return canvas.drawText(0.5 * canvas.width, height, english, "Helvetica", englishSize);
}

FlashcardView.prototype.clear = function()
{
	this.clearFlashcard();
	this.hideAnswerBoxes();
	this.hideCounters();
}

FlashcardView.prototype.clearFlashcard = function()
{
	if (this.question != undefined)
	{
		this.question.clear();
	}

	if (this.answer != undefined)
	{
		this.answer.clear();
	}
}