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
rad.vector2.prototype.mul=function(v){
	var n = new rad.vector2(this.x,this.y);
	n.x*=v.x;
	n.y*=v.y;
	return n;
}
rad.vector2.prototype.multiply=function(v){
	var n = new rad.vector2(this.x,this.y);
	n.x*=v.x;
	n.y*=v.y;
	return n;
}
rad.vector2.prototype.distance=function(v){
	var n = this.sub(v);
	return Math.sqrt( (n.x*n.x)+(n.y*n.y) );
}
rad.vector2.prototype.dot=function(v){
	return ( this.x * v.x + this.y * v.y );
}
rad.vector2.prototype.len=function(){
	return Math.sqrt( (this.x*this.x) + (this.y*this.y) );
}
rad.vector2.prototype.normalize=function(){
	const l = this.len();
	if(l>0){
		return new rad.vector2(this.x/l, this.y/l );
	}else{
		return new rad.vector2(0.0,0.0);
	}
}
rad.vector2.prototype.neg=function(){
	return new rad.vector2(-this.x,-this.y);
}
rad.vector2.prototype.multscalar=function(s){
	return new rad.vector2(this.x*s,this.y*s);
}
rad.vector2.prototype.clone=function(v){
	this.x = v.x;
	this.y = v.y;
	return this;
	//return new rad.vector2(v.x,v.y);
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
	var n = new rad.vector3(this.x,this.y,this.z);
	n.x+=v.x;
	n.y+=v.y;
	n.z+=v.z;
	return n;
}
rad.vector3.prototype.sub=function(v){
	var n = new rad.vector3(this.x,this.y,this.z);
	n.x-=v.x;
	n.y-=v.y;
	n.z-=v.z;
	return n;
}
rad.vector3.prototype.mul=function(v){
	var n = new rad.vector3(this.x,this.y,this.z);
	n.x*=v.x;
	n.y*=v.y;
	n.z*=v.z;
	return n;
}
rad.vector3.prototype.distance=function(v){
	const n = this.sub(v);
	return Math.sqrt( (n.x*n.x)+(n.y*n.y)+(n.z*n.z) );
}
rad.vector3.prototype.dot=function(v){
	return ( this.x * v.x + this.y * v.y + this.z * v.z );
}
rad.vector3.prototype.len=function(){
	return Math.sqrt( (this.x*this.x) + (this.y*this.y) + (this.z*this.z) );
}
rad.vector3.prototype.cross=function(v){
	return rad.vector3((this.y * v.z) - (this.z * v.y) ,(this.z * v.x) - (this.x * v.z) ,(this.x * v.y) - (this.y * v.x));
}
rad.vector3.prototype.neg=function(){
	return new rad.vector3(-this.x,-this.y,-this.z);
}
rad.vector3.prototype.multscalar=function(s){
	return new rad.vector3(this.x*s,this.y*s,this.z*s);
}
rad.vector3.prototype.clone=function(v){
	this.x = v.x;
	this.y = v.y;
	this.z = v.z;
	return this;
}