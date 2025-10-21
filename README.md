-----
##rad

rad is my vanilla javascript framework.
-----
##use

include rad.js 
include includes.js
```
<script type="text/javascript" language="Javascript" src="rad/rad.js"></script>
<script type="text/javascript" language="Javascript" src="includes.js"></script>

```
-----
##include.js
include.js is a file you create to tell rad what modules to load, as well what files of your own to load inline.
```
//COMPILE MODULES
rad.includes.modules([
	"dom.js"
]);
//COMPILE SOURCES
rad.includes.source([
	"main.js",
	"core/util.js",
	"math/math.js",
	"index.js"
]);
```
-----
##future
the idea behind includes.js is that later I will have a python script that will parse that file to make one large minified *.js file to deploy, instead of loading all these files at load time.
