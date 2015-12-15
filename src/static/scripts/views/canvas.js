var createCanvas = function () {
  $('#drawing').height("98vh");
  var width = $('#drawing').width();
  var height = $('#drawing').height();
  var draw = SVG('drawing').size("100%", "100%");
  var background = draw.rect("100%", "100%");

  var drawRadioButton = function (x, y, colour, text, clickHandler, size) {
    var box = draw.rect(size, 0.5 * size);
    box.move(x, y);
    box.fill(colour);
    box.radius(0.05 * size);
    box.click(clickHandler);
    box.mouseover(function() {
      var stroke = box.attr("stroke");
      if (stroke != "yellow") {
        box.attr({ stroke: "white", "stroke-width": 0.03 * size });
      }
    }.bind(this));
    box.attr({ cursor: "pointer" });

    var textOffset, textSize;
    switch (text.length) {
      case 1:
        textOffset = 0.15 * size;
        textSize = 0.15 * size;
        break;
      case 2:
      default:
        textOffset = 0.05 * size;
        textSize = 0.15 * size;
        break;
    }

    var text = draw.text(function(add) {
      for (var i = 0; i < text.length; i++) {
        add.tspan(text[i]).newLine();
      }
    });
    text.fill("white");
    text.move(x + 0.5 * size, y + textOffset);
    text.font({
      family: "Helvetica",
      size: textSize,
      anchor: "middle",
      class: "disable_text_highlighting",
      cursor: "pointer"
    });
    text.click(clickHandler);
    return { box: box, text: text };
  }

  var drawText = function (x, y, text, font, fontSize, cursor) {
    var text = draw.text(function(add) {
      if ($.isArray(text)) {
          for (var i = 0; i < text.length; i++) {
            add.tspan(text[i]).newLine();
          }
      }
      else {
        add.tspan(text).newLine();
      }
    });
    text.fill("white");
    text.move(x, y);
    text.font({
      family: font,
      size: fontSize,
      anchor: "middle",
      class: "disable_text_highlighting",
      cursor: cursor || "default"
    });
    return text;
  }

  return {
    drawRadioButtons : function (multiselect, leftX, topY, colour, texts, clickHandlers, size) {
      var x = leftX;
      var radioButtons = createRadioButtons(0.03 * size);
      for (var i = 0; i < texts.length; i++) {
        var clickHandler = function(i) {
          if (multiselect) {
            radioButtons.multiselect(i, clickHandlers[i]);
          }
          else {
            radioButtons.select(i);
            clickHandlers[i]();
          }
        }.bind(this, i);
        var radioButton = drawRadioButton(x, topY, colour, texts[i], clickHandler, size);
        radioButtons.addButton(radioButton);
        x += 2 * size;
      }
      radioButtons.select(0);
      return radioButtons;
    },
    drawButton : function (x, y, text, colour, offset, clickHandler, size) {
      var box = draw.rect(size, 0.5 * size);
      box.move(x - 0.5 * size, y);
      box.fill(colour);
      box.radius(0.05 * size);
      box.click(clickHandler);
      box.mouseover(function() {
        box.attr({ stroke: "white", "stroke-width": 0.03 * size });
      }.bind(this));
      box.attr({ cursor: "pointer" });

      var text = drawText(x, y + offset, text, "Helvetica", 0.15 * size, "pointer")
      text.click(clickHandler);
      return { box: box, text: text };
    },
    drawText : drawText,
    drawGroup : function (items) {
      var group = draw.group();
      for (var i = 0; i < items.length; i++) {
        group.add(items[i]);
      }
      return group;
    },
    drawTextUnderline : function (x, y, length, colour, stroke) {
      var line = draw.rect(length, stroke);
      line.move(x, y);
      line.fill(colour);
      return line;
    },
    getWidth : function () {
      return width;
    },
    getHeight : function () {
      return height;
    },
    getBackground : function () {
      return background;
    }
  }
}
