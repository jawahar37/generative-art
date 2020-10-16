squareBloom = function() {
	var canvas = document.getElementById('square-bloom');
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

	//parameters
	var borderWidth = 5,
	padding = 10,
	count = 150,
	threshold = 8;
	maximumAttempts = 300;

	var pallete = ["#ff595e","#ffca3a","#8ac926","#1982c4", "#6A4C93"];	

	function Square(x, y, size) {
		this.x = x;
		this.y = y;
		this.size = size;
	}

	Square.prototype.manhattanEdgeDistance = function(x, y) {
		var centerDistance = Math.max(Math.abs(this.x - x), Math.abs(this.y - y));
		return Math.abs(centerDistance - this.size);
	}

	Square.prototype.drawPath = function() {
		ctx.rect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2)
	}

	draw();

	function draw() {
		ctx.clearRect(0, 0, width, height);

		squares = [];
		squares.push(new Square(rangeFloor(0, width), rangeFloor(0, height), rangeFloor(20, 60)));

		while(squares.length < count) {	//generate new squares
			var square = attemptNewSquare(maximumAttempts);
			if(square == null)
				break;
			
			squares.push(square);
		}

		ctx.lineWidth = borderWidth;
		ctx.strokeStyle = "white";
		for (var i = 0; i < squares.length; i++) {
			ctx.strokeStyle = pallete[rangeFloor(0, pallete.length)]
			ctx.beginPath();
			squares[i].drawPath();
			ctx.stroke();
		}
	}

	function attemptNewSquare(attempts) {
		var x = rangeFloor(0, width);
		var y = rangeFloor(0, height);
		var size = getFeasibleSize(x, y);

		if(size > threshold) {	//filters squares that are too small
			return new Square(x, y, size);
		}
		else if(attempts-- <= 0) {	//stop the process if a valid position for a new square can't be found even after many attempts.
			return null;
		}
		else
			return attemptNewSquare(attempts);
		
	}

	function getFeasibleSize(x, y) {
		var potentialSize = width; //intialize potential size to the largest value it can take.

		squares.forEach(function(square) {	//find the closest square
			potentialSize = Math.min(square.manhattanEdgeDistance(x, y), potentialSize);
		});
		return potentialSize - padding;
	}


	function rangeFloor(min, max) {
		// Return a random whole number between min and max
		return Math.floor(Math.random() * (max - min) + min);
	}


	return  {
		draw:draw
	}
}();