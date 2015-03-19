var Bullet = function(config){
  var self = this;
  Object.keys(config).forEach(function(key,i){
    self[key] = config[key];
  });


  self.size = {x:1,y:1,z:1};
  function makeBullet(){
    var geometry = new THREE.BoxGeometry( self.size.x, self.size.y, self.size.z );
    var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    var cube = new THREE.Mesh( geometry, material );
    var pos = self.origin.position;
    cube.position.set(pos.x, pos.y, pos.z);
    self.scene.add( cube );
    return cube;
  };
  self.cube = makeBullet();
};

Bullet.prototype = {
  update: function(){
    this.cube.position.z += this.velocity;
  },
};