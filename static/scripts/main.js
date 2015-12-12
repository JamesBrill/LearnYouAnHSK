var hskWordList = createWordList(1);
var controller;
var canvas;

$(document).ready(function () {
  var init = function () {
    canvas = createCanvas();
    var flashcardDisplayMode = FlashcardDisplayMode.CHARACTERS_AND_PINYIN;
    controller = createController(flashcardDisplayMode, window.innerWidth / 10);
    controller.newSession();
  }

  if (SVG.supported) {
    init();
  }
  else {
    alert('SVG not supported');
  }
});
