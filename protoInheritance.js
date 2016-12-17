function Vehicle(name,engine, wheels, weight) {
	// private members, accessible only via closure
	var  name = name;
	var  engine = engine;
	var  wheels = wheels;
	var  weight = weight;

	var privateFun = function (string) {
		console.log("calling public method getName: " + self.getName() + " and getting the message: " + string);
	};

	// returned object
	// Instead of directly returning it, I declare it in a local variable
	// "self", so that I can call "self.getName()" inside of it.
	// Of course is only a test, I could access "name" directly.
	// This is useful when you want to call some public methods from a private
	// method, like "privateFun" does.
	// Anyway privateFun is not callable directly, I need a public interface for it
	// (the callPrivateFun method). To make it more interesting, I've added a parameter.
	var self =  {
		getName: () => {return name;},
		getEngine: () => {return engine;},
		getWheels: () => {return wheels;},
		getWeight: () => { return weight;},

		setName: (newName) => {name = newName ;},
		// Here I wanted to provide a check and default value
		setWheels: (numWheels) => {wheels = (numWheels < 10 ? numWheels : 4);},
		setWeight: (newWeight) => {weight = newWeight;},
		setEngine: (newEngine) => {engine = newEngine;},

		printInfo: () => {console.log(  "Name: " + name, "Engine: " + engine,
										"Wheels: " + wheels, "Weight: " + weight
									  );
		                 },
		// Again, here self.getName is used only for my curiosity, "name" is accessible directly
		start: () => { console.log(self.getName() + " " + "I've started")},
		drive: () => { console.log(self.getName() + " " +"I'm driving")},

		callPrivateFun: (string) => {privateFun(string);},

		// I want to test this: call a private function with a filter
		// that "protects" the private function to be called with invalid input.
		// Of course this check could be done IN the private function directly, it depends
		// on the context I guess.
		callPrivateFunWithFilter: (string) => {
			if(typeof string == 'string') {
				privateFun(string);
			}
		}
	};
	return self;
}


function Car(name,engine,weight) {
	// creates a Vehicle Object and then a new Obj that delegates to it
	
	// 
	// QUESTION: This 'works' but technically I'm creating TWO objects,
	//           A Vehicle one and a new Car one that delegates to it.
	//           The 'size' of the two would be the same for classical inheritance,
	//           but I don't know if this is a right way of thinking.
	//var newObj = Object.create(Vehicle(name, "diesel", 4, 100));
	
	//NEW APPROACH: I simply create a new Vehicle object and then modify it
	//// From the public, "outside", this SHOULD WORK EXACTLY LIKE HAVING
	// A CAR OBJECT THAT INHERITS FROM VEHICLE. A CHILD CLASS, IN THE END.
	var newObj = Vehicle(name, engine, 4, weight);

	// Redefine the drive functions specializing it for cars
	newObj.drive = function() {console.log(newObj.getName() + " I'm driving AS A CAR!");}
	// adding a new function only for cars
	newObj.stop = function() {console.log(newObj.getName() + " I'm stopping my " + newObj.getWeight() + " kgs!");}
	// I need to fix wheel's number for cars, overriding setWheels
	// This is a big concern for me. This kind of thing sounds like a workaround to me.
	// By the way I'm only "specializing" setWheels for cars, and it just happens to be doing nothing,
	// so it could be correct.
	newObj.setWheels = function(numWheels) { return;}
	
	return newObj;
}

// Testing JSDoc, in the meanwhile
/**
 * Ferrari @constructor
 * @param {String} engine - Type of Engine
 * @param {Number} weight  - Weight in kgs
 * @param {String} [yell="AMAZING"]  - Motto
 */
function Ferrari(engine,weight,yell) {
	// A subclass of Car, inheriting on its turn from Vehicle
	var newObj = Car("Ferrari",engine,weight);

	// I can add a private Var only for Ferraris
	var privateVar = yell || "AMAZING";

	// And of course two public properties only for Ferraris
	newObj.publicVar = "TERRIFIC";
	newObj.goWonderful = function () { console.log("I'm " + newObj.getName() + " and I'm sooo " + privateVar);}

	return newObj;

	// Notice Ferrari inherits setWheels from Car, so it does nothing.
	// Anyway Ferrari IS A CAR, so I think this is consistent.
}

// test the Vehicle getters
function testGettersVehicle(obj) {
	console.log(obj.getName());
	console.log(obj.getEngine());
	console.log(obj.getWheels());
	console.log(obj.getWeight());
	obj.printInfo();
	obj.start();
	obj.drive();
	console.log("\n");
}

// test the Car Getters
function testGettersCar(obj) {
	testGettersVehicle(obj);
	obj.stop();
	console.log("\n");
}

// test the Ferrari Getters
function testGettersFerrari(obj) {
	testGettersCar(obj);
	obj.goWonderful();
}

// I only wanted to test "apply()"
// That's the only reason I use 'this' here
function changeProps(name, engine, wheels, weight) {
	this.setName(name);
	this.setWeight(weight);
	this.setWheels(wheels);
	this.setEngine(engine);
}

var myVehicle = Vehicle("Generic", "diesel", 8, 140);
var myCar = Car("Car#1", "diesel", 100);

testGettersVehicle(myVehicle);
testGettersCar(myCar);

// The wheel's number is set to 300 to test the value-check in the factory function
changeProps.apply(myVehicle, ["New name","new fuel",300,400]);
testGettersVehicle(myVehicle);

// PROBLEM: setWheels is available on myCar
//          I could redefine setWheels for Cars and making it doing nothing
//          But it seems ugly and uncorrect.
//          Finally I've done it.
myCar.setWheels(5);
console.log(myCar.getWheels()); // It returns 4 whichever value I passed into setWheels().

console.log("===============================================================");

var myFerrari = Ferrari("diesel", 10000);
testGettersFerrari(myFerrari);
changeProps.apply(myFerrari, [myFerrari.getName(), "eco-fuel", myFerrari.getWheels(), 0.1]);
testGettersFerrari(myFerrari);
console.log("This should be undefined: " + myFerrari.privateVar);

console.log("********************************************************************");

myFerrari.callPrivateFun("HUGE POOP");
myFerrari.callPrivateFunWithFilter(3);  // This should not call privateFun because of the Filter