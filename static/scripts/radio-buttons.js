function RadioButtons(strokeSize) 
{
	this.buttons = [];
	this.strokeSize = strokeSize;
}

RadioButtons.prototype.select = function(index)
{
	for (var i = 0; i < this.buttons.length; i++)
	{
		if (i == index)
		{
			this.buttons[i].box.attr({ stroke: "yellow", "stroke-width": this.strokeSize });			
		}
		else
		{
			this.buttons[i].box.attr({ stroke: null });
		}
	}
}

RadioButtons.prototype.multiselect = function(index)
{
	var stroke = this.buttons[index].box.attr("stroke");
	if (stroke != "yellow")
	{
		this.buttons[index].box.attr({ stroke: "yellow", "stroke-width": this.strokeSize });
	}
	else
	{
		this.buttons[index].box.attr({ stroke: null });
	}	
}

RadioButtons.prototype.reset = function()
{
	for (var i = 0; i < this.buttons.length; i++) 
	{
		var box = this.buttons[i].box;
		var stroke = box.attr("stroke");
		if (stroke == "white")
		{
			box.attr("stroke", null);
		}
	}
}

RadioButtons.prototype.show = function()
{
	for (var i = 0; i < this.buttons.length; i++) 
	{
		this.buttons[i].box.show();
		this.buttons[i].text.show();
	}
}

RadioButtons.prototype.hide = function()
{
	for (var i = 0; i < this.buttons.length; i++) 
	{
		this.buttons[i].box.hide();
		this.buttons[i].text.hide();
	}
}