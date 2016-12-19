var Car = {
	name: "Ford Escort",

	drive: function() {
		console.log("I'm driving " + " I'm " + this.name);
	},

	panic: function() {
		console.log("Hell.. How do I stop this thing??");
	}
};

var myCar = Object.create(Car, {
	"id": {
		value: 3,
		writable: false,
		configurable: false,
		enumerable: true
	},
	"name": {
		value: "Polo",
		writable:false,
		configurable:false,
		enumerable:true
	}
});

myCar.drive();
myCar.panic();
myCar.name = "reed"
myCar.drive();

if(myCar.hasOwnProperty("id")) console.log("There's");
console.log(myCar)