DataTest = TestCase("DataTest");

DataTest.prototype.testCase = function(){
	data.set("test", "test")
	assert(data.get("test") === "test");
}
