/*
 * URLs
 * alle Nutzer
 * 
 * aktueller Nutzer ("me")
 * users/current.json
 * 
 * Tickets
 * issues.json
 * 
 * 
 * TODO: 
 * - alle Nutzer laden, Anzeigenutzer auswählen
 * - sortieren nach Prio
 * - Kontakte verlinken 
 * - reset
 */


$(document).ready(function(){
	/*
	// http://diveintohtml5.org/storage.html
	function supports_html5_storage() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	}
	*/
	// setup!
	// check support!
//	localStorage.clear();
	
	// kickoff!
	ui.renderList();
});