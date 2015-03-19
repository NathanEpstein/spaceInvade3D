;(function(){
  var Game = function(){
    //CREATE THE SCENE
    var scene,camera,renderer;
    function createScene(){
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

      renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );
    };
    createScene();
    this.scene = scene;
    renderer.setClearColor(0xffffff,1);

    //set camera position
    camera.position.z = 25;

    //CREATE GAME BODIES, ADD PLAYER AND INVADERS
    var self = this;
    self.bodies = [new Player({
      game: self,
      scene: scene,
    })];

    function makeInvaders(){
      for (var row = 0; row < 3; row++) {
        for (var col = 0; col < 8; col++) {
          self.bodies.push(
            new Invader({
              game: self,
              scene: scene,
              velocity: Math.pow(-1,row)*0.25,
              x: -42 + col*12,
              y: -12 + 12*row,
              z: -50,
            })
          );
        };
      };
    };
    makeInvaders();

    //RENDER THE SCENE
    function render() {
      self.update();
      requestAnimationFrame( render );
      renderer.render( scene, camera );
    };
    render();
  };

  Game.prototype = {
    update: function(){
      //filter out colliding and far away bodies
      var notColliding = [];
      var scene = this.scene;

      //far away... (these don't need to be filtered out, its an optimization)
      var bodies = this.bodies.filter(function(body){
        if (body.cube.position.z > 20 || body.cube.position.z < -150){
          scene.remove(body.cube);
          return false;
        }
        return true;
      });

      //colliding...
      bodies.forEach(function(body,i){
        var hits = collisions(body,bodies);
        if (hits.length == 0) notColliding.push(body);
        hits.forEach(function(hit){
          scene.remove(hit.cube);
        });
      });
      this.bodies = notColliding;


      //update remaining bodies
      this.bodies.forEach(function(body){
        body.update();
      });
    },
    addBody: function(body){
      this.bodies.push(body);
    },
  };

  window.onload = function(){
    new Game();
  }

})();