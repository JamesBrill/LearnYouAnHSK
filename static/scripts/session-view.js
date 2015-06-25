function SessionView() 
{
	this.sessionCompleteText;
	this.answerBoxes;
	this.answerBoxSize = 1.2 * TEXT_SIZE;
	this.initAnswerBoxes();
}

SessionView.prototype.initAnswerBoxes = function()
{
	var repeatSessionBoxElements = this.drawAnswerBox(0.4 * canvas.width, 
													  0.7 * canvas.height, 
													  ["Repeat", "Session [R]"], 
													  "blue", 
													  0.05 * this.answerBoxSize,
													  function() { alert("REPEAT") });
	var newSessionBoxElements = this.drawAnswerBox(0.6 * canvas.width, 
												   0.7 * canvas.height, 
												   ["New", "Session [N]"], 
												   "blue", 
												   0.05 * this.answerBoxSize,
												   function() { alert("NEW") });
	this.answerBoxes = [ repeatSessionBoxElements, newSessionBoxElements ];
	this.hideAnswerBoxes();
}

SessionView.prototype.drawAnswerBox = function(x, y, text, colour, offset, clickHandler)
{
	var box = canvas.draw.rect(this.answerBoxSize, 0.5 * this.answerBoxSize);
	box.move(x - 0.5 * this.answerBoxSize, y);
	box.fill(colour);
	box.radius(0.05 * this.answerBoxSize);
	box.click(clickHandler);
	box.mouseover(function()
	{		
		box.attr({ stroke: "white", "stroke-width": 0.03 * this.answerBoxSize });
	}.bind(this));
	box.attr({ cursor: "pointer" });

 	var text = canvas.draw.text(function(add)
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
		class: "disable_text_highlighting",
		cursor: "pointer" 
	});	
	text.click(clickHandler);	
	return { box: box, text: text };
}

SessionView.prototype.resetAnswerBoxes = function()
{
	for (var i = 0; i < 2; i++)
	{
		this.answerBoxes[i].box.attr({ stroke: null });
	}	
}

SessionView.prototype.showAnswerBoxes = function()
{
	for (var i = 0; i < 2; i++)
	{
		this.answerBoxes[i].box.show();
		this.answerBoxes[i].text.show();	
	}
}

SessionView.prototype.hideAnswerBoxes = function()
{
	for (var i = 0; i < 2; i++)
	{
		this.answerBoxes[i].box.hide();
		this.answerBoxes[i].text.hide();	
	}
}

SessionView.prototype.displaySessionCompleteMenu = function()
{
	this.sessionCompleteText = this.displaySessionCompleteText();
	this.showAnswerBoxes();
}

SessionView.prototype.displaySessionCompleteText = function()
{
 	var text = canvas.draw.text(function(add)
	{
		add.tspan("Session").newLine(),
		add.tspan("Complete!").newLine()
	});
	text.fill("white");
	text.move(0.5 * canvas.width, 0.1 * canvas.height);
	text.font({
		family: "Helvetica",
		size: 0.75 * TEXT_SIZE,
		anchor: "middle",
		class: "disable_text_highlighting",
		cursor: "pointer" 
	});	
	return text;
}

SessionView.prototype.clear = function()
{
	this.sessionCompleteText.clear();
	this.hideAnswerBoxes();
}