rad.vector2=function(x,y){
	this.x=(x)?x:0.0;
	this.y=(y)?y:0.0;
	return this;
}
rad.vector2.prototype.set=function(x,y){
	this.x=(x)?x:0.0;
	this.y=(y)?y:0.0;
}
rad.vector2.prototype.add=function(v){
	var n = new rad.vector2(this.x,this.y);
	n.x+=v.x;
	n.y+=v.y;
	return n;
}
rad.vector2.prototype.sub=function(v){
	var n = new rad.vector2(this.x,this.y);
	n.x-=v.x;
	n.y-=v.y;
	return n;
}
rad.vector2.prototype.distance=function(v){
	var n = this.sub(v);
	return Math.sqrt( (n.x*n.x)+(n.y*n.y) );
}
//-------
rad.vector3=function(x,y,z){
	this.x=(x)?x:0.0;
	this.y=(y)?y:0.0;
	this.z=(z)?z:0.0;
	return this;
}
rad.vector2.prototype.set=function(x,y,z){
	this.x=(x)?x:0.0;
	this.y=(y)?y:0.0;
	this.z=(z)?z:0.0;
}
rad.vector3.prototype.add=function(v){
	var n = new rad.vector2(this.x,this.y,this.z);
	n.x+=v.x;
	n.y+=v.y;
	n.z+=v.z;
	return n;
}
rad.vector3.prototype.sub=function(v){
	var n = new rad.vector2(this.x,this.y,this.z);
	n.x-=v.x;
	n.y-=v.y;
	n.z-=v.z;
	return n;
}
rad.vector3.prototype.distance=function(v){
	var n = this.sub(v);
	return Math.sqrt( (n.x*n.x)+(n.y*n.y)+(n.z*n.z) );
}