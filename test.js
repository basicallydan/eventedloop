var vows = require('vows');
var assert = require('assert');
var EventedLoop = require('./main');

// Create a Test Suite
vows.describe('new EventedLoop').addBatch({
	'when setting only one interval': {
		topic: function () {
			var loop = new EventedLoop();
			loop.on('1000', function () {});
			return loop.intervalLength;
		},

		'we get 1000ms': function (topic) {
			assert.equal(topic, 1000);
		}
	},
	'when setting two intervals with a common denominator': {
		topic: function () {
			var loop = new EventedLoop();
			loop.on('1000', function () {});
			loop.on('600ms', function () {});
			return loop.intervalLength;
		},

		'we get 200ms': function (topic) {
			assert.equal(topic, 200);
		}
	},
	'when setting two intervals with different types': {
		topic: function () {
			var loop = new EventedLoop();
			loop.on('2s', function () {});
			loop.on('1m', function () {});
			return loop.intervalLength;
		},

		'we get 2000ms': function (topic) {
			assert.equal(topic, 2000);
		}
	},
	'when setting an interval with a decimal': {
		topic: function () {
			var loop = new EventedLoop();
			loop.on('0.2s', function () {});
			loop.on('0.1s', function () {});
			return loop.intervalLength;
		},

		'we get 100ms': function (topic) {
			assert.equal(topic, 100);
		}
	},
	'when setting an event using .every()': {
		topic: function () {
			var loop = new EventedLoop();
			loop.every('0.2s', function () {});
			return loop.intervalLength;
		},

		'we get 100ms': function (topic) {
			assert.equal(topic, 200);
		}
	},
	'when going over one tick': {
		topic: function () {
			var loop = new EventedLoop();
			loop.on('100ms', function (e) {
				// console.log('100ms', e)
				this.callback(null, e);
			}.bind(this));
			loop.tick();
		},

		'we get 100': function (topic) {
			assert.equal(topic, '100ms');
		}
	},
	'when going over two ticks': {
		topic: function () {
			var loop = new EventedLoop();
			loop.on('100ms', function (e) {}.bind(this));
			loop.on('400ms', function (e) {}.bind(this));
			loop.on('200ms', function (e) {
				this.callback(null, e);
			}.bind(this));
			loop.tick();
			loop.tick();
		},

		'we get 200': function (topic) {
			assert.equal(topic, '200ms');
		}
	},
	'when going over four ticks': {
		topic: function () {
			var loop = new EventedLoop();
			loop.on('400ms', function (e) {
				this.callback(null, e);
			}.bind(this));
			loop.on('200ms', function (e) {}.bind(this));
			loop.on('100ms', function (e) {}.bind(this));
			loop.tick();
			loop.tick();
			loop.tick();
			loop.tick();
		},

		'we get 400': function (topic) {
			assert.equal(topic, '400ms');
		}
	},
	'when going over two longer ticks': {
		topic: function () {
			var loop = new EventedLoop();
			loop.on('400ms', function (e) {
				this.callback(null, e);
			}.bind(this));
			loop.on('200ms', function (e) {}.bind(this));
			loop.tick();
			loop.tick();
		},

		'we get 400': function (topic) {
			assert.equal(topic, '400ms');
		}
	},
	'when an interval is removed': {
		topic: function () {
			var loop = new EventedLoop();
			var cbToRemove = function (e) {};
			loop.on('400ms', function (e) {});
			loop.on('400ms', function (e) {});
			loop.on('200ms', cbToRemove);
			loop.removeListener('200ms', cbToRemove);
			return loop.intervalLength;
		},

		'the interval': function (topic) {
			assert.equal(topic, 400);
		}
	},
	'when adding an event that doesn\'t make sense': {
		topic: function () {
			var loop = new EventedLoop();
			return loop.on.bind(loop, 'on my birthday', function (e) {
				this.callback(null, e);
			}.bind(this));
		},

		'the on function throws an Error': function (topic) {
			assert.throws(topic, Error);
		}
	},
	'when starting the loop': {
		topic: function () {
			var loop = new EventedLoop();
			loop.on('400ms', function (e) {});
			loop.on('200ms', function (e) {});
			loop.start();
			return loop.isStarted();
		},

		'the loop has started': function (topic) {
			assert.equal(topic, true);
		}
	},
	'when not starting the loop': {
		topic: function () {
			var loop = new EventedLoop();
			loop.on('400ms', function (e) {});
			loop.on('200ms', function (e) {});
			return loop.isStarted();
		},

		'the loop has not started': function (topic) {
			assert.equal(topic, false);
		}
	},
	'when starting the loop with no intervals': {
		topic: function () {
			var loop = new EventedLoop();
			return loop.start;
		},

		'the start function throws an Error': function (topic) {
			assert.throws(topic, Error);
		}
	},
	'when adding a non-matching interval to an existing loop': {
		topic: function () {
			var originalIntervalId;
			var loop = new EventedLoop();
			loop.on('200ms', function (e) {});
			loop.start();
			originalIntervalId = loop.intervalId;
			loop.on('100ms', function (e) {});
			return loop.intervalId == originalIntervalId;
		},

		'the interval IDs are different': function (topic) {
			assert.equal(topic, false);
		}
	},
	'when adding a matching interval to an existing loop': {
		topic: function () {
			var originalIntervalId;
			var loop = new EventedLoop();
			loop.on('200ms', function (e) {});
			loop.start();
			originalIntervalId = loop.intervalId;
			loop.on('400ms', function (e) {});
			return loop.intervalId == originalIntervalId;
		},

		'the interval IDs are the same': function (topic) {
			assert.equal(topic, true);
		}
	}
}).export(module);