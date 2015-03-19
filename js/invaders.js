var Invader = function(config){
  var self = this;
  Object.keys(config).forEach(function(key,i){
    self[key] = config[key];
  });

  self.size = {x:3,y:3,z:3};
  function makeInvader(){
    var geometry = new THREE.BoxGeometry( self.size.x, self.size.y, self.size.z );
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.set(self.x,self.y,self.z);
    self.scene.add( cube );
    return cube;
  };
  self.cube = makeInvader();
  self.shift = 0;
};

Invader.prototype = {
  update: function(){
    this.cube.rotation.x += 0.05;
    this.cube.rotation.y += 0.05;

    // move back and forth
    if (this.shift > 10 || this.shift < -10){
      this.velocity = (-1) * this.velocity;
    }
    this.cube.position.x += this.velocity;
    this.shift += this.velocity;

    if (Math.random() > 0.995){
      this.fire();
    }
  },
  fire: function(){
    var self = this;
    self.game.addBody(new Bullet({
      scene: self.scene,
      origin: self.cube,
      velocity: 3,
    }));
  },
};