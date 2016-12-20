// Helper
function newID() {
	return Math.floor(Math.random()*10001);
}

var Folder = function (name) {
	this.name = name;
	this.size = 0;
	this.children = [];
	this.type = "FOLDER";
	this.id = newID();
};

Folder.prototype = {
	getChildren: function() {
		return this.children;
	},

	getID: function() {
		return this.id;
	},

	addChild: function(child) {
		this.size++;
		this.children.push(child);
	},

	removeChild: function(childId) {
		var targets = this.children.filter(function (elem) {
												return elem.getID() === childId;
											});
		// Is it possible to have different entities with same ID, given that
		// it is provided by Math.random(), though unlikely.
		// I select the first match only.
		var target = targets[0];
		if(target) {
			//console.log("target " + target.name + " found in " + this.name);
			this.children.splice(this.children[target], 1);
			this.size--;
			return true;
		}
		else {
				for(var i = 0; i < this.size; i++) {
					if(this.children[i].removeChild(childId)) {
						return true;
					}
				}
		}
		return false; // file or folder not found
	},

	getChild: function(childId) {
		return this.children.filter(function(elem) {
										return elem.getID() === childId;
									});
	},

	show: function() {
		console.log(this.type + " name: " + this.name + " id: " + this.id + " size: " + this.size);
	}
};

var File = function(name,size) {
	this.id = newID();
	this.name = name;
	this.size = size;
	this.children = []; //always empty
	this.type = "FILE";
};

File.prototype = {
	addChild: function(child) {},
	removeChild: function(childId) {},
	getChild: function(childId) {},
	getID: function() {return this.id;},
	show: function() {
		console.log(this.type + " name: " + this.name + " id: " + this.id + " size: " + this.size);
	},
	toString: function() {
		return this.name;
	}
};