//this class expect the rad.vector class
rad.noise={};
rad.noise.perlin=function(seed_value){
  return this.init(seed_value);
}
rad.noise.perlin.prototype.init=function(seed_value){
  this.seed_=seed_value||0;
  //this.xdiv = xdiv||10;
  //this.ydiv = ydiv||10;
  this._GRAD = [new rad.vector2(1,1),new rad.vector2(-1,1),new rad.vector2(1,-1),new rad.vector2(-1,-1),
    new rad.vector2(1,0),new rad.vector2(-1,0),new rad.vector2(1,0),new rad.vector2(-1,0),
    new rad.vector2(0,1),new rad.vector2(0,-1),new rad.vector2(0,1),new rad.vector2(0,-1),
    new rad.vector2(1,1),new rad.vector2(0,-1),new rad.vector2(-1,1),new rad.vector2(0,-1)];

  this.p = [151,160,137,91,90,15,
    131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
    190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
    88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,
    77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
    102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,
    135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,
    5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
    223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,
    129,22,39,253,9,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,
    251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
    49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,
    138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];

  //this.period = this.permutation.length;
  this.perm = new Array(512);
  this.gradP = new Array(512);


  this._F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
  this._G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
  this._F3 = 1.0 / 3.0;
  this._G3 = 1.0 / 6.0;

  this.seed(0);

  //this.double_permutation();

  return this;

}

/*game.perlin.prototype.double_permutation=function(){
  var iter = this.permutation.length;
  for(var t=0; t<iter;t++){
    this.permutation.push(this.permutation[t]);
  }
}*/

/*game.perlin.prototype.randomize=function(p){
  period = p || 0;
  perm=[];

  perm_right = period - 1;

  for (var i=0; i< period;i++){
    var j = Math.floor(Math.random(0)*perm_right);
    perm[j]=perm[i];
    perm[i]=perm[j];
  }
  this.permutation = perm;
  this.double_permutation();
}*/

rad.noise.perlin.prototype.seed=function(seed){
  if(seed > 0 && seed < 1) {
    // Scale the seed out
    seed *= 65536;
  }
  seed = Math.floor(seed);
  if(seed < 256) {
    seed |= seed << 8;
  }
  for(var i = 0; i < 256; i++) {
    var v;
    if (i & 1) {
      v = this.p[i] ^ (seed & 255);
    } else {
      v = this.p[i] ^ ((seed>>8) & 255);
    }
    this.perm[i] = this.perm[i + 256] = v;
    this.gradP[i] = this.gradP[i + 256] = this._GRAD[v % 12];
  }
}
//-------------------
rad.noise.perlin.prototype.fade = function(t) {
  return t*t*t*(t*(t*6-15)+10);
}
rad.noise.perlin.prototype.lerp = function(a, b, t) {
  return (1-t)*a + t*b;
}

rad.noise.perlin.prototype.perlin2=function(x, y,sx, sy, ox, oy){
  /*2D Perlin simplex noise.
  Return a floating point value from -1 to 1 for the given x, y coordinate.
  The same value is always returned for a given x, y pair unless the
  permutation table changes (see randomize above).
  */
  //Skew input space to determine which simplex (triangle) we are in
  sx=sx||0.0;
  sy=sy||0.0;
  ox=ox||0.0;
  oy=oy||0.0;
  x = (x+ox)*sx;
  y = (y+oy)*sy;

  //https://github.com/josephg/noisejs/blob/master/perlin.js
  // Find unit grid cell containing point
  var _x = Math.floor(x);
  var _y = Math.floor(y);
  // Get relative xy coordinates of point within that cell
  x = x - _x;
  y = y - _y;
  // Get relative xy coordinates of point within that cell
  _x = _x & 255;
  _y = _y & 255;

  var n00 = this.gradP[_x+this.perm[_y]].dot(new rad.vector2(x, y));
  var n01 = this.gradP[_x+this.perm[_y+1]].dot(new rad.vector2(x, y-1));
  var n10 = this.gradP[_x+1+this.perm[_y]].dot(new rad.vector2(x-1, y));
  var n11 = this.gradP[_x+1+this.perm[_y+1]].dot(new rad.vector2(x-1, y-1));

  // Compute the fade curve value for x
  var u = this.fade(x);
  return this.lerp( this.lerp(n00, n10, u), this.lerp(n01, n11, u), this.fade(y) );
}
//----------------
rad.noise.perlin.prototype.simplex2 = function(xin, yin, sx, sy, ox, oy) {
  //Skew input space to determine which simplex (triangle) we are in
  sx=sx||0.0;
  sy=sy||0.0;
  ox=ox||0.0;
  oy=oy||0.0;
  xin = (xin+ox)*sx;
  yin = (yin+oy)*sy;

  var n0, n1, n2; // Noise contributions from the three corners
  // Skew the input space to determine which simplex cell we're in
  var s = (xin+yin)*this._F2; // Hairy factor for 2D
  var i = Math.floor(xin+s);
  var j = Math.floor(yin+s);
  var t = (i+j)*this._G2;
  var x0 = xin-i+t; // The x,y distances from the cell origin, unskewed.
  var y0 = yin-j+t;
  // For the 2D case, the simplex shape is an equilateral triangle.
  // Determine which simplex we are in.
  var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
  if(x0>y0) { // lower triangle, XY order: (0,0)->(1,0)->(1,1)
    i1=1; j1=0;
  }else{ // upper triangle, YX order: (0,0)->(0,1)->(1,1)
    i1=0; j1=1;
  }
  // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
  // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
  // c = (3-sqrt(3))/6
  var x1 = x0 - i1 + this._G2; // Offsets for middle corner in (x,y) unskewed coords
  var y1 = y0 - j1 + this._G2;
  var x2 = x0 - 1 + 2 * this._G2; // Offsets for last corner in (x,y) unskewed coords
  var y2 = y0 - 1 + 2 * this._G2;
  // Work out the hashed gradient indices of the three simplex corners
  i &= 255;
  j &= 255;
  var gi0 = this.gradP[i+this.perm[j]];
  var gi1 = this.gradP[i+i1+this.perm[j+j1]];
  var gi2 = this.gradP[i+1+this.perm[j+1]];
  // Calculate the contribution from the three corners
  var t0 = 0.5 - x0*x0-y0*y0;
  if(t0<0) {
    n0 = 0;
  }else{
    t0 *= t0;
    n0 = t0 * t0 * gi0.dot(new rad.vector2(x0, y0)); // (x,y) of grad3 used for 2D gradient
  }
  var t1 = 0.5 - x1*x1-y1*y1;
  if(t1<0) {
    n1 = 0;
  }else{
    t1 *= t1;
    n1 = t1 * t1 * gi1.dot(new rad.vector2(x1, y1));
  }
  var t2 = 0.5 - x2*x2-y2*y2;
  if(t2<0) {
    n2 = 0;
  }else{
    t2 *= t2;
    n2 = t2 * t2 * gi2.dot(new rad.vector2(x2, y2));
  }
  // Add contributions from each corner to get the final noise value.
  // The result is scaled to return values in the interval [-1,1].
  return 70 * (n0 + n1 + n2);
}
