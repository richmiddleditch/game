define("Ship", ['Config', 'PubSub'], function(Config, PubSub) {
	var Ship = function() {
  
	};
  
	Ship.prototype = {
		path: [[-15,10],[0,-30],[15,10],[0, 0]],
		fillColor: 'white',
    	lineWidth: 1,
    	lineColor: 'white',
    	img: new Image(),
    	drawToken: null,
    	keydownToken: null,
    	keyupToken: null,
    	keyPressed: new Array,
    	scale: 1/4,
    	rotation: 0,
    	position: [Config.width / 2, Config.height / 2],
    	speed: 0,
    	
    	init: function() {
    	  var self = this;
    	  this.drawToken = PubSub.subscribe('loop', function(msg, data) { self.draw(msg, data) });
    	  this.keydownToken = PubSub.subscribe('keydown', function(msg, data) {
    	  	if(self.keyPressed.indexOf(data) < 0) {
    	  		self.keyPressed.push(data);
    	  	}
    	  });
    	  this.keyupToken = PubSub.subscribe('keyup', function(msg, data) {
    	  	self.keyPressed.splice(self.keyPressed.indexOf(data), 1);
    	  });
    	},
    	
    	draw: function(msg, data) {    	
    		this.move();
    	
    	  	data.save();
    	 	data.translate(this.position[0], this.position[1]);    	  
    	  	data.rotate((this.rotation * Math.PI / 180));
    	  
    	  	data.fillStyle = this.fillColor;
    	  
    	  	data.beginPath();
    	  	
    	  	var x = this.path[0][0] * this.scale, y = this.path[0][1] * this.scale;
    	  	data.moveTo(x, y);
    	  	for(var i = 1; i < this.path.length; i++) {
    	  		x = this.path[i][0] * this.scale, y = this.path[i][1] * this.scale;
    	  		data.lineTo(x, y);
    	  	}
    	  	
    	  	data.closePath();
    	  	data.fill();
    	  
    	  	data.restore();
    	},
    	
    	move: function() {
    		
    		var timeFrame = Config.newTime - Config.oldTime;
    		
    		this.speed *= Config.friction;
    		
    		// Speed
    		if(this.keyPressed.indexOf(Config.KEYBOARD_UP) > -1) {
    			this.speed -= (Config.acceleration * timeFrame);
    			if(this.speed < -Config.maxSpeed) {
    				this.speed = -Config.maxSpeed;
    			}
    		}
    		if(this.keyPressed.indexOf(Config.KEYBOARD_DOWN) > -1) {
    			this.speed += (Config.decceleration * timeFrame);
    			if(this.speed > Config.minSpeed) {
    				this.speed = Config.minSpeed;
    			}
    		}
    		
    		// Turning
    		if(this.keyPressed.indexOf(Config.KEYBOARD_LEFT) > -1) {
    			if(this.rotation <= -360) {
    				this.rotation = 0;
    			} else {
    				this.rotation -= ((Math.abs(this.speed) / 2) + Config.turningRate) * timeFrame;
    			}
    		}
    		if(this.keyPressed.indexOf(Config.KEYBOARD_RIGHT) > -1) {
    			if(this.rotation >= 360) {
    				this.rotation = 0;
    			} else {
    				this.rotation += ((Math.abs(this.speed) / 2) + Config.turningRate) * timeFrame;
    			}
    		}
    		
    		this.position[0] -= (this.speed * Math.sin(this.rotation * Math.PI / 180)) * timeFrame;
    		this.position[1] += (this.speed * Math.cos(this.rotation * Math.PI / 180)) * timeFrame;
    		
    		this.position[0] = this.wrap(this.position[0], Config.width);
    		this.position[1] = this.wrap(this.position[1], Config.height);
    	},
    	
    	wrap: function(pos, max) {    	
    		if(pos < 0) {
    			pos = max;
    		}
    		if(pos > max) {
    			pos = 0;
    		}
    		return pos;
    	}
	};
    
	return Ship;
});

