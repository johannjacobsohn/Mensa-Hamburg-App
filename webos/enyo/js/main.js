enyo.kind({
	name: "main",
	kind: enyo.VFlexBox,
	components: [
		{name: "slidingPane", kind: "SlidingPane", flex: 1, components: [
			{name: "left", width: "200px", kind:"SlidingView", components: [
					{kind: "Header", content:"Tage"},
					{kind: "Scroller", flex: 1, components: [
						{
							name: "dateList",
							flex: 1,
							peekWidth: 100,
							kind: "dateList"
						}
					]},
					{kind: "Toolbar", components: [
						{kind: "GrabButton"}
					]}
			]},
			{name: "middle", width: "200px", kind:"SlidingView", peekWidth: 50, components: [
					{kind: "Header", content:"Mensen"},
					{kind: "Scroller", flex: 1, components: [
						{
							name: "mensaList",
							flex: 1,
							peekWidth: 100,
							kind: "mensaList"
						}
					]},
					{kind: "Toolbar", components: [
						{kind: "GrabButton"}
					]}
			]},
			{name: "middle2", width: "200px", kind:"SlidingView", peekWidth: 100, components: [
					{kind: "Header", content:"Gerichte"},
					{kind: "Scroller", flex: 1, components: [
						{
							name: "nameList",
							flex: 1,
							peekWidth: 100,
							kind: "nameList"
						}
					]},
					{kind: "Toolbar", components: [
						{kind: "GrabButton"}
					]}
			]},
			{name: "right", kind:"SlidingView", flex: 1, peekWidth: 150, components: [
					{kind: "Header", content:"Speisekarte"},
					{kind: "Scroller", flex: 1, components: [
						{
							name: "menuList",
							flex: 1,
							peekWidth: 100,
							kind: "menuList"
						}
					]},
					{kind: "Toolbar", components: [
						{kind: "GrabButton"}
					]}
			]}
		]}
	]
});
/*			
				{
					name: "FeedListPane",
//					width: "320px",
					kind: "dateList",
//					onListTap: "showFeed"
				},
/*
				{
					name: "feedItemsPane",
					width: "320px",
	//				peekWidth: 50,
//					kind: "mensaList",
//					onListTap: "openFeedItem",
//					onRefreshTap: "refreshFeedItemsList"
				},
*				
				{
					name: "feedWebViewPane",
					flex: 1,
					peekWidth: 100,
					kind: "menuList"
				},
				{
					name: "feedWebViewPane",
					flex: 1,
					peekWidth: 100,
					kind: "menuList"
				}
			]
		}
	]
*/
