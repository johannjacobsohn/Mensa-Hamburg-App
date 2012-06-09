StorageTest = TestCase("StorageTest");

StorageTest.prototype.testAvailableDates = function(){
	expectAsserts(2);
	assertEquals("storage.getAvailableDates()", storage.getAvailableDates().length, 5);
	assertEquals("storage.getAvailableDates(true)", storage.getAvailableDates(true).length, 10);
}

StorageTest.prototype.testPersistentFilters = function(){
	expectAsserts(2);

	assertEquals( "getPersistentFilters gibt true zurueck", true, storage.getPersistentFilters() );
	storage.setPersistentFilters(false);
	assertEquals( "getPersistentFilters kann geändert werden", false, storage.getPersistentFilters());
	localStorage.clear();
}

StorageTest.prototype.testCase3 = function(){
//	  jstestdriver.console.log("JsTestDriver", storage.getPersistentFilters() );

//	assertSame( "getPersistentFilters bleibt bestehen", false, storage.getPersistentFilters());
//	localStorage.clear();
}
