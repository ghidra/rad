rad.chainsaw=function(width, height){
	this.width=width||640;
	this.height=height||480;
	this.shaders=[];//hold the shaders
	this.vertShaderIds=[];
	this.fragShaderIds=[];
	this.shaderPrograms=[];//hold shader programs
	this.shaderProgramsAttributeMap=[];//hold relevant attributes to the shader program
	this.shaderProgramsUniformMap=[];//hold uniforms
	this.buffers=[];//hold buffers
	this.preloadImageCount=0;
	this.preloadImageCounter=0;
	this.images=[];
	return this.init();
}
rad.chainsaw.prototype.init=function(){
	//set the canvas
	this.canvas = document.createElement('canvas');
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	this.gl = this.canvas.getContext('webgl',{premultipliedAlpha: false, alpha:false}) || this.canvas.getContext('experimental-webgl');

	//create a general purpose sprite buffer... the array is stored for easy manipulation
	this.spriteBufferArray = new Float32Array(1024);  // allow for 512 sprites
	this.spriteBufferId = this.createBuffer();
	this.spriteBufferMousePosition = {x:0.0,y:0.0};
	this.setBufferFloatData(this.spriteBufferId,this.spriteBufferArray);
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
rad.chainsaw.prototype.createProgram=function(vert_index,frag_index,attributes_array,uniforms_array) {
	var program = this.gl.createProgram();
	this.gl.attachShader(program, this.shaders[vert_index]);
	this.gl.attachShader(program, this.shaders[frag_index]);
	this.gl.linkProgram(program);

	const status = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
	if (!status) {
  		throw new TypeError(`couldn't link shader program:\n${this.gl.getProgramInfoLog(program)}`);
	}
	//now deal with attributes
	var attributeMap=new Map();//hold the attribute indicies
	for(var a=0; a<attributes_array.length; a++){
		const attribLocation = this.gl.getAttribLocation(program, attributes_array[a]);
		if(attribLocation<0){
			console.log("Missing shader attribute: "+attributes_array[a]);
		}else{
			attributeMap.set(attributes_array[a],attribLocation);
		}
	}
	//now deal with uniforms
	var uniformMap=new Map();//hold the attribute indicies
	for(var u=0; u<uniforms_array.length; u++){
		const uniformLocation = this.gl.getUniformLocation(program, uniforms_array[u]);
		if(uniformLocation<0){
			console.log("Missing shader uniform: "+uniforms_array[u]);
		}else{
			uniformMap.set(uniforms_array[u],uniformLocation);
		}
	}
	//save it
	this.shaderProgramsAttributeMap.push(attributeMap);
	this.shaderProgramsUniformMap.push(uniformMap);
	this.shaderPrograms.push(program);//hold shader programs
	return this.shaderPrograms.length-1;
}
rad.chainsaw.prototype.createBuffer=function(){
	this.buffers.push(this.gl.createBuffer());
	return this.buffers.length-1;
}
rad.chainsaw.prototype.setBufferFloatData=function(buffer_index,data){
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers[buffer_index]);
	this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null);
}
rad.chainsaw.prototype.uploadFloatBuffer=function(buffer_index,program_index,attribute,size,normalize,stride,offset){
	size=size||2;
	normalize=normalize||false;
	stride=stride||0;
	offset=offset||0;
	const attribLocation = this.shaderProgramsAttributeMap[program_index].get(attribute);
	//var attribLocation = this.gl.getAttribLocation(this.shaderPrograms[program_index], attribute);
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers[buffer_index]);
	this.gl.enableVertexAttribArray(attribLocation);
	this.gl.vertexAttribPointer(attribLocation, size, this.gl.FLOAT, normalize, stride, offset);
}
rad.chainsaw.prototype.modifySpriteBuffer=function(SpriteIndex,x,y,z,sid,tid){
	this.spriteBufferArray[SpriteIndex*5] = x||0.0;  // x-value
	this.spriteBufferArray[(SpriteIndex*5)+1] = y||0.0;  // y-value
	this.spriteBufferArray[(SpriteIndex*5)+2] = z||0.0;
	this.spriteBufferArray[(SpriteIndex*5)+3] = sid||0.0;
	this.spriteBufferArray[(SpriteIndex*5)+4] = tid||0.0;
}
rad.chainsaw.prototype.uploadSpriteBuffer=function(program_index,spritePosition_attribute){
	//const loc = this.gl.getAttribLocation(this.shaderPrograms[program_index], 'spritePosition');
	const loc = this.shaderProgramsAttributeMap[program_index].get("aSpritePosition");
	const sid = this.shaderProgramsAttributeMap[program_index].get("aSpriteID");
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers[this.spriteBufferId]);

	this.gl.enableVertexAttribArray(loc);
	this.gl.vertexAttribPointer(loc,
	    3,  this.gl.FLOAT,false,5*4,0);  // because it was a vec2, // starts at start of array
	this.gl.enableVertexAttribArray(sid);
	this.gl.vertexAttribPointer(sid,
	    2,  this.gl.FLOAT,false,5*4,3*4);///5 values * 4 bytes... 2 to offset past the first values

	this.gl.bufferData(this.gl.ARRAY_BUFFER, this.spriteBufferArray, this.gl.STATIC_DRAW);  // upload data
}
rad.chainsaw.prototype.loadImage=function(program_index,image,uniform_name){
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

	//this.gl.uniform1i(this.gl.getUniformLocation(this.shaderPrograms[program_index], uniform_name), 0);
	this.gl.uniform1i(this.shaderProgramsUniformMap[program_index].get(uniform_name), 0);	
}
////This is from a DOM example
rad.chainsaw.prototype.setDomTexture=function(dom_element,uniform_name){
	///this will break if you call it now
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
	//positions
	var p = new Float32Array([
		x1, y1,
		x2, y1,
		x1, y2,
		x1, y2,
		x2, y1,
		x2, y2,
	]);
	//texture coordinates
	var t = new Float32Array([
		0.0,  0.0,
		1.0,  0.0,
		0.0,  1.0,
		0.0,  1.0,
		1.0,  0.0,
		1.0,  1.0,
	]);
	var pbuffer = this.createBuffer();
	this.setBufferFloatData(pbuffer,p);
	var tbuffer = this.createBuffer();
	this.setBufferFloatData(tbuffer,t);

	return [pbuffer,tbuffer];
}
rad.chainsaw.prototype.preloadImages=function(images,callback){
	this.preloadImageCount=images.length;
	_preload = rad.closure(this,this.preloadImageComplete);
	//_this=this;
	for(var i=0;i<images.length;i++){
		const image = new Image();
		this.images.push(image);
		image.src = images[i];
		image.onload = function() {
			//_this.preloadImageComplete(callback);
			_preload(callback);
		}
	}
}
rad.chainsaw.prototype.preloadImageComplete=function(callback){
	this.preloadImageCounter+=1;
	if(this.preloadImageCounter>=this.preloadImageCount){
		callback();
	}
}