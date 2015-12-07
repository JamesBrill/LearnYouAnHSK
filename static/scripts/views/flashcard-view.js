function FlashcardView()
{
	this.question;
	this.answer;
	this.FLASHCARD_TOP = 0.1 * canvas.getHeight();
	this.discardedCounter = canvas.drawText(0.1 * canvas.getWidth(), 0.4 * canvas.getHeight(), "Discarded: 0", "Helvetica", 0.25 * TEXT_SIZE);
	this.remainingCounter = canvas.drawText(0.1 * canvas.getWidth(), 0.5 * canvas.getHeight(), "Remaining: 0", "Helvetica", 0.25 * TEXT_SIZE);
}

FlashcardView.prototype.init = function(displayModeGetter)
{
  this.displayModeGetter = displayModeGetter;
  this.answerBoxes;
  this.answerBoxSize = 1.2 * TEXT_SIZE;
  if (this.displayModeGetter() == FlashcardDisplayMode.CHARACTERS_AND_PINYIN)
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
	switch (this.displayModeGetter())
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
			question = canvas.drawGroup([this.drawChinese(memoryWord.characters, this.FLASHCARD_TOP),
							  			 this.drawChinese(memoryWord.pinyin, this.FLASHCARD_TOP + TEXT_SIZE)])
			break;
		default:
			console.log("Invalid flashcard display mode.")
	}
	this.question = question;
	this.showAnswerBoxes();
}

FlashcardView.prototype.initAnswerBoxes = function(height)
{
	var easyBoxElements = this.drawAnswerBox(0.3 * canvas.getWidth(),
											 height,
											 ["Too easy [Q]"],
											 "green",
											 0.15 * this.answerBoxSize,
											 function() {
											 	hskFlashcardController.markFlashcardAsEasy();
											 	hskFlashcardController.startNewFlashcard();
											 });
	var showAnswerBoxElements = this.drawAnswerBox(0.5 * canvas.getWidth(),
												   height,
												   ["Show answer", "[Space]"],
												   "gray",
												   0.05 * this.answerBoxSize,
												   function() { hskFlashcardController.revealAnswer(); });
	var hardBoxElements = this.drawAnswerBox(0.7 * canvas.getWidth(),
											 height,
											 ["Not easy [W]"],
											 "red",
											 0.15 * this.answerBoxSize,
											 function() { hskFlashcardController.startNewFlashcard(); });
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
	if (this.answer && this.answer.length() != 0) {
		return;
	}
	switch (this.displayModeGetter() )
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
	return canvas.drawText(0.5 * canvas.getWidth(), height, chinese, "SimHei", TEXT_SIZE);
}

FlashcardView.prototype.drawEnglish = function(english, height)
{
	var englishSize = (english.length > 15) ? 0.5 * TEXT_SIZE : 0.75 * TEXT_SIZE;
	return canvas.drawText(0.5 * canvas.getWidth(), height, english, "Helvetica", englishSize);
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
