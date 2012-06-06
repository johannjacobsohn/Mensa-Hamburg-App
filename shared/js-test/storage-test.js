StorageTest = TestCase("StorageTest");

StorageTest.prototype.testCase = function(){
	assert(storage.getAvailableDates().length === 5);
	assert(storage.getAvailableDates(true).length === 10);
}
