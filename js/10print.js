var canvas = document.getElementById('10print');
var context = canvas.getContext('2d');


if(window.innerWidth > 600) {
	var width = 600;
	var height = 500;
}
else {
	var width = 400;
	var height = 500;
}

canvas.style.width = width + "px";
canvas.style.height = height + "px";

var pixelScale = Math.floor(window.devicePixelRatio);
canvas.width = width * pixelScale;
canvas.height = height * pixelScale;
context.scale(pixelScale, pixelScale)


_10print();

function _10print() {
	context.clearRect(0, 0, width, height);
	drawMaze(25, 4);
}

function drawMaze(step, slashWidth) {
	context.lineCap = "square";
	context.lineWidth = slashWidth;
	context.strokeStyle = "white";

	context.beginPath();
	for(var x = 0; x < width; x += step) {
		for(var y = 0; y < height; y+= step) {
			drawSlash(x, y, step, step);    
		}
	}
	context.stroke();
}

function drawSlash(x, y, width, height) {
	var leftToRight = probability(0.5);

	if(leftToRight) {
		context.moveTo(x, y);
		context.lineTo(x + width, y + height);    
	} else {
		context.moveTo(x + width, y);
		context.lineTo(x, y + height);
	}
}

function probability(probability) {
	if(probability > 1 || probability <= 0)
		return 0;
	return Math.random() >= probability;
}