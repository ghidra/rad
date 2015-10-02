//--------code from google's webgl utilities
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
     window.webkitRequestAnimationFrame ||
     window.mozRequestAnimationFrame ||
     window.oRequestAnimationFrame ||
     window.msRequestAnimationFrame ||
     function(/* function FrameRequestCallback */ callback) {
       window.setTimeout(callback, 1000/10);//30fps
     };
})();
//----
rad.tick = {
  'fps':30,
  'framerate':undefined,
  'program_tick':undefined,
  'program_tick_args':undefined,
  'tick':function(){
    //explicitly put brain here, because we are getting called back to this function from elsewhere
    requestAnimFrame(rad.tick.tick);
    //now we put what we want to do durring the tick. as for the frame first
    //alert(callback);
    rad.tick.program_tick(rad.program_tick_args);
    //rad.tick.framerate.tick()
  },
  'init':function(ptick,args){
    //this.framerate = new game.framerate(this.fps);
    //put what we want to init before calling tick
    this.program_tick=ptick;
    this.program_tick_args=args;
    this.tick();
  },
  'setfps':function(n){
    this.fps=n;
  }
}