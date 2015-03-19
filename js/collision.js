var collide = function(b1,b2,scene){
  //return false if one body is a bullet fired by the other
  if ((b1 instanceof Bullet && b1.origin === b2.cube) ||
    (b2 instanceof Bullet && b2.origin === b1.cube)){
    return false;
  }
  //return false if one body is the other
  if (b1 === b2){
    return false;
  }

  //check for collisions
  var p1 = b1.cube.position;
  var p2 = b2.cube.position;
  if (p1.x + b1.size.x/2 < p2.x - b2.size.x/2){
    return false;
  }
  if (p1.y + b1.size.y/2 < p2.y - b2.size.y/2){
    return false;
  }
  if (p1.z + b1.size.z/2 < p2.z - b2.size.z/2){
    return false;
  }
  if (p1.x - b1.size.x/2 > p2.x + b2.size.x/2){
    return false;
  }
  if (p1.y - b1.size.y/2 > p2.y + b2.size.y/2){
    return false;
  }
  if (p1.z - b1.size.z/2 > p2.z + b2.size.z/2){
    return false;
  }
  return true;
};

var collisions = function(body,bodies){
  return bodies.filter(function(b){
    return collide(body,b);
  });
};


