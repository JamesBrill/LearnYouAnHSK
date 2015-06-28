function CompleteSessionView() 
{
	this.sessionCompleteText = this.displaySessionCompleteText();;
	this.sessionCompleteButtons;
	this.sessionCompleteButtonSize = 1.2 * TEXT_SIZE;
	this.initSessionCompleteButtons();
}

CompleteSessionView.prototype.initSessionCompleteButtons = function()
{
	var repeatSessionBoxElements = this.drawSessionCompleteButton(0.4 * canvas.width, 
													  0.7 * canvas.height, 
													  ["Repeat", "session [R]"], 
													  "blue", 
													  0.05 * this.sessionCompleteButtonSize,
													  function() { controller.repeatSession(); });
	var newSessionBoxElements = this.drawSessionCompleteButton(0.6 * canvas.width, 
												   0.7 * canvas.height, 
												   ["New", "session [N]"], 
												   "blue", 
												   0.05 * this.sessionCompleteButtonSize,
												   function() { controller.newSession(); });
	this.sessionCompleteButtons = [ repeatSessionBoxElements, newSessionBoxElements ];
	this.hideSessionCompleteButtons();
}

CompleteSessionView.prototype.drawSessionCompleteButton = function(x, y, text, colour, offset, clickHandler)
{
	var box = canvas.draw.rect(this.sessionCompleteButtonSize, 0.5 * this.sessionCompleteButtonSize);
	box.move(x - 0.5 * this.sessionCompleteButtonSize, y);
	box.fill(colour);
	box.radius(0.05 * this.sessionCompleteButtonSize);
	box.click(clickHandler);
	box.mouseover(function()
	{		
		box.attr({ stroke: "white", "stroke-width": 0.03 * this.sessionCompleteButtonSize });
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
		size: 0.15 * this.sessionCompleteButtonSize,
		anchor: "middle",
		class: "disable_text_highlighting",
		cursor: "pointer" 
	});	
	text.click(clickHandler);	
	return { box: box, text: text };
}

CompleteSessionView.prototype.resetSessionCompleteButtons = function()
{
	for (var i = 0; i < 2; i++)
	{
		this.sessionCompleteButtons[i].box.attr({ stroke: null });
	}	
}

CompleteSessionView.prototype.showSessionCompleteButtons = function()
{
	for (var i = 0; i < 2; i++)
	{
		this.sessionCompleteButtons[i].box.show();
		this.sessionCompleteButtons[i].text.show();	
	}
}

CompleteSessionView.prototype.hideSessionCompleteButtons = function()
{
	for (var i = 0; i < 2; i++)
	{
		this.sessionCompleteButtons[i].box.hide();
		this.sessionCompleteButtons[i].text.hide();	
	}
}

CompleteSessionView.prototype.displaySessionCompleteMenu = function()
{
	this.sessionCompleteText.show();
	this.showSessionCompleteButtons();
}

CompleteSessionView.prototype.displaySessionCompleteText = function()
{
 	var text = canvas.draw.text(function(add)
	{
		add.tspan("Session").newLine(),
		add.tspan("complete!").newLine()
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

CompleteSessionView.prototype.clear = function()
{
	this.sessionCompleteText.hide();
	this.hideSessionCompleteButtons();
}