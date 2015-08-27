// !!!! requires vector module

rad.relativemouseposition=function(e){
  var pos = new rad.vector2();
    var offset = new rad.vector2(e.clientX,e.clientY);
  var target = e.currentTarget;

  while (target) {
    var targetv = new rad.vector2(target.offsetLeft - target.scrollLeft + target.clientLeft, target.offsetTop - target.scrollTop + target.clientTop);
      pos = pos.add(targetv);
      target = target.offsetParent;
    }

  return offset.sub(pos);

  /*var xp = 0;
  var yp = 0;

  var xo = e.clientX;
  var yo = e.clientY;

  var target = e.currentTarget;

  while (target) {
      xp += (target.offsetLeft - target.scrollLeft + target.clientLeft);
      yp += (target.offsetTop - target.scrollTop + target.clientTop);
      target = target.offsetParent;
    }

  return {x: xo-xp, y: yo-yp};*/
}
rad.mouseposition=function(e){
  return new rad.vector(e.clientX,e.clientY);
  //return {x:e.clientX,y:e.clientY};
}
rad.dragevent=function(move,release){
  document.addEventListener( 'mousemove',move);
  document.addEventListener( 'mouseup',release);
}
rad.removedragevent=function(move, release){
  document.removeEventListener('mousemove',move);
  document.removeEventListener('mouseup',release); 
}
rad.isleftclick=function(e){
  return rad.getmouseclicktype(e,1);
}
rad.isrightclick=function(e){
  return rad.getmouseclicktype(e,3);
}
rad.ismiddleclick=function(e){
  return rad.getmouseclicktype(e,2);
}
rad.getmouseclicktype=function(e,i){
  var c;
  e = e || window.event;
  if ("which" in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
      c = e.which == i;
  else if ("button" in e)  // IE, Opera 
      c = e.button == i-1;
  return c;
}