function BeginSessionView() 
{
	this.radioButtonSize = TEXT_SIZE;
	this.radioButtonSetSize = 3 * this.radioButtonSize;
	this.hskRadioButtons = canvas.drawRadioButtons(0.5 * (canvas.width - this.radioButtonSetSize), 
							0.1 * canvas.height, 
							"blue", 
							[["HSK 1"], ["HSK 2"]], 
							[function(){controller.nextState()}, function(){controller.nextState()}], 
							this.radioButtonSize);
}

BeginSessionView.prototype.resetRadioButtons = function()
{
	this.hskRadioButtons.reset();
}