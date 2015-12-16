let createBeginSessionView = function (scope, canvas, wordList, globalTextSize) {
  let textSize = 0.25 * globalTextSize;
  let underlineThickness = textSize / 20;
  let radioButtonSize = globalTextSize;
  let topY = 0.1 * canvas.getHeight();

  let clear = function () {
    hskRadioButtons.hide();
    testTypeRadioButtons.hide();
    beginSessionButton.box.hide();
    beginSessionButton.text.hide();
    wordListText.hide();
    wordListTextUnderline.hide();
    testTypeText.hide();
    testTypeTextUnderline.hide();
  }

  let hideCreateNewSessionButton = function () {
    createNewSessionButton.box.hide();
    createNewSessionButton.text.hide();
  }

  let createNewSessionButton = canvas.drawButton(0.06 * canvas.getWidth(),
               0.02 * canvas.getHeight(),
               ["Create", "new session"],
               "green",
               0.05 * radioButtonSize,
               function () { scope.newSession(); },
               radioButtonSize);
  let hskRadioButtonSetSize = 3 * radioButtonSize;
  let wordListText = canvas.drawText(0.5 * canvas.getWidth(), topY, "Word lists", "Helvetica", textSize);
  let wordListTextUnderline = canvas.drawTextUnderline(0.5 * (canvas.getWidth() - 1.1 * hskRadioButtonSetSize),
                              topY + 1.4 * textSize,
                              1.1 * hskRadioButtonSetSize,
                              "white",
                              underlineThickness);
  let hskRadioButtons = canvas.drawRadioButtons(true,
                           0.5 * (canvas.getWidth() - hskRadioButtonSetSize),
                           topY + 2 * textSize,
                           "blue",
                           [["HSK 1"], ["HSK 2"]],
                           [
                               function () { wordList.toggleHskVersion(1); },
                               function () { wordList.toggleHskVersion(2); }
                           ],
                           radioButtonSize);
  let testTypeRadioButtonSetSize = 7 * radioButtonSize;
  let testTypeText = canvas.drawText(0.5 * canvas.getWidth(),
                    topY + 2 * textSize + radioButtonSize,
                    "Test type",
                    "Helvetica",
                    textSize);
  let testTypeTextUnderline = canvas.drawTextUnderline(0.5 * (canvas.getWidth() - 1.1 * testTypeRadioButtonSetSize),
                              topY + 3.4 * textSize + radioButtonSize,
                              1.1 * testTypeRadioButtonSetSize,
                              "white",
                              underlineThickness);
  let testTypeRadioButtons = canvas.drawRadioButtons(false,
                            0.5 * (canvas.getWidth() - testTypeRadioButtonSetSize),
                            topY + 4 * textSize + radioButtonSize,
                            "blue",
                            [["Characters +", "Pinyin"], ["Characters"], ["Pinyin"], ["English", "Translation"]],
                            [
                              function () { scope.setDisplayMode(FlashcardDisplayMode.CHARACTERS_AND_PINYIN); },
                              function () { scope.setDisplayMode(FlashcardDisplayMode.CHARACTERS); },
                              function () { scope.setDisplayMode(FlashcardDisplayMode.PINYIN); },
                              function () { scope.setDisplayMode(FlashcardDisplayMode.ENGLISH); }
                            ],
                            radioButtonSize);
  let beginSessionButton = canvas.drawButton(0.5 * canvas.getWidth(),
               0.1 * canvas.getHeight() + 3 * radioButtonSize,
               ["Begin session"],
               "green",
               0.15 * radioButtonSize,
               function () { scope.beginSession(); },
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
