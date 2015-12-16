let createCompleteSessionView = function (scope, canvas, textSize) {
  let sessionCompleteText = canvas.drawText(0.5 * canvas.getWidth(),
               0.1 * canvas.getHeight(),
               ["Session", "complete!"],
               "Helvetica",
               0.75 * textSize,
               "pointer");
  let sessionCompleteButtonSize = 1.2 * textSize;
  let repeatSessionBoxElements = canvas.drawButton(0.4 * canvas.getWidth(),
                           0.7 * canvas.getHeight(),
                           ["Repeat", "session [R]"],
                           "blue",
                           0.05 * sessionCompleteButtonSize,
                           function () { scope.beginSession(); },
                           sessionCompleteButtonSize);
  let newSessionBoxElements = canvas.drawButton(0.6 * canvas.getWidth(),
                          0.7 * canvas.getHeight(),
                          ["New", "session [N]"],
                          "blue",
                          0.05 * sessionCompleteButtonSize,
                          function () { scope.newSession(); },
                          sessionCompleteButtonSize);
  let sessionCompleteButtons = [ repeatSessionBoxElements, newSessionBoxElements ];

  let hideSessionCompleteButtons = function () {
    for (let i = 0; i < 2; i++) {
      sessionCompleteButtons[i].box.hide();
      sessionCompleteButtons[i].text.hide();
    }
  }

  let showSessionCompleteButtons = function () {
    for (let i = 0; i < 2; i++) {
      sessionCompleteButtons[i].box.show();
      sessionCompleteButtons[i].text.show();
    }
  }

  hideSessionCompleteButtons();

  return {
    resetSessionCompleteButtons : function () {
      for (let i = 0; i < 2; i++) {
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
