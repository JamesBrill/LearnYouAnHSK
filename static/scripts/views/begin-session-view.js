function BeginSessionView()
{
	this.textSize = 0.25 * TEXT_SIZE;
	this.underlineThickness = this.textSize / 20;
	this.radioButtonSize = TEXT_SIZE;
	this.topY = 0.1 * canvas.getHeight();
}

BeginSessionView.prototype.init = function (displayModeSetter)
{
  this.createNewSessionButton = this.drawCreateNewSessionButton();
  this.hskRadioButtonSetSize = 3 * this.radioButtonSize;
  this.wordListText = canvas.drawText(0.5 * canvas.getWidth(), this.topY, "Word lists", "Helvetica", this.textSize);
  this.wordListTextUnderline = canvas.drawTextUnderline(0.5 * (canvas.getWidth() - 1.1 * this.hskRadioButtonSetSize),
                              this.topY + 1.4 * this.textSize,
                              1.1 * this.hskRadioButtonSetSize,
                              "white",
                              this.underlineThickness);
  this.hskRadioButtons = canvas.drawRadioButtons(true,
                           0.5 * (canvas.getWidth() - this.hskRadioButtonSetSize),
                           this.topY + 2 * this.textSize,
                           "blue",
                           [["HSK 1"], ["HSK 2"]],
                           [
                               function() { hskWordList.toggleHskVersion(1); },
                               function() { hskWordList.toggleHskVersion(2); }
                           ],
                           this.radioButtonSize);
  this.testTypeRadioButtonSetSize = 7 * this.radioButtonSize;
  this.testTypeText = canvas.drawText(0.5 * canvas.getWidth(),
                    this.topY + 2 * this.textSize + this.radioButtonSize,
                    "Test type",
                    "Helvetica",
                    this.textSize);
  this.testTypeTextUnderline = canvas.drawTextUnderline(0.5 * (canvas.getWidth() - 1.1 * this.testTypeRadioButtonSetSize),
                              this.topY + 3.4 * this.textSize + this.radioButtonSize,
                              1.1 * this.testTypeRadioButtonSetSize,
                              "white",
                              this.underlineThickness);
  this.testTypeRadioButtons = canvas.drawRadioButtons(false,
                            0.5 * (canvas.getWidth() - this.testTypeRadioButtonSetSize),
                            this.topY + 4 * this.textSize + this.radioButtonSize,
                            "blue",
                            [["Characters +", "Pinyin"], ["Characters"], ["Pinyin"], ["English", "Translation"]],
                            [
                              function() { displayModeSetter(FlashcardDisplayMode.CHARACTERS_AND_PINYIN); },
                              function() { displayModeSetter(FlashcardDisplayMode.CHARACTERS); },
                              function() { displayModeSetter(FlashcardDisplayMode.PINYIN); },
                              function() { displayModeSetter(FlashcardDisplayMode.ENGLISH); }
                            ],
                            this.radioButtonSize);
  this.beginSessionButton = this.drawBeginSessionButton();
  this.clear();
  this.hideCreateNewSessionButton();
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
	this.createNewSessionButton.box.attr({ stroke: null });
	this.beginSessionButton.box.attr({ stroke: null });
}

BeginSessionView.prototype.drawCreateNewSessionButton = function()
{
	return canvas.drawButton(0.06 * canvas.getWidth(),
							 0.02 * canvas.getHeight(),
							 ["Create", "new session"],
							 "green",
							 0.05 * this.radioButtonSize,
							 function() { controller.newSession(); },
							 this.radioButtonSize);
}

BeginSessionView.prototype.drawBeginSessionButton = function()
{
	return canvas.drawButton(0.5 * canvas.getWidth(),
							 0.1 * canvas.getHeight() + 3 * this.radioButtonSize,
							 ["Begin session"],
							 "green",
							 0.15 * this.radioButtonSize,
							 function() { controller.beginSession(); },
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

BeginSessionView.prototype.showCreateNewSessionButton = function()
{
	this.createNewSessionButton.box.show();
	this.createNewSessionButton.text.show();
}

BeginSessionView.prototype.hideCreateNewSessionButton = function()
{
	this.createNewSessionButton.box.hide();
	this.createNewSessionButton.text.hide();
}
