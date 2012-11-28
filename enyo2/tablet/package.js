enyo.depends(
	/* core */
	"source/core/utils.js",
	"source/core/info.js",
	"source/core/data.js",
	"source/core/conf.js",
	"source/core/urls.js",
	"source/core/xhr.js",
	"source/core/storage.js",

	/* libs  */
	"$lib/onyx",
	"$lib/layout",
	"$lib/ToggleBar",
	"$lib/SelectorBar",

	/* Shared with Phone */
	"source/kinds/menuItem",
	"source/kinds/Divider",
	"source/kinds/settingsView.js",
	"source/kinds/infoView.js",
	"source/kinds/menuList.js",

	/* app */
	"source/filterPanel.js",
	"source/menuPanel.js",
	"source/flyout.js",
	"source/main.js",
	"source/app.css",
	"source/App.js"
);
