function BeginSessionView() 
{
	this.radioButtons = canvas.drawRadioButtons(100, 
							100, 
							"red", 
							["A", "B", "C"], 
							[function(){controller.nextState()}, function(){controller.nextState()}, function(){controller.nextState()}], 
							100);
}

BeginSessionView.prototype.resetRadioButtons = function()
{
	this.radioButtons.reset();
}