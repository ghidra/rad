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
  /*var _x = 0;
  var _y = 0;
  while( obj && !isNaN( obj.offsetLeft ) && !isNaN( obj.offsetTop ) ) {
        _x += obj.offsetLeft - obj.scrollLeft;
        _y += obj.offsetTop - obj.scrollTop;
        obj = obj.offsetParent;
  }
  return rad.vector2(_x,_y);//{ top: _y, left: _x };
*/
  /*var rect = obj.getBoundingClientRect();
  return rad.vector2(rect.top,rect.left);*/
};
rad.domsize=function(obj){
  var w = obj.offsetWidth; 
  var h = obj.offsetHeight;
  return rad.vector2(w,h);
};
rad.bodysize=function(){
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || document.body.offsetWidth;
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || document.body.offsetHeight;
    return rad.vector2(w,h);
};
rad.remove=function(id){
  var element = document.getElementById(id);
  element.parentNode.removeChild(element);
};
//------
rad.bind=function(elem, e, func, bool){
  bool = bool || false;
  if (elem.addEventListener){
    elem.addEventListener(e, func, bool);
  }else if (elem.attachEvent){
    elem.attachEvent('on' + e, func);
  }
};
rad.unbind=function(elem, e, func, bool){
  bool = bool || false;
  if (elem.removeEventListener){
    elem.removeEventListener(e, func, bool);
  }else if (elem.detachEvent){
    elem.detachEvent('on' + e, func);
  }
};
rad.closure=function(scope, func, arg){
  return function(e){
    func.call(scope,e,arg);
  };
};

rad.addevent=function(object, type, callback) {
  if (object == null || typeof(object) == 'undefined') return;
  if (object.addEventListener) {
    object.addEventListener(type, callback, false);
  }else if (object.attachEvent) {
    object.attachEvent("on" + type, callback);
  }else{
    object["on"+type] = callback;
  }
};
//eg rad.addevent(window, 'resize', function)
rad.windowdoneresizing=function(callback){
  callback=(callback!=undefined)?callback:function(){console.log("no windowdoneresizing event given");};
  this.timeout;//hold a timer
  var _this = this;
  rad.addevent(window,'resize',function(e){
    clearTimeout(_this.timeout);
    _this.timeout = setTimeout(callback,500);
  });
}