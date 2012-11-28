enyo.depends(
	/* Core */
	"source/core/utils.js",
	"source/core/info.js",
	"source/core/data.js",
	"source/core/conf.js",
	"source/core/urls.js",
	"source/core/xhr.js",
	"source/core/storage.js",

	/* Libs  */
	"$lib/onyx",
	"$lib/layout",
	"$lib/ToggleBar",
	"$lib/SelectorBar",
	"$lib/Carousels",

	/* Shared with Tablet */
	"source/kinds/menuItem",
	"source/kinds/Divider",
	"source/kinds/settingsView.js",
	"source/kinds/infoView.js",
	"source/kinds/menuList.js",

	/* App */
	"source/menuView.js",
	"source/filterView.js",
	"source/App.css",
	"source/App.js"
);
