function FlashcardView() 
{
	$('#drawing').height("95vh");
	this.width = $('#drawing').width();
	this.height = $('#drawing').height();
	this.draw = SVG('drawing').size("100%", "100%");
	this.background = this.draw.rect("100%", "100%");
	this.question;
	this.answer;
	this.FLASHCARD_TOP = 0.1 * this.height;
	this.englishSize = 0.75 * TEXT_SIZE;
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
			break;
		default:
			console.log("Invalid flashcard display mode.")
	}
	this.question = question;
}

FlashcardView.prototype.initAnswerBoxes = function(height)
{
	var easyBoxElements = this.drawAnswerBox(0.3 * this.width, 
											 height, 
											 ["Too easy [Q]"], 
											 "green", 
											 0.15 * this.answerBoxSize);
	var showAnswerBoxElements = this.drawAnswerBox(0.5 * this.width, 
												   height, 
												   ["Show answer", "[Space]"], 
												   "gray", 
												   0.05 * this.answerBoxSize);
	var hardBoxElements = this.drawAnswerBox(0.7 * this.width, 
											 height, 
											 ["Not easy [W]"], 
											 "red", 
											 0.15 * this.answerBoxSize);
	this.answerBoxes = [ easyBoxElements, showAnswerBoxElements, hardBoxElements ];
}

FlashcardView.prototype.drawAnswerBox = function(x, y, text, colour, offset)
{
	var box = this.draw.rect(this.answerBoxSize, 0.5 * this.answerBoxSize);
	box.move(x - 0.5 * this.answerBoxSize, y);
	box.fill(colour);
	box.radius(0.05 * this.answerBoxSize);

 	var text = this.draw.text(function(add)
	{
		for (var i = 0; i < text.length; i++)
		{
			add.tspan(text[i]).newLine();
		}
	});
	text.fill("white");
	text.move(x, y + offset);
	text.font({
		family: "Helvetica",
		size: 0.15 * this.answerBoxSize,
		anchor: "middle",
		class: "disable_text_highlighting" 
	});		
	return { box: box, text: text };
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
	this.showAnswerBoxes();
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