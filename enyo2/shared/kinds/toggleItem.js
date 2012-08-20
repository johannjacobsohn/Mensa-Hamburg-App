
/**
 *
 * Kind für toggleItems
 *
 */
enyo.kind({
	name: "toggleItem",
	classes : "item",
	components: [
		{
			kind : "FittableRows",
			ontap : "toggleItemClick",
			components : [
				{name: "toggle", kind: "onyx.Checkbox"},
				{name: "label" , fit: true, style:"display:inline;" }
			]
		}
	],
	setItem: function(value, label) {
		this.$.toggle.setValue( value );
		this.$.label.setContent( label );
	},
	toggleItemClick : function(inSender){
		this.$.toggle.setValue( !this.$.toggle.getValue() );
		var l = this.parent.parent.children.length;
		// @TODO: Event auslösen und bubblen lassen

		// @FIXME: Wahnsinn: 
		try{
			if( this.$.label.getContent( ) === "Alle" ){
				for (var i=1; i<l; i++){
					this.parent.parent.children[i].children[0].children[0].children[0].setValue( true )
				}
			} else if( this.parent.parent.children[0].children[0].children[0].children[1].getContent() === "Alle" ){
				this.parent.parent.children[0].children[0].children[0].children[0].setValue( false )
			}
		} catch(e) {
			console.log("catch")
		}
	}
});

