rad.chainsaw=function(width, height){
	this.width=width||640;
	this.height=height||480;
	this.shaders=[];//hold the shaders
	this.vertShaderIds=[];
	this.fragShaderIds=[];
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
	this.spriteBufferArray[SpriteIndex] = x||0;  // x-value
	this.spriteBufferArray[SpriteIndex+1] = y||0;  // y-value
}
rad.chainsaw.prototype.uploadSpriteBuffer=function(){
	this.gl.bufferData(this.gl.ARRAY_BUFFER, this.spriteBufferArray, this.gl.DYNAMIC_DRAW);  // upload data

	const loc = this.gl.getAttribLocation(this.shaderProgram, 'spritePosition');
	this.gl.enableVertexAttribArray(loc);
	this.gl.vertexAttribPointer(loc,
	    2,  // because it was a vec2
	    this.gl.FLOAT,  // vec2 contains floats
	    false,  // ignored
	    0,   // each value is next to each other
	    0);  // starts at start of array
}
rad.chainsaw.prototype.setTexture=function(dom_element,uniform_name){
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