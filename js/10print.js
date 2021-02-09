_10print = function() {
	let canvas = document.getElementById('10print');
	let {ctx, width, height} = canvasUtil.getScaled2dContext(canvas);

	draw();

	function draw() {
		ctx.clearRect(0, 0, width, height);
		drawMaze(25, 4);
	}

	function drawMaze(step, slashWidth) {
		ctx.lineCap = "square";
		ctx.lineWidth = slashWidth;
		ctx.strokeStyle = "white";

		ctx.beginPath();
		for(let x = 0; x < width; x += step) {
			for(let y = 0; y < height; y+= step) {
				drawSlash(x, y, step, step);    
			}
		}
		ctx.stroke();
	}

	function drawSlash(x, y, width, height) {
		let leftToRight = probability(0.5);

		if(leftToRight) {
			ctx.moveTo(x, y);
			ctx.lineTo(x + width, y + height);    
		} else {
			ctx.moveTo(x + width, y);
			ctx.lineTo(x, y + height);
		}
	}

	function probability(probability) {
		if(probability > 1 || probability <= 0)
			return 0;
		return Math.random() >= probability;
	}

	return  {
		draw,
	};
}();