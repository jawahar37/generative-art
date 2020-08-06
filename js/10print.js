var canvas = document.getElementById('10print');
var context = canvas.getContext('2d');


if(window.innerWidth > 600) {
	canvas.width = 600;
	canvas.height = 500;
}
else {
	canvas.width = 400;
	canvas.height = 500;
}

var width = canvas.clientWidth;
var height = canvas.clientHeight;


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
	context.fillStyle = "#2B4570";
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