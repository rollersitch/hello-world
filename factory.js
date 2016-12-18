function Car(options) {
	//default values
	this.doors = options.doors || 4;
	this.state = options.state || "brand new";
	this.color = options.color || "silver";
}

function Truck(options) {
	this.state = options.state || "used";
	this.wheelSize = options.wheelSize || "large";
	this.color = options.color || "blue";
}

// I'm not working in the function, is only a way to append methods to its prototype
function VehicleFactory() {}

// default class
VehicleFactory.prototype.vehicleClass = Car;

// Factory method
VehicleFactory.prototype.createVehicle = function(options) {
	switch(options.vehicleType) {
		case "car":
			this.vehicleClass = Car;
			break;
		case "truck":
			this.vehicleClass = Truck;
			break;
	}

	return new this.vehicleClass(options);
};

// Here I create an instance of Vehicle Factory, creating Cars
var carFactory = new VehicleFactory();
var car = carFactory.createVehicle({
										vehicleType: "car",
										color: "yellow",
										doors: 6 });

console.log(car instanceof Car);
console.log(car);

// APPROACH 1: modify the carFactory to produce trucks. It seems ugly to me
var movingTruck = carFactory.createVehicle({
											vehicleType: "truck",
											state: "like new",
											color: "red",
											wheelSize: "small"});

console.log(movingTruck instanceof Truck);
console.log(movingTruck);

// APPROACH 2: subclassing Vehicle Factory

function TruckFactory() {}
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;

var truckFactory = new TruckFactory();
var myBigTruck = truckFactory.createVehicle({
											state: "omg..so bad",
											color: "pink",
											wheelSize: "so big" });

console.log(myBigTruck instanceof Truck);
console.log(myBigTruck);