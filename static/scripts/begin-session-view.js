function BeginSessionView() 
{
	this.textSize = 0.25 * TEXT_SIZE;
	this.underlineThickness = this.textSize / 20;
	this.radioButtonSize = TEXT_SIZE;
	this.topY = 0.1 * canvas.height;
	this.hskRadioButtonSetSize = 3 * this.radioButtonSize;
	this.wordListText = canvas.drawText(0.5 * canvas.width, this.topY, "Word list", "Helvetica", this.textSize);
	this.wordListTextUnderline = canvas.drawTextUnderline(0.5 * (canvas.width - 1.1 * this.hskRadioButtonSetSize), 
														  this.topY + 1.4 * this.textSize, 
														  1.1 * this.hskRadioButtonSetSize, 
														  "white", 
														  this.underlineThickness);
	this.hskRadioButtons = canvas.drawRadioButtons(0.5 * (canvas.width - this.hskRadioButtonSetSize), 
							this.topY + 2 * this.textSize, 
							"blue", 
							[["HSK 1"], ["HSK 2"]], 
							[function() { HSK_WORDLIST = 1; }, function() { HSK_WORDLIST = 2; }], 
							this.radioButtonSize);
	this.testTypeRadioButtonSetSize = 7 * this.radioButtonSize;
	this.testTypeText = canvas.drawText(0.5 * canvas.width, 
										this.topY + 2 * this.textSize + this.radioButtonSize, 
										"Test type", 
										"Helvetica", 
										this.textSize);
	this.testTypeTextUnderline = canvas.drawTextUnderline(0.5 * (canvas.width - 1.1 * this.testTypeRadioButtonSetSize), 
														  this.topY + 3.4 * this.textSize + this.radioButtonSize, 
														  1.1 * this.testTypeRadioButtonSetSize, 
														  "white", 
														  this.underlineThickness);
	this.testTypeRadioButtons = canvas.drawRadioButtons(0.5 * (canvas.width - this.testTypeRadioButtonSetSize), 
							this.topY + 4 * this.textSize + this.radioButtonSize, 
							"blue", 
							[["Characters +", "Pinyin"], ["Characters"], ["Pinyin"], ["English", "Translation"]], 
							[
								function() { FLASHCARD_DISPLAY_MODE = FlashcardDisplayMode.CHARACTERS_AND_PINYIN; }, 
								function() { FLASHCARD_DISPLAY_MODE = FlashcardDisplayMode.CHARACTERS; }, 
								function() { FLASHCARD_DISPLAY_MODE = FlashcardDisplayMode.PINYIN; }, 
								function() { FLASHCARD_DISPLAY_MODE = FlashcardDisplayMode.ENGLISH; }
							], 
							this.radioButtonSize);
	this.beginSessionButton = this.drawBeginSessionButton();
	this.clear();
}

BeginSessionView.prototype.displayBeginSessionMenu = function()
{
	this.hskRadioButtons.show();
	this.testTypeRadioButtons.show();
	this.beginSessionButton.box.show();
	this.beginSessionButton.text.show();
	this.wordListText.show();
	this.wordListTextUnderline.show();
	this.testTypeText.show();
	this.testTypeTextUnderline.show();
}

BeginSessionView.prototype.resetButtons = function()
{
	this.hskRadioButtons.reset();
	this.testTypeRadioButtons.reset();
	this.beginSessionButton.box.attr({ stroke: null });
}

BeginSessionView.prototype.drawBeginSessionButton = function()
{
	return canvas.drawButton(0.5 * canvas.width,
							 0.1 * canvas.height + 3 * this.radioButtonSize, 
							 ["Begin session"],
							 "green",
							 0.15 * this.radioButtonSize,
							 function() { controller.nextState(); },
							 this.radioButtonSize);
}

BeginSessionView.prototype.clear = function()
{
	this.hskRadioButtons.hide();
	this.testTypeRadioButtons.hide();
	this.beginSessionButton.box.hide();
	this.beginSessionButton.text.hide();
	this.wordListText.hide();
	this.wordListTextUnderline.hide();
	this.testTypeText.hide();
	this.testTypeTextUnderline.hide();
}