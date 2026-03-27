/// layout is the overall top level element, that can hold information relevant to the underlying bsp
/////////////////////////////////////////////////////////////////////////////////////////////////

rad.layout = function(container, config, style) {
	this.count = 0;
	this.container = (typeof container === 'string') ? document.getElementById(container) : container;
	this.style = style || {};
	this.resizers = [];
	this.onresize = null; // callback when any partition resizes

	var _this = this;

	if (config != undefined) {
		this.root = this.fromConfig(config, this.container);
	} else {
		this.root = new rad.layout.partition(_this, this.container);
	}

	// listen for window resize
	this.windowresize = rad.windowdoneresizing(rad.closure(_this, _this._onWindowResize));

	this.draw();

	return this;
}

rad.layout.prototype.draw = function() {
	// clear resizers
	for (var i = 0; i < this.resizers.length; i++) {
		if (this.resizers[i].element && this.resizers[i].element.parentElement) {
			this.resizers[i].element.parentElement.removeChild(this.resizers[i].element);
		}
	}
	rad.flusharray(this.resizers);

	// recursive draw
	this._drawPartition(this.root);

	// fire resize callback
	if (this.onresize) this.onresize();
}

rad.layout.prototype._drawPartition = function(part) {
	if (!part) return;

	// update element sizing
	part._applySize();

	if (part.children.length === 0) {
		// leaf node — make sure content element exists
		if (!part.content) {
			part.content = document.createElement('div');
			part.content.style.width = '100%';
			part.content.style.height = '100%';
			part.content.style.overflow = 'auto';
			part.content.style.position = 'relative';
			part.content.style.boxSizing = 'border-box';
		}
		if (part.content.parentElement !== part.element) {
			part.element.appendChild(part.content);
		}
	} else {
		// branch node — remove content, draw children
		if (part.content && part.content.parentElement === part.element) {
			part.element.removeChild(part.content);
		}
		// make sure children are appended
		for (var i = 0; i < part.children.length; i++) {
			if (part.children[i].element.parentElement !== part.element) {
				part.element.appendChild(part.children[i].element);
			}
			this._drawPartition(part.children[i]);
		}
		// place resizer between children
		if (part.children.length === 2) {
			var resizer = new rad.layout.resizer(this, part);
			this.resizers.push(resizer);
			part.element.appendChild(resizer.element);
		}
	}
}

rad.layout.prototype.findPartition = function(id, node) {
	node = node || this.root;
	if (node.id === id) return node;
	for (var i = 0; i < node.children.length; i++) {
		var found = this.findPartition(id, node.children[i]);
		if (found) return found;
	}
	return null;
}

rad.layout.prototype.getContentElement = function(id) {
	var part = this.findPartition(id);
	if (part && part.children.length === 0) return part.content;
	return null;
}

rad.layout.prototype.getPartitionRect = function(id) {
	var part = this.findPartition(id);
	if (part) return part.element.getBoundingClientRect();
	return null;
}

rad.layout.prototype.fromConfig = function(config, parentElement) {
	var part = new rad.layout.partition(this, parentElement, -1, config.id);
	if (config.style) {
		for (var k in config.style) {
			part.element.style[k] = config.style[k];
		}
	}
	if (config.children && config.children.length === 2) {
		var split = config.split || 0; // 0=horizontal, 1=vertical
		var ratio = config.ratio || 50;

		part.split = split;
		part.ratio = ratio;

		var c0 = this.fromConfig(config.children[0], part.element);
		var c1 = this.fromConfig(config.children[1], part.element);

		c0.parent = part;
		c1.parent = part;
		c0.split = split;
		c1.split = split;
		c0.side = 0;
		c1.side = 1;
		c0.percentage = ratio;
		c1.percentage = 100 - ratio;

		part.children = [c0, c1];
	}
	return part;
}

rad.layout.prototype.toConfig = function(node) {
	node = node || this.root;
	var cfg = { id: node.id };
	if (node.children.length === 2) {
		cfg.split = node.split;
		cfg.ratio = node.ratio;
		cfg.children = [
			this.toConfig(node.children[0]),
			this.toConfig(node.children[1])
		];
	}
	return cfg;
}

rad.layout.prototype._onWindowResize = function() {
	this.draw();
}

/////////////////////////////////////////////////////////////////////////////////////////////////

////A PARTITION IS THE MAIN ELEMENT IN THIS BSP STYLE LAYOUT
rad.layout.partition = function(manager, parentElement, split, id) {
	this.manager = manager;
	this.parent = null;
	this.children = [];
	this.content = null;
	this.split = split || -1; // -1 = not split, 0 = horizontal (top/bottom), 1 = vertical (left/right)
	this.side = -1; // 0 = first child, 1 = second child
	this.percentage = 100;
	this.ratio = 50; // split ratio when this node has children

	manager.count++;
	this.id = id || ('partition_' + manager.count);

	this.element = document.createElement('div');
	this.element.id = this.id;
	this.element.style.position = 'relative';
	this.element.style.overflow = 'hidden';
	this.element.style.boxSizing = 'border-box';
	this.element.style.width = '100%';
	this.element.style.height = '100%';

	// apply manager style
	for (var k in manager.style) {
		this.element.style[k] = manager.style[k];
	}

	// append to parent
	var parent = (typeof parentElement === 'string') ? document.getElementById(parentElement) : parentElement;
	if (parent) parent.appendChild(this.element);

	return this;
}

rad.layout.partition.prototype._applySize = function() {
	if (this.split === 1) {
		// vertical split — children are side by side
		this.element.style.width = this.percentage + '%';
		this.element.style.height = '100%';
		this.element.style.display = 'inline-block';
		this.element.style.verticalAlign = 'top';
		this.element.style.float = 'left';
	} else if (this.split === 0) {
		// horizontal split — children are stacked
		this.element.style.width = '100%';
		this.element.style.height = this.percentage + '%';
		this.element.style.display = 'block';
		this.element.style.float = 'none';
	} else {
		// root or unsplit
		this.element.style.width = '100%';
		this.element.style.height = '100%';
	}
}

rad.layout.partition.prototype.splitPartition = function(direction, ratio) {
	if (this.children.length > 0) return; // already split

	ratio = ratio || 50;
	this.split = direction; // store the direction on the parent for resizer
	this.ratio = ratio;

	// detach content temporarily
	var oldContent = this.content;
	if (oldContent && oldContent.parentElement === this.element) {
		this.element.removeChild(oldContent);
	}
	this.content = null;

	// create two children
	var c0 = new rad.layout.partition(this.manager, this.element, direction);
	c0.parent = this;
	c0.side = 0;
	c0.percentage = ratio;

	var c1 = new rad.layout.partition(this.manager, this.element, direction);
	c1.parent = this;
	c1.side = 1;
	c1.percentage = 100 - ratio;

	this.children = [c0, c1];

	// move old content into first child
	if (oldContent) {
		c0.content = oldContent;
	}

	this.manager.draw();

	return { first: c0, second: c1 };
}

rad.layout.partition.prototype.getRect = function() {
	return this.element.getBoundingClientRect();
}

rad.layout.partition.prototype.isLeaf = function() {
	return this.children.length === 0;
}

/////////////////////////////////////////////////////////////////////////////////////////////////

// RESIZER — draggable handle between two sibling partitions
rad.layout.resizer = function(manager, parentPartition) {
	this.manager = manager;
	this.parent = parentPartition;
	this.split = parentPartition.split;

	this.element = document.createElement('div');
	this.element.style.position = 'absolute';
	this.element.style.zIndex = '10';
	this.element.style.background = 'transparent';

	var _this = this;

	if (this.split === 1) {
		// vertical split — resizer is a vertical bar
		var pct = parentPartition.ratio;
		this.element.style.left = 'calc(' + pct + '% - 3px)';
		this.element.style.top = '0';
		this.element.style.width = '6px';
		this.element.style.height = '100%';
		this.element.style.cursor = 'col-resize';
	} else {
		// horizontal split — resizer is a horizontal bar
		var pct = parentPartition.ratio;
		this.element.style.left = '0';
		this.element.style.top = 'calc(' + pct + '% - 3px)';
		this.element.style.width = '100%';
		this.element.style.height = '6px';
		this.element.style.cursor = 'row-resize';
	}

	this.element.addEventListener('mousedown', function(e) {
		e.preventDefault();
		e.stopPropagation();
		_this._startDrag(e);
	});
}

rad.layout.resizer.prototype._startDrag = function(e) {
	var _this = this;
	var parentRect = this.parent.element.getBoundingClientRect();
	var startMouse = (this.split === 1) ? e.clientX : e.clientY;
	var startRatio = this.parent.ratio;
	var parentSize = (this.split === 1) ? parentRect.width : parentRect.height;

	var move = function(e) {
		var currentMouse = (_this.split === 1) ? e.clientX : e.clientY;
		var delta = currentMouse - startMouse;
		var deltaPercent = (delta / parentSize) * 100;
		var newRatio = rad.clamp(startRatio + deltaPercent, 10, 90);

		_this.parent.ratio = newRatio;
		_this.parent.children[0].percentage = newRatio;
		_this.parent.children[1].percentage = 100 - newRatio;

		_this.manager.draw();
	};

	var release = function(e) {
		rad.removedragevent(move, release);
	};

	rad.dragevent(move, release);
}

/////////////////////////////////////////////////////////////////////////////////////////////////
