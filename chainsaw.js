rad.chainsaw=function(width, height){
	this.width=width||640;
	this.height=height||480;
	this.shaders=[];//hold the shaders
	this.vertShaderIds=[];
	this.fragShaderIds=[];
	this,preloadImageCount=0;
	this,preloadImageCounter=0;
	this.images=[];
	return this.init();
}
rad.chainsaw.prototype.init=function(){
	//set the canvas
	this.canvas = document.createElement('canvas');
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');

	//set the shader program
	this.shaderProgram = this.gl.createProgram();

	//create a sprite buffer
	this.spriteBufferArray = new Float32Array(1024);  // allow for 512 sprites
	//this.spriteBufferArray[0] = 0;  // x-value
	//this.spriteBufferArray[1] = 0;  // y-value
	const spriteBuffer = this.gl.createBuffer();
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, spriteBuffer);///
	
}
rad.chainsaw.prototype.loadVertexShader=function(source) {
  	this.shaders.push(this.loadShader(source,this.gl.VERTEX_SHADER));
  	this.vertShaderIds.push(this.shaders.length-1);
  	return this.shaders.length-1;
}
rad.chainsaw.prototype.loadFragmentShader=function(source) {
	this.shaders.push(this.loadShader(source,this.gl.FRAGMENT_SHADER));
	this.fragShaderIds.push(this.shaders.length-1);
	return this.shaders.length-1;
}
rad.chainsaw.prototype.loadShader=function(source,type) {
  	const shader = this.gl.createShader(type);
  	this.gl.shaderSource(shader, source);
  	this.gl.compileShader(shader);

  	const status = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
  	if (!status) {
    	throw new TypeError(`couldn't compile shader:\n${this.gl.getShaderInfoLog(shader)}`);
  	}
  	return shader;
}
rad.chainsaw.prototype.attachShader=function(index){
	this.gl.attachShader(this.shaderProgram, this.shaders[index]);
}
rad.chainsaw.prototype.linkShaderProgram=function(){
	this.gl.linkProgram(this.shaderProgram);

	const status = this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS);
	if (!status) {
  		throw new TypeError(`couldn't link shader program:\n${this.gl.getProgramInfoLog(this.shaderProgram)}`);
	}

	this.gl.useProgram(this.shaderProgram);
	this.gl.uniform2f(this.gl.getUniformLocation(this.shaderProgram, 'screenSize'), this.width, this.height);
}
rad.chainsaw.prototype.modifySpriteBuffer=function(SpriteIndex,x,y){
	this.spriteBufferArray[SpriteIndex*2] = x||0;  // x-value
	this.spriteBufferArray[(SpriteIndex*2)+1] = y||0;  // y-value
}
rad.chainsaw.prototype.uploadSpriteBuffer=function(){
	const loc = this.gl.getAttribLocation(this.shaderProgram, 'spritePosition');
	this.gl.enableVertexAttribArray(loc);
	this.gl.vertexAttribPointer(loc,
	    2,  // because it was a vec2
	    this.gl.FLOAT,  // vec2 contains floats
	    false,  // ignored
	    0,   // each value is next to each other
	    0);  // starts at start of array

	this.gl.bufferData(this.gl.ARRAY_BUFFER, this.spriteBufferArray, this.gl.DYNAMIC_DRAW);  // upload data
}
rad.chainsaw.prototype.loadImage=function(image,uniform_name){
	// Create a texture.
	const texture = this.gl.createTexture();
	this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

	// Set the parameters so we can render any size image.
	this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
	this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
	this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
	this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

	// Upload the image into the texture.
	this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);

	this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgram, uniform_name), 0);
}
////This is from a DOM example
rad.chainsaw.prototype.setDomTexture=function(dom_element,uniform_name){
	const icon = document.getElementById(dom_element);  // get the <img> tag

	const glTexture = this.gl.createTexture();
	this.gl.activeTexture(this.gl.TEXTURE0);  // this is the 0th texture
	this.gl.bindTexture(this.gl.TEXTURE_2D, glTexture);

	// actually upload bytes
	this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, icon);

	// generates a version for different resolutions, needed to draw
	this.gl.generateMipmap(this.gl.TEXTURE_2D);
	///ASSIGN THE TEXTURE
	this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgram, uniform_name), 0);
}
rad.chainsaw.prototype.rectangle=function(x, y, width, height){
	var x1 = x;
	var x2 = x + width;
	var y1 = y;
	var y2 = y + height;
	var positionBuffer = gl.createBuffer();
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
	this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
		x1, y1,
		x2, y1,
		x1, y2,
		x1, y2,
		x2, y1,
		x2, y2,
	]), this.gl.STATIC_DRAW);

	// provide texture coordinates for the rectangle.
	const texcoordBuffer = gl.createBuffer();
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texcoordBuffer);
	this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
		0.0,  0.0,
		1.0,  0.0,
		0.0,  1.0,
		0.0,  1.0,
		1.0,  0.0,
		1.0,  1.0,
	]), this.gl.STATIC_DRAW);
}
rad.chainsaw.prototype.preloadImages=function(images,callback){
	this,preloadImageCount=images.length;
	_this=this;
	for(var i=0;i<images.length;i++){
		const image = new Image();
		this.images.push(image);
		image.src = images[i];
		image.onload = function() {
			_this.preloadImageComplete(callback);
		}
	}
}
rad.chainsaw.prototype.preloadImageComplete=function(callback){
	this,preloadImageCounter+=1;
	if(this,preloadImageCounter>=this,preloadImageCount){
		callback();
	}
}