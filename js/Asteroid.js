define("Asteroid", ['Config'], function(Config) {
  var Asteroid = function() {
    this.fillColor = Config.asteroidFillColor || this.fillColor;
    this.lineColor = Config.asteroiLineColor || this.lineColor;
  };
  
  Asteroid.prototype = {
    path: [],
    fillColor: [255, 255, 255],
    lineWidth: 1,
    lineColor: [0, 0, 0],
      
    generate: function(radius, detail, texture) { 
      var segments = 360 / detail,
          angle,
          rand;
      
      for (var i = 1; i <= detail; i++) {
        angle = (segments * i) * (Math.PI / 180);
        rand = radius * (1 - texture + Math.random() * texture);
        this.path.push([
          Math.cos(angle) * rand,
          Math.sin(angle) * rand
        ]);
      }
      
      this.lineWidth = radius / 20;
  
      return this.path;
    },
      
    draw: function() {},
      
    rotate: function() {}
  };
    
  return Asteroid;
});

