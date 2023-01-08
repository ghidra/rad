//requires rad.localstorage
//requires rad.ajax

rad.io=function(id,path,callback){
	this.path = path || "";
	callback = callback || function fallback(){console.log("empty callback")};
	return this.init(id,callback);
}
rad.io.prototype.init=function(id,callback){
	//first see if we have access to a database...
	this.a = new rad.ajax();

	if(this.path!=""){
		lo = this.path;
		//a = new rad.ajax();
		_this = this;///pass the reference to this for access in ajax callback
		this.a.get(
			_this.path,
			"q=login",
			function(lamda){
				//_this.storage_type = "mysql";
				callback(lamda);
			}
		);
	}	
	//if not fall back to local storage (which is just for demo purposes and testing)
	//maybe give the option to switch between if both are available
	this.id = id;//we need an identifier, to keep seperate apps on different objects
	this.storage = new rad.localstorage();
	this.storage_type = "local";

	return this;
}
rad.io.prototype.set_storage_type_mysql=function(files){
	this.storage_type = "mysql";
	//ok, i need to make an object to deal with mysql storage functions
	this.storage = new rad.mysqlstorage(files);
}
//---------------------
///return a list of files from local storage
// or if we are logged in, from the data base
rad.io.prototype.list=function(){
	//get list of saved
	console.log("just trying to list: "+this.storage_type);
	if(this.storage_type == "local"){
		//this is the brute force local storage way
		var files = this.storage.getobj(this.id);
		if(!files){//there are no files already saved
			return ["(local) no files found"];
		}else{
			var file_names=[];
			for (n in files){
				file_names.push(n);
			}
			return file_names;
		}
	}
	if(this.storage_type == "mysql"){
		//we goona need to do some ajax in here
		///get all the files from mysql
		var files = this.storage.getobj();
		
		if(!files){//there are no files already saved
			return ["(mysql) no files found"];
		}else{
			var file_names=[];
			for (n in files){
				file_names.push(n);
			}
			return file_names;
		}

	}
	console.log("ERROR IN RAD.IO.LIST");
	return ["ERROR"];
	
}
rad.io.prototype.save=function(name,src,sanitize){//optional sanitize function to clean out the save data if need be
	//clean data
	var src_clean;
	if(typeof sanitize === "function"){
		src_clean = sanitize(src);
	}
	if(src_clean===undefined) src_clean=src;
	//var src_clean=this.sanitize_script(src);

	//save the file
	if(this.storage_type == "local"){
		//if using local storage get the file object first, to add to it
		var files = this.storage.getobj(this.id);

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
	if(this.storage_type == "mysql"){
		console.log("---io.js save to mysql: "+this.id+"  - "+name);

		var new_file = {};
		new_file[name]=src_clean;

		_this = this;///pass the reference to this for access in ajax callback
		this.a.get(
			_this.path,
			"q=save",
			function(lamda){
				//_this.storage_type = "mysql";
				_this.storage.setobj();
				//callback(lamda);
			}
		);

		//this.storage.setobj(this.id,new_file);

		//we goona need to do some ajax in here
		///go see if we have this file already, if se we can overwrite, if not, we just save
		//look at the the already loaded files... so we can overwrite that way..maybe
	}
}
rad.io.prototype.load=function(name){
	//load file, return object to be processed
	if(this.storage_type == "local"){
		//get all the local files
		var files = this.storage.getobj(this.id);
		if(files[name]){
			return files[name];//return the specfic file requested
		}else{
			return 'none';
		}
	}
	if(this.storage_type == "mysql"){
		//we goona need to do some ajax in here
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