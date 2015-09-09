//requires mouse
//THIS IS BOGUS< DOES NOT WORK
rad.drag=function(move,release){
	this.move = move;
	this.release=release;
	//document.observe('mousemove',this.dragging);
	//document.observe('mouseup',this.stop);
	document.addEventListener('mousemove',this.dragging);
	document.addEventListener('mouseup',this.stop);
}
rad.drag.prototype.dragging=function(){
	//this.move.call();
	this[move]();
}
rad.drag.prototype.stop=function(){
	this[release]();
	//document.stopObserving('mousemove',this.move);
    //document.stopObserving('mouseup',this.release);
    document.removeEventListener('mousemove',this.move);
    document.removeEventListener('mouseup',this.release);
}