var canvas = document.getElementById('spiro');
var ctx = canvas.getContext('2d');


if(window.innerWidth > 600) {
	var width = 600;
	var height = 600;
}
else {
	var width = 400;
	var height = 400;
}

canvas.style.width = width + "px";
canvas.style.height = height + "px";

var pixelScale = Math.floor(window.devicePixelRatio);
canvas.width = width * pixelScale;
canvas.height = height * pixelScale;
ctx.scale(pixelScale, pixelScale)

document.getElementById("spiro-radius").value = 0.66;
document.getElementById("spiro-rotation").value = 3;
spiro();

function spiro() {
	ctx.fillStyle = "#ffffff";
  	ctx.fillRect(0, 0, width, height);
  	ctx.lineWidth = 5;

  	let totalRadius = 200;
  	let radiusRatio = document.getElementById("spiro-radius").value;
	let innerRadius = Math.floor(totalRadius * radiusRatio), outerRadius = Math.floor(totalRadius * (1 - radiusRatio));
	
  	let rotationRatio = document.getElementById("spiro-rotation").value;
	
	drawSpiro(width/2, height/2, innerRadius, outerRadius, 1.0/rotationRatio, rotationRatio);
}

function drawSpiro(centerX, centerY, innerRadius, outerRadius, ratio, loops) {

	let lastX = centerX + innerRadius + outerRadius;
	let lastY = centerY;

	for (let theta = 0; theta < (loops * 2 * Math.PI) + 0.01; theta += 0.01) {
		let x =
	        centerX +
	        innerRadius * Math.cos(theta) +
	        outerRadius * Math.cos(theta * ratio);
	    let y =
	        centerY +
	        innerRadius * Math.sin(theta) +
	        outerRadius * Math.sin(theta * ratio);
	    
	    let color = "hsl(" + Math.floor(theta * 360 / (2 * Math.PI)) + ", 100%, 50%)";

	    drawLine(lastX, lastY, x, y, color);
	    lastX = x;
	    lastY = y;
	}
}

function drawLine(x1, y1, x2, y2, color) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.strokeStyle = color;
	ctx.stroke();
}