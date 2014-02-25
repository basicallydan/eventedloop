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
	}
}).export(module);