function FlashcardView() 
{
	this.question;
	this.answer;
}

FlashcardView.prototype.displayQuestion = function(memoryWord)
{
	this.question = draw.text(function(add)
	{
		add.tspan(memoryWord.characters);
		add.tspan(memoryWord.pinyin).newLine();
	});
	this.question.fill("white");
	this.question.move(0.5 * width, 0.3 * height);
	this.question.font({
		family: "SimHei",
		size: TEXT_SIZE,			
		anchor: "middle",
		class: "disable_text_highlighting" 
	});
}

FlashcardView.prototype.displayAnswer = function(memoryWord)
{
	this.answer = draw.text(function(add)
	{
		add.tspan(memoryWord.meaning).newLine();
	});

	this.answer.fill("white");
	this.answer.move(0.5 * width, 0.3 * height + 2 * TEXT_SIZE);
	this.answer.font({
		family: "Helvetica",
		size: 0.75 * TEXT_SIZE,
		anchor: "middle",
		class: "disable_text_highlighting" 
	});	
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