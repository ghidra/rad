rad.relativemouseposition=function(e){
  //return [ e.pointerX(), e.pointerY() ];
  var xp = 0;
  var yp = 0;

  var xo = e.clientX;
  var yo = e.clientY;

  var target = e.currentTarget;

  while (target) {
      xp += (target.offsetLeft - target.scrollLeft + target.clientLeft);
      yp += (target.offsetTop - target.scrollTop + target.clientTop);
      target = target.offsetParent;
    }

  return {x: xo-xp, y: yo-yp};
}
rad.mouseposition=function(e){
  return {x:e.clientX,y:e.clientY};
}
rad.dragevent=function(move,release){
  document.addEventListener( 'mousemove',move);
  document.addEventListener( 'mouseup',release);
}
rad.removedragevent=function(move, release){
  document.removeEventListener('mousemove',move);
  document.removeEventListener('mouseup',release); 
}