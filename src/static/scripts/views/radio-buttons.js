var createRadioButtons = function (strokeSize) {
  var buttons = [];
  var buttonsSelected = 0;

  return {
    addButton : function (button) {
      buttons.push(button);
    },
    select : function (index) {
      for (var i = 0; i < buttons.length; i++) {
        if (i == index) {
          buttons[i].box.attr({ stroke: "yellow", "stroke-width": strokeSize });
        }
        else {
          buttons[i].box.attr({ stroke: null });
        }
      }
      buttonsSelected = 1;
    },
    multiselect : function (index, clickHandler) {
      var stroke = buttons[index].box.attr("stroke");
      if (stroke != "yellow") {
        buttons[index].box.attr({ stroke: "yellow", "stroke-width": strokeSize });
        buttonsSelected++;
        clickHandler();
      }
      else if (buttonsSelected > 1) {
        buttons[index].box.attr({ stroke: null });
        buttonsSelected--;
        clickHandler();
      }
    },
    reset : function () {
      for (var i = 0; i < buttons.length; i++) {
        var box = buttons[i].box;
        var stroke = box.attr("stroke");
        if (stroke == "white") {
          box.attr("stroke", null);
        }
      }
    },
    show : function () {
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].box.show();
        buttons[i].text.show();
      }
    },
    hide : function () {
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].box.hide();
        buttons[i].text.hide();
      }
    }
  };
}
