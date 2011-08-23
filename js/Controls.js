define("Controls", ['Config', 'PubSub'], function(Config, PubSub) {
	var Controls = function() {};
	
	Controls.prototype = {
		
		init: function() {
			// TODO: add keyboard events directly to canvas? possible?
			//var canvas = document.getElementById('asteroidCanvas');
			//canvas.addEventListener('keydown', function(e) {
			
			window.addEventListener('keydown', function(e) {
				PubSub.publishSync('keydown', e.keyCode);
			}, true);
			
			window.addEventListener('keyup', function(e) {
				PubSub.publishSync('keyup', e.keyCode);
			}, true);
		}
	};
	
	return Controls;
});