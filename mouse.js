// !!!! requires vector module

rad.relativemouseposition=function(e){
  //var doc = document.documentElement;
  //var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  //var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

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
  //http://stackoverflow.com/questions/3464876/javascript-get-window-x-y-position-for-scroll
  var doc = document.documentElement;
  var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
  //console.log(left+":"+top);
  //console.log(e.clientX+":"+e.clientY);
  return new rad.vector2(e.clientX+left,e.clientY+top);
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
  //this isnt working arch firefox 42 if e is not sent in
  //console.log(e);
  if ("which" in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
      c = e.which == i;
  else if ("button" in e)  // IE, Opera 
      c = e.button == i-1;
  return c;
}