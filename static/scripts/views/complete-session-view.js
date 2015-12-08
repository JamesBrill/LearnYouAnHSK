var createCompleteSessionView = function () {
  var sessionCompleteText = canvas.drawText(0.5 * canvas.getWidth(),
               0.1 * canvas.getHeight(),
               ["Session", "complete!"],
               "Helvetica",
               0.75 * TEXT_SIZE,
               "pointer");
  var sessionCompleteButtonSize = 1.2 * TEXT_SIZE;
  var repeatSessionBoxElements = canvas.drawButton(0.4 * canvas.getWidth(),
                           0.7 * canvas.getHeight(),
                           ["Repeat", "session [R]"],
                           "blue",
                           0.05 * sessionCompleteButtonSize,
                           function () { controller.beginSession(); },
                           sessionCompleteButtonSize);
  var newSessionBoxElements = canvas.drawButton(0.6 * canvas.getWidth(),
                          0.7 * canvas.getHeight(),
                          ["New", "session [N]"],
                          "blue",
                          0.05 * sessionCompleteButtonSize,
                          function () { controller.newSession(); },
                          sessionCompleteButtonSize);
  var sessionCompleteButtons = [ repeatSessionBoxElements, newSessionBoxElements ];

  var hideSessionCompleteButtons = function () {
    for (var i = 0; i < 2; i++) {
      sessionCompleteButtons[i].box.hide();
      sessionCompleteButtons[i].text.hide();
    }
  }

  var showSessionCompleteButtons = function () {
    for (var i = 0; i < 2; i++) {
      sessionCompleteButtons[i].box.show();
      sessionCompleteButtons[i].text.show();
    }
  }

  hideSessionCompleteButtons();

  return {
    resetSessionCompleteButtons : function () {
      for (var i = 0; i < 2; i++) {
        sessionCompleteButtons[i].box.attr({ stroke: null });
      }
    },
    displaySessionCompleteMenu : function () {
      sessionCompleteText.show();
      showSessionCompleteButtons();
    },
    clear : function () {
      sessionCompleteText.hide();
      hideSessionCompleteButtons();
    }
  };
}
