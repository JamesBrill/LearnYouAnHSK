function FlashcardView() 
{
	$('#drawing').height("95vh");
	this.width = $('#drawing').width();
	this.height = $('#drawing').height();
	this.draw = SVG('drawing').size("100%", "100%");
	this.background = this.draw.rect("100%", "100%");
	this.question;
	this.answer;
}

FlashcardView.prototype.displayQuestion = function(memoryWord)
{
	this.question = this.draw.text(function(add)
	{
		add.tspan(memoryWord.characters);
		add.tspan(memoryWord.pinyin).newLine();
	});
	this.question.fill("white");
	this.question.move(0.5 * this.width, 0.3 * this.height);
	this.question.font({
		family: "SimHei",
		size: TEXT_SIZE,			
		anchor: "middle",
		class: "disable_text_highlighting" 
	});
}

FlashcardView.prototype.displayAnswer = function(memoryWord)
{
	this.answer = this.draw.text(function(add)
	{
		add.tspan(memoryWord.meaning).newLine();
	});

	this.answer.fill("white");
	this.answer.move(0.5 * this.width, 0.3 * this.height + 2 * TEXT_SIZE);
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