function BeginSessionView() 
{
	this.radioButtonSize = 100;
	this.radioButtonSetSize = 5 * this.radioButtonSize;
	this.radioButtons = canvas.drawRadioButtons(0.5 * canvas.width - 0.4 * this.radioButtonSetSize, 
							100, 
							"red", 
							["A", "B", "C"], 
							[function(){controller.nextState()}, function(){controller.nextState()}, function(){controller.nextState()}], 
							this.radioButtonSize);
}

BeginSessionView.prototype.resetRadioButtons = function()
{
	this.radioButtons.reset();
}