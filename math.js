rad.clamp = function(v,min,max) {
  return Math.min(Math.max(v, min), max);
}
rad.remap = function(v,l1,h1,l2,h2){
	return l2 + (v - l1) * (h2 - l2) / (h1 - l1);
}