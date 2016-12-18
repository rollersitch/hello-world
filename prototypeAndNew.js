var Person = function(firstName) {
	this.firstName = firstName;
};

Person.prototype.sayHello = function() {
	console.log("Hello, I'm " + this.firstName);
};

var person1 = new Person("Alice");
var person2 = new Person("Bob");
var helloFunction = person1.sayHello;

person1.sayHello();
person2.sayHello();
helloFunction();

console.log(helloFunction === person1.sayHello);
console.log(helloFunction === Person.prototype.sayHello);

helloFunction.call(person1);