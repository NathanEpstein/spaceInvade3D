var Player = function(config){
  var self = this;
  Object.keys(config).forEach(function(key,i){
    self[key] = config[key];
  });

  self.size = {x:3,y:3,z:3};
  function makePlayer(){
    var geometry = new THREE.BoxGeometry( self.size.x, self.size.y, self.size.z );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    self.scene.add( cube );
    return cube;
  };
  self.cube = makePlayer();

  self.keys = new Keys();
};

Player.prototype = {
  update:function(){
    if (this.keys.down.left){
      this.cube.position.x -= 1;
    }
    else if (this.keys.down.right){
      this.cube.position.x += 1;
    }
    else if (this.keys.down.up){
      this.cube.position.y += 1;
    }
    else if (this.keys.down.down){
      this.cube.position.y -= 1;
    }
    else if (this.keys.down.space){
      this.fire();
    }
  },
  fire: function(){
    var self = this;
    self.game.addBody(new Bullet({
      scene: self.scene,
      origin: self.cube,
      velocity: -3,
    }));
  },
};

var Keys = function(){
  var self = this;
  self.down = {};
  window.onkeydown = function(e){
    self.down[mapper(e.keyCode)] = true;
  };
  window.onkeyup = function(e){
    self.down[mapper(e.keyCode)] = false;
  };
};

var mapper = function(code){
  if (code == 37){
    return 'left';
  }
  if (code == 38){
    return 'up';
  }
  if (code == 39){
    return 'right';
  }
  if (code == 40){
    return 'down';
  }
  if (code == 32){
    return 'space';
  }
};
