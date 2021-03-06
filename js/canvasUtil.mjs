function get2dContext(canvas, width, height) {
	var ctx = canvas.getContext('2d');

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

function getScaled2dContext(canvas) {
	let [width, height] = window.innerWidth > 600 ? [600, 600] : [400, 400];

	return get2dContext(canvas, width, height);
}
export {
	getScaled2dContext,
	get2dContext,
};