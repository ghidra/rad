rad.mysqlstorage=function(files){
    //type is either local or session..local is long term, session is just for the session
    type = "mysql";
    return this.init(files);
}
rad.mysqlstorage.prototype.init=function(files){
    //console.log(files);
    //console.log("mysqlstorrage do something with: "+files);
    this.storage = files;//create an empty oject to hold data
}
    
//use *obj to strigify json data
rad.mysqlstorage.prototype.setobj=function(d){
    ///this is the call back after this has been saved
    console.log("mysqlstorrage setobj: ");
    console.log(JSON.parse(d));
    //console.dir(JSON.parse(d));
    //add it to the mysql... then add it to the list of files

    //this.storage.setItem(id,JSON.stringify(obj));
}
rad.mysqlstorage.prototype.getobj=function(id){
    //return JSON.parse(this.storage.getItem(id));
}
//use these just to set simple no object data
rad.mysqlstorage.prototype.set=function(id,d){
    //this.storage.setItem(id,d);
}
rad.mysqlstorage.prototype.get=function(id){
    //return this.storage.getItem(id);
}
///cleanup
rad.mysqlstorage.prototype.deleteall=function(){
    //return this.storage.clear();
}
rad.mysqlstorage.prototype.deleteitem=function(name){
    //return this.storage.removeItem(name);
}


