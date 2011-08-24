require(["Canvas", "Ship", "Controls"], function(Canvas, Ship, Controls) {
	require.ready(function() {
		var canvas = new Canvas();		
		var controls = new Controls();
		var ship = new Ship();
		
		canvas.init();
		ship.init();
		controls.init();

		canvas.setTimer();
	});
});