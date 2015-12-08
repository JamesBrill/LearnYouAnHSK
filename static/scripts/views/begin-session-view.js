var createBeginSessionView = function (displayModeSetter) {
  var textSize = 0.25 * TEXT_SIZE;
  var underlineThickness = textSize / 20;
  var radioButtonSize = TEXT_SIZE;
  var topY = 0.1 * canvas.getHeight();

  var clear = function () {
    hskRadioButtons.hide();
    testTypeRadioButtons.hide();
    beginSessionButton.box.hide();
    beginSessionButton.text.hide();
    wordListText.hide();
    wordListTextUnderline.hide();
    testTypeText.hide();
    testTypeTextUnderline.hide();
  }

  var hideCreateNewSessionButton = function () {
    createNewSessionButton.box.hide();
    createNewSessionButton.text.hide();
  }

  var createNewSessionButton = canvas.drawButton(0.06 * canvas.getWidth(),
               0.02 * canvas.getHeight(),
               ["Create", "new session"],
               "green",
               0.05 * radioButtonSize,
               function () { controller.newSession(); },
               radioButtonSize);
  var hskRadioButtonSetSize = 3 * radioButtonSize;
  var wordListText = canvas.drawText(0.5 * canvas.getWidth(), topY, "Word lists", "Helvetica", textSize);
  var wordListTextUnderline = canvas.drawTextUnderline(0.5 * (canvas.getWidth() - 1.1 * hskRadioButtonSetSize),
                              topY + 1.4 * textSize,
                              1.1 * hskRadioButtonSetSize,
                              "white",
                              underlineThickness);
  var hskRadioButtons = canvas.drawRadioButtons(true,
                           0.5 * (canvas.getWidth() - hskRadioButtonSetSize),
                           topY + 2 * textSize,
                           "blue",
                           [["HSK 1"], ["HSK 2"]],
                           [
                               function () { hskWordList.toggleHskVersion(1); },
                               function () { hskWordList.toggleHskVersion(2); }
                           ],
                           radioButtonSize);
  var testTypeRadioButtonSetSize = 7 * radioButtonSize;
  var testTypeText = canvas.drawText(0.5 * canvas.getWidth(),
                    topY + 2 * textSize + radioButtonSize,
                    "Test type",
                    "Helvetica",
                    textSize);
  var testTypeTextUnderline = canvas.drawTextUnderline(0.5 * (canvas.getWidth() - 1.1 * testTypeRadioButtonSetSize),
                              topY + 3.4 * textSize + radioButtonSize,
                              1.1 * testTypeRadioButtonSetSize,
                              "white",
                              underlineThickness);
  var testTypeRadioButtons = canvas.drawRadioButtons(false,
                            0.5 * (canvas.getWidth() - testTypeRadioButtonSetSize),
                            topY + 4 * textSize + radioButtonSize,
                            "blue",
                            [["Characters +", "Pinyin"], ["Characters"], ["Pinyin"], ["English", "Translation"]],
                            [
                              function () { displayModeSetter(FlashcardDisplayMode.CHARACTERS_AND_PINYIN); },
                              function () { displayModeSetter(FlashcardDisplayMode.CHARACTERS); },
                              function () { displayModeSetter(FlashcardDisplayMode.PINYIN); },
                              function () { displayModeSetter(FlashcardDisplayMode.ENGLISH); }
                            ],
                            radioButtonSize);
  var beginSessionButton = canvas.drawButton(0.5 * canvas.getWidth(),
               0.1 * canvas.getHeight() + 3 * radioButtonSize,
               ["Begin session"],
               "green",
               0.15 * radioButtonSize,
               function () { controller.beginSession(); },
               radioButtonSize);
  clear();
  hideCreateNewSessionButton();

  return {
    displayBeginSessionMenu : function () {
      hskRadioButtons.show();
      testTypeRadioButtons.show();
      beginSessionButton.box.show();
      beginSessionButton.text.show();
      wordListText.show();
      wordListTextUnderline.show();
      testTypeText.show();
      testTypeTextUnderline.show();
    },
    resetButtons : function () {
      hskRadioButtons.reset();
      testTypeRadioButtons.reset();
      createNewSessionButton.box.attr({ stroke: null });
      beginSessionButton.box.attr({ stroke: null });
    },
    clear : clear,
    showCreateNewSessionButton : function () {
      createNewSessionButton.box.show();
      createNewSessionButton.text.show();
    },
    hideCreateNewSessionButton : hideCreateNewSessionButton
  };
}
