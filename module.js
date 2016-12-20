//'use strict';

var ENVIRONMENT = "truck";

var VehicleConstructorModule = (function(jQ, _ ) {
	var wheels = 0;
	function start() {
		console.log("started");
	}

	if(ENVIRONMENT === "car") {
		return {
			getWheels: function() {return wheels;},
			setWheels: function(w) { wheels = w;},
			drive: function() {start();}
		}
	}
	else {
		if(ENVIRONMENT === "truck") {
			return {
				getWheels: function() {return wheels;},
				setWheels: function(w) { wheels = w;},
				drive: function() {start();},
				breaks: function() {console.log("i'm breaking");}
			};
		}
	}
	
	throw new Error("wat the heck is this environment???");
	
})(jQuery, _ ); // A simple way to import libraries and frameworks inside my namespace,
				// using "jQ" and "_" as aliases



//ENVIRONMENT = "truck";



var currentVehicle = VehicleConstructorModule;
//console.log(currentVehicle.getWheels());
//currentVehicle.setWheels(50);
//console.log(currentVehicle.getWheels());
console.log(currentVehicle.drive());
console.log(currentVehicle.breaks());