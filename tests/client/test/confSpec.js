
describe( "conf", function(){
	it( "allows setting of urls and reading them" , function (){
		var urls = ["Geomatikum", "Campus"]; 
		data.clear();
		expect( conf.isConfigured() ).to.be( false );
		conf.setURLs( urls );
		expect( conf.isConfigured() ).to.be( true );
		expect( urls ).to.eql( conf.getSavedURLs() );

		var getUrls = conf.getURLs();
		expect( getUrls ).to.be.an( "array" );
		expect( getUrls.length ).to.be.greaterThan( 0 );
		expect( typeof getUrls[0] ).to.be( "string" )
	});
	
	it( "displays student prices by default", function(){
		expect( conf.displayStudentPrices() ).to.be(true);
	});

	it( "allows student prices to be changed", function(){
		expect( conf.displayStudentPrices() ).to.be(true);
		conf.setStudentPrices( false );
		expect( conf.displayStudentPrices() ).to.be( false );
	});
	
	it( "exposes information about mensen", function(){
		var m = conf.getMensaInfo();
		expect( m.length ).to.be.greaterThan( 0 );

		for( var i = 0; i<m.length; i++ ){
			expect( m[i].active ).to.be.a("boolean");
			expect( m[i].name ).to.be.a("string");
		}

		conf.setURLs(["Geomatikum", "Campus", "Studierendenhaus"]);
		var active = conf.getMensaInfo().filter(function(item){ return item.active; });
		expect( active ).to.have.length(3);
	});
});


