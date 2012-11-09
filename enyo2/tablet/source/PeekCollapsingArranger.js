/**
	_enyo.CollapsingArranger_ is an <a href="#enyo.Arranger">enyo.Arranger</a>
	that displays the active control, along with some number of inactive
	controls to fill the available space. The active control is positioned on
	the left side of the container and the rest of the views are laid out to the
	right. The last control, if visible, will expand to fill whatever space is
	not taken up by the previous controls.

	For best results with CollapsingArranger, you should set a minimum width
	for each control via a CSS style, e.g., _min-width: 25%_ or
	_min-width: 250px_.

	Transitions between arrangements are handled by sliding the new control	in
	from the right and collapsing the old control to the left.

	For more information, see the documentation on
	[Arrangers](https://github.com/enyojs/enyo/wiki/Arrangers) in the Enyo
	Developer Guide.
*/
enyo.kind({
	name: "enyo.PeekCollapsingArranger",
	kind: "CollapsingArranger",
	//* @protected
	peekWidth: 20,
	arrange: function(inC, inIndex) {
		var c$ = this.container.getPanels();
		for (var i=0, e=this.containerPadding.left, m, c, n=0; (c=c$[i]); i++) {
			if(c.getShowing()){
				this.arrangeControl(c, {left: e + n * this.peekWidth});
				if (i >= inIndex) {
					e += c.width + c.marginWidth - this.peekWidth;
				}
				// FIXME: overdragging-ish
				if (i == c$.length - 1 && inIndex < 0) {
					this.arrangeControl(c, {left: e - inIndex});
				}
				n++;
			}
		}
	}
});
