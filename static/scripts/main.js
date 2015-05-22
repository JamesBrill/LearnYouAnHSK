var width;
var height;
var draw;
var TEXT_SIZE = 200;
var charactersText;
var translationText;

$(document).ready(function () 
{  
	var init = function()
	{
		$('#drawing').height("95vh");
		width = $('#drawing').width();
		height = $('#drawing').height();
		draw = SVG('drawing').size("100%", "100%");
		var background = draw.rect("100%", "100%");
		background.click(displayNextMemoryWord);
	}

	var displayNextMemoryWord = function()
	{
		var randomIndex = Math.floor(Math.random() * MemoryWords.length);
		drawMemoryWord(MemoryWords[randomIndex]);
	}

	var drawMemoryWord = function(memoryWord)
	{
		if (charactersText != undefined)
		{
			charactersText.clear();
		}

		if (translationText != undefined)
		{
			translationText.clear();
		}

		charactersText = draw.text(memoryWord.characters);
		charactersText.fill("white");
		charactersText.move(0.5 * width, 0.3 * height);
		charactersText.font({
			family: "SimHei",
			size: TEXT_SIZE,			
			anchor: "middle"
		});

		translationText = draw.text(function(add)
		{
			add.tspan(memoryWord.pinyin).newLine();
			add.tspan(memoryWord.meaning).newLine();
		});

		translationText.fill("white");
		translationText.move(0.5 * width, 0.3 * height + TEXT_SIZE);
		translationText.font({
			family: "Helvetica",
			size: 0.75 * TEXT_SIZE,
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