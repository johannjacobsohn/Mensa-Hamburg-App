describe("storage", function(){
	before(function () {
		localStorage.clear();
		conf.setURLs( conf.getURLs() );
		storage.unsetFilter();
	});

	it( "has working getWeekMenu-Method", function(done){
		storage.getWeekMenu(function(menu){
			expect( menu.length ).to.be.greaterThan(0);
			done();
		});
	});

	it( "lets you include one mensa" , function(done){
		storage.setFilter('mensa', [{value: 'Geomatikum', type: 'include'}])
		storage.filter(function(filteredWeekMenu){
			var n = filteredWeekMenu.filter(function(item){
				return item.mensa !== 'Geomatikum';
			});
			expect( filteredWeekMenu.length ).to.be.greaterThan(0);
			expect( n.length ).to.be(0);
			done();
		});
	});

	it( "lets you include multiple mensen" , function(){
		var m;
		storage.setFilter('mensa', [{value: 'Philosophenturm', type: 'include'}, {value: 'Geomatikum', type: 'include'}])
		storage.filter(function(filteredWeekMenu){
			m = filteredWeekMenu;
			var p = m.filter(function(item){
				return item.mensa === 'Philosophenturm';
			});
			var g = m.filter(function(item){
				return item.mensa === 'Geomatikum';
			});
			var n = m.filter(function(item){
				return item.mensa !== 'Geomatikum' && item.mensa !== 'Philosophenturm';
			});
			expect( m.length ).to.be.greaterThan(0);
			expect( p.length ).to.be.greaterThan(0);
			expect( g.length ).to.be.greaterThan(0);
			expect( n.length ).to.be(0);
		});
	});

	it( "lets you exclude one mensa" , function(){
		storage.setFilter('mensa', [{value: 'Geomatikum', type: 'exclude'}])
		storage.filter(function(filteredWeekMenu){
			var m = filteredWeekMenu;
			var n = m.filter(function(item){
				return item.mensa === 'Geomatikum';
			});
			expect( m.length ).to.be.greaterThan(0);
			expect( n.length ).to.be(0);
		});
	});

	it( "lets you in- and exclude mensen" , function(){
		var m;
		storage.setFilter('mensa', [{value: 'Philosophenturm', type: 'include'}, {value: 'Geomatikum', type: 'exclude'}])
		storage.filter(function(filteredWeekMenu){
			m = filteredWeekMenu;
			var n = m.filter(function(item){
				return item.mensa !== 'Philosophenturm';
			});
			expect( m.length ).to.be.greaterThan(0);
			expect( n.length ).to.be(0);
		});
	});

	it( "lets you exclude multiple mensen" , function(){
		var m;
		storage.setFilter('mensa', [{value: 'Philosophenturm', type: 'exclude'}, {value: 'Geomatikum', type: 'exclude'}])
		storage.filter(function(filteredWeekMenu){
			m = filteredWeekMenu;
			var n = m.filter(function(item){
				return item.mensa === 'Philosophenturm' || item.mensa === 'Geomatikum';
			});
			expect( m.length ).to.be.greaterThan(0);
			expect( n.length ).to.be(0);
		});
	});

	it( "lets you include one additive" , function(done){
		storage.setFilter('additives', [{value: 'Antioxidationsmittel', type: 'include'}])
		storage.filter(function(filteredWeekMenu){
			var m = filteredWeekMenu;
			var n = m.filter(function(item){
				return item.additives.indexOf( 'Antioxidationsmittel' ) === -1;
			});
			expect( m.length ).to.be.greaterThan(0);
			expect( n.length ).to.be(0);
			done();
		});
	});

	it( "lets you exclude one additive" , function(){
		storage.setFilter('additives', [{value: 'Antioxidationsmittel', type: 'exclude'}]);
		storage.filter(function(filteredWeekMenu){
			var m = filteredWeekMenu.filter(function(item){
				return item.additives.indexOf( 'Antioxidationsmittel' ) !== -1;
			});
			expect( filteredWeekMenu.length ).to.be.greaterThan(0);
			expect( m.length ).to.be(0);
		});
	});

	it( "lets you include multiple additives" , function(){
		storage.setFilter('additives', [{value: 'Antioxidationsmittel', type: 'include'}, {value: 'Glutenhaltiges', type: 'include'}])
		storage.filter(function(filteredWeekMenu){
			var m = filteredWeekMenu.filter(function(item){
				return item.additives.indexOf( 'Antioxidationsmittel' ) === -1 && item.additives.indexOf( 'Glutenhaltiges' ) === -1;
			});
			expect( filteredWeekMenu.length ).to.be.greaterThan(0);
			expect( m.length ).to.be(0);
		});
	});

	it( "lets you include some additives exclude others" , function(){
		storage.setFilter('additives', [{value: 'Antioxidationsmittel', type: 'include'}, {value: "Sesam/-erzeugnisse", type: 'exclude'}])
		storage.filter(function(filteredWeekMenu){
			var m = filteredWeekMenu.filter(function(item){
				return item.additives.indexOf( 'Antioxidationsmittel' ) === -1 || item.additives.indexOf( "Sesam/-erzeugnisse" ) !== -1;
			});
			expect( filteredWeekMenu.length ).to.be.greaterThan(0);
			expect( m.length ).to.be(0);
		});
	});

	it( "lets you exclude multiple additives" , function(){
		storage.setFilter('additives', [{value: "Senf/-erzeugnisse", type: 'exclude'}, {value: "Milch/-erzeugnisse", type: 'exclude'}])
		storage.filter(function(filteredWeekMenu){
			var m = filteredWeekMenu.filter(function(item){
				return item.additives.indexOf( "Senf/-erzeugnisse" ) !== -1 || item.additives.indexOf( "Milch/-erzeugnisse" ) !== -1;
			});

			expect( filteredWeekMenu.length ).to.be.greaterThan(0);
			expect( m.length ).to.be(0);
		})
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

			expect( menu.length ).to.be.greaterThan(0);
			expect( today ).to.be( dateString );
			expect( todayDate.valueOf() ).to.be( date.valueOf() );

			expect( menu.filter(function( item ){ return item.date !== today;  } ).length ).to.be(0);
			
			// save Menu for later
			cache.todaysMenu = menu;
		}, false);
	});

	it( ".nextDay works" , function(){
		var todaysMenu;
		storage.today(function(){});
		storage.nextDay(function(menu, dateString, date){
			var thisDate = new Date();
			var nextDate;
			if( thisDate.getDay() === 5 ){ // friday
				// on friday, monday is the next day
				thisDate = new Date(thisDate.valueOf() + 60 * 60 * 24 * 1000 * 2);
			} else if ( thisDate.getDay() === 6 ){ // saturday
				// since "today" on a saturday refers to monday, next day must be tuesday
				thisDate = new Date(thisDate.valueOf() + 60 * 60 * 24 * 1000 * 2);
			} else if( thisDate.getDay() === 0 ) { // sunday
				// see saturday
				thisDate = new Date(thisDate.valueOf() + 60 * 60 * 24 * 1000 * 1);
			}
			nextDate = new Date(thisDate.valueOf() + 60 * 60 * 24 * 1000);

			var tomorrow = storage.dateToDateString( nextDate );
			var tomorrowDate = storage.dateStringToDate( tomorrow );

			expect( menu.length).to.be.greaterThan( 0 );
			expect( tomorrow ).to.be( dateString );
			expect( tomorrowDate.valueOf() ).to.be( date.valueOf() );

			expect( menu.filter(function( item ){ return item.date !== tomorrow } ).length ).to.be(0);
		}, false);
	});

	it( ".prevDay works" , function(){
		storage.prevDay(function(menu, dateString, date){
			expect( menu ).to.eql( cache.todaysMenu );
		}, false);
	}, false);

	it( ".thisDay works" , function(){
		storage.thisDay(function(menu, dateString, date){
			expect( menu ).to.eql( cache.todaysMenu );
		}, false);
	}, false);

	it( ".dateToDateString works" , function(){
		expect( storage.dateToDateString( new Date(2012, 0, 1  ) ) ).to.be( "2012-1-1"   ); 
		expect( storage.dateToDateString( new Date(2012, 0, 1, 2, 3, 4) ) ).to.be( "2012-1-1" );
		expect( storage.dateToDateString( new Date(2112, 0, 1  ) ) ).to.be( "2112-1-1"   );
		expect( storage.dateToDateString( new Date(1912, 9, 10 ) ) ).to.be( "1912-10-10" ); 
		expect( storage.dateToDateString( new Date(2012, 11, 31) ) ).to.be( "2012-12-31" ); 
	});

	it( ".getTypeInfo works" , function(){
		storage.getTypeInfo(function(val){
			cache.types = val;
			expect( val.length ).to.be.greaterThan( 0 );
		});
	});

	it( ".getInfo(type) works" , function(){
		storage.getInfo("type", function(val){
			expect( cache.types ).to.be( val );
		});
	});

	it( ".getMensaInfo works" , function(){
		storage.getMensaInfo(function(val){
			cache.mensen = val;
			expect( 17 ).to.be( val.length );
			expect( val[0].name ).to.be( "Alexanderstrasse" );
			expect( val[0].url.toLowerCase() ).to.be( "http://menu.mensaapp.org/alexanderstrasse/{{week}}" );
		});
	});

	it( ".getInfo(mensa) works" , function(){
		storage.getInfo("mensa", function(val){
			expect( cache.mensen).to.be( val)
		});
	});

	it( ".getDateInfo works" , function(){
		storage.getDateInfo(function(val){
			cache.dates = val;
			expect(val.length).to.be.greaterThan(0);
		});
	});

	it( ".getInfo(date)" , function(){
		storage.getInfo("date", function(val){
			expect(cache.dates).to.eql(val);
		});
	});

	it( ".getPropertiesInfo works" , function(){
		storage.getPropertiesInfo(function(val){
			cache.properties = val;
			expect( val.length ).to.be.greaterThan(0 );
		});
	});

	it( ".getInfo(properties) works" , function(){
		storage.getInfo("properties", function(val){
			expect( cache.properties ).to.eql( val )
		});
	});

	it( ".getAdditivesInfo works" , function(){
		storage.getAdditivesInfo(function(val){
			cache.additives = val;
			expect( val.length).to.be.greaterThan(0 );
		});
	});

	it( ".getInfo(additives) works" , function(){
		storage.getInfo("additives", function(val){
			expect( cache.additives ).to.eql( val);
		});
	});

	it( ".setDateFilter" , function(){
		storage.getDateInfo(function(dates){
			var filters = [{ value: dates[0].name, type: "exclude" }];
			storage.setFilter("date", filters);
			storage.getDateInfo(function(dates){
				expect(dates[0].filter.type ).to.eql( "exclude" );
			});
		});
	});
});

describe("storage.sortedSegmented", function(){
	var server;
	
	beforeEach(function () {
		server = { respond: function(){} }
		storage.unsetFilter();
	});

	it( "is sorted" , function(done){
		storage.getSortedSegmented(function(m){
			var date = "2000-01-01", mensa = "AAAAAAAAAAAAAAAAAAAAAAA", i, l;
			expect( m.length ).to.be.greaterThan(0);
			for(i = 0, l = m.length; i<l; i++){
				if(m[i].type === "header") continue;
				expect(m[i].date).to.be.within(date, "9999-99-99");
				if( m[i].date == date ){
					expect(m[i].mensa).to.be.within(mensa, "ZZZZZZZZZZZZZZZZZZZZZZ");
				}
				date = m[i].date;
				mensa = m[i].mensa;
			}
			done();
		});
	});

/*
	it( "has headers" , function(){
		storage.getSortedSegmented(function(menu){
		// one mensa, one mensa header

		});
	});	
*/
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
