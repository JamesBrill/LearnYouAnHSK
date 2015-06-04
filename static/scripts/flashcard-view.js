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
}

FlashcardView.prototype.displayQuestion = function(memoryWord)
{
	var question;
	if (FLASHCARD_DISPLAY_MODE == "CHARACTERS")
	{
		question = this.drawChinese(memoryWord.characters, this.FLASHCARD_TOP);
	}
	else if (FLASHCARD_DISPLAY_MODE == "PINYIN")
	{
		question = this.drawChinese(memoryWord.pinyin, this.FLASHCARD_TOP);
	}
	else if (FLASHCARD_DISPLAY_MODE == "ENGLISH")
	{
		question = this.drawEnglish(memoryWord.meaning, this.FLASHCARD_TOP);
	}
	else if (FLASHCARD_DISPLAY_MODE == "CHARACTERS_AND_PINYIN")
	{
		var question = this.draw.group();
		question.add(this.drawChinese(memoryWord.characters, this.FLASHCARD_TOP));
		question.add(this.drawChinese(memoryWord.pinyin, this.FLASHCARD_TOP + TEXT_SIZE));
	}
	this.question = question;
}

FlashcardView.prototype.displayAnswer = function(memoryWord)
{
	var answer;
	if (FLASHCARD_DISPLAY_MODE == "CHARACTERS" || FLASHCARD_DISPLAY_MODE == "PINYIN")
	{
		answer = this.drawEnglish(memoryWord.meaning, this.FLASHCARD_TOP + TEXT_SIZE);
	}
	else if (FLASHCARD_DISPLAY_MODE == "ENGLISH")
	{
		answer = this.drawChinese(memoryWord.pinyin, this.FLASHCARD_TOP + 0.75 * TEXT_SIZE);
	}
	else if (FLASHCARD_DISPLAY_MODE == "CHARACTERS_AND_PINYIN")
	{
		answer = this.drawEnglish(memoryWord.meaning, this.FLASHCARD_TOP + 2 * TEXT_SIZE);
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
	var text = this.draw.text(function(add)
	{
		add.tspan(english).newLine();
	});
	text.fill("white");
	text.move(0.5 * this.width, height);
	text.font({
		family: "Helvetica",
		size: 0.75 * TEXT_SIZE,
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