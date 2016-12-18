var House =(function(w) {
		var walls = w;
		var self = {
			getWalls: function() {return walls;},
			setWalls: function(w)  {walls = w;}
		};
		return self;
	})(House.opts.walls);
House.opts = {};
House.setOptions = function(options) {
	House.opts.walls = options.walls;
};

var myOptions = {
	walls: 4
};
House.setOptions(myOptions);
var myHome = House;

console.log(myHome instanceof House);
console.log(myHome.setWalls(3));
console.log(myHome.getWalls());

