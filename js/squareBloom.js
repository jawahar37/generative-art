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
	var initialBorderWidth = 1,
	initialPadding = 3,
	initialThreshold = 2;

	var padding = 3,
	threshold = 2,
	count = 10000,
	maximumAttempts = 100;

	document.getElementById("square-bloom-padding").value = initialPadding;
	document.getElementById("square-bloom-threshold").value = initialThreshold;
	document.getElementById("square-bloom-border-width").value = initialBorderWidth;


	var pallete = ["#ff595e","#ffca3a","#8ac926","#1982c4", "#6A4C93"];	

	function Square(x, y, size) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.children = [];
	}

	Square.prototype.getManhattanCenterDistance = function(x, y) {
		return Math.max(Math.abs(this.x - x), Math.abs(this.y - y));
	}

	Square.prototype.isPointEnclosed = function(x, y) {
		return this.getManhattanCenterDistance(x, y) <= this.size;
	}

	Square.prototype.draw = function() {
		ctx.strokeStyle = pallete[rangeFloor(0, pallete.length)]
		ctx.beginPath();
		ctx.rect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2)
		ctx.stroke();
	}

	draw();

	function draw() {
		ctx.clearRect(0, 0, width, height);

		padding = parseInt(document.getElementById("square-bloom-padding").value);
		threshold = parseInt(document.getElementById("square-bloom-threshold").value);
		ctx.lineWidth  = parseInt(document.getElementById("square-bloom-border-width").value);

		var root = new Square(width/2, height/2, (width + padding)/2);

		generateSquares(root);
		drawSquares(root);
	}

	function generateSquares(root) {
		var squaresGenerated = 0;

		while(squaresGenerated < count) {	//generate new squares till either enough squares are drawn are till attempts expire
			var attemptsLeft = maximumAttempts;
		
			while(--attemptsLeft > 0) {
				var x = rangeFloor(0, width);
				var y = rangeFloor(0, height);
				var enclosingRoot = getEnclosingSquare(x, y, root);
				var size = getFeasibleSize(x, y, enclosingRoot);

				if(size > threshold) {	//filters squares that are too small
					var square = new Square(x, y, size);
					enclosingRoot.children.push(square);
					squaresGenerated++;
					break;
				}
			}
			if(attemptsLeft <= 0)	//halt generation of squares if attempts run out
				break;
		}
	}

	function getEnclosingSquare(x, y, root) {
		var enclosingRoot = root;

		if(root.children.length > 0) {
			root.children.forEach(function(square) {
				if(square.isPointEnclosed(x, y)) {
					enclosingRoot = getEnclosingSquare(x, y, square);
				}
			});
		}
		return enclosingRoot;	//return root if the point is outside all children
	}

	function getFeasibleSize(x, y, root) {
		var potentialSize = root.size; //intialize potential size to the largest value it can take.

			potentialSize = Math.min(root.size - root.getManhattanCenterDistance(x, y), potentialSize);

			root.children.forEach(function(square) {	//find the closest square
				potentialSize = Math.min(square.getManhattanCenterDistance(x, y) - square.size, potentialSize);
			});
		return potentialSize - padding;
	}

	function drawSquares(root) {
		root.draw();
		root.children.forEach(drawSquares);
	}

	function rangeFloor(min, max) {
		// Return a random whole number between min and max
		return Math.floor(Math.random() * (max - min) + min);
	}

	return  {
		draw:draw
	}
}();