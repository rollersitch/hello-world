var MYAPP = MYAPP || {};


// creating a sub namespace
MYAPP.event = {
	addListener: function(el, type, fn) {
		$(el).on(type, fn);
	},
	removeListener: function(el,type) {
		$(el).off(type);
	},
	getEvents: function(el) {
		return $._data($(el)[0]).events;
	}
};

MYAPP.commonMethod = {
	regExForName: "",
	regExForPhone: "",
	validateName: function(name) {
		if(name.match(regExForName)) {
			return true;
		}
		return false;
	},
	validatePhoneNo: function(phoneNo) {
		if(phoneNo.match(regExForPhone)) {
			return true;
		}
		return false;
	}
};

MYAPP.event.addListener("#my-div", "click", function() {
	document.body.textContent = "Clicked!";
});