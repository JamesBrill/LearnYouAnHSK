var createFlashcardView = function (displayModeGetter) {
  var question;
  var answer;
  var flashcardTop = 0.1 * canvas.getHeight();
  var answerBoxes;
  var discardedCounter = canvas.drawText(0.1 * canvas.getWidth(),
                                         0.4 * canvas.getHeight(),
                                         "Discarded: 0",
                                         "Helvetica",
                                         0.25 * TEXT_SIZE);
  var remainingCounter = canvas.drawText(0.1 * canvas.getWidth(),
                                         0.5 * canvas.getHeight(),
                                         "Remaining: 0",
                                         "Helvetica",
                                         0.25 * TEXT_SIZE);

  var showAnswerBoxes = function () {
    for (var i = 0; i < 3; i++) {
      answerBoxes[i].box.show();
      answerBoxes[i].text.show();
    }
  }

  var hideAnswerBoxes = function () {
    for (var i = 0; i < 3; i++) {
      answerBoxes[i].box.hide();
      answerBoxes[i].text.hide();
    }
  }

  var drawAnswerBox = function (x, y, text, colour, offset, clickHandler) {
    return canvas.drawButton(x, y, text, colour, offset, clickHandler, answerBoxSize);
  }

  var initAnswerBoxes = function (height) {
    var easyBoxElements = drawAnswerBox(0.3 * canvas.getWidth(),
                         height,
                         ["Too easy [Q]"],
                         "green",
                         0.15 * answerBoxSize,
                         function() {
                           hskFlashcardController.markFlashcardAsEasy();
                           hskFlashcardController.startNewFlashcard();
                         });
    var showAnswerBoxElements = drawAnswerBox(0.5 * canvas.getWidth(),
                             height,
                             ["Show answer", "[Space]"],
                             "gray",
                             0.05 * answerBoxSize,
                             function() { hskFlashcardController.revealAnswer(); });
    var hardBoxElements = drawAnswerBox(0.7 * canvas.getWidth(),
                         height,
                         ["Not easy [W]"],
                         "red",
                         0.15 * answerBoxSize,
                         function() { hskFlashcardController.startNewFlashcard(); });
    answerBoxes = [ easyBoxElements, showAnswerBoxElements, hardBoxElements ];
  }

  var drawChinese = function (chinese, height) {
    return canvas.drawText(0.5 * canvas.getWidth(), height, chinese, "SimHei", TEXT_SIZE);
  }

  var drawEnglish = function (english, height) {
    var englishSize = (english.length > 15) ? 0.5 * TEXT_SIZE : 0.75 * TEXT_SIZE;
    return canvas.drawText(0.5 * canvas.getWidth(), height, english, "Helvetica", englishSize);
  }

  var hideCounters = function () {
    discardedCounter.hide();
    remainingCounter.hide();
  };

  var clearFlashcard = function () {
    if (question != undefined) {
      question.clear();
    }

    if (answer != undefined) {
      answer.clear();
    }
  }

  var answerBoxSize = 1.2 * TEXT_SIZE;
  if (displayModeGetter() == FlashcardDisplayMode.CHARACTERS_AND_PINYIN) {
    initAnswerBoxes(flashcardTop + 3.6 * TEXT_SIZE);
  }
  else {
    initAnswerBoxes(flashcardTop + 2.5 * TEXT_SIZE);
  }
  hideAnswerBoxes();
  hideCounters();

  return {
    displayQuestion : function (memoryWord) {
      switch (displayModeGetter()) {
        case FlashcardDisplayMode.CHARACTERS:
          question = drawChinese(memoryWord.characters, flashcardTop);
          break;
        case FlashcardDisplayMode.PINYIN:
          question = drawChinese(memoryWord.pinyin, flashcardTop);
          break;
        case FlashcardDisplayMode.ENGLISH:
          question = drawEnglish(memoryWord.meaning, flashcardTop);
          break;
        case FlashcardDisplayMode.CHARACTERS_AND_PINYIN:
          question = canvas.drawGroup([drawChinese(memoryWord.characters, flashcardTop),
                                       drawChinese(memoryWord.pinyin, flashcardTop + TEXT_SIZE)])
          break;
        default:
          console.log("Invalid flashcard display mode.")
      }
      showAnswerBoxes();
    },
    displayAnswer : function (memoryWord) {
      if (answer && answer.length() != 0) {
        return;
      }
      switch (displayModeGetter()) {
        case FlashcardDisplayMode.CHARACTERS:
        case FlashcardDisplayMode.PINYIN:
          answer = drawEnglish(memoryWord.meaning, flashcardTop + 1.2 * TEXT_SIZE);
          break;
        case FlashcardDisplayMode.ENGLISH:
          answer = drawChinese(memoryWord.pinyin, flashcardTop + 0.75 * TEXT_SIZE);
          break;
        case FlashcardDisplayMode.CHARACTERS_AND_PINYIN:
          answer = drawEnglish(memoryWord.meaning, flashcardTop + 2.4 * TEXT_SIZE);
          break;
        default:
          console.log("Invalid flashcard display mode.")
      }
    },
    clearFlashcard : clearFlashcard,
    clear : function () {
      clearFlashcard();
      hideAnswerBoxes();
      hideCounters();
    },
    showCounters : function () {
      discardedCounter.show();
      remainingCounter.show();
    },
    hideCounters : hideCounters,
    setCounters : function (discardedCards, remainingCards) {
      discardedCounter.text("Discarded: " + discardedCards);
      remainingCounter.text("Remaining: " + remainingCards);
    },
    resetAnswerBoxes : function () {
      for (var i = 0; i < 3; i++) {
        answerBoxes[i].box.attr({ stroke: null });
      }
    }
  };
}
