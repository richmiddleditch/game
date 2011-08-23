define('Config', function(){

  var Config = {
    // Canvas
    aspectRatio: 1 / 2,
    framerate: 60,
    width: 364,
    height: 600,
        
    // Asteroid
    asteroidFillColor: [255, 255, 255],
    asteroidLineColor: [0, 0, 0],
    
    // Controls
    KEYBOARD_LEFT: 37,
    KEYBOARD_UP: 38,
    KEYBOARD_RIGHT: 39,
    KEYBOARD_DOWN: 40,
    
    turningRate: 2,
    friction: 0.99,
    maxSpeed: 10,
    minSpeed: 0,
    acceleration: 0.5,
    decceleration: 0.1
  };
  
  return Config;

});
