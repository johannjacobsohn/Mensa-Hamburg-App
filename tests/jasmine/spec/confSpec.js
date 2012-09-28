
describe( "conf", function(){
	beforeEach(function() {});

	afterEach(function() {});
	
	it( "allows setting of urls and reading them" , function (){
		var urls = ["Geomatikum", "Campus"]; 
		data.clear();
		expect( conf.isConfigured() ).toBe( false );
		conf.setURLs( urls );
		expect( conf.isConfigured() ).toBe( true );
		expect( urls ).toEqual( conf.getSavedURLs() );

		var getUrls = conf.getURLs();
//		expect( instanceof getUrls ).toBe( "array" );
		expect( getUrls.length ).toBeGreaterThan( 0 );

		expect( typeof getUrls[0] ).toBe( "string" )
	});
	
	it( "displays student prices by default", function(){
		expect( conf.displayStudentPrices() ).toBe(true);
	});

	it( "allows student prices to be changed", function(){
		expect( conf.displayStudentPrices() ).toBe(true);
		conf.setStudentPrices( false );
		expect( conf.displayStudentPrices() ).toBe( false );
	});
	
	it( "exposes information about mensen", function(){
		var m = conf.getMensaInfo();
		expect( m.length ).toBeGreaterThan( 0 );

		for( var i = 0; i<m.length; i++ ){
			expect( m[i].active ).toBeDefined();
			expect( m[i].name ).toBeDefined();
		}

		conf.setURLs(["Geomatikum", "Campus"]);
		console.log(m)
		var active = m.filter(function(item){ return item.active; });
		expect( active.length ).toBe(2);
	});
});


