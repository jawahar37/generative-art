numberCircle = function() {
	let canvas = document.getElementById('number-circle');
	let {ctx, width, height} = canvasUtil.getScaled2dContext(canvas);

	let pallete = function(i) {
		colors = ["#9a031e", "#5f0f40", "#0f4c5c", "#256D1B"];
		return colors[i % colors.length];
	};

	function PolarCircle(radius, center = [width/2, height/2]) {
		let cartesian = function(theta) {
			return [
				center[0] + radius * Math.cos(theta),
				center[1] + radius * Math.sin(theta)
			];
		};
		
		this.makePoints = function(n, phase = 3*Math.PI/2) {
			let theta = 2 * Math.PI/n;	//angle between points
			let pointer =  function(i) {
				return cartesian(phase + i*theta);
			};
			return pointer;
		};
	}
	
	function draw(n) {
		ctx.clearRect(0, 0, width, height);

		let circle = new PolarCircle(height*0.45);

		let pointer = circle.makePoints(n);	//pointer makes points

		drawAllLines(pointer, n);
	}

	function drawAllLines(pointer, n) {
		ctx.lineWidth = 1;
		for (let i = 0; i < n; i++) {
			for (let j = 1; j <= n; j++) {
				drawLine(pointer(i), pointer(i+j));
			}
		}
	}

	function drawLine(a, b, color="#0f0a36") {
		let [x, y] = a;
		ctx.beginPath();
		ctx.moveTo(x, y);
		[x, y] = b;
		ctx.lineTo(x, y);
		ctx.strokeStyle = color;
		ctx.stroke();
	}

	function init() {
		let pointCountControl = document.getElementById("circle-point-count");
		pointCountControl.oninput = function(e) {
			draw(e.target.value);
		};
		n = 9;
		pointCountControl.value = n;
		draw(n);
	}

	init();
	return  {
		draw,
	};
}();