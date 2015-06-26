function Canvas() 
{
	$('#drawing').height("95vh");
	this.width = $('#drawing').width();
	this.height = $('#drawing').height();
	this.draw = SVG('drawing').size("100%", "100%");
	this.background = this.draw.rect("100%", "100%");
}

Canvas.prototype.drawRadioButtons = function(leftX, topY, colour, texts, clickHandlers, size)
{
	var x = leftX;
	var radioButtons = new RadioButtons(0.03 * size);
	for (var i = 0; i < texts.length; i++) 
	{
		var clickHandler = function(i)
		{
			radioButtons.select(i);
			clickHandlers[i]();
		}.bind(this, i);
		var radioButton = this.drawRadioButton(x, topY, colour, 0.15 * size, texts[i], clickHandler, size);
		radioButtons.buttons.push(radioButton);
		x += 200; // TODO: make proportional
	}
	return radioButtons;
}

Canvas.prototype.drawRadioButton = function(x, y, colour, offset, text, clickHandler, size)
{
	var box = this.draw.rect(size, 0.5 * size);
	box.move(x - 0.5 * size, y);
	box.fill(colour);
	box.radius(0.05 * size);
	box.click(clickHandler);
	box.mouseover(function()
	{		
		var stroke = box.attr("stroke");
		if (stroke != "yellow")
		{
			box.attr({ stroke: "white", "stroke-width": 0.03 * size });
		}
	}.bind(this));
	box.attr({ cursor: "pointer" });

 	var text = this.draw.text(function(add)
	{
		for (var i = 0; i < text.length; i++)
		{
			add.tspan(text[i]).newLine();
		}
	});
	text.fill("white");
	text.move(x, y + offset);
	text.font({
		family: "Helvetica",
		size: 0.15 * size,
		anchor: "middle",
		class: "disable_text_highlighting",
		cursor: "pointer" 
	});	
	text.click(clickHandler);	
	return { box: box, text: text };
}