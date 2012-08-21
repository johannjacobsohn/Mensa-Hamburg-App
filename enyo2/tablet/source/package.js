enyo.depends(
	/* core */
	"utils.js",
	"info.js",
	"data.js",
	"conf.js",
	"storage.js",
	"urls.js",
	"xhr.js",

	/* libs  */
	"../lib/onyx", /* $lib geht nicht?! */
	"$lib/layout",
	"../lib/ToggleBar", /* submodule */

	/* Kinds */
	"kinds/menuItem", /* submodule */
	"kinds/Divider",


	/* app */
	"filterPanel.js",
	"menuPanel.js",
	"flyout.js",
	"app.css",
	"App.js"
);
