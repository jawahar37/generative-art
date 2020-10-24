canvasUtil = (function() {
	function getScaled2dContext(canvas) {
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

		return {
			ctx,
			width,
			height
		}
	}
	return {
		getScaled2dContext
	}
}());