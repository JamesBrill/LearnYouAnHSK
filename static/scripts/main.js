var width;
var height;
var draw;
var TEXT_SIZE = 200;
var chineseText;
var translationText;
var translationShown = true;
var currentMemoryWordIndex = 0;

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
		if (translationShown)
		{
			currentMemoryWordIndex = Math.floor(Math.random() * MemoryWords.length);
		}
		drawMemoryWord(MemoryWords[currentMemoryWordIndex]);
	}

	var drawMemoryWord = function(memoryWord)
	{
		if (chineseText != undefined && translationShown)
		{
			chineseText.clear();
		}

		if (translationText != undefined && translationShown)
		{
			translationText.clear();
		}

		if (translationShown)
		{
			chineseText = draw.text(function(add)
			{
				add.tspan(memoryWord.characters);
				add.tspan(memoryWord.pinyin).newLine();
			});
			chineseText.fill("white");
			chineseText.move(0.5 * width, 0.3 * height);
			chineseText.font({
				family: "SimHei",
				size: TEXT_SIZE,			
				anchor: "middle",
				class: "disable_text_highlighting" 
			});
			translationShown = false;
		}
		else
		{
			translationText = draw.text(function(add)
			{
				add.tspan(memoryWord.meaning).newLine();
			});

			translationText.fill("white");
			translationText.move(0.5 * width, 0.3 * height + 2 * TEXT_SIZE);
			translationText.font({
				family: "Helvetica",
				size: 0.75 * TEXT_SIZE,
				anchor: "middle",
				class: "disable_text_highlighting" 
			});	
			translationShown = true;
		}			
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