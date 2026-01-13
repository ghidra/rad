// !!!! requires mouse module and object

rad.defaults.ui = {
	"dtype": "px",
	"style": {
		"width": 140,
		"height": "auto",
		"margin": 0,
		"fontSize": 10,
		"clear": "both",
		"float": "none"
	},
	"label": {
		"className": "rad_ui_label",
		"style": {
			"float": "left",
			"width": 60
		}
	},
	"dropdown": {
		"style": {}
	},
	"textbox": {
		"type": "text",
		"style": {
			"width": 80,
			"float": "right"
		}
	},
	"slider": {
		"settings": {
			"clamp": false,
			"upper": 1,
			"lower": -1,
			"max_upper": 10,
			"max_lower": -10,
			"int": false,
			"update": false
		},
		"slider": {
			"style": {
				"float": "right"
			}
		},
		"bg": {
			"className": "slider_BG",
			"style": {
				"height": 22,
				"backgroundColor": "#ccc",
				"float": "right"
			}
		},
		"fg": {
			"className": "slider_FG",
			"style": {
				"height": 20,
				"margin": 1,
				"backgroundColor": "white",
				"float": "left"
			}
		},
		"in": {
			"className": "slider_IN",
			"type": "text",
			"style": {
				"width": 40,
				"float": "right",
				"color": "black"
			}
		}
	},
	"button": {
		"style": {
			"float": "right"
		}
	},
	"dialogue": {
		"window": {
			"className": "rad_dialogue",
			"style": {
				"backgroundColor": "white",
				"color": "black",
				"clear": "both",
				"margin": 2,
				"height": "100%",
				"overflowY": "scroll"
			}
		},
		"close_button": {
			"id": "close_button",
			"style": {
				"width": 8,
				"height": 8,
				"margin": 1,
				"outline": "1px solid black",
				"float": "right",
				"cursor": "hand"
			}
		}
	},
	"checkbox": {
		"style": {
			"display": "flex",
			"alignItems": "center",
			"gap": "3px"
		},
		"input": {
			"style": {
				"margin": 0,
				"cursor": "pointer"
			}
		},
		"label": {
			"style": {
				"cursor": "pointer",
				"userSelect": "none"
			}
		}
	},
	"collapsible": {
		"style": {
			"position": "static",
			"width": "100%",
			"background": "#2a2a2a",
			"border": "1px solid #444",
			"padding": 0,
			"borderRadius": "5px",
			"margin": 0
		},
		"title": {
			"style": {
				"color": "white",
				"background": "#222",
				"margin": 0,
				"fontSize": "14px",
				"padding": "10px",
				"borderRadius": "5px 5px 0 0",
				"cursor": "pointer",
				"userSelect": "none"
			}
		},
		"content": {
			"style": {
				"padding": "10px",
				"background": "#2a2a2a",
				"borderRadius": "0 0 5px 5px"
			}
		}
	},
	"section": {
		"style": {
			"border": "1px solid #555",
			"background": "#1a1a1a",
			"padding": "8px",
			"marginBottom": "10px",
			"borderRadius": "3px"
		},
		"title": {
			"style": {
				"color": "#ccc",
				"margin": "0 0 8px 0",
				"fontSize": "12px"
			}
		},
		"content": {
			"style": {}
		}
	},
	"list": {
		"style": {
			"overflowY": "auto",
			"border": "1px solid #333",
			"background": "#0a0a0a",
			"padding": "5px"
		},
		"item": {
			"style": {
				"padding": "5px",
				"margin": "2px 0",
				"background": "#222",
				"border": "1px solid #333",
				"borderRadius": "3px",
				"cursor": "pointer",
				"color": "#ccc",
				"fontSize": "11px"
			}
		},
		"item_selected": {
			"style": {
				"background": "#3a3a3a",
				"border": "1px solid #666"
			}
		},
		"item_hover": {
			"style": {
				"background": "#3a3a3a"
			}
		},
		"empty": {
			"style": {
				"color": "#666",
				"fontStyle": "italic",
				"textAlign": "center",
				"padding": "10px"
			}
		}
	},
	"group": {
		"style": {
			"display": "flex",
			"gap": "5px",
			"flexWrap": "wrap",
			"alignItems": "center",
			"justifyContent": "flex-start"
		}
	}
};

// Namespace for all UI components
rad.ui = {};

//-----------base class
rad.ui.base = class {
	constructor(d) {
		// Common property setup - NO DOM creation here
		this.id = (d.id != undefined) ? d.id : "";
		this.label = (d.label != undefined) ? d.label : "";
		this.value = (d.value != undefined) ? d.value : "0";
		this.uitype = 'none';
		this.callback = d.callback;
	}

	// Utility to apply styles from a defaults key + overrides to an element
	applystyle(element, defaultsKey, overrides) {
		var defaults = rad.defaults.ui[defaultsKey];
		if (defaults && defaults.style) {
			for (var prop in defaults.style) {
				element.style[prop] = defaults.style[prop];
			}
		}
		if (overrides) {
			for (var prop in overrides) {
				element.style[prop] = overrides[prop];
			}
		}
	}

	// Apply styles from a nested defaults path (e.g., "collapsible.title")
	applystylepath(element, path, overrides) {
		var parts = path.split(".");
		var defaults = rad.defaults.ui;
		for (var i = 0; i < parts.length; i++) {
			if (defaults[parts[i]]) {
				defaults = defaults[parts[i]];
			} else {
				defaults = null;
				break;
			}
		}
		if (defaults && defaults.style) {
			for (var prop in defaults.style) {
				element.style[prop] = defaults.style[prop];
			}
		}
		if (overrides) {
			for (var prop in overrides) {
				element.style[prop] = overrides[prop];
			}
		}
	}

	// Common interface - subclasses should set this.container
	getelement() {
		return this.container;
	}

	getvalue() {
		return this.value;
	}

	getguielement() {
		return null;
	}
}

//-----------dropdown
rad.ui.dropdown = class extends rad.ui.base {
	constructor(d) {
		super(d);
		this.uitype = "dropdown";
		this.options = (d.options) ? d.options : [];

		// Create container
		this.container = document.createElement("DIV");
		this.container.id = this.id;
		this.applystyle(this.container, "style", d.style);

		// Create label if width > 0
		var labelStyle = rad.defaults.ui.label.style || {};
		var labelWidth = (d.style_label && d.style_label.width !== undefined) ? d.style_label.width : labelStyle.width;
		if (labelWidth > 0) {
			this.label_container = document.createElement("DIV");
			this.label_container.innerHTML = "&nbsp;" + this.label;
			this.applystylepath(this.label_container, "label", d.style_label);
			this.container.appendChild(this.label_container);
		}

		// Create dropdown element
		this.dropdown = document.createElement("SELECT");
		this.dropdown.id = "dd_" + this.id + "_" + this.label;
		var containerWidth = d.style && d.style.width ? d.style.width : rad.defaults.ui.style.width;
		var dropdownWidth = containerWidth - (labelWidth || 0);
		this.applystyle(this.dropdown, "dropdown", { width: dropdownWidth + "px" });
		if (d.style_dropdown) {
			for (var prop in d.style_dropdown) {
				this.dropdown.style[prop] = d.style_dropdown[prop];
			}
		}

		// Callback
		var _this = this;
		if (typeof d.callback === "function") {
			this.dropdown.onchange = function(e) { d.callback(_this); };
		}

		// Populate options
		for (var option in d.options) {
			var opt = document.createElement("OPTION");
			var opt_string = (Array.isArray(d.options)) ? d.options[option] : option;
			opt.value = opt_string;
			if (opt_string === d.value) {
				opt.selected = true;
			}
			opt.innerHTML = d.options[option];
			this.dropdown.appendChild(opt);
		}

		this.container.appendChild(this.dropdown);
	}

	getelement() {
		return this.container;
	}

	getvalue() {
		return this.dropdown.value;
	}

	getguielement() {
		return this.dropdown;
	}
}

//-----------textbox
rad.ui.textbox = class extends rad.ui.base {
	constructor(d) {
		super(d);
		this.uitype = "textbox";

		// Create container
		this.container = document.createElement("DIV");
		this.container.id = this.id;
		this.applystyle(this.container, "style", d.style);

		// Create label if width > 0
		var labelStyle = rad.defaults.ui.label.style || {};
		var labelWidth = (d.style_label && d.style_label.width !== undefined) ? d.style_label.width : labelStyle.width;
		if (labelWidth > 0) {
			this.label_container = document.createElement("DIV");
			this.label_container.innerHTML = "&nbsp;" + this.label;
			this.applystylepath(this.label_container, "label", d.style_label);
			this.container.appendChild(this.label_container);
		}

		// Create textbox element
		this.textbox = document.createElement("INPUT");
		this.textbox.type = "text";
		this.textbox.id = "tb_" + this.id + "_" + this.label;
		this.textbox.value = this.value;
		if (d.name) this.textbox.name = d.name;
		this.applystyle(this.textbox, "textbox", d.style_textbox);

		// Callback
		var _this = this;
		if (typeof d.callback === "function") {
			this.textbox.onchange = function(e) { d.callback(_this); };
		}

		this.container.appendChild(this.textbox);
	}

	getelement() {
		return this.container;
	}

	getvalue() {
		return this.textbox.value;
	}

	getguielement() {
		return this.textbox;
	}
}

//-----------slider
rad.ui.slider = class extends rad.ui.base {
	constructor(d) {
		super(d);
		this.uitype = "slider";
		this.keep = false;

		// Settings
		this.settings = Object.assign({}, rad.defaults.ui.slider.settings);
		if (d.settings) {
			for (var s in d.settings) {
				this.settings[s] = d.settings[s];
			}
		}

		// Create container
		this.container = document.createElement("DIV");
		this.container.id = this.id;
		this.applystyle(this.container, "style", d.style);
		var containerWidth = this.container.style.width ? parseInt(this.container.style.width) : rad.defaults.ui.style.width;
		var containerMargin = this.container.style.margin ? parseInt(this.container.style.margin) : rad.defaults.ui.style.margin;

		// Create label if width > 0
		var labelStyle = rad.defaults.ui.label.style || {};
		var labelWidth = (d.style_label && d.style_label.width !== undefined) ? d.style_label.width : labelStyle.width;
		if (labelWidth > 0) {
			this.label_container = document.createElement("DIV");
			this.label_container.innerHTML = "&nbsp;" + this.label;
			this.applystylepath(this.label_container, "label", d.style_label);
			this.container.appendChild(this.label_container);
		}

		// Create slider elements
		this.con = document.createElement("DIV");
		this.applystylepath(this.con, "slider.slider", d.slider && d.slider.slider ? d.slider.slider.style : null);

		this.bg = document.createElement("DIV");
		this.bg.className = "slider_BG";
		this.applystylepath(this.bg, "slider.bg", d.slider && d.slider.bg ? d.slider.bg.style : null);

		this.fg = document.createElement("DIV");
		this.fg.className = "slider_FG";
		this.applystylepath(this.fg, "slider.fg", d.slider && d.slider.fg ? d.slider.fg.style : null);

		this.in = document.createElement("INPUT");
		this.in.type = "text";
		this.in.className = "slider_IN";
		this.in.id = "stb_" + this.id + "_" + this.label;
		this.in.value = (this.settings.int) ? Math.round(this.value) : this.value;
		this.applystylepath(this.in, "slider.in", d.slider && d.slider.in ? d.slider.in.style : null);

		var inputWidth = this.in.style.width ? parseInt(this.in.style.width) : rad.defaults.ui.slider.in.style.width;
		this.width_max = containerWidth - inputWidth - (containerMargin * 3) - 2;

		this.bg.style.width = this.width_max + "px";
		this.bg.style.marginTop = containerMargin + "px";
		this.bg.style.marginBottom = containerMargin + "px";

		var fgwidth;
		if (this.settings.clamped) {
			fgwidth = rad.remap(this.value, this.settings.lower, this.settings.upper, 0, this.width_max);
		} else {
			fgwidth = this.width_max / 2;
		}
		this.fg.style.width = fgwidth + "px";
		this.fg.style.maxWidth = this.width_max + "px";

		// Callback
		if (typeof d.callback === "function") {
			this.callback = d.callback;
		}

		// Assemble
		this.bg.appendChild(this.fg);
		this.con.appendChild(this.bg);
		this.container.appendChild(this.in);
		this.container.appendChild(this.con);

		// Events
		var _this = this;
		this.bg.onmousedown = function(e) { _this.mousedown(e); };
		this.in.onchange = function(e) { _this.input_changed(e); };
	}

	getelement() {
		return this.container;
	}

	getvalue() {
		return this.value;
	}

	set_settings(d) {
		if (d != undefined) {
			for (var s in d) {
				this.settings[s] = d[s];
			}
		}
	}

	mousedown(e) {
		if (!this.keep) {
			this.value = this.in.value;
			this.keep = true;
		}
		this.update(e);
		var _this = this;
		this.tmp_updater = function(e) { _this.update(e); };
		this.tmp_release = function(e) { _this.release(e); };
		rad.dragevent(this.tmp_updater, this.tmp_release);
	}

	input_changed(e) {
		var new_value = parseFloat(this.in.value);
		var rval;
		if (isNaN(new_value)) {
			this.in.value = this.value;
		} else {
			if (this.settings.clamped) {
				if (new_value > this.settings.max_upper) {
					new_value = this.settings.max_upper;
					this.settings.upper = this.settings.max_upper;
				}
				if (new_value < this.settings.max_lower) {
					new_value = this.settings.max_lower;
					this.settings.lower = this.settings.max_lower;
				}
				rval = (this.settings.int) ? Math.round(new_value) : new_value;
				this.fg.style.width = rad.remap(rval, this.settings.lower, this.settings.upper, 0, this.width_max) + "px";
			} else {
				var bounds = this.bounds(new_value);
				rval = (this.settings.int) ? Math.round(new_value) : new_value;
				this.fg.style.width = rad.remap(rval, this.settings.lower, this.settings.upper, 0, this.width_max / 2) + "px";
			}
			this.value = rval;
			if (this.settings.int) {
				this.in.value = rval;
			}
			if (typeof this.callback === "function") {
				this.callback(this);
			}
		}
	}

	update(e) {
		var c = rad.mouseposition(e);
		var p = rad.domposition(this.bg);

		var mouse_offset = c.x - p.x;
		var new_position = rad.clamp(mouse_offset, 1, this.width_max);
		var new_val;
		if (this.settings.clamped) {
			new_val = rad.remap(new_position, 1, this.width_max, this.settings.lower, this.settings.upper);
		} else {
			var bounds = this.bounds(this.value);
			new_val = rad.remap(new_position, 1, this.width_max, bounds.min, bounds.max);
		}
		this.fg.style.width = new_position + "px";

		var rval = (this.settings.int) ? Math.round(new_val) : new_val.toFixed(2);
		this.in.value = rval;

		if (typeof this.callback === "function" && this.settings.update) {
			if (this.settings.int) {
				if (rval != this.value) {
					this.callback(this);
				}
			} else {
				this.callback(this);
			}
			this.value = rval;
		}
	}

	refresh() {
		var new_position = rad.remap(this.value, this.settings.lower, this.settings.upper, 0, this.width_max);
		this.fg.style.width = new_position + "px";
		this.in.value = this.value;
	}

	release(e) {
		rad.removedragevent(this.tmp_updater, this.tmp_release);

		var rval = parseFloat(document.getElementById("stb_" + this.id + "_" + this.label).value);
		this.value = (this.settings.int) ? Math.round(rval) : rval;
		if (this.settings.int) {
			this.fg.style.width = rad.remap(this.value, this.settings.lower, this.settings.upper, 0, this.width_max) + "px";
		}
		if (typeof this.callback === "function") {
			this.callback(this);
		}
	}

	bounds(val) {
		val = parseFloat(val);
		var span = (val == 0) ? 10 : val;
		var v = Math.abs(span);
		return { min: val - v, max: val + v };
	}

	set_to_minimum() {
		this.value = this.settings.lower;
		this.refresh();
	}

	set_to_maximum() {
		this.value = this.settings.upper;
		this.refresh();
	}
}

//-----------button
rad.ui.button = class extends rad.ui.base {
	constructor(d) {
		super(d);
		this.uitype = "button";

		// Create container
		this.container = document.createElement("DIV");
		this.container.id = this.id;
		this.applystyle(this.container, "style", d.style);

		// Create button element (no label for buttons)
		this.button = document.createElement("BUTTON");
		this.button.id = "bu_" + this.id + "_" + this.label;
		this.button.textContent = this.label;
		this.applystyle(this.button, "button", d.style_button);

		// Callback
		var _this = this;
		if (typeof d.callback === "function") {
			this.button.onclick = function(e) { d.callback(_this); };
		}

		this.container.appendChild(this.button);
	}

	getelement() {
		return this.container;
	}

	getguielement() {
		return this.button;
	}
}

//-----------dialogue
rad.ui.dialogue = class extends rad.ui.base {
	constructor(d, inner, show_close_button) {
		super(d);
		this.uitype = "dialogue";
		show_close_button = show_close_button || 1;

		// Create container
		this.container = document.createElement("DIV");
		this.container.id = this.id;
		this.applystyle(this.container, "style", d.style);
		this.container.style.position = "absolute";

		// Close button
		if (show_close_button > 0) {
			this.close = document.createElement("DIV");
			this.applystylepath(this.close, "dialogue.close_button", d.style_close_button);
			var _cont = this.container;
			this.close.onmousedown = function(e) {
				_cont.parentNode.removeChild(_cont);
			};
			this.container.appendChild(this.close);
		}

		// Dialogue window
		this.window = document.createElement("DIV");
		this.window.className = "rad_dialogue";
		this.applystylepath(this.window, "dialogue.window", d.style_dialogue);
		var containerWidth = d.style && d.style.width ? d.style.width : rad.defaults.ui.style.width;
		var containerHeight = d.style && d.style.height ? d.style.height : rad.defaults.ui.style.height;
		if (containerHeight !== "auto") {
			this.window.style.width = (containerWidth - 4) + "px";
			this.window.style.height = (containerHeight - 14) + "px";
		}
		this.window.innerHTML = inner;
		this.container.appendChild(this.window);

		// Position
		var pos = this.getposition();
		this.container.style.top = pos.y + "px";
		this.container.style.left = pos.x + "px";
	}

	getelement() {
		return this.container;
	}

	getposition() {
		var d = rad.bodysize();
		var px = d.x / 2.0;
		var py = d.y / 2.0;
		var w = parseInt(this.container.style.width) || rad.defaults.ui.style.width;
		var h = parseInt(this.container.style.height) || 0;
		px -= w / 2.0;
		if (h > 0) py -= h / 2.0;
		return { x: px, y: py };
	}
}

//-----------checkbox
rad.ui.checkbox = class extends rad.ui.base {
	constructor(d) {
		super(d);
		this.uitype = "checkbox";
		this.checked = (d.checked != undefined) ? d.checked : false;

		// Create container
		this.container = document.createElement("DIV");
		this.container.id = this.id;
		this.applystyle(this.container, "checkbox", d.style);

		// Create checkbox input
		this.checkbox = document.createElement("INPUT");
		this.checkbox.type = "checkbox";
		this.checkbox.id = "cb_" + this.id + "_" + this.label;
		this.checkbox.checked = this.checked;
		this.applystylepath(this.checkbox, "checkbox.input", d.style_checkbox);

		// Create label
		this.label_element = document.createElement("LABEL");
		this.label_element.textContent = this.label;
		this.label_element.htmlFor = this.checkbox.id;
		this.applystylepath(this.label_element, "checkbox.label", d.style_label);

		// Callback
		var _this = this;
		this.checkbox.onchange = function(e) {
			_this.checked = _this.checkbox.checked;
			if (typeof _this.callback === "function") {
				_this.callback(_this);
			}
		};

		this.container.appendChild(this.checkbox);
		this.container.appendChild(this.label_element);
	}

	getelement() {
		return this.container;
	}

	getvalue() {
		return this.checkbox.checked;
	}

	setvalue(checked) {
		this.checked = checked;
		this.checkbox.checked = checked;
	}

	getguielement() {
		return this.checkbox;
	}
}

//-----------collapsible
rad.ui.collapsible = class extends rad.ui.base {
	constructor(d) {
		super(d);
		this.uitype = "collapsible";
		this.collapsed = (d.collapsed != undefined) ? d.collapsed : false;

		// Create main container
		this.container = document.createElement("DIV");
		this.container.id = this.id;
		this.applystyle(this.container, "collapsible", d.style);

		// Create title/header
		this.title = document.createElement("DIV");
		this.title.textContent = this.label;
		this.applystylepath(this.title, "collapsible.title", d.style_title);

		// Create content area
		this.content = document.createElement("DIV");
		this.applystylepath(this.content, "collapsible.content", d.style_content);
		this.content.style.display = this.collapsed ? 'none' : 'block';

		// Click handler
		var _this = this;
		this.title.onclick = function() {
			_this.toggle();
		};

		this.container.appendChild(this.title);
		this.container.appendChild(this.content);
	}

	getelement() {
		return this.container;
	}

	getcontentelement() {
		return this.content;
	}

	toggle() {
		this.collapsed = !this.collapsed;
		this.content.style.display = this.collapsed ? 'none' : 'block';
		if (typeof this.callback === "function") {
			this.callback(this, this.collapsed);
		}
	}

	expand() {
		if (this.collapsed) {
			this.toggle();
		}
	}

	collapse() {
		if (!this.collapsed) {
			this.toggle();
		}
	}

	settitle(text) {
		this.label = text;
		this.title.textContent = text;
	}
}

//-----------section
rad.ui.section = class extends rad.ui.base {
	constructor(d) {
		super(d);
		this.uitype = "section";

		// Create main container
		this.container = document.createElement("DIV");
		this.container.id = this.id;
		this.applystyle(this.container, "section", d.style);

		// Create title if provided
		if (this.label) {
			this.title = document.createElement("H4");
			this.title.textContent = this.label;
			this.applystylepath(this.title, "section.title", d.style_title);
			this.container.appendChild(this.title);
		}

		// Create content area
		this.content = document.createElement("DIV");
		this.applystylepath(this.content, "section.content", d.style_content);
		this.container.appendChild(this.content);
	}

	getelement() {
		return this.container;
	}

	getcontentelement() {
		return this.content;
	}

	settitle(text) {
		this.label = text;
		if (this.title) {
			this.title.textContent = text;
		}
	}
}

//-----------list
rad.ui.list = class extends rad.ui.base {
	constructor(d) {
		super(d);
		this.uitype = "list";
		this.items = (d.items != undefined) ? d.items : [];
		this.selected = (d.selected != undefined) ? d.selected : null;
		this.maxHeight = (d.maxHeight != undefined) ? d.maxHeight : 200;
		this.emptyMessage = (d.emptyMessage != undefined) ? d.emptyMessage : "No items";

		// Store custom style overrides
		this.style_item = d.style_item || {};
		this.style_item_selected = d.style_item_selected || {};
		this.style_item_hover = d.style_item_hover || {};

		// Create main container
		this.container = document.createElement("DIV");
		this.container.id = this.id;
		this.applystyle(this.container, "list", d.style);
		this.container.style.maxHeight = this.maxHeight + "px";

		// Render initial items
		this.refresh();
	}

	getelement() {
		return this.container;
	}

	getvalue() {
		return this.selected;
	}

	getselected() {
		return this.selected;
	}

	setitems(items) {
		this.items = items;
		this.selected = null;
		this.refresh();
	}

	select(item) {
		this.selected = item;
		this.refresh();
		if (typeof this.callback === "function") {
			this.callback(this, this.selected);
		}
	}

	refresh() {
		this.container.innerHTML = '';

		if (this.items.length === 0) {
			var emptyDiv = document.createElement("DIV");
			emptyDiv.textContent = this.emptyMessage;
			this.applystylepath(emptyDiv, "list.empty");
			this.container.appendChild(emptyDiv);
			return;
		}

		var _this = this;
		this.items.forEach(function(item, index) {
			var itemDiv = document.createElement("DIV");
			var isSelected = (_this.selected === item) ||
				(_this.selected && item && _this.selected.value === item.value);

			itemDiv.textContent = item.label || item.toString();

			// Apply base item style
			_this.applystylepath(itemDiv, "list.item", _this.style_item);

			// Apply selected style
			if (isSelected) {
				_this.applystylepath(itemDiv, "list.item_selected", _this.style_item_selected);
			}

			// Hover effect
			var defaultBg = itemDiv.style.background;
			var hoverBg = rad.defaults.ui.list.item_hover.style.background || '#3a3a3a';
			itemDiv.onmouseenter = function() {
				if (!isSelected) {
					itemDiv.style.background = hoverBg;
				}
			};
			itemDiv.onmouseleave = function() {
				if (!isSelected) {
					itemDiv.style.background = defaultBg;
				}
			};

			// Click handler
			itemDiv.onclick = function() {
				_this.select(item);
			};

			_this.container.appendChild(itemDiv);
		});
	}
}

//-----------group
rad.ui.group = class extends rad.ui.base {
	constructor(d) {
		super(d);
		this.uitype = "group";
		this.direction = (d.direction != undefined) ? d.direction : "row";
		this.gap = (d.gap != undefined) ? d.gap : 5;
		this.wrap = (d.wrap != undefined) ? d.wrap : true;
		this.align = (d.align != undefined) ? d.align : "center";
		this.justify = (d.justify != undefined) ? d.justify : "flex-start";

		// Create container
		this.container = document.createElement("DIV");
		this.container.id = this.id;
		this.applystyle(this.container, "group", d.style);

		// Apply group-specific layout
		this.container.style.flexDirection = this.direction;
		this.container.style.gap = this.gap + "px";
		this.container.style.flexWrap = this.wrap ? 'wrap' : 'nowrap';
		this.container.style.alignItems = this.align;
		this.container.style.justifyContent = this.justify;
	}

	getelement() {
		return this.container;
	}

	getcontentelement() {
		return this.container;
	}

	add(element) {
		if (element.getelement && typeof element.getelement === "function") {
			this.container.appendChild(element.getelement());
		} else if (element.nodeType) {
			this.container.appendChild(element);
		}
		return this;
	}

	clear() {
		this.container.innerHTML = '';
		return this;
	}
}
