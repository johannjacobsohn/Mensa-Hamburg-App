describe("storage", function(){
	var server;
	
	beforeEach(function () {
//		localStorage.clear();
//		server = sinon.fakeServer.create();
		server = { respond: function(){} }
//		server.respondWith( mensaHTML );
		conf.setURLs( conf.getURLs() );
	});

	afterEach(function () {
//		localStorage.clear();
//		server.restore();
	});

	it( "has working getWeekMenu-Method" , function(){
		runs(function () {
			storage.getWeekMenu(function(menu){
				this.m = menu;
				console.log(this, this.m)
			}.bind(this));
		});
		waits(2000);
		runs(function () {
			console.log(this, this.m)
			expect( this.m.length ).toBeGreaterThan(0);
		});
//		server.respond();
	});

	it( "lets you include one additive" , function(){
		var m;
		storage.setFilter('additives', [{value: 'Antioxidationsmittel', type: 'include'}])
		storage.filter(function(filteredWeekMenu){
			m = filteredWeekMenu;
		});
		waits(500);
		runs(function () {
			n = m.filter(function(item){
				return item.additives.indexOf( 'Antioxidationsmittel' ) === -1;
			});
			expect( m.length ).toBeGreaterThan(0);
			expect( n.length ).toBe(0);
		});
		server.respond();
	});

	it( "lets you exclude one additive" , function(){
		storage.setFilter('additives', [{value: 'Antioxidationsmittel', type: 'exclude'}]);
		storage.filter(function(filteredWeekMenu){
			var m = filteredWeekMenu.filter(function(item){
				return item.additives.indexOf( 'Antioxidationsmittel' ) !== -1;
			});
			expect( filteredWeekMenu.length ).toBeGreaterThan(0);
			expect( m.length ).toBe(0);
		});
		server.respond();
	});

	it( "lets you include multiple additives" , function(){
		storage.setFilter('additives', [{value: 'Antioxidationsmittel', type: 'include'}, {value: 'Glutenhaltiges', type: 'include'}])
		storage.filter(function(filteredWeekMenu){
			var m = filteredWeekMenu.filter(function(item){
				return item.additives.indexOf( 'Antioxidationsmittel' ) === -1 && item.additives.indexOf( 'Glutenhaltiges' ) === -1;
			});
			expect( filteredWeekMenu.length ).toBeGreaterThan(0);
			expect( m.length ).toBe(0);
		});
		server.respond();
	});

	it( "lets you include some additives exclude others" , function(){
		storage.setFilter('additives', [{value: 'Antioxidationsmittel', type: 'include'}, {value: "Sesam/-erzeugnisse", type: 'exclude'}])
		storage.filter(function(filteredWeekMenu){
			var m = filteredWeekMenu.filter(function(item){
				return item.additives.indexOf( 'Antioxidationsmittel' ) === -1 || item.additives.indexOf( "Sesam/-erzeugnisse" ) !== -1;
			});
			expect( filteredWeekMenu.length ).toBeGreaterThan(0);
			expect( m.length ).toBe(0);
		});
		server.respond();
	});

	it( "lets you exclude multiple additives" , function(){
		storage.setFilter('additives', [{value: "Senf/-erzeugnisse", type: 'exclude'}, {value: "Milch/-erzeugnisse", type: 'exclude'}])
		storage.filter(function(filteredWeekMenu){
			var m = filteredWeekMenu.filter(function(item){
				return item.additives.indexOf( "Senf/-erzeugnisse" ) !== -1 || item.additives.indexOf( "Milch/-erzeugnisse" ) !== -1;
			});

			expect( filteredWeekMenu.length ).toBeGreaterThan(0);
			expect( m.length ).toBe(0);
		})
		server.respond();
	});

	/*
	 * Day based navigation
	 * 
	 */
	var cache = {};
	it( ".today works" , function(){
		// @TODO: test sortedSegmented variant as well
		storage.today(function(menu, dateString, date){
			var thisDate = new Date();
			if( thisDate.getDay() === 6 ){
				thisDate = new Date(thisDate.valueOf() + 60 * 60 * 24 * 1000 * 2);
			} else if ( thisDate.getDay() === 0 ){
				thisDate = new Date(thisDate.valueOf() + 60 * 60 * 24 * 1000);
			}
			
			var today = storage.dateToDateString( thisDate );
			var todayDate = storage.dateStringToDate( today );

			expect( menu.length ).toBeGreaterThan(0);
			expect( today ).toBe( dateString );
			expect( todayDate.valueOf() ).toBe( date.valueOf() );

			expect( menu.filter(function( item ){ return item.date !== today;  } ).length ).toBe(0);
			
			// save Menu for later
			cache.todaysMenu = menu;
		}, false);
		server.respond();
	});

	it( ".nextDay works" , function(){
		var todaysMenu;
		storage.nextDay(function(menu, dateString, date){
			var thisDate = new Date();
			if( thisDate.getDay() === 6 ){
				thisDate = new Date(thisDate.valueOf() + 60 * 60 * 24 * 1000 * 3);
			} else if ( thisDate.getDay() === 0 ){
				thisDate = new Date(thisDate.valueOf() + 60 * 60 * 24 * 1000 * 2);
			} else {
				thisDate = new Date(thisDate.valueOf() + 60 * 60 * 24 * 1000);
			}

			var tomorrow = storage.dateToDateString( thisDate );
			var tomorrowDate = storage.dateStringToDate( tomorrow );

			expect( menu.length).toBeGreaterThan( 0 );
			expect( tomorrow ).toBe( dateString);
			expect( tomorrowDate.valueOf() ).toBe( date.valueOf() );

			expect( menu.filter(function( item ){ return item.date !== tomorrow } ).length ).toBe(0);
		}, false);
		server.respond();
	});

	it( ".prevDay works" , function(){
		storage.prevDay(function(menu, dateString, date){
			expect( menu ).toEqual( cache.todaysMenu );
		}, false);
		server.respond();
	}, false);

	it( ".thisDay works" , function(){
		storage.thisDay(function(menu, dateString, date){
			expect( menu ).toEqual( cache.todaysMenu );
		}, false);
		server.respond();
	}, false);

	it( ".dateToDateString works" , function(){
		expect( storage.dateToDateString( new Date(2012, 0, 1  ) ) ).toBe( "2012-1-1"   ); 
		expect( storage.dateToDateString( new Date(2012, 0, 1, 2, 3, 4) ) ).toBe( "2012-1-1" );
		expect( storage.dateToDateString( new Date(2112, 0, 1  ) ) ).toBe( "2112-1-1"   );
		expect( storage.dateToDateString( new Date(1912, 9, 10 ) ) ).toBe( "1912-10-10" ); 
		expect( storage.dateToDateString( new Date(2012, 11, 31) ) ).toBe( "2012-12-31" ); 
	});

	it( ".getTypeInfo works" , function(){
		storage.getTypeInfo(function(val){
			cache.types = val;
			expect( val.length ).toBeGreaterThan( 0 );
		});
		server.respond();
	});

	it( ".getInfo(type) works" , function(){
		storage.getInfo("type", function(val){
			expect( cache.types ).toBe( val );
		});
		server.respond();
	});

	it( ".getMensaInfo works" , function(){
		storage.getMensaInfo(function(val){
			cache.mensen = val;
			expect( 16 ).toBe( val.length );
			expect( val[0].name ).toBe( "Alexanderstrasse" );
			expect( val[0].url ).toBe( "http://speiseplan.studierendenwerk-hamburg.de/index.php/de/660/2012/{{week}}/" );
		});
		server.respond();
	});

	it( ".getInfo(mensa) works" , function(){
		storage.getInfo("mensa", function(val){
			expect( cache.mensen).toBe( val)
		});
		server.respond();
	});

	it( ".getDateInfo works" , function(){
		storage.getDateInfo(function(val){
			cache.dates = val;
			expect(val.length).toBeGreaterThan(0);
		});
		server.respond();
	});

	it( ".getInfo(date)" , function(){
		storage.getInfo("date", function(val){
			expect(cache.dates).toEqual(val);
		});
		server.respond();
	});

	it( ".getPropertiesInfo works" , function(){
		storage.getPropertiesInfo(function(val){
			cache.properties = val;
			expect( val.length ).toBeGreaterThan(0 );
		});
		server.respond();
	});

	it( ".getInfo(properties) works" , function(){
		storage.getInfo("properties", function(val){
			expect( cache.properties ).toEqual( val )
		});
		server.respond();
	});

	it( ".getAdditivesInfo works" , function(){
		storage.getAdditivesInfo(function(val){
			cache.additives = val;
			expect( val.length).toBeGreaterThan(0 );
		});
		server.respond();
	});

	it( ".getInfo(additives) works" , function(){
		storage.getInfo("additives", function(val){
			expect( cache.additives ).toEqual( val);
		});
		server.respond();
	});


});

/*
	@TODO:
	storage.clearCache
	storage.cleanData
	storage.setMensaFilter
	storage.unsetMensaFilter
	storage.	
	storage.unsetNameFilter
	storage.setDateFilter
	storage.unsetDateFilter
	storage.setPersistentFilters
	storage.getPersistentFilters
	storage.getWeekMenu
	storage.getSortedSegmented
*/
