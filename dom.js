//needs vector.js
rad.domposition=function(obj){
  Element.cumulativeScrollOffset
  var curleft= 0;
  var curtop= 0;
  if(obj.offsetParent){//if the browser suppert this object call, offsetParent
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    }while (obj = obj.offsetParent);
      return rad.vector2(curleft,curtop);
  }
}
rad.domsize=function(obj){
  var w = obj.offsetWidth; 
  var h = obj.offsetHeight;
  return rad.vector2(w,h);
}
rad.bodysize=function(){
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || document.body.offsetWidth;
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || document.body.offsetHeight;
    return rad.vector2(w,h);
}
rad.remove=function(id){
  var element = document.getElementById(id);
  element.parentNode.removeChild(element);
}
//------
rad.bind=function(elem, e, func, bool){
  bool = bool || false;
  if (elem.addEventListener){
    elem.addEventListener(e, func, bool);
  }else if (elem.attachEvent){
    elem.attachEvent('on' + e, func);
  }
}
rad.unbind=function(elem, e, func, bool){
  bool = bool || false;
  if (elem.removeEventListener){
    elem.removeEventListener(e, func, bool);
  }else if (elem.detachEvent){
    elem.detachEvent('on' + e, func);
  }
}
rad.closure=function(scope, func, arg){
  return function(e){
    func.call(scope,e,arg);
  };
}