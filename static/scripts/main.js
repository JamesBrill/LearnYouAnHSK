var width;
var height;
var draw;

$(document).ready(function () 
{  
	var init = function()
	{
		$('#drawing').height("95vh");
		width = $('#drawing').width();
		height = $('#drawing').height();
		draw = SVG('drawing').size("100%", "100%");
		var background = draw.rect("100%", "100%");
		drawMemoryWord(MemoryWords[0]);
	}

	var drawMemoryWord = function(memoryWord)
	{
		var a = draw.text(memoryWord.characters);
		a.fill("white");
		a.move(0.5 * width, 0.3 * height);
		a.font({
			family: "SimHei",
			size: 200,			
			anchor: "middle"
		});

		var b = draw.text(function(add)
		{
			add.tspan(memoryWord.pinyin).newLine();
			add.tspan(memoryWord.meaning).newLine();
		});

		b.fill("white");
		b.move(0.5 * width, 0.3 * height + 200);
		b.font({
			family: "Helvetica",
			size: 150,
			anchor: "middle"
		});				
	}

	if (SVG.supported)
	{
		init();
	}
	else
	{
		alert('SVG not supported');
	}
});