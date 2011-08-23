require(["Canvas", "Ship", "Controls"], function(Canvas, Ship, Controls) {
  require.ready(function() {
    var canvas = new Canvas();
    
    var ship = new Ship();
    var layer = ship.init();
    var controls = new Controls();
    controls.init();
    
    canvas.setTimer();
  });
});

