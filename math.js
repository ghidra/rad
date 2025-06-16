rad.clamp = function(v,min,max) {
  return Math.min(Math.max(v, min), max);
}
rad.remap = function(v,l1,h1,l2,h2){
	return l2 + (v - l1) * (h2 - l2) / (h1 - l1);
}
rad.rescale=function(v,l1,h1,l2,h2){//alias incase I get confused by XSI vs houdini
  return rad.remap(v,l1,h1,l2,h2);
}
rad.fit=function(v,l1,h1,l2,h2){//alias incase I get confused by XSI vs houdini
  return rad.remap(v,l1,h1,l2,h2);
}
rad.rand=function(seed){
  seed = seed||Math.round(Math.random()*999);
  return Math.abs(Math.sin(seed++));
}
rad.randint=function(min, max, seed = 0.23211) {
  min = Math.ceil(min);
  max = Math.floor(max);
  //return Math.floor(Math.random() * (max - min + 1)) + min;
  return Math.floor(rad.rand(seed) * (max - min + 1)) + min;
}
rad.degtorad = function(d) {
    return d*(3.14159/180);
}
rad.radtodeg = function(r){
    return r*(180/3.14159)
}
