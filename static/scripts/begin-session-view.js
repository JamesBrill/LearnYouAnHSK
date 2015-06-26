function BeginSessionView() 
{
	this.radioButtonSize = TEXT_SIZE;
	this.hskRadioButtonSetSize = 3 * this.radioButtonSize;
	this.hskRadioButtons = canvas.drawRadioButtons(0.5 * (canvas.width - this.hskRadioButtonSetSize), 
							0.1 * canvas.height, 
							"blue", 
							[["HSK 1"], ["HSK 2"]], 
							[function() { controller.setHSKWordList(1); controller.nextState(); }, function() { controller.setHSKWordList(2); controller.nextState(); }], 
							this.radioButtonSize);

	this.testTypeRadioButtonSetSize = 7 * this.radioButtonSize;
	this.testTypeRadioButtons = canvas.drawRadioButtons(0.5 * (canvas.width - this.testTypeRadioButtonSetSize), 
							0.1 * canvas.height + TEXT_SIZE, 
							"green", 
							[["Characters +", "Pinyin"], ["Characters"], ["Pinyin"], ["English", "Translation"]], 
							[function() {  }, function() {  }, function() {  }, function() {  }], 
							this.radioButtonSize);
}

BeginSessionView.prototype.resetRadioButtons = function()
{
	this.hskRadioButtons.reset();
	this.testTypeRadioButtons.reset();
}