// A seat object that will be part of Car object
var Seat = {
	// The pattern I use is always the same
	// A "init" function, that sets properties and methods on the object.
	// Then it returns the object itself, to allow for chaining.
	init: function(color) {
		this.color = color;
		this.shift = function(dir) { console.log("Seat " + this.color + " shifting " + dir);};
		return this;
	},

	// Then a "create" function, which create a new object that delegates to
	// "Seat", and inits it to the values passed.
	create: function(color) {
		return Object.create(Seat).init(color);
	}
};

var Car = {
	init: function(model) {
		this.model = model;
		this.method = function() {
			console.log("method called by " + this.model);
		};
		return this;
	},
	create: function(model) {
		return Object.create(Car).init(model);
	},

	// Here I add some public methods
	show: function() {
		console.log("I am a " + this.model);
	},
	// This one creates an array-property seats,
	// composing it with Seat object
	putSeats: function(color1,color2) {
		this.seats = [];
		this.seats.push(Seat.create(color1));
		this.seats.push(Seat.create(color2));
	},
	getSeats: function() {
		return this.seats || [];
	}
};




var myCar = Car.create('VW Polo');
console.log(myCar.model);
myCar.show();
myCar.method();
myCar.putSeats("red", "black");
console.log(myCar.getSeats());
myCar.getSeats()[1].shift("left");


// Here subclassing
// 
// I put in the "subobject" a specialized different-named
// init function, which does ONLY the work specific to it.
// In this case , I added a "engine" property only for SportCars.
// NOTE: I don't like to write all those "SportCar." manually;
// Whether the props to be added would be more than a bunch,
// I think I could create a sort of "SportCar.methods" object 
// and then use some "extend(SportCar,SportCar.methods)" functionality.
var SportCar = Object.create(Car);
SportCar.initSport = function(engine) {this.engine = engine; return this;};
SportCar.setEngine = function(engine) {this.engine = engine;};
// The SportCar "create" function calls the Car's "init" firstly,
// and the specialized SportCar's "initSport" later.
// This builds the object as I want.
// NOTE: the chain could be ugly if I have a very deep level of
// "subclassing", but I think is worth. IMHO the code stays quite clean
// even with dozens of chained initFunctions.
SportCar.create = function(model,engine) {
	return Object.create(SportCar).init(model).initSport(engine);
};

var mySport = SportCar.create("Lambo Murcielago","hybrid");



mySport.show();
console.log(mySport.engine);
mySport.setEngine("diesel");
console.log(mySport.engine);
mySport.method();

console.log(mySport.getSeats());
mySport.putSeats("yellow","green");
console.log(mySport.getSeats());
mySport.putSeats("black", "black");
console.log(mySport.getSeats());

mySport.getSeats()[0].shift("right");

