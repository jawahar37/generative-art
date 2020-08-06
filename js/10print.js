var canvas = document.getElementById('10print');
var context = canvas.getContext('2d');


canvas.width = 600;
canvas.height = 500;

var width = canvas.clientWidth;
var height = canvas.clientHeight;

context.lineCap = 'square';
context.lineWidth = 4;
context.strokeStyle = "white";

step = 20;
for(var x = 0; x < width; x += step) {
  for(var y = 0; y < height; y+= step) {
    draw(x, y, step, step);    
  }
}

function draw(x, y, width, height) {
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