//----
rad.tick = function(tick_function) {
  this.start=0.0;
  this.prev=0.0;
  this.delta;
  this.tick_function=tick_function;
}
rad.tick.prototype.tick=function(now){
  //call(this.tick_function);
  this.tick_function();
  requestAnimationFrame(this.tick);
}