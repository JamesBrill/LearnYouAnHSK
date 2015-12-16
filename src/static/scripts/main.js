$(document).ready(function () {
  let init = function () {
    let flashcardDisplayMode = FlashcardDisplayMode.CHARACTERS_AND_PINYIN;
    let controller = createController(flashcardDisplayMode, window.innerWidth / 10);
    controller.newSession();
  }

  if (SVG.supported) {
    init();
  }
  else {
    alert('SVG not supported');
  }
});
