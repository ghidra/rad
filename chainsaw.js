rad.chainsaw=class{
	constructor(width, height){
		this.width=width||640;
		this.height=height||480;

		this.shaders={};//hold the shaders
		this.programs={};//hold shader programs
		this.buffers={};//hold buffers
		this.spriteBuffers={};//

		this.preloadImageCount=0;
		this.preloadImageCounter=0;
		this.images={};
		this.images_src=[];//for saving in data base... can remove this soon
		
		//init
		//set the canvas
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.gl = this.canvas.getContext('webgl2',{premultipliedAlpha: false, alpha:false}) || this.canvas.getContext('experimental-webgl');

		//const version = this.canvas.getContext("webgl2");
		//if (!version) {
		// fallback to WebGL1
		//}
			//instancing
		//this.ext = this.gl.getExtension('ANGLE_instanced_arrays');
		//if (!this.ext) {
		//	throw new Error('ANGLE_instanced_arrays not supported');
		//}
		//this.newSpriteBuffer("main",10,false);//make a main buffer.. i kind of want to remove this
	}

	loadVertexShader(id,source) {
	  	this.shaders[id]= new rad.chainsaw.shader(this.gl,id,source,"vertex");
	}
	loadFragmentShader(id,source) {
		this.shaders[id]= new rad.chainsaw.shader(this.gl,id,source,"fragment");
	}
	createProgram(id,vert,frag,attributes,uniforms) {
		this.programs[id]= new rad.chainsaw.program(this.gl,this.shaders[vert].shader,this.shaders[frag].shader,attributes,uniforms);
	}
	createBuffer(id){
		this.buffers[id]=this.gl.createBuffer();
	}
	setBufferFloatData(id,data){
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers[id]);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null);
	}
	uploadFloatBuffer(buffer,program,attribute,size,normalize,stride,offset){
		size=size||2;
		normalize=normalize||false;
		stride=stride||0;
		offset=offset||0;
		const attribLocation = this.programs[program].attributeMap.get(attribute);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers[buffer]);
		this.gl.enableVertexAttribArray(attribLocation);
		this.gl.vertexAttribPointer(attribLocation, size, this.gl.FLOAT, normalize, stride, offset);
	}
	//sprite buffer methods
	newSpriteBuffer(id,size=146,poweroftwo=false,stride=7){
		var nsprites = size*stride;
		if(poweroftwo){
			nsprites = rad.nextpoweroftwo(nsprites);
		}
		this.createBuffer(id);
		const sb = new rad.chainsaw.spriteBuffer(id,nsprites,stride);
		this.setBufferFloatData(id,sb.array);
		this.spriteBuffers[id]=sb;
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
	uploadSpriteBuffer(program_index,buffer_index="tiles"){
		this.spriteBuffers[buffer_index].upload(this.gl,this.programs[program_index],this.buffers[buffer_index]);
	}
	loadTexture(program,texture,uniform,index=0){
		this.gl.activeTexture(this.gl.TEXTURE0+index);
  		this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

		//this.gl.uniform1i(this.gl.getUniformLocation(this.shaderPrograms[program_index], uniform_name), 0);
		this.gl.uniform1i(this.programs[program].uniformMap.get(uniform), index);	
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
		const pbuffer = "rect_p";
		const tbuffer = "rect_t";
		this.createBuffer(pbuffer);
		this.setBufferFloatData(pbuffer,p);
		this.createBuffer(tbuffer);
		this.setBufferFloatData(tbuffer,t);

		return [pbuffer,tbuffer];
	}
	preloadImages(images,callback){
		this.preloadImageCount=images.length;
		const _preload = rad.closure(this,this.preloadImageComplete);
		const _this = this;

		for(var i=0;i<images.length;i++){
			const _imageData = images[i];
			images[i].setImage(new Image());
			
			this.images[images[i].path] = images[i];//give object to chainsaw
			this.images_src.push(images[i].path);//redundant.. to be removed once save function is updated
			
			images[i].image.src = images[i].path;
			images[i].image.onload = function() {
				_imageData.loadImage(_this.gl);
				_preload(callback);
			}
		}
	}
	preloadImageComplete(callback){
		this.preloadImageCounter+=1;
		if(this.preloadImageCounter>=this.preloadImageCount){
			//console.log("hae");
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
	upload(gl,program,buffer){
		const loc = program.attributeMap.get("aSpritePosition");
		const ssz = program.attributeMap.get("aSpriteSize");
		const sid = program.attributeMap.get("aSpriteID");

		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, this.array, gl.STATIC_DRAW);  // upload data

		const byte = 4;//this is here specifically for ease of understanding offset
		const stride = this.stride;//this.spriteBufferStride;
		gl.enableVertexAttribArray(loc);
		gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, stride*byte, 0);  // because it was a vec2, // starts at start of array
		gl.vertexAttribDivisor(loc, 0); // Advance per vertex
		
		gl.enableVertexAttribArray(ssz);
		gl.vertexAttribPointer(ssz, 1,  gl.FLOAT,false,stride*byte,4*byte);///5 values * 4 bytes... 2 to offset past the first values
		gl.vertexAttribDivisor(ssz, 0); // Advance per vertex
		
		gl.enableVertexAttribArray(sid);
		gl.vertexAttribPointer(sid, 2,  gl.FLOAT,false,stride*byte,5*byte);///5 values * 4 bytes... 2 to offset past the first values
		gl.vertexAttribDivisor(sid, 0); // Advance per vertex
	}
	uploadInstanced(gl,program,instanceBuffer){
		// First, bind the base buffer and set up base attributes
		
		const byte = 4;
		const stride = this.stride;
		
		// Now bind the instance buffer and set up instance attributes
		gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, this.array, gl.STATIC_DRAW);

		const instLoc = program.attributeMap.get("aInstancePosition");
		const instSize = program.attributeMap.get("aInstanceSize");
		const instId = program.attributeMap.get("aInstanceID");
		
		// Set up instance attributes with divisor 1
		gl.enableVertexAttribArray(instLoc);
		gl.vertexAttribPointer(instLoc, 4, gl.FLOAT, false, stride*byte, 0);
		gl.vertexAttribDivisor(instLoc, 1); // Advance once per instance
		
		gl.enableVertexAttribArray(instSize);
		gl.vertexAttribPointer(instSize, 1, gl.FLOAT, false, stride*byte, 4*byte);
		gl.vertexAttribDivisor(instSize, 1); // Advance once per instance
		
		gl.enableVertexAttribArray(instId);
		gl.vertexAttribPointer(instId, 2, gl.FLOAT, false, stride*byte, 5*byte);
		gl.vertexAttribDivisor(instId, 1); // Advance once per instance
	}
}
//
rad.chainsaw.imageData=class{
	constructor(path,w,h,sw=32,sh=32){
		this.path = path;
		this.w = w;
		this.h = h;
		this.sw = sw;
		this.sh = sh;
	}
	setImage(image){
		this.image=image;
	}
	loadImage(gl){
		this.texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.texture);

		// Set the parameters so we can render any size image.
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

		// Upload the image into the texture.
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
		//console.log(this.image);
	}
}