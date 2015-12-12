$(document).ready(function () {
  var init = function () {
    var flashcardDisplayMode = FlashcardDisplayMode.CHARACTERS_AND_PINYIN;
    var controller = createController(flashcardDisplayMode, window.innerWidth / 10);
    controller.newSession();
  }

  if (SVG.supported) {
    init();
  }
  else {
    alert('SVG not supported');
  }
});
