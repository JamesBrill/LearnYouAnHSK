let createCanvas = function () {
  $('#drawing').height("98vh");
  let width = $('#drawing').width();
  let height = $('#drawing').height();
  let draw = SVG('drawing').size("100%", "100%");
  let background = draw.rect("100%", "100%");

  let drawRadioButton = function (x, y, colour, textLines, clickHandler, size) {
    let box = draw.rect(size, 0.5 * size);
    box.move(x, y);
    box.fill(colour);
    box.radius(0.05 * size);
    box.click(clickHandler);
    box.mouseover(function() {
      let stroke = box.attr("stroke");
      if (stroke != "yellow") {
        box.attr({ stroke: "white", "stroke-width": 0.03 * size });
      }
    }.bind(this));
    box.attr({ cursor: "pointer" });

    let textOffset, textSize;
    switch (textLines.length) {
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

    let text = draw.text(function(add) {
      for (let i = 0; i < textLines.length; i++) {
        add.tspan(textLines[i]).newLine();
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

  let drawText = function (x, y, textLines, font, fontSize, cursor) {
    let text = draw.text(function(add) {
      if ($.isArray(textLines)) {
          for (let i = 0; i < textLines.length; i++) {
            add.tspan(textLines[i]).newLine();
          }
      }
      else {
        add.tspan(textLines).newLine();
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
      let x = leftX;
      let radioButtons = createRadioButtons(0.03 * size);
      for (let i = 0; i < texts.length; i++) {
        let clickHandler = function(i) {
          if (multiselect) {
            radioButtons.multiselect(i, clickHandlers[i]);
          }
          else {
            radioButtons.select(i);
            clickHandlers[i]();
          }
        }.bind(this, i);
        let radioButton = drawRadioButton(x, topY, colour, texts[i], clickHandler, size);
        radioButtons.addButton(radioButton);
        x += 2 * size;
      }
      radioButtons.select(0);
      return radioButtons;
    },
    drawButton : function (x, y, textLines, colour, offset, clickHandler, size) {
      let box = draw.rect(size, 0.5 * size);
      box.move(x - 0.5 * size, y);
      box.fill(colour);
      box.radius(0.05 * size);
      box.click(clickHandler);
      box.mouseover(function() {
        box.attr({ stroke: "white", "stroke-width": 0.03 * size });
      }.bind(this));
      box.attr({ cursor: "pointer" });

      let text = drawText(x, y + offset, textLines, "Helvetica", 0.15 * size, "pointer")
      text.click(clickHandler);
      return { box: box, text: text };
    },
    drawText : drawText,
    drawGroup : function (items) {
      let group = draw.group();
      for (let i = 0; i < items.length; i++) {
        group.add(items[i]);
      }
      return group;
    },
    drawTextUnderline : function (x, y, length, colour, stroke) {
      let line = draw.rect(length, stroke);
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
