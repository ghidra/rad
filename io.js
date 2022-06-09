//requires rad.localstorage
//requires rad.ajax

rad.io=function(id,path,callback){
	path = path || "";
	callback = callback || function fallback(){console.log("empty callback")};
	this.storage_type = "local";
	this.a = new rad.ajax();

	return this.init(id,path,callback);
}
rad.io.prototype.init=function(id,path,callback){
	//first see if we have access to a database...
	if(path!=""){
		lo = path;
		//a = new rad.ajax();
		_this = this;///pass the reference to this for access in ajax callback
		this.a.get(
			path,
			"q=login",
			function(lamda){
				_this.storage_type = "mysql";
				callback(lamda);
			}
		);
	}	
	//if not fall back to local storage (which is just for demo purposes and testing)
	//maybe give the option to switch between if both are available
	this.id = id;//we need an identifier, to keep seperate apps on different objects
	this.storage = new rad.localstorage();

	return this;
}
//---------------------
rad.io.prototype.list=function(){
	//get list of saved

	//this is the brute force local storage way
	var files = this.storage.getobj(this.id);
	if(!files){//there are no files already saved
		return null;
	}else{
		var file_names=[];
		for (n in files){
			file_names.push(n);
		}
		return file_names;
	}
	//console.log(files);
}
rad.io.prototype.save=function(name,src,sanitize){//optional sanitize function to clean out the save data if need be
	//save the file
	//if using local storage get the file object first, to add to it
	var files = this.storage.getobj(this.id);
	
	//clean data
	var src_clean;
	if(typeof sanitize === "function"){
		src_clean = sanitize(src);
	}
	if(src_clean===undefined) src_clean=src;
	//var src_clean=this.sanitize_script(src);

	if(!files){//there are no files already saved
		var new_file = {};
		new_file[name]=src_clean;
		//console.log(name)
		this.storage.setobj(this.id,new_file);
	}else{
		//there are saved files, lets append, or overwrite
		files[name]=src_clean;
		this.storage.setobj(this.id,files);
	}
}
rad.io.prototype.load=function(name){
	//load file, return object to be processed
	//get all the local files
	var files = this.storage.getobj(this.id);
	if(files[name]){
		return files[name];//return the specfic file requested
	}else{
		return 'none';
	}
}

////////php logS in stuff
rad.io.prototype.process_login=function(form_name,path,callback){
	var elements = document.getElementById(form_name).elements;
	var obj ={};
	obj.q = "login";
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        obj[item.name] = item.value;
    }
    //console.log(obj);
    //alert(JSON.stringify(obj));
    this.a.post(
	    path,
	    obj,
	    //"q=login&payload="+JSON.stringify(obj),
	    function(lamda){
	      callback(lamda);
	    }
  	);
}
rad.io.prototype.logout=function(path,callback){
	this.a.get(
    path,
    "q=logout",
    function(lamda){
      callback(lamda);
    }
  );
}

/*local storage should look like:

{
	files:{
		file0:{},
		file1:{}
	}
}

file0:{
	nodes:{},
	lines:{},
	scripts:{
		nodes:{},
		lines:{},
		scripts:{}
	}
}

notes:
clear out with chrome dev tools
	draft.file.storage.storage.clear()
get output
	draft.file.storage.getobj("files")
*/
/*draft.io.prototype.sanitize_script=function(src){
	//this will take the javscript object and remove anything that we dont need to save, and fold it into 
	//something cleanr to save
	//recursive, to include embedded scripts
	//we have nodes, lines, and scripts, ids, and scale
	var clean = {};
	clean.ids=rad.objclonefast(src.ids);
	clean.scale=rad.objclonefast(src.scale);
	clean.nodes={};
	clean.lines={};
	//clean.scripts=this.santize_scripts(src.scripts);

	for(n in src.nodes){
		clean.nodes[n] = src.nodes[n].sanitize();
	}

	for(l in src.lines){
		clean.lines[l] = src.lines[l].sanitize();
	}

	return clean;
}*/