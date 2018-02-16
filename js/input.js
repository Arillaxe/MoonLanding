var Key = {
	_pressed: {},

	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39,

	isDown: function(keyCode) {
		return this._pressed[keyCode];
	},

	onKeydown: function(event) {
		this._pressed[event.keyCode] = true;
	},

	onKeyup: function(event) {
		delete this._pressed[event.keyCode];
	}
};

document.onkeydown = function(e){
	Key.onKeydown(e);
}

document.onkeyup = function(e){
	Key.onKeyup(e);	
}