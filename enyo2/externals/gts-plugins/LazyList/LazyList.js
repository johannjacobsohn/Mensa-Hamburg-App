/*
Copyright © 2012, GlitchTech Science
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @name GTS.LazyList
 * @author Matthew Schott <glitchtechscience@gmail.com>
 *
 * DESCRIPTION
 *
 * @class
 * @version 0.1 (2012/07/12)
 * @extends enyo.PulldownList
 * @see http://enyojs.com
 */
enyo.kind({
	name: "GTS.LazyList",
	kind: "enyo.PulldownList",

	classes: "gts-databaselist",

	published: {
		/** @lends GTS.LazyList# */

		/**
		 * Number of pages of data to preload
		 * @type Number
		 * @default 2
		 */
		lookAhead: 2,

		/**
		 * Maximum count of items in the list. Set to -1 for no limit.
		 * @type Number
		 * @default -1
		 */
		maxCount: -1
	},

	/**
	 * @public
	 * Events sent by control
	 */
	events: {
		/** @lends GTS.LazyList# */
		/**
		 * Aquire new pages of data
		 * @event
		 * @param {Object} inSender	Event's sender
		 * @param {Object} inEvent	Event parameters
		 */
		onAcquirePage: ""
	},

	/**
	 * @private
	 * @function
	 * @name GTS.LazyList#generatePage
	 *
	 * Overrides generatePage to check for & request new data
	 *
	 * @param {integer} inPageNo The event sender
	 * @param {Object} inTarget
	 */
	generatePage: function( inPageNo, inTarget ) {

		this.inherited( arguments );

		this.log( this.getCount(), arguments );

		if( this.maxCount >= 0 && this.getCount() >= this.maxCount ) {
			//Reached limit of list

			this.log( "Limit reached" );
			return;
		}

		var maxPage = Math.floor( this.getCount() / this.getRowsPerPage() );

		if( ( inPageNo + this.lookAhead ) > maxPage ) {

			this.log( "Fetch more" );

			for( var i = 0; i < this.lookAhead; i++ ) {

				//this.doAcquirePage( maxPage + i );
			}
		}
	},

	reload: function() {

		this.reset( 0 );

		for( var i = 0; i < this.lookAhead; i++ ) {

			//this.doAcquirePage( i );
		}
	},

	reset: function( count ) {

		if( count ) {

			this.setCount( count );
		}

		this.inherited( arguments );
	},

	refresh: function( count ) {

		if( count ) {

			this.setCount( count );
		}

		this.inherited( arguments );
	}
});
