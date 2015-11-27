function CompleteSessionView() 
{
	this.sessionCompleteText = this.displaySessionCompleteText();;
	this.sessionCompleteButtons;
	this.sessionCompleteButtonSize = 1.2 * TEXT_SIZE;
	this.initSessionCompleteButtons();
}

CompleteSessionView.prototype.initSessionCompleteButtons = function()
{
	var repeatSessionBoxElements = canvas.drawButton(0.4 * canvas.getWidth(), 
													 0.7 * canvas.getHeight(), 
													 ["Repeat", "session [R]"], 
													 "blue", 
													 0.05 * this.sessionCompleteButtonSize,
													 function() { hskController.repeatSession(); },
													 this.sessionCompleteButtonSize);
	var newSessionBoxElements = canvas.drawButton(0.6 * canvas.getWidth(), 
												  0.7 * canvas.getHeight(), 
												  ["New", "session [N]"], 
												  "blue", 
												  0.05 * this.sessionCompleteButtonSize,
												  function() { hskController.newSession(); },
												  this.sessionCompleteButtonSize);
	this.sessionCompleteButtons = [ repeatSessionBoxElements, newSessionBoxElements ];
	this.hideSessionCompleteButtons();
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
	return canvas.drawText(0.5 * canvas.getWidth(), 
						   0.1 * canvas.getHeight(), 
						   ["Session", "complete!"], 
						   "Helvetica", 
						   0.75 * TEXT_SIZE, 
						   "pointer");
}

CompleteSessionView.prototype.clear = function()
{
	this.sessionCompleteText.hide();
	this.hideSessionCompleteButtons();
}