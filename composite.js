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
													}
									);
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

var folder1 = new Folder("folder1");
var folder2 = new Folder("folder2");
var folder3 = new Folder("folder3");


var file1 = new File("file1",130);
var file2 = new File("file2",50);

folder1.addChild(folder2);
folder1.addChild(file1);
folder1.addChild(file2);

folder2.addChild(new File("file3",125));
folder2.addChild(folder3);

var file4 = new File("file4",220);
folder3.addChild(file4);

console.log(folder1.removeChild(file4.getID())); // should remove file4 recursively from subfolder folder 3

folder1.show();
console.log(folder1.getChildren());
console.log(folder2.getChildren());
console.log(folder3.getChildren());