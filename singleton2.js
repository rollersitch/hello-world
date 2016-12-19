var SingletonTester = (function() {
	function Singleton(options) {
		options = options || {};

		this.name = "SingletonTester";
		this.pointX = options.pointX || 0;
		this.pointY = options.pointY || 0;
	}

	var instance;

	var _static = {
		name: "SingletonTester",

		getInstance: function(options) {
			if(instance === undefined) {
				instance = new Singleton(options);
			}
			return instance;
		}
	};

	return _static;

})();

var singletonTest = SingletonTester.getInstance({
	name: "newname",
	pointX: 5,
	pointY: 23,
	nonsense: "hello"
});

console.log(singletonTest.pointX, singletonTest.pointY, singletonTest.name);