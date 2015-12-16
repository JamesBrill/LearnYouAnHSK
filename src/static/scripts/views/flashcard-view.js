let createFlashcardView = function (scope, canvas, textSize) {
  let question;
  let answer;
  let flashcardTop = 0.1 * canvas.getHeight();
  let answerBoxes;
  let discardedCounter = canvas.drawText(0.1 * canvas.getWidth(),
                                         0.4 * canvas.getHeight(),
                                         "Discarded: 0",
                                         "Helvetica",
                                         0.25 * textSize);
  let remainingCounter = canvas.drawText(0.1 * canvas.getWidth(),
                                         0.5 * canvas.getHeight(),
                                         "Remaining: 0",
                                         "Helvetica",
                                         0.25 * textSize);

  let showAnswerBoxes = function () {
    for (let i = 0; i < 3; i++) {
      answerBoxes[i].box.show();
      answerBoxes[i].text.show();
    }
  }

  let hideAnswerBoxes = function () {
    for (let i = 0; i < 3; i++) {
      answerBoxes[i].box.hide();
      answerBoxes[i].text.hide();
    }
  }

  let drawAnswerBox = function (x, y, text, colour, offset, clickHandler) {
    return canvas.drawButton(x, y, text, colour, offset, clickHandler, answerBoxSize);
  }

  let initAnswerBoxes = function (height) {
    let easyBoxElements = drawAnswerBox(0.3 * canvas.getWidth(),
                         height,
                         ["Too easy [Q]"],
                         "green",
                         0.15 * answerBoxSize,
                         scope.markEasy);
    let showAnswerBoxElements = drawAnswerBox(0.5 * canvas.getWidth(),
                             height,
                             ["Show answer", "[Space]"],
                             "gray",
                             0.05 * answerBoxSize,
                             scope.showAnswer);
    let hardBoxElements = drawAnswerBox(0.7 * canvas.getWidth(),
                         height,
                         ["Not easy [W]"],
                         "red",
                         0.15 * answerBoxSize,
                         scope.markHard);
    answerBoxes = [ easyBoxElements, showAnswerBoxElements, hardBoxElements ];
  }

  let drawChinese = function (chinese, height) {
    return canvas.drawText(0.5 * canvas.getWidth(), height, chinese, "SimHei", textSize);
  }

  let drawEnglish = function (english, height) {
    let englishSize = (english.length > 15) ? 0.5 * textSize : 0.75 * textSize;
    return canvas.drawText(0.5 * canvas.getWidth(), height, english, "Helvetica", englishSize);
  }

  let hideCounters = function () {
    discardedCounter.hide();
    remainingCounter.hide();
  };

  let clearFlashcard = function () {
    if (question != undefined) {
      question.clear();
    }

    if (answer != undefined) {
      answer.clear();
    }
  }

  let answerBoxSize = 1.2 * textSize;
  if (scope.getDisplayMode() == FlashcardDisplayMode.CHARACTERS_AND_PINYIN) {
    initAnswerBoxes(flashcardTop + 3.6 * textSize);
  }
  else {
    initAnswerBoxes(flashcardTop + 2.5 * textSize);
  }
  hideAnswerBoxes();
  hideCounters();

  return {
    displayQuestion : function (memoryWord) {
      switch (scope.getDisplayMode()) {
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
                                       drawChinese(memoryWord.pinyin, flashcardTop + textSize)])
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
      switch (scope.getDisplayMode()) {
        case FlashcardDisplayMode.CHARACTERS:
        case FlashcardDisplayMode.PINYIN:
          answer = drawEnglish(memoryWord.meaning, flashcardTop + 1.2 * textSize);
          break;
        case FlashcardDisplayMode.ENGLISH:
          answer = drawChinese(memoryWord.pinyin, flashcardTop + 0.75 * textSize);
          break;
        case FlashcardDisplayMode.CHARACTERS_AND_PINYIN:
          answer = drawEnglish(memoryWord.meaning, flashcardTop + 2.4 * textSize);
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
      for (let i = 0; i < 3; i++) {
        answerBoxes[i].box.attr({ stroke: null });
      }
    }
  };
}
