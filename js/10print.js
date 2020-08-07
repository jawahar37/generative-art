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

step = 20;
drawMaze(step, 4);

function _10print() {
	var stepInput = Number(document.getElementById("10print-step").value);
	stepInput = (stepInput <= 10 || stepInput == NaN ) ? 10 : stepInput;
	slashWidth = (stepInput >= 20) ? 4 : 1;

	console.log("Drawing maze: " + stepInput);
	drawMaze(stepInput, slashWidth);
}

function drawMaze(step, slashWidth) {
	context.fillStyle = "#EF8354";
  	context.fillRect(0, 0, width, height);

  	context.lineCap = "square";
	context.lineWidth = slashWidth;
	context.strokeStyle = "white";

	context.beginPath();
	for(var x = 0; x < width; x += step) {
	  for(var y = 0; y < height; y+= step) {
	    drawSlash(x, y, step, step);    
	  }
	}
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
  context.stroke();
}

function probability(probability) {
	if(probability > 1 || probability <= 0)
		return 0;
	return Math.random() >= probability;
}