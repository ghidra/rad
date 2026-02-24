// !!!! requires mouse module and object

// Namespace for all UI components
rad.ui = {};

// Theme system - stores multiple named themes
rad.ui.themes = {};

// Default theme
rad.ui.themes.default = {
	"dtype": "px",

	// Base container styles
	"style": {
		"width": 140,
		"height": "auto",
		"margin": 0,
		"fontSize": 10,
		"clear": "both",
		"float": "none"
	},

	// Shared elements - reusable across components
	"shared": {
		"titlebar": {
			"style": {
				"color": "white",
				"background": "#222",
				"margin": 0,
				"fontSize": "14px",
				"padding": "10px",
				"cursor": "pointer",
				"userSelect": "none",
				"display": "flex",
				"alignItems": "center",
				"justifyContent": "space-between"
			},
			"icon": {
				"style": {
					"fontSize": "10px",
					"marginLeft": "8px",
					"transition": "transform 0.2s"
				}
			}
		},
		"content": {
			"style": {
				"padding": "10px",
				"background": "#2a2a2a"
			}
		},
		"container": {
			"style": {
				"background": "#2a2a2a",
				"border": "1px solid #444",
				"borderRadius": "5px"
			}
		}
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
			"width": "100%",
			"padding": "5px",
			"background": "#4a4a4a",
			"color": "white",
			"border": "1px solid #555",
			"borderRadius": "3px",
			"cursor": "pointer"
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
	"titlebar": {
		"style": {
			"borderRadius": "5px 5px 0 0"
		}
	},
	"collapsible": {
		"style": {
			"position": "static",
			"width": "100%",
			"padding": 0,
			"margin": 0
		},
		"content": {
			"style": {
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
				"fontSize": "12px",
				"background": "transparent",
				"padding": 0,
				"cursor": "default"
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
	},
	"textpanel": {
		"style": {
			"position": "absolute",
			"background": "rgba(0, 0, 0, 0.85)",
			"color": "#fff",
			"padding": "8px 12px",
			"borderRadius": "6px",
			"borderWidth": "1px",
			"borderStyle": "solid",
			"borderColor": "#555",
			"fontSize": "12px",
			"fontFamily": "sans-serif",
			"lineHeight": "1.4",
			"boxSizing": "border-box",
			"pointerEvents": "none",
			"zIndex": "1000",
			"whiteSpace": "pre-wrap",
			"wordWrap": "break-word"
		},
		"defaults": {
			"minWidth": 50,
			"maxWidth": 300,
			"maxHeight": 200,
			"maxLength": 0,
			"anchorX": 0.5,
			"anchorY": 1.0,
			"offsetX": 0,
			"offsetY": -10
		}
	},
	"vessel": {
		"style": {
			"position": "fixed",
			"zIndex": "1000",
			"display": "flex",
			"flexDirection": "column",
			"gap": "10px",
			"pointerEvents": "none",
			"boxSizing": "border-box"
		},
		"draghandle": {
			"style": {
				"background": "#222",
				"padding": "6px 10px",
				"cursor": "move",
				"userSelect": "none",
				"borderRadius": "5px 5px 0 0",
				"fontSize": "12px",
				"color": "#ccc",
				"pointerEvents": "auto"
			}
		},
		"defaults": {
			"width": 300,
			"zIndex": 1000
		}
	},
	"menubar": {
		"bar": {
			"style": {
				"position": "fixed",
				"top": "0",
				"left": "0",
				"width": "100%",
				"height": "28px",
				"background": "transparent",
				"display": "flex",
				"flexDirection": "row",
				"justifyContent": "flex-end",
				"alignItems": "stretch",
				"zIndex": "2000",
				"boxSizing": "border-box",
				"fontFamily": "sans-serif",
				"fontSize": "13px",
				"userSelect": "none",
				"cursor": "default",
				"pointerEvents": "none"
			}
		},
		"menu_button": {
			"style": {
				"background": "transparent",
				"color": "#ccc",
				"border": "none",
				"padding": "0 12px",
				"cursor": "pointer",
				"fontSize": "13px",
				"lineHeight": "28px",
				"whiteSpace": "nowrap",
				"pointerEvents": "auto"
			}
		},
		"dropdown": {
			"style": {
				"position": "absolute",
				"top": "28px",
				"right": "0",
				"background": "#2a2a2e",
				"border": "1px solid #555",
				"borderTop": "none",
				"boxShadow": "0 4px 12px rgba(0,0,0,0.5)",
				"zIndex": "2001",
				"minWidth": "180px",
				"padding": "4px 0",
				"pointerEvents": "auto",
				"cursor": "default"
			}
		},
		"menuitem": {
			"style": {
				"color": "#ccc",
				"padding": "5px 20px 5px 8px",
				"cursor": "pointer",
				"fontSize": "13px",
				"display": "flex",
				"alignItems": "center",
				"whiteSpace": "nowrap"
			}
		},
		"separator": {
			"style": {
				"borderTop": "1px solid #444",
				"margin": "4px 8px",
				"height": "0",
				"pointerEvents": "none"
			}
		}
	},
	"textarea": {
		"style": {
			"width": "100%",
			"background": "#1a1a1a",
			"color": "#ccc",
			"border": "1px solid #444",
			"borderRadius": "3px",
			"padding": "4px",
			"fontFamily": "monospace",
			"fontSize": "11px",
			"resize": "vertical",
			"boxSizing": "border-box"
		}
	},
	"colorpicker": {
		"style": {
			"padding": "6px",
			"background": "#2a2a2a",
			"border": "1px solid #444",
			"borderRadius": "3px"
		},
		"canvas": {
			"style": {
				"borderRadius": "3px",
				"cursor": "crosshair"
			}
		},
		"huebar": {
			"style": {
				"marginTop": "6px",
				"borderRadius": "3px",
				"cursor": "crosshair"
			}
		},
		"alphabar": {
			"style": {
				"marginTop": "4px",
				"borderRadius": "3px",
				"cursor": "crosshair"
			}
		},
		"swatch": {
			"style": {
				"width": "22px",
				"height": "22px",
				"borderRadius": "3px",
				"border": "1px solid #555",
				"display": "inline-block",
				"flexShrink": "0"
			}
		},
		"hex_input": {
			"style": {
				"background": "#1a1a1a",
				"color": "#ccc",
				"border": "1px solid #444",
				"borderRadius": "3px",
				"padding": "2px 4px",
				"fontSize": "11px",
				"fontFamily": "monospace",
				"width": "66px"
			}
		},
		"channel_input": {
			"style": {
				"background": "#1a1a1a",
				"color": "#ccc",
				"border": "1px solid #444",
				"borderRadius": "3px",
				"padding": "2px 2px",
				"fontSize": "10px",
				"fontFamily": "monospace",
				"width": "34px"
			}
		},
		"channel_label": {
			"style": {
				"color": "#888",
				"fontSize": "10px",
				"fontFamily": "monospace"
			}
		}
	}
};

// Active theme pointer - defaults to default theme
rad.ui.theme = rad.ui.themes.default;

// Switch global theme by name or object
rad.ui.settheme = function(themeNameOrObj) {
	if (typeof themeNameOrObj === 'string') {
		if (rad.ui.themes[themeNameOrObj]) {
			rad.ui.theme = rad.ui.themes[themeNameOrObj];
		} else {
			console.warn('rad.ui: Theme "' + themeNameOrObj + '" not found');
		}
	} else if (typeof themeNameOrObj === 'object') {
		rad.ui.theme = themeNameOrObj;
	}
};

// Get a theme by name
rad.ui.gettheme = function(name) {
	return rad.ui.themes[name] || null;
};

// Register a new theme
rad.ui.registertheme = function(name, themeObj) {
	rad.ui.themes[name] = themeObj;
};

// Legacy compatibility - point rad.defaults.ui to active theme
rad.defaults.ui = rad.ui.themes.default;

//-----------base class
rad.ui.base = class {
	constructor(d) {
		// Common property setup - NO DOM creation here
		this.id = (d.id != undefined) ? d.id : "";
		this.label = (d.label != undefined) ? d.label : "";
		this.value = (d.value != undefined) ? d.value : "0";
		this.uitype = 'none';
		this.callback = d.callback;

		// Per-instance theme override - defaults to global theme
		this.theme = d.theme || rad.ui.theme;
	}

	// Get the active theme for this instance
	gettheme() {
		return this.theme;
	}

	// Set theme for this instance
	settheme(themeNameOrObj) {
		if (typeof themeNameOrObj === 'string') {
			this.theme = rad.ui.themes[themeNameOrObj] || rad.ui.theme;
		} else if (typeof themeNameOrObj === 'object') {
			this.theme = themeNameOrObj;
		}
	}

	// Utility to apply styles from a theme key + overrides to an element
	applystyle(element, defaultsKey, overrides) {
		var defaults = this.theme[defaultsKey];
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

	// Apply styles from a nested theme path (e.g., "collapsible.content")
	applystylepath(element, path, overrides) {
		var parts = path.split(".");
		var defaults = this.theme;
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

	// Apply shared styles from theme.shared (e.g., "titlebar", "content")
	applysharedstyle(element, sharedKey, overrides) {
		var shared = this.theme.shared;
		if (shared && shared[sharedKey] && shared[sharedKey].style) {
			for (var prop in shared[sharedKey].style) {
				element.style[prop] = shared[sharedKey].style[prop];
			}
		}
		if (overrides) {
			for (var prop in overrides) {
				element.style[prop] = overrides[prop];
			}
		}
	}

	// Apply shared nested styles (e.g., "titlebar.icon")
	applysharedstylepath(element, path, overrides) {
		var parts = path.split(".");
		var defaults = this.theme.shared;
		for (var i = 0; i < parts.length; i++) {
			if (defaults && defaults[parts[i]]) {
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

//-----------titlebar (reusable sub-component)
rad.ui.titlebar = class extends rad.ui.base {
	constructor(d) {
		super(d);
		this.uitype = "titlebar";
		this.showIcon = (d.showIcon != undefined) ? d.showIcon : false;
		this.iconCollapsed = (d.iconCollapsed != undefined) ? d.iconCollapsed : "\u25B6"; // right arrow
		this.iconExpanded = (d.iconExpanded != undefined) ? d.iconExpanded : "\u25BC"; // down arrow
		this.collapsed = (d.collapsed != undefined) ? d.collapsed : false;
		this.clickable = (d.clickable != undefined) ? d.clickable : true;

		// Create container
		this.container = document.createElement("DIV");
		this.container.id = this.id ? this.id + "_titlebar" : "";

		// Apply shared titlebar styles, then component-specific, then overrides
		this.applysharedstyle(this.container, "titlebar");
		if (d.componentKey) {
			this.applystylepath(this.container, d.componentKey + ".title");
		}
		if (d.style) {
			for (var prop in d.style) {
				this.container.style[prop] = d.style[prop];
			}
		}

		// Non-clickable titlebar adjustments
		if (!this.clickable) {
			this.container.style.cursor = "default";
		}

		// Create text element
		this.textElement = document.createElement("SPAN");
		this.textElement.textContent = this.label;
		this.container.appendChild(this.textElement);

		// Create icon element if needed
		if (this.showIcon) {
			this.iconElement = document.createElement("SPAN");
			this.applysharedstylepath(this.iconElement, "titlebar.icon", d.style_icon);
			this.updateIcon();
			this.container.appendChild(this.iconElement);
		}

		// Click handler
		if (this.clickable) {
			var _this = this;
			this.container.onclick = function(e) {
				if (typeof _this.callback === "function") {
					_this.callback(_this, e);
				}
			};
		}
	}

	getelement() {
		return this.container;
	}

	settitle(text) {
		this.label = text;
		this.textElement.textContent = text;
	}

	gettitle() {
		return this.label;
	}

	setcollapsed(collapsed) {
		this.collapsed = collapsed;
		this.updateIcon();
	}

	updateIcon() {
		if (this.iconElement) {
			this.iconElement.textContent = this.collapsed ? this.iconCollapsed : this.iconExpanded;
		}
	}

	setclickable(clickable) {
		this.clickable = clickable;
		this.container.style.cursor = clickable ? "pointer" : "default";
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

		// Create main container with shared container + collapsible styles
		this.container = document.createElement("DIV");
		this.container.id = this.id;
		this.applysharedstyle(this.container, "container");
		this.applystyle(this.container, "collapsible", d.style);

		// Create titlebar sub-component
		var _this = this;
		this.titlebar = new rad.ui.titlebar({
			id: this.id,
			label: this.label,
			theme: this.theme,
			showIcon: true,
			collapsed: this.collapsed,
			componentKey: "titlebar",
			style: d.style_title,
			callback: function() {
				_this.toggle();
			}
		});

		// Create content area with shared content + collapsible content styles
		this.content = document.createElement("DIV");
		this.applysharedstyle(this.content, "content");
		this.applystylepath(this.content, "collapsible.content", d.style_content);
		this.content.style.display = this.collapsed ? 'none' : 'block';

		this.container.appendChild(this.titlebar.getelement());
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
		this.titlebar.setcollapsed(this.collapsed);
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
		this.titlebar.settitle(text);
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

		// Create titlebar if label provided (non-clickable for sections)
		if (this.label) {
			this.titlebar = new rad.ui.titlebar({
				id: this.id,
				label: this.label,
				theme: this.theme,
				showIcon: false,
				clickable: false,
				componentKey: "section",
				style: d.style_title
			});
			this.container.appendChild(this.titlebar.getelement());
		}

		// Create content area
		this.content = document.createElement("DIV");
		this.applysharedstyle(this.content, "content");
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
		if (this.titlebar) {
			this.titlebar.settitle(text);
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

//-----------textpanel (absolutely positioned, auto-sizing text display)
rad.ui.textpanel = class extends rad.ui.base {
	constructor(d) {
		super(d);
		this.uitype = "textpanel";

		// Get defaults from theme
		var defaults = this.theme.textpanel.defaults || {};

		// Sizing constraints
		this.minWidth = (d.minWidth != undefined) ? d.minWidth : defaults.minWidth;
		this.maxWidth = (d.maxWidth != undefined) ? d.maxWidth : defaults.maxWidth;
		this.maxHeight = (d.maxHeight != undefined) ? d.maxHeight : defaults.maxHeight;
		this.maxLength = (d.maxLength != undefined) ? d.maxLength : defaults.maxLength;

		// Position and anchor
		this.x = (d.x != undefined) ? d.x : 0;
		this.y = (d.y != undefined) ? d.y : 0;
		this.anchorX = (d.anchorX != undefined) ? d.anchorX : defaults.anchorX; // 0=left, 0.5=center, 1=right
		this.anchorY = (d.anchorY != undefined) ? d.anchorY : defaults.anchorY; // 0=top, 0.5=center, 1=bottom
		this.offsetX = (d.offsetX != undefined) ? d.offsetX : defaults.offsetX;
		this.offsetY = (d.offsetY != undefined) ? d.offsetY : defaults.offsetY;

		// Visibility
		this.visible = (d.visible != undefined) ? d.visible : true;

		// Text content
		this.text = (d.text != undefined) ? d.text : "";

		// Create container
		this.container = document.createElement("DIV");
		this.container.id = this.id;
		this.applystyle(this.container, "textpanel", d.style);

		// Apply sizing constraints
		this.container.style.minWidth = this.minWidth + "px";
		this.container.style.maxWidth = this.maxWidth + "px";
		this.container.style.maxHeight = this.maxHeight + "px";

		// Set initial text
		this.settext(this.text);

		// Set initial position
		this.setposition(this.x, this.y);

		// Set initial visibility
		if (!this.visible) {
			this.hide();
		}
	}

	getelement() {
		return this.container;
	}

	gettext() {
		return this.text;
	}

	settext(text) {
		// Apply max length if set
		if (this.maxLength > 0 && text.length > this.maxLength) {
			text = text.substring(0, this.maxLength);
		}
		this.text = text;
		this.container.textContent = text;

		// Check if scrollbar is needed
		this.updateoverflow();
	}

	appendtext(text) {
		this.settext(this.text + text);
	}

	cleartext() {
		this.settext("");
	}

	// Update overflow based on content height
	updateoverflow() {
		// Temporarily allow full height to measure
		var prevMaxHeight = this.container.style.maxHeight;
		this.container.style.overflow = "visible";
		this.container.style.maxHeight = "none";

		var contentHeight = this.container.scrollHeight;

		// Restore constraints
		this.container.style.maxHeight = prevMaxHeight;

		if (contentHeight > this.maxHeight) {
			this.container.style.overflow = "auto";
			this.container.style.overflowX = "hidden";
			this.container.style.pointerEvents = "auto"; // Enable pointer for scrolling
		} else {
			this.container.style.overflow = "visible";
			this.container.style.pointerEvents = "none";
		}
	}

	// Set position (will apply anchor offset)
	setposition(x, y) {
		this.x = x;
		this.y = y;
		this.updateposition();
	}

	// Update DOM position based on current x, y and anchor
	updateposition() {
		// Get element dimensions for anchor calculation
		var width = this.container.offsetWidth || this.minWidth;
		var height = this.container.offsetHeight || 0;

		// Calculate final position with anchor and offset
		var finalX = this.x - (width * this.anchorX) + this.offsetX;
		var finalY = this.y - (height * this.anchorY) + this.offsetY;

		this.container.style.left = finalX + "px";
		this.container.style.top = finalY + "px";
	}

	// Set anchor point (0-1 for each axis)
	setanchor(anchorX, anchorY) {
		this.anchorX = anchorX;
		this.anchorY = anchorY;
		this.updateposition();
	}

	// Set offset from anchor
	setoffset(offsetX, offsetY) {
		this.offsetX = offsetX;
		this.offsetY = offsetY;
		this.updateposition();
	}

	// Show the panel
	show() {
		this.visible = true;
		this.container.style.display = "block";
		this.updateposition(); // Recalculate position when shown
	}

	// Hide the panel
	hide() {
		this.visible = false;
		this.container.style.display = "none";
	}

	// Toggle visibility
	toggle() {
		if (this.visible) {
			this.hide();
		} else {
			this.show();
		}
	}

	isvisible() {
		return this.visible;
	}

	// Set sizing constraints
	setminwidth(width) {
		this.minWidth = width;
		this.container.style.minWidth = width + "px";
		this.updateposition();
	}

	setmaxwidth(width) {
		this.maxWidth = width;
		this.container.style.maxWidth = width + "px";
		this.updateposition();
	}

	setmaxheight(height) {
		this.maxHeight = height;
		this.container.style.maxHeight = height + "px";
		this.updateoverflow();
	}

	setmaxlength(length) {
		this.maxLength = length;
		// Re-apply to current text if needed
		if (this.maxLength > 0 && this.text.length > this.maxLength) {
			this.settext(this.text);
		}
	}

	// Style setters for common customizations
	setbackground(color) {
		this.container.style.background = color;
	}

	setcolor(color) {
		this.container.style.color = color;
	}

	setborder(width, style, color) {
		if (width != undefined) this.container.style.borderWidth = width + "px";
		if (style != undefined) this.container.style.borderStyle = style;
		if (color != undefined) this.container.style.borderColor = color;
	}

	setborderradius(radius) {
		this.container.style.borderRadius = radius + "px";
	}

	setpadding(padding) {
		this.container.style.padding = padding + "px";
	}

	setfontsize(size) {
		this.container.style.fontSize = size + "px";
	}

	setfont(fontFamily) {
		this.container.style.fontFamily = fontFamily;
	}

	setzindex(zIndex) {
		this.container.style.zIndex = zIndex;
	}

	// Attach to a parent (usually document.body for absolute positioning)
	attachto(parent) {
		if (parent) {
			parent.appendChild(this.container);
		} else {
			document.body.appendChild(this.container);
		}
		this.updateposition();
	}

	// Detach from parent
	detach() {
		if (this.container.parentNode) {
			this.container.parentNode.removeChild(this.container);
		}
	}

	// Get current dimensions
	getsize() {
		return {
			width: this.container.offsetWidth,
			height: this.container.offsetHeight
		};
	}

	// Get current position
	getposition() {
		return {
			x: this.x,
			y: this.y
		};
	}
}

//-----------vessel (positioned, optionally draggable container)
rad.ui.vessel = class extends rad.ui.base {
	constructor(d) {
		super(d);
		this.uitype = "vessel";

		// Get defaults from theme
		var defaults = this.theme.vessel.defaults || {};

		// Configuration
		this.draggable = (d.draggable != undefined) ? d.draggable : false;
		this.collapsible = (d.collapsible != undefined) ? d.collapsible : false;
		this.collapsed = (d.collapsed != undefined) ? d.collapsed : false;
		this.showHandle = (d.showHandle != undefined) ? d.showHandle : (this.draggable || this.collapsible || this.label);
		this.width = (d.width != undefined) ? d.width : defaults.width;
		this.zIndex = (d.zIndex != undefined) ? d.zIndex : defaults.zIndex;

		// Position can be specified as {top, right, bottom, left} or {x, y}
		this.position = d.position || { top: 10, right: 10 };

		// Drag state
		this.isDragging = false;
		this.dragOffset = { x: 0, y: 0 };

		// Create container
		this.container = document.createElement("DIV");
		this.container.id = this.id;
		this.applystyle(this.container, "vessel", d.style);
		this.container.style.width = this.width + "px";
		this.container.style.zIndex = this.zIndex;

		// Apply position
		this.applyposition(this.position);

		// Create drag handle if needed
		if (this.showHandle && this.label) {
			this.dragHandle = document.createElement("DIV");
			this.applystylepath(this.dragHandle, "vessel.draghandle", d.style_handle);
			this.dragHandle.style.display = "flex";
			this.dragHandle.style.alignItems = "center";
			this.dragHandle.style.justifyContent = "space-between";

			// Label text
			this.labelElement = document.createElement("SPAN");
			this.labelElement.textContent = this.label;
			this.dragHandle.appendChild(this.labelElement);

			// Collapse icon if collapsible
			if (this.collapsible) {
				this.collapseIcon = document.createElement("SPAN");
				this.collapseIcon.style.cssText = `
					font-size: 10px;
					margin-left: 8px;
					transition: transform 0.2s;
				`;
				this.updatecollapseicon();
				this.dragHandle.appendChild(this.collapseIcon);
			}

			this.container.appendChild(this.dragHandle);

			if (this.draggable) {
				this.initdrag();
			}

			// Click to toggle collapse
			if (this.collapsible) {
				var _this = this;
				this.dragHandle.onclick = function(e) {
					// Only toggle if not dragging
					if (!_this.isDragging && !_this._wasDragging) {
						_this.toggle();
					}
					_this._wasDragging = false;
				};
			}
		}

		// Create content area
		this.content = document.createElement("DIV");
		this.content.style.cssText = `
			display: flex;
			flex-direction: column;
			gap: 10px;
		`;
		if (this.collapsed) {
			this.content.style.display = 'none';
		}
		this.container.appendChild(this.content);
	}

	updatecollapseicon() {
		if (this.collapseIcon) {
			this.collapseIcon.textContent = this.collapsed ? "\u25B6" : "\u25BC";
		}
	}

	toggle() {
		this.collapsed = !this.collapsed;
		this.content.style.display = this.collapsed ? 'none' : 'flex';
		this.updatecollapseicon();
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

	getelement() {
		return this.container;
	}

	getcontentelement() {
		return this.content;
	}

	// Apply position from {top, right, bottom, left} or {x, y} format
	applyposition(pos) {
		// Clear any existing position properties
		this.container.style.top = "";
		this.container.style.right = "";
		this.container.style.bottom = "";
		this.container.style.left = "";

		if (pos.x !== undefined || pos.y !== undefined) {
			// x, y format - use left/top
			if (pos.x !== undefined) this.container.style.left = pos.x + "px";
			if (pos.y !== undefined) this.container.style.top = pos.y + "px";
		} else {
			// top/right/bottom/left format
			if (pos.top !== undefined) this.container.style.top = pos.top + "px";
			if (pos.right !== undefined) this.container.style.right = pos.right + "px";
			if (pos.bottom !== undefined) this.container.style.bottom = pos.bottom + "px";
			if (pos.left !== undefined) this.container.style.left = pos.left + "px";
		}
	}

	setposition(pos) {
		this.position = pos;
		this.applyposition(pos);
	}

	initdrag() {
		var _this = this;

		this.dragHandle.onmousedown = function(e) {
			e.preventDefault();
			_this.startdrag(e);
		};
	}

	startdrag(e) {
		this.isDragging = true;
		this._didMove = false;
		this._startX = e.clientX;
		this._startY = e.clientY;

		// Get current position in pixels
		var rect = this.container.getBoundingClientRect();
		this.dragOffset.x = e.clientX - rect.left;
		this.dragOffset.y = e.clientY - rect.top;

		// Switch to x/y positioning for dragging
		this.container.style.top = "";
		this.container.style.right = "";
		this.container.style.bottom = "";
		this.container.style.left = rect.left + "px";
		this.container.style.top = rect.top + "px";

		var _this = this;
		this._dragMove = function(e) { _this.drag(e); };
		this._dragEnd = function(e) { _this.enddrag(e); };

		document.addEventListener('mousemove', this._dragMove);
		document.addEventListener('mouseup', this._dragEnd);
	}

	drag(e) {
		if (!this.isDragging) return;

		// Check if we've moved more than a few pixels (to distinguish from click)
		var dx = Math.abs(e.clientX - this._startX);
		var dy = Math.abs(e.clientY - this._startY);
		if (dx > 3 || dy > 3) {
			this._didMove = true;
		}

		var newX = e.clientX - this.dragOffset.x;
		var newY = e.clientY - this.dragOffset.y;

		// Clamp to viewport
		var maxX = window.innerWidth - this.container.offsetWidth;
		var maxY = window.innerHeight - this.container.offsetHeight;
		newX = Math.max(0, Math.min(newX, maxX));
		newY = Math.max(0, Math.min(newY, maxY));

		this.container.style.left = newX + "px";
		this.container.style.top = newY + "px";

		this.position = { x: newX, y: newY };
	}

	enddrag(e) {
		this.isDragging = false;
		this._wasDragging = this._didMove;
		document.removeEventListener('mousemove', this._dragMove);
		document.removeEventListener('mouseup', this._dragEnd);
	}

	// Add a child element or rad.ui component
	add(element) {
		if (element.getelement && typeof element.getelement === "function") {
			this.content.appendChild(element.getelement());
		} else if (element.nodeType) {
			this.content.appendChild(element);
		}
		return this;
	}

	// Clear all content
	clear() {
		this.content.innerHTML = '';
		return this;
	}

	// Attach to parent (usually document.body)
	attachto(parent) {
		if (parent) {
			parent.appendChild(this.container);
		} else {
			document.body.appendChild(this.container);
		}
		return this;
	}

	// Detach from parent
	detach() {
		if (this.container.parentNode) {
			this.container.parentNode.removeChild(this.container);
		}
	}

	// Show/hide
	show() {
		this.container.style.display = "flex";
	}

	hide() {
		this.container.style.display = "none";
	}

	// Set width
	setwidth(width) {
		this.width = width;
		this.container.style.width = width + "px";
	}

	// Set z-index
	setzindex(zIndex) {
		this.zIndex = zIndex;
		this.container.style.zIndex = zIndex;
	}

	// Set draggable state
	setdraggable(draggable) {
		this.draggable = draggable;
		if (this.dragHandle) {
			this.dragHandle.style.cursor = draggable ? "move" : "default";
			if (draggable && !this.dragHandle.onmousedown) {
				this.initdrag();
			} else if (!draggable) {
				this.dragHandle.onmousedown = null;
			}
		}
	}
}

//-----------menuitem (lightweight, does NOT extend rad.ui.base)
rad.ui.menuitem = class {
	constructor(d) {
		this.type = d.type || "action"; // "action", "toggle", "separator"
		this.label = d.label || "";
		this.checked = d.checked || false;
		this.shortcut = d.shortcut || "";
		this.callback = d.callback || null;

		this.container = document.createElement("DIV");

		if (this.type === "separator") {
			var theme = rad.ui.theme;
			if (theme.menubar && theme.menubar.separator && theme.menubar.separator.style) {
				for (var prop in theme.menubar.separator.style) {
					this.container.style[prop] = theme.menubar.separator.style[prop];
				}
			}
			return;
		}

		// Apply menuitem theme style
		var theme = rad.ui.theme;
		if (theme.menubar && theme.menubar.menuitem && theme.menubar.menuitem.style) {
			for (var prop in theme.menubar.menuitem.style) {
				this.container.style[prop] = theme.menubar.menuitem.style[prop];
			}
		}

		// Check indicator
		this.checkSpan = document.createElement("SPAN");
		this.checkSpan.style.cssText = "width:14px;display:inline-block;text-align:center;margin-right:4px;font-size:12px;";
		this.updatecheck();
		this.container.appendChild(this.checkSpan);

		// Label text
		this.labelSpan = document.createElement("SPAN");
		this.labelSpan.style.cssText = "flex:1;";
		this.labelSpan.textContent = this.label;
		this.container.appendChild(this.labelSpan);

		// Shortcut text
		if (this.shortcut) {
			this.shortcutSpan = document.createElement("SPAN");
			this.shortcutSpan.style.cssText = "color:#888;font-size:11px;margin-left:20px;";
			this.shortcutSpan.textContent = this.shortcut;
			this.container.appendChild(this.shortcutSpan);
		}

		// Hover effect
		var _this = this;
		this.container.onmouseenter = function() {
			_this.container.style.background = "#3a3a4e";
		};
		this.container.onmouseleave = function() {
			_this.container.style.background = "transparent";
		};

		// Click handler
		this.container.onclick = function(e) {
			e.stopPropagation();
			if (_this.type === "toggle") {
				_this.checked = !_this.checked;
				_this.updatecheck();
			}
			if (typeof _this.callback === "function") {
				_this.callback(_this);
			}
		};
	}

	updatecheck() {
		if (this.checkSpan) {
			this.checkSpan.textContent = this.checked ? "\u2713" : "";
		}
	}

	getelement() {
		return this.container;
	}

	setchecked(val) {
		this.checked = val;
		this.updatecheck();
	}

	getchecked() {
		return this.checked;
	}

	setlabel(text) {
		this.label = text;
		if (this.labelSpan) this.labelSpan.textContent = text;
	}
}

//-----------menubar (horizontal bar with dropdown menus)
rad.ui.menubar = class extends rad.ui.base {
	constructor(d) {
		super(d || {});
		this.uitype = "menubar";
		this.menus = {};
		this.openMenu = null;

		// Create bar container
		this.container = document.createElement("DIV");
		this.container.id = this.id;
		this.applystylepath(this.container, "menubar.bar");

		// Click-away listener
		var _this = this;
		this._clickAway = function(e) {
			if (!_this.container.contains(e.target)) {
				_this.closeall();
			}
		};
		document.addEventListener('mousedown', this._clickAway);
	}

	addmenu(id, label) {
		var _this = this;

		// Wrapper div (position:relative for dropdown positioning)
		var wrapper = document.createElement("DIV");
		wrapper.style.position = "relative";

		// Button label
		var btn = document.createElement("DIV");
		this.applystylepath(btn, "menubar.menu_button");
		btn.textContent = label;

		// Dropdown container
		var dropdown = document.createElement("DIV");
		this.applystylepath(dropdown, "menubar.dropdown");
		dropdown.style.display = "none";

		wrapper.appendChild(btn);
		wrapper.appendChild(dropdown);
		this.container.appendChild(wrapper);

		var menuData = {
			id: id,
			label: label,
			button: btn,
			dropdown: dropdown,
			wrapper: wrapper,
			items: []
		};
		this.menus[id] = menuData;

		// Click to open/close
		btn.onclick = function(e) {
			e.stopPropagation();
			if (_this.openMenu === id) {
				_this.closeall();
			} else {
				_this.openmenu(id);
			}
		};

		// Hover-to-switch when another menu is open
		btn.onmouseenter = function() {
			btn.style.background = "#333";
			if (_this.openMenu !== null && _this.openMenu !== id) {
				_this.openmenu(id);
			}
		};
		btn.onmouseleave = function() {
			if (_this.openMenu !== id) {
				btn.style.background = "transparent";
			}
		};

		// Return a handle for adding items
		var handle = {
			additem: function(opts) {
				// Wrap callback to auto-close dropdown for action items
				if (opts.type !== "toggle" && opts.type !== "separator") {
					var origCb = opts.callback;
					opts.callback = function(item) {
						_this.closeall();
						if (typeof origCb === "function") origCb(item);
					};
				}
				var item = new rad.ui.menuitem(opts);
				dropdown.appendChild(item.getelement());
				menuData.items.push(item);
				return item;
			},
			addseparator: function() {
				var sep = new rad.ui.menuitem({ type: "separator" });
				dropdown.appendChild(sep.getelement());
				menuData.items.push(sep);
				return sep;
			}
		};
		return handle;
	}

	openmenu(id) {
		// Close current
		this.closeall();

		var menu = this.menus[id];
		if (!menu) return;

		menu.dropdown.style.display = "block";
		menu.button.style.background = "#333";
		this.openMenu = id;
	}

	closeall() {
		for (var id in this.menus) {
			this.menus[id].dropdown.style.display = "none";
			this.menus[id].button.style.background = "transparent";
		}
		this.openMenu = null;
	}

	attachto(parent) {
		(parent || document.body).appendChild(this.container);
	}

	detach() {
		if (this.container.parentNode) {
			this.container.parentNode.removeChild(this.container);
		}
	}

	show() {
		this.container.style.display = "flex";
	}

	hide() {
		this.container.style.display = "none";
	}

	getelement() {
		return this.container;
	}

	destroy() {
		document.removeEventListener('mousedown', this._clickAway);
		this.detach();
	}
}

//-----------textarea
rad.ui.textarea = class extends rad.ui.base {
	constructor(d) {
		super(d);
		this.uitype = "textarea";
		this.rows = (d.rows != undefined) ? d.rows : 4;
		this.placeholder = (d.placeholder != undefined) ? d.placeholder : "";

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

		// Create textarea element
		this.textarea = document.createElement("TEXTAREA");
		this.textarea.id = "ta_" + this.id + "_" + this.label;
		this.textarea.rows = this.rows;
		this.textarea.placeholder = this.placeholder;
		this.textarea.value = this.value;
		this.applystyle(this.textarea, "textarea", d.style_textarea);

		// Callback
		var _this = this;
		if (typeof d.callback === "function") {
			this.textarea.oninput = function(e) { d.callback(_this); };
		}

		this.container.appendChild(this.textarea);
	}

	getelement() {
		return this.container;
	}

	getvalue() {
		return this.textarea.value;
	}

	setvalue(v) {
		this.value = v;
		this.textarea.value = v;
	}

	getguielement() {
		return this.textarea;
	}
}

//-----------colorpicker
rad.ui.colorpicker = class extends rad.ui.base {
	constructor(d) {
		super(d);
		this.uitype = "colorpicker";
		this.showAlpha   = (d.showAlpha != undefined) ? d.showAlpha : false;
		this.showHex     = (d.showHex != undefined) ? d.showHex : true;
		this.showInputs  = (d.showInputs != undefined) ? d.showInputs : true;
		this.canvasHeight = (d.canvasHeight != undefined) ? d.canvasHeight : 120;

		// Internal state
		var init = this._parseValue(d.value);
		this._hsv   = this._rgbToHsv(init.r, init.g, init.b);
		this._alpha = init.a;

		// Container
		this.container = document.createElement("DIV");
		this.container.id = this.id;
		this.applystyle(this.container, "colorpicker", d.style);

		// Saturation/Value 2-D canvas
		this._svCanvas = document.createElement("CANVAS");
		this._svCanvas.width  = 200;
		this._svCanvas.height = this.canvasHeight;
		this._svCanvas.style.display = "block";
		this._svCanvas.style.width   = "100%";
		this._svCanvas.style.height  = this.canvasHeight + "px";
		this.applystylepath(this._svCanvas, "colorpicker.canvas", d.style_canvas);
		this.container.appendChild(this._svCanvas);

		// Hue strip
		this._hueCanvas = document.createElement("CANVAS");
		this._hueCanvas.width  = 360;
		this._hueCanvas.height = 16;
		this._hueCanvas.style.display = "block";
		this._hueCanvas.style.width   = "100%";
		this._hueCanvas.style.height  = "16px";
		this.applystylepath(this._hueCanvas, "colorpicker.huebar", d.style_huebar);
		this.container.appendChild(this._hueCanvas);

		// Alpha strip (optional)
		if (this.showAlpha) {
			this._alphaCanvas = document.createElement("CANVAS");
			this._alphaCanvas.width  = 200;
			this._alphaCanvas.height = 16;
			this._alphaCanvas.style.display = "block";
			this._alphaCanvas.style.width   = "100%";
			this._alphaCanvas.style.height  = "16px";
			this.applystylepath(this._alphaCanvas, "colorpicker.alphabar", d.style_alphabar);
			this.container.appendChild(this._alphaCanvas);
		}

		// Bottom row: swatch + text inputs
		if (this.showHex || this.showInputs) {
			this._inputRow = document.createElement("DIV");
			this._inputRow.style.cssText = "display:flex;align-items:center;gap:4px;margin-top:6px;flex-wrap:wrap;";

			// Color preview swatch
			this._swatch = document.createElement("DIV");
			this.applystylepath(this._swatch, "colorpicker.swatch", d.style_swatch);
			this._inputRow.appendChild(this._swatch);

			if (this.showHex) {
				var hexHash = document.createElement("SPAN");
				hexHash.textContent = "#";
				this.applystylepath(hexHash, "colorpicker.channel_label");
				this._inputRow.appendChild(hexHash);

				this._hexInput = document.createElement("INPUT");
				this._hexInput.type = "text";
				this._hexInput.maxLength = 6;
				this.applystylepath(this._hexInput, "colorpicker.hex_input", d.style_hex);
				this._inputRow.appendChild(this._hexInput);
			}

			if (this.showInputs) {
				var channels = this.showAlpha
					? [["R", 0], ["G", 1], ["B", 2], ["A", 3]]
					: [["R", 0], ["G", 1], ["B", 2]];
				this._channelInputs = [];
				var _this = this;
				channels.forEach(function(ch) {
					var lbl = document.createElement("SPAN");
					lbl.textContent = ch[0];
					_this.applystylepath(lbl, "colorpicker.channel_label");
					_this._inputRow.appendChild(lbl);

					var inp = document.createElement("INPUT");
					inp.type = "number";
					inp.min  = "0";
					inp.max  = "255";
					_this.applystylepath(inp, "colorpicker.channel_input", d.style_channel);
					_this._inputRow.appendChild(inp);
					_this._channelInputs.push({ input: inp, channel: ch[1] });
				});
			}

			this.container.appendChild(this._inputRow);
		}

		// Initial draw
		this._drawHue();
		this._drawSV();
		if (this.showAlpha) this._drawAlpha();
		this._updateDisplays();

		// Drag events on canvases
		this._setupSVEvents();
		this._setupHueEvents();
		if (this.showAlpha) this._setupAlphaEvents();

		// Hex input change
		var _this = this;
		if (this._hexInput) {
			this._hexInput.onchange = function() {
				var rgb = _this._hexToRgb(_this._hexInput.value);
				if (rgb) {
					_this._hsv = _this._rgbToHsv(rgb.r, rgb.g, rgb.b);
					_this._drawSV();
					_this._updateDisplays(false, -1);
					if (typeof _this.callback === "function") _this.callback(_this);
				}
			};
		}

		// Channel input changes
		if (this._channelInputs) {
			this._channelInputs.forEach(function(item) {
				item.input.onchange = function() {
					var rgb = _this._hsvToRgb(_this._hsv.h, _this._hsv.s, _this._hsv.v);
					var val = Math.round(Math.max(0, Math.min(255, parseFloat(item.input.value) || 0)));
					if (item.channel === 3) {
						_this._alpha = val;
						if (_this.showAlpha) _this._drawAlpha();
					} else {
						var c = [rgb.r, rgb.g, rgb.b];
						c[item.channel] = val;
						_this._hsv = _this._rgbToHsv(c[0], c[1], c[2]);
						_this._drawSV();
					}
					_this._updateDisplays(true, item.channel);
					if (typeof _this.callback === "function") _this.callback(_this);
				};
			});
		}
	}

	// ---- Canvas drawing ----

	_drawSV() {
		var canvas = this._svCanvas;
		var ctx    = canvas.getContext("2d");
		var w = canvas.width, h = canvas.height;

		// Base hue color at full saturation/value
		var hue    = this._hsvToRgb(this._hsv.h, 1, 1);
		var hueStr = "rgb(" + hue.r + "," + hue.g + "," + hue.b + ")";

		// Horizontal gradient: white → hue color
		var gH = ctx.createLinearGradient(0, 0, w, 0);
		gH.addColorStop(0, "#fff");
		gH.addColorStop(1, hueStr);
		ctx.fillStyle = gH;
		ctx.fillRect(0, 0, w, h);

		// Vertical overlay: transparent → black
		var gV = ctx.createLinearGradient(0, 0, 0, h);
		gV.addColorStop(0, "rgba(0,0,0,0)");
		gV.addColorStop(1, "rgba(0,0,0,1)");
		ctx.fillStyle = gV;
		ctx.fillRect(0, 0, w, h);

		// Crosshair indicator
		var ix = this._hsv.s * w;
		var iy = (1 - this._hsv.v) * h;
		ctx.beginPath();
		ctx.arc(ix, iy, 5, 0, Math.PI * 2);
		ctx.strokeStyle = (this._hsv.v > 0.4 && this._hsv.s < 0.8) ? "#000" : "#fff";
		ctx.lineWidth = 1.5;
		ctx.stroke();
	}

	_drawHue() {
		var canvas = this._hueCanvas;
		var ctx    = canvas.getContext("2d");
		var w = canvas.width, h = canvas.height;

		// Full rainbow gradient
		var g = ctx.createLinearGradient(0, 0, w, 0);
		for (var i = 0; i <= 6; i++) {
			var rgb = this._hsvToRgb(i * 60, 1, 1);
			g.addColorStop(i / 6, "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")");
		}
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, w, h);

		// Position marker line
		var x = Math.round((this._hsv.h / 360) * w);
		ctx.strokeStyle = "rgba(255,255,255,0.9)";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, h);
		ctx.stroke();
	}

	_drawAlpha() {
		var canvas = this._alphaCanvas;
		var ctx    = canvas.getContext("2d");
		var w = canvas.width, h = canvas.height;

		// Checkerboard background
		var sz = 6;
		for (var ax = 0; ax < w; ax += sz) {
			for (var ay = 0; ay < h; ay += sz) {
				ctx.fillStyle = ((Math.floor(ax / sz) + Math.floor(ay / sz)) % 2 === 0) ? "#bbb" : "#888";
				ctx.fillRect(ax, ay, Math.min(sz, w - ax), Math.min(sz, h - ay));
			}
		}

		// Gradient overlay: transparent → current color
		var rgb = this._hsvToRgb(this._hsv.h, this._hsv.s, this._hsv.v);
		var ga  = ctx.createLinearGradient(0, 0, w, 0);
		ga.addColorStop(0, "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0)");
		ga.addColorStop(1, "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",1)");
		ctx.fillStyle = ga;
		ctx.fillRect(0, 0, w, h);

		// Position marker line
		var x = Math.round((this._alpha / 255) * w);
		ctx.strokeStyle = "rgba(255,255,255,0.9)";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, h);
		ctx.stroke();
	}

	_updateDisplays(skipHex, skipChannel) {
		var rgb = this._hsvToRgb(this._hsv.h, this._hsv.s, this._hsv.v);

		// Swatch
		if (this._swatch) {
			this._swatch.style.background = this.showAlpha
				? "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + (this._alpha / 255).toFixed(2) + ")"
				: "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
		}

		// Hex field
		if (this._hexInput && !skipHex) {
			this._hexInput.value = this._rgbToHex(rgb.r, rgb.g, rgb.b);
		}

		// Channel inputs
		if (this._channelInputs) {
			var vals = [rgb.r, rgb.g, rgb.b, this._alpha];
			this._channelInputs.forEach(function(item) {
				if (skipChannel !== item.channel) item.input.value = vals[item.channel];
			});
		}
	}

	// ---- Drag event setup ----

	_setupSVEvents() {
		var _this = this;
		this._svCanvas.onmousedown = function(e) {
			_this._onSVMouse(e);
			var move = function(e) { _this._onSVMouse(e); };
			var up   = function()  { rad.removedragevent(move, up); };
			rad.dragevent(move, up);
		};
	}

	_onSVMouse(e) {
		var rect = this._svCanvas.getBoundingClientRect();
		this._hsv.s = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
		this._hsv.v = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height));
		this._drawSV();
		this._updateDisplays();
		if (typeof this.callback === "function") this.callback(this);
	}

	_setupHueEvents() {
		var _this = this;
		this._hueCanvas.onmousedown = function(e) {
			_this._onHueMouse(e);
			var move = function(e) { _this._onHueMouse(e); };
			var up   = function()  { rad.removedragevent(move, up); };
			rad.dragevent(move, up);
		};
	}

	_onHueMouse(e) {
		var rect    = this._hueCanvas.getBoundingClientRect();
		this._hsv.h = Math.max(0, Math.min(360, ((e.clientX - rect.left) / rect.width) * 360));
		this._drawHue();
		this._drawSV();
		if (this.showAlpha) this._drawAlpha();
		this._updateDisplays();
		if (typeof this.callback === "function") this.callback(this);
	}

	_setupAlphaEvents() {
		var _this = this;
		this._alphaCanvas.onmousedown = function(e) {
			_this._onAlphaMouse(e);
			var move = function(e) { _this._onAlphaMouse(e); };
			var up   = function()  { rad.removedragevent(move, up); };
			rad.dragevent(move, up);
		};
	}

	_onAlphaMouse(e) {
		var rect   = this._alphaCanvas.getBoundingClientRect();
		this._alpha = Math.round(Math.max(0, Math.min(255, ((e.clientX - rect.left) / rect.width) * 255)));
		this._drawAlpha();
		this._updateDisplays();
		if (typeof this.callback === "function") this.callback(this);
	}

	// ---- Color conversion helpers ----

	_hsvToRgb(h, s, v) {
		var i = Math.floor(h / 60) % 6;
		var f = h / 60 - Math.floor(h / 60);
		var p = v * (1 - s);
		var q = v * (1 - f * s);
		var t = v * (1 - (1 - f) * s);
		var r, g, b;
		switch (i) {
			case 0: r = v; g = t; b = p; break;
			case 1: r = q; g = v; b = p; break;
			case 2: r = p; g = v; b = t; break;
			case 3: r = p; g = q; b = v; break;
			case 4: r = t; g = p; b = v; break;
			case 5: r = v; g = p; b = q; break;
			default: r = 0; g = 0; b = 0;
		}
		return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
	}

	_rgbToHsv(r, g, b) {
		r /= 255; g /= 255; b /= 255;
		var max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
		var h, s = (max === 0) ? 0 : d / max, v = max;
		if (max === min) {
			h = 0;
		} else if (max === r) {
			h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
		} else if (max === g) {
			h = ((b - r) / d + 2) / 6;
		} else {
			h = ((r - g) / d + 4) / 6;
		}
		return { h: h * 360, s: s, v: v };
	}

	_rgbToHex(r, g, b) {
		return ("0" + r.toString(16)).slice(-2) +
		       ("0" + g.toString(16)).slice(-2) +
		       ("0" + b.toString(16)).slice(-2);
	}

	_hexToRgb(hex) {
		hex = (hex || "").replace(/^#/, "").trim();
		if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
		if (hex.length !== 6) return null;
		var n = parseInt(hex, 16);
		if (isNaN(n)) return null;
		return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
	}

	_parseValue(v) {
		if (v == null) return { r: 255, g: 0, b: 0, a: 255 };
		if (typeof v === "string") {
			var rgb = this._hexToRgb(v);
			return rgb ? { r: rgb.r, g: rgb.g, b: rgb.b, a: 255 } : { r: 255, g: 0, b: 0, a: 255 };
		}
		if (typeof v === "object") {
			return {
				r: (v.r != null) ? v.r : 0,
				g: (v.g != null) ? v.g : 0,
				b: (v.b != null) ? v.b : 0,
				a: (v.a != null) ? v.a : 255
			};
		}
		return { r: 255, g: 0, b: 0, a: 255 };
	}

	// ---- Public interface ----

	getelement() {
		return this.container;
	}

	getvalue() {
		var rgb = this._hsvToRgb(this._hsv.h, this._hsv.s, this._hsv.v);
		return { r: rgb.r, g: rgb.g, b: rgb.b, a: this._alpha };
	}

	setvalue(v) {
		var init = this._parseValue(v);
		this._hsv   = this._rgbToHsv(init.r, init.g, init.b);
		this._alpha = init.a;
		this._drawHue();
		this._drawSV();
		if (this.showAlpha) this._drawAlpha();
		this._updateDisplays();
	}

	getguielement() {
		return this._svCanvas;
	}
}

// Apply theme styles to a DOM element from a theme key path
// element: the DOM element to style
// themeKey: dot-notation path into theme (e.g., "textbox", "shared.container", "slider.bg")
// theme: optional theme object, defaults to rad.ui.theme
rad.ui.applystyletohtml = function(element, themeKey, theme) {
	if (!element) return;
	theme = theme || rad.ui.theme;

	// Navigate the theme object using dot notation
	var parts = themeKey.split(".");
	var styleObj = theme;
	for (var i = 0; i < parts.length; i++) {
		if (styleObj && styleObj[parts[i]]) {
			styleObj = styleObj[parts[i]];
		} else {
			styleObj = null;
			break;
		}
	}

	// Apply the style object to the element
	if (styleObj && styleObj.style) {
		for (var prop in styleObj.style) {
			element.style[prop] = styleObj.style[prop];
		}
	}
};
