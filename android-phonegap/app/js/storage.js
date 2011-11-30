/*
 * abstrahiert den Zugriff auf AJAX/lokalen Speicher
 * 
 */
(function(){ // its a trap!
	storage = {
		tickets : {}, // cache
		ticketData : {}, // cache
		/*
		 * callback kann mehrfach aufgerufen werden
		 */
		getTicketData : function(ticketId, callback){
			// get old Ticket Data from localStorage and callback
			if(storage.ticketData[ticketId]){
				console.log("ticket cached");
				callback(storage.ticketData[ticketId]);
			} else if(localStorage[ticketId]){
				console.log("local");
				this.ticketData[ticketId] = parseJSON(localStorage[ticketId])
				callback(this.ticketData[ticketId]);
				// refresh Ticket Data and Callback
				this.refreshTicketInLocalStorage(ticketId, callback);
			} else{
				console.log("remote");
				// refresh Ticket Data and Callback
				this.refreshTicketInLocalStorage(ticketId, callback);
			}			
		},
		getTickets : function(callback){
			if(this.tickets && this.tickets.length > 0){
				console.log("tickets cached");
				console.log(this.tickets.length)
				callback(this.tickets);
			} else if(localStorage["tickets"]){
				console.log("local tickets");
				console.log("tickets: " + localStorage["tickets"]);
				this.tickets = JSON.parse(localStorage["tickets"]);
				console.log(JSON.stringify(this.tickets.issues));
				callback(this.tickets);
				// refresh Ticket Data and Callback
				this.refreshTicketsInLocalStorage(callback);
			} else{
				console.log("remote");
				// refresh Ticket Data and Callback
				this.refreshTicketsInLocalStorage(callback);
			}			
		},
		refreshTicketsInLocalStorage : function(callback){
			var url = urls.tickets("me");
			console.log("refreshing..." + url);
 			$.getJSON(url, function(json){
				console.log(JSON.stringify(json));
				localStorage["tickets"] = JSON.stringify(json);
				this.tickets = json;
				callback(json);
			});
		},
		refreshTicketInLocalStorage : function(id, callback){
			var url = urls.ticket(id);
			
			$.getJSON(url, function(json){
				localStorage["tickets-" + json.id] = JSON.stringify(json);
				console.log(JSON.stringify(json));
				storage.tickets = json;
				callback(storage.tickets);
			});
		}
	}
})();

/*
 * 
 */
(function(){
	urls = {
		tickets : function(userId){
			return conf.getUrl() + "issues.json?key=" + conf.getKey() + (userId ? "&assigned_to_id=" + userId : "");
	//		https://projects.satzmedia.de/issues.json?key=5c8d91b66ce9184922c72a916140610833e8a2b1&assigned_to_id=me
		},
		ticket : function(ticketId){
			return conf.getUrl() + "issues/" + ticketId + ".json?key=" + conf.getKey() + "&include=journals";
		}
	}
})();

/*
 * 
 */
(function(){
	conf = {
		getUrl : function(){
			// @TODO
			return "https://projects.satzmedia.de/";
		},
		setUrl : function(){
			// @TODO
		},
		getKey : function(){
			// @TODO
			return "5c8d91b66ce9184922c72a916140610833e8a2b1";
		},
		setKey : function(){
			// @TODO
		}
	}
})();

/*
 * 
 * 
 */
(function(){
	ui = {
		renderList : function(){
			storage.getTickets(function(json){
				console.log(JSON.stringify(json.issues));
				var html = "";
				for(var i = 0; i<json.issues.length; i++){
					html += "<li><a href='#ticket' data-issueId='" + json.issues[i].id + "'>" + json.issues[i].subject + "</a></li>"
				}
				$("#issuelist").html(html).listview('refresh');
			});
			$("#issuelist").delegate("a", "click", function(){
				ui.renderTicket($(this).attr("data-issueId"));
			});
		},
		renderTicket : function(id){
			storage.getTicketData(id, function(json){
				var issue = json.issue;
				console.log(JSON.stringify(issue))
				console.log(issue.subject);
				$("#ticket .subject").html(issue.subject);
				$("#ticket .ticketnr").html(issue.id);
				$("#ticket .desc").html(convert_textile(issue.description));
				$("#ticket .priority-name").html(issue.priority.name);
				$("#ticket .status-name").html(issue.status.name);
				$("#ticket .author-name").html(issue.author.name);
				$("#ticket .assigned_to").html(issue.assigned_to.name);
				
				if(issue.journals){
					var html = "";
					var journals = issue.journals;
					for (var i=0;i<journals.length;i++){
						html += "<di>" + journals[i].user.name + "</dt>";
						if(journals[i].details){
							html += "<ul>";
							for(var j=0; j<journals[i].details.length; j++){
								html += "<li>" + 
									journals[i].details[j].name + " (" + journals[i].details[j].property + ")" + 
									(journals[i].details[j].old_value ? "<del>" + journals[i].details[j].old_value + "</del>" : "") + 
									"<ins>" + journals[i].details[j].new_value + "</ins>" + 
									"</li>";
							}
							html += "</ul>";
						}
						html += "<dd>" + convert_textile(journals[i].notes) + "</dd>";
					}		

					$("#ticket .journal").html(html);
				}
			});
		}
	}
})();


