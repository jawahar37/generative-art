canvasUtil = (function() {
	function getScaled2dContext(canvas) {
		var ctx = canvas.getContext('2d');

		let [width, height] = window.innerWidth > 600 ? [600, 600] : [400, 400];

		canvas.style.width = width + "px";
		canvas.style.height = height + "px";

		var pixelScale = Math.floor(window.devicePixelRatio);
		canvas.width = width * pixelScale;
		canvas.height = height * pixelScale;
		ctx.scale(pixelScale, pixelScale);

		return {
			ctx,
			width,
			height,
		};
	}
	return {
		getScaled2dContext
	};
}());