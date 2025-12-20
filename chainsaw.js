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
		this.gl = this.canvas.getContext('webgl2',{premultipliedAlpha: false, alpha:false});// || this.canvas.getContext('experimental-webgl');
		if(this.gl){
			console.log('webgl2 successful');
		}else{
			this.canvas.getContext('experimental-webgl');
			console.log('webgl2 not available, fallback to experiemental-webgl');
			//extensions
			const depthtexture = this.gl.getExtension('WEBGL_depth_texture');
			if(!depthtexture) console.log("no webgl depth texture available");
		}

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
	setUniformBufferData(id,data){
		this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, this.buffers[id]);
		this.gl.bufferData(this.gl.UNIFORM_BUFFER, data, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null);
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

  		//set texture sampling to wrap
  		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);

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
	createShadowTexture(size=2048){
		this.shadowTexSize=size;
		this.shadowTex = this.gl.createTexture();
		
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.shadowTex);
		this.gl.texImage2D(
			this.gl.TEXTURE_2D,
			0,
			this.gl.DEPTH_COMPONENT32F,
			size, size, // shadow resolution
			0,
			this.gl.DEPTH_COMPONENT,
			this.gl.FLOAT,
			null
		);
		//this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_COMPARE_MODE, this.gl.NONE);
		//this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_COMPARE_FUNC, this.gl.LEQUAL);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

		//attach it to a frame buffer..

		this.shadowFBO = this.gl.createFramebuffer();
		
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.shadowFBO);
		this.gl.framebufferTexture2D(
			this.gl.FRAMEBUFFER,
			this.gl.DEPTH_ATTACHMENT,
			this.gl.TEXTURE_2D,
			this.shadowTex,
			0
		);
		///create a color texture
		/*this.testTexture = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.testTexture);
		this.gl.texImage2D(
		    this.gl.TEXTURE_2D,
		    0,
		    this.gl.RGBA,
		    size, size,
		    0,
		    this.gl.RGBA,
		    this.gl.UNSIGNED_BYTE,
		    null,
		);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
		 
		// attach it to the framebuffer
		this.gl.framebufferTexture2D(
		    this.gl.FRAMEBUFFER,        // target
		    this.gl.COLOR_ATTACHMENT0,  // attachment point
		    this.gl.TEXTURE_2D,         // texture target
		    this.testTexture,         // texture
		    0);                    // mip level
		*/
		this.gl.drawBuffers([]);
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
	}
	createShadowMeshBuffer(name,positions){
		this.createBuffer(name);
		this.setBufferFloatData(name,positions);
	}
	//I need to make a new rad class to deal with this:
	//https://github.com/toji/gl-matrix/blob/master/src/mat4.js
	identityMat4(){
		return new Float32Array([
			1.0,0.0,0.0,0.0,
			0.0,1.0,0.0,0.0,
			0.0,0.0,1.0,0.0,
			0.0,0.0,0.0,1.0
		]); 
	}
	lookatMatrix(eye=new rad.vector3(0.0,0.0,1.0), center=new rad.vector3(0.0,0.0,0.0), up=new rad.vector3(0.0,1.0,0.0)){
		let out = new Float32Array(16);

		let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
		let eyex = eye.x;
		let eyey = eye.y;
		let eyez = eye.z;
		let upx = up.x;
		let upy = up.y;
		let upz = up.z;
		let centerx = center.x;
		let centery = center.y;
		let centerz = center.z;

		if (
			Math.abs(eyex - centerx) < 0.000001 &&
			Math.abs(eyey - centery) < 0.000001 &&
			Math.abs(eyez - centerz) < 0.000001
		) {
			return new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
		}

		z0 = eyex - centerx;
		z1 = eyey - centery;
		z2 = eyez - centerz;

		len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
		z0 *= len;
		z1 *= len;
		z2 *= len;

		x0 = upy * z2 - upz * z1;
		x1 = upz * z0 - upx * z2;
		x2 = upx * z1 - upy * z0;
		len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
		if (!len) {
			x0 = 0;
			x1 = 0;
			x2 = 0;
		} else {
			len = 1 / len;
			x0 *= len;
			x1 *= len;
			x2 *= len;
		}

		y0 = z1 * x2 - z2 * x1;
		y1 = z2 * x0 - z0 * x2;
		y2 = z0 * x1 - z1 * x0;

		len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
		if (!len) {
			y0 = 0;
			y1 = 0;
			y2 = 0;
		} else {
			len = 1 / len;
			y0 *= len;
			y1 *= len;
			y2 *= len;
		}

		out[0] = x0;
		out[1] = y0;
		out[2] = z0;
		out[3] = 0;
		out[4] = x1;
		out[5] = y1;
		out[6] = z1;
		out[7] = 0;
		out[8] = x2;
		out[9] = y2;
		out[10] = z2;
		out[11] = 0;
		out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
		out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
		out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
		out[15] = 1;

  		return out;
	}
	orthoMat4(left, right, bottom, top, near, far){
		let out = new Float32Array(16);
		const lr = 1 / (left - right);
		const bt = 1 / (bottom - top);
		const nf = 1 / (near - far);
		out[0] = -2 * lr;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = -2 * bt;
		out[6] = 0;
		out[7] = 0;
		out[8] = 0;
		out[9] = 0;
		out[10] = 2 * nf;
		out[11] = 0;
		out[12] = (left + right) * lr;
		out[13] = (top + bottom) * bt;
		out[14] = (far + near) * nf;
		out[15] = 1;
		return out;
	}
	multiplyMat4(a, b) {
		let out = new Float32Array(16);
		let a00 = a[0],
			a01 = a[1],
			a02 = a[2],
			a03 = a[3];
		let a10 = a[4],
			a11 = a[5],
			a12 = a[6],
			a13 = a[7];
		let a20 = a[8],
			a21 = a[9],
			a22 = a[10],
			a23 = a[11];
		let a30 = a[12],
			a31 = a[13],
			a32 = a[14],
			a33 = a[15];

		// Cache only the current line of the second matrix
		let b0 = b[0],
			b1 = b[1],
			b2 = b[2],
			b3 = b[3];
		out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

		b0 = b[4];
		b1 = b[5];
		b2 = b[6];
		b3 = b[7];
		out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

		b0 = b[8];
		b1 = b[9];
		b2 = b[10];
		b3 = b[11];
		out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

		b0 = b[12];
		b1 = b[13];
		b2 = b[14];
		b3 = b[15];
		out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
		return out;
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
		//console.log("loaded buffer array "+this.count+" sprites");
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
		//const instSize = program.attributeMap.get("aInstanceSize");
		//const instId = program.attributeMap.get("aInstanceID");
		
		// Set up instance attributes with divisor 1
		gl.enableVertexAttribArray(instLoc);
		gl.vertexAttribPointer(instLoc, 4, gl.FLOAT, false, stride*byte, 0);
		gl.vertexAttribDivisor(instLoc, 1); // Advance once per instance
		/*
		gl.enableVertexAttribArray(instSize);
		gl.vertexAttribPointer(instSize, 1, gl.FLOAT, false, stride*byte, 4*byte);
		gl.vertexAttribDivisor(instSize, 1); // Advance once per instance
		
		gl.enableVertexAttribArray(instId);
		gl.vertexAttribPointer(instId, 2, gl.FLOAT, false, stride*byte, 5*byte);
		gl.vertexAttribDivisor(instId, 1); // Advance once per instance*/
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