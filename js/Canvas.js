define("Canvas", ['Config', 'PubSub'], function(Config, PubSub) {
  var Canvas = function() {
    this.framerate = Config.framerate || this.framerate;
    this.width = Config.width || this.width;
    this.ratio = Config.aspectRatio || this.ratio;
    
    this.init();
  };
  
  Canvas.prototype = {
    el: null,
    ctx: null,
    framerate: 60,
    t: null,
    layers: [],
    drawToken: null,
    
    init: function() {
      var self = this;
      this.drawToken = PubSub.subscribe('loop', function(msg, data) { self.draw(msg, data) });
      
      this.el = document.createElement('canvas');
      
      this.el.setAttribute('id', 'asteroidCanvas');
      this.el.width = Config.width;
      this.el.height = Config.height;
      
      document.body.appendChild(this.el);
      this.ctx = this.el.getContext('2d');
    },
    draw: function(msg, data) {
    	data.fillStyle = '#000';
    	data.fillRect(0, 0, this.el.width, this.el.height);    
    },
    setTimer: function() {
      var that = this;
      this.t = setTimeout(function() { that.loop(); }, 1000/this.framerate);
    },
    loop: function() {
      // publish frame event
      this.el.width = 0;
      this.el.width = Config.width;
      PubSub.publishSync('loop', this.ctx);
      this.setTimer();
    },
    
    // TODO: functionality to pause game when browser window loses focus
    pause: function() {
      clearTimeout(this.t);
    },
    resume: function() {
      this.setTimer();
    }
  };
  
  return Canvas;
});
