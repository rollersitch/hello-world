'use strict';
'esversion: 6';

function Vehicle(name,engine, wheels, weight) {
	var  name = name;
	var  engine = engine;
	var  wheels = wheels;
	var  weight = weight;

	return {
		getName: () => {return name;},
		getEngine: () => {return engine;},
		getWheels: () => {return wheels;},
		getWeight: () => { return weight;},

		setName: (newName) => {name = newName ;},
		setWheels: (numWheels) => {wheels = (numWheels < 10 ? numWheels : 4);},
		setWeight: (newWeight) => {weight = newWeight;},
		setEngine: (newEngine) => {engine = newEngine;},

		printInfo: () => {console.log(  "Name: " + name, "Engine: " + engine,
										"Wheels: " + wheels, "Weight: " + weight
									  );
		                 },
		start: () => { console.log(name + " " + "I've started")},
		drive: () => { console.log(name + " " +"I'm driving")}
	};
}


function Car(name, engine,weight) {
	// creates a Vehicle Object and then a new Obj that delegates to it
	var newObj = Object.create(Vehicle(name, "diesel", 4, 100));
	/*
	newObj.name = name;
	newObj.engine = engine;
	newObj.wheels = 4;
	*/
	// Redefine the drive functions specializing it for cars
	newObj.drive = function() {console.log(newObj.getName() + " I'm driving AS A CAR!");}
	// adding a new functions only for cars
	newObj.stop = function() {console.log(newObj.getName() + " I'm stopping my " + newObj.getWeight() + " kgs!");}
	
	return newObj;
}

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

function testGettersCar(obj) {
	testGettersVehicle(obj);
	obj.stop();
	console.log("\n");
}

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

changeProps.apply(myVehicle, ["New name","new fuel",300,400]);
testGettersVehicle(myVehicle);

myCar.setWheels(5);
console.log(myCar.getWheels());
