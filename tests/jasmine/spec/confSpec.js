
describe( "conf", function(){
	beforeEach(function() {
		localStorage.clear();
	});

	afterEach(function() {
		localStorage.clear();
	});
	
	it( "allows setting of urls and reading them" , function (){
		var urls = ["Geomatikum", "Campus"]; 
		expect( conf.isConfigured() ).toBe( false );
		conf.setURLs( urls );
		expect( conf.isConfigured() ).toBe( true );
		expect( urls ).toEqual( conf.getSavedURLs() );

		expect( conf.getURLs().length ).toBeGreaterThan( 0 )
	});
	
	it( "displays student prices by default", function(){
		expect( conf.displayStudentPrices() ).toBe(true);
	});

	it( "allows student prices to be changed", function(){
		expect( conf.displayStudentPrices() ).toBe(true);
		conf.setStudentPrices( false );
		expect( conf.displayStudentPrices() ).toBe( false );
	});
});


