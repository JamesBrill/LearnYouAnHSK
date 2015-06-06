function FlashcardView() 
{
	$('#drawing').height("95vh");
	this.width = $('#drawing').width();
	this.height = $('#drawing').height();
	this.draw = SVG('drawing').size("100%", "100%");
	this.background = this.draw.rect("100%", "100%");
	this.question;
	this.answer;
	this.FLASHCARD_TOP = 0.2 * this.height;
	this.englishSize = 0.75 * TEXT_SIZE;
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
			var question = this.draw.group();
			question.add(this.drawChinese(memoryWord.characters, this.FLASHCARD_TOP));
			question.add(this.drawChinese(memoryWord.pinyin, this.FLASHCARD_TOP + TEXT_SIZE));
		default:
			console.log("Invalid flashcard display mode.")
	}
	this.question = question;
}

FlashcardView.prototype.displayAnswer = function(memoryWord)
{
	var answer;
	switch (FLASHCARD_DISPLAY_MODE)
	{
		case FlashcardDisplayMode.CHARACTERS:
		case FlashcardDisplayMode.PINYIN:
			answer = this.drawEnglish(memoryWord.meaning, this.FLASHCARD_TOP + TEXT_SIZE);
			break;
		case FlashcardDisplayMode.ENGLISH:
			answer = this.drawChinese(memoryWord.pinyin, this.FLASHCARD_TOP + 0.75 * TEXT_SIZE);
			break;
		case FlashcardDisplayMode.CHARACTERS_AND_PINYIN:
			answer = this.drawEnglish(memoryWord.meaning, this.FLASHCARD_TOP + 2 * TEXT_SIZE);
		default:
			console.log("Invalid flashcard display mode.")
	}
	this.answer = answer;
}

FlashcardView.prototype.drawChinese = function(chinese, height)
{
	var text = this.draw.text(function(add)
	{
		add.tspan(chinese).newLine();
	});
	text.fill("white");
	text.move(0.5 * this.width, height);
	text.font({
		family: "SimHei",
		size: TEXT_SIZE,			
		anchor: "middle",
		class: "disable_text_highlighting" 
	});	
	return text;
}

FlashcardView.prototype.drawEnglish = function(english, height)
{
	this.englishSize = (english.length > 15) ? 0.5 * TEXT_SIZE : 0.75 * TEXT_SIZE;
	var text = this.draw.text(function(add)
	{
		add.tspan(english).newLine();
	});
	text.fill("white");
	text.move(0.5 * this.width, height);
	text.font({
		family: "Helvetica",
		size: this.englishSize,
		anchor: "middle",
		class: "disable_text_highlighting" 
	});	
	return text;
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