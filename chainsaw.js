rad.chainsaw=class{
	constructor(width, height){
		this.width=width||640;
		this.height=height||480;
		this.shaders={};//hold the shaders
		this.shaderPrograms=[];//hold shader programs
		this.shaderProgramsAttributeMap=[];//hold relevant attributes to the shader program
		this.shaderProgramsUniformMap=[];//hold uniforms
		this.buffers=[];//hold buffers
		this.preloadImageCount=0;
		this.preloadImageCounter=0;
		this.images={};
		this.images_src=[];//for saving in data base... can remove this soon
		//make and array to hold sprite buffers
		this.spriteBuffers=[];//
		//init
		//set the canvas
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.gl = this.canvas.getContext('webgl',{premultipliedAlpha: false, alpha:false}) || this.canvas.getContext('experimental-webgl');

		this.spriteBuffers.push(this.newSpriteBuffer(2048));
	}

	loadVertexShader(id,source) {
	  	this.shaders[id]= new rad.chainsaw.shader(this.gl,id,source,"vertex");
	}
	loadFragmentShader(id,source) {
		this.shaders[id]= new rad.chainsaw.shader(this.gl,id,source,"fragment");
	}
	createProgram(id,vert_index,frag_index,attributes_array,uniforms_array) {
		//(this.gl,this.shaders[vert_index].shader,this.shaders[frag_index].shader,attributes_array,uniforms_array);

		var program = this.gl.createProgram();
		this.gl.attachShader(program, this.shaders[vert_index].shader);
		this.gl.attachShader(program, this.shaders[frag_index].shader);
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
	createBuffer(){
		this.buffers.push(this.gl.createBuffer());
		return this.buffers.length-1;
	}
	setBufferFloatData(buffer_index,data){
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers[buffer_index]);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null);
	}
	uploadFloatBuffer(buffer_index,program_index,attribute,size,normalize,stride,offset){
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
	//sprite buffer methods
	newSpriteBuffer(size=1024,stride=7){
		const id = this.createBuffer();
		const sb = new rad.chainsaw.spriteBuffer(id,size,stride);
		this.setBufferFloatData(id,sb.array);
		return sb;
	}
	modifySpriteBuffer(BufferIndex,SpriteIndex,x,y,z=0,w=0,size=64,sid=0,tid=0){
		this.spriteBuffers[BufferIndex].modify(SpriteIndex,x,y,z,w,size,sid,tid);
	}
	getSpriteBufferValue(BufferIndex,SpriteIndex){
		return this.spriteBuffers[BufferIndex].getValue(SpriteIndex);
	}
	refreshSpriteBuffer(bufferIndex,floatArray){
		this.spriteBuffers[bufferIndex].refresh(floatArray);
	}
	uploadSpriteBuffer(program_index,buffer_index=0){
		//const loc = this.gl.getAttribLocation(this.shaderPrograms[program_index], 'spritePosition');
		const b = this.spriteBuffers[buffer_index];
		const loc = this.shaderProgramsAttributeMap[program_index].get("aSpritePosition");
		const sid = this.shaderProgramsAttributeMap[program_index].get("aSpriteID");
		const ssz = this.shaderProgramsAttributeMap[program_index].get("aSpriteSize");

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers[b.id]);

		const byte = 4;//this is here specifically for ease of understanding offset
		const stride = b.stride;//this.spriteBufferStride;
		this.gl.enableVertexAttribArray(loc);
		this.gl.vertexAttribPointer(loc, 4, this.gl.FLOAT,false,stride*byte,0);  // because it was a vec2, // starts at start of array
		this.gl.enableVertexAttribArray(ssz);
		this.gl.vertexAttribPointer(ssz, 1,  this.gl.FLOAT,false,stride*byte,4*byte);///5 values * 4 bytes... 2 to offset past the first values
		this.gl.enableVertexAttribArray(sid);
		this.gl.vertexAttribPointer(sid, 2,  this.gl.FLOAT,false,stride*byte,5*byte);///5 values * 4 bytes... 2 to offset past the first values

		this.gl.bufferData(this.gl.ARRAY_BUFFER, b.array, this.gl.STATIC_DRAW);  // upload data
	}
	loadImage(program_index,image,uniform_name){
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
	setDomTexture(dom_element,uniform_name){
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
	rectangle(x, y, width, height){
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
	preloadImages(images,callback){
		this.preloadImageCount=images.length;
		const _preload = rad.closure(this,this.preloadImageComplete);
		//_this=this;
		for(var i=0;i<images.length;i++){
			const image = new Image();
			this.images[images[i]]=image;
			this.images_src.push(images[i]);
			image.src = images[i];
			image.onload = function() {
				//_this.preloadImageComplete(callback);
				_preload(callback);
			}
		}
	}
	preloadImageComplete(callback){
		this.preloadImageCounter+=1;
		if(this.preloadImageCounter>=this.preloadImageCount){
			callback();
		}
	}
}
//
rad.chainsaw.shader=class{
	constructor(gl, id, source, type){
		this.id = id;

		var shader_type = gl.VERTEX_SHADER;
		if(type=="fragment") shader_type = gl.FRAGMENT_SHADER;
		
	  	this.shader = gl.createShader(shader_type);

	  	gl.shaderSource(this.shader, source);
	  	gl.compileShader(this.shader);

	  	const status = gl.getShaderParameter(this.shader, gl.COMPILE_STATUS);
	  	if (!status) {
	    	throw new TypeError(`couldn't compile shader:\n${gl.getShaderInfoLog(this.shader)}`);
	  	}
	}
}
//
rad.chainsaw.program=class{
	constructor(gl,vert,frag,attributes,uniforms){
		this.program = gl.createProgram();
		gl.attachShader(this.program, vert);
		gl.attachShader(this.program, frag);
		gl.linkProgram(this.program);

		const status = gl.getProgramParameter(this.program, gl.LINK_STATUS);
		if (!status) {
	  		throw new TypeError(`couldn't link shader program:\n${gl.getProgramInfoLog(this.program)}`);
		}
		//now deal with attributes
		var attributeMap=new Map();//hold the attribute indicies
		for(var a=0; a<attributes.length; a++){
			const attribLocation = gl.getAttribLocation(this.program, attributes[a]);
			if(attribLocation<0){
				console.log("Missing shader attribute: "+attributes[a]);
			}else{
				attributeMap.set(attributes[a],attribLocation);
			}
		}
		//now deal with uniforms
		var uniformMap=new Map();//hold the attribute indicies
		for(var u=0; u<uniforms.length; u++){
			const uniformLocation = gl.getUniformLocation(this.program, uniforms[u]);
			if(uniformLocation<0){
				console.log("Missing shader uniform: "+uniforms[u]);
			}else{
				uniformMap.set(uniforms[u],uniformLocation);
			}
		}
		//save it
		this.attributeMap=attributeMap;
		this.uniformMap=uniformMap;
		//this.shaderPrograms.push(program);//hold shader programs
		//return this.shaderPrograms.length-1;
	}
}
//
rad.chainsaw.spriteBuffer=class{
	constructor(id,size=1024,stride=7){
		this.id = id;
		this.array = new Float32Array(size);  // allow for 512 sprites
		//sb.array_standard = [];///a basic array for easy removal and changes
		this.count=0;
		this.size=size;
		this.stride = stride;//how many elements per sprite
	}
	modify(SpriteIndex,x=0,y=0,z=0,w=0,size=64,sid=0,tid=0){
		const s = this.stride*SpriteIndex;
		this.array[s] = x;  // x-value
		this.array[s+1] = y;  // y-value
		this.array[s+2] = z;
		this.array[s+3] = w; //layer -1 should be treated as invisible
		this.array[s+4] = size; //size
		this.array[s+5] = sid; //sprite sheet sprite id
		this.array[s+6] = tid; //texture id
	}
	getValue(SpriteIndex){
		const s = this.stride*SpriteIndex;
		return {
			'x' : this.array[s],
			'y' : this.array[s+1],
			'z' : this.array[s+2],
			'w' : this.array[s+3],
			'size' : this.array[s+4],
			'sid' : this.array[s+5],
			'tid' : this.array[s+6]
		};
	}
	refresh(floatArray){
		this.array = new Float32Array(this.size);
		for(var i=0; i<floatArray.length; i++){
			this.array[i] = floatArray[i];
		}
		this.count=floatArray.length/this.stride;
		console.log("loaded buffer array "+this.count+" sprites");
	}
}