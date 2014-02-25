var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');
var intervalParser = /([0-9\.]+)(ms|s|m|h)?/;

// Lil bit of useful polyfill...
if (typeof(Function.prototype.inherits) === 'undefined') {
	Function.prototype.inherits = function(parent) {
		this.prototype = Object.create(parent.prototype);
	};
}

function greatestCommonFactor(intervals) {
	var sumOfModuli = 1;
	var interval = _.min(intervals);
	while (sumOfModuli !== 0) {
		sumOfModuli = _.reduce(intervals, function(memo, i){ return memo + (i % interval); }, 0);
		if (sumOfModuli !== 0) {
			interval -= 10;
		}
	}
	return interval;
}

function EventedLoop() {
	this.intervalId = undefined;
	this.intervalLength = undefined;
	this.intervalsToEmit = {};
	this.currentTick = 1;
	this.maxTicks = 0;
	this.listeningForFocus = false;
	this.on('newListener', function (e) {
		var intervalGroups = intervalParser.exec(e);
		var intervalAmount = +intervalGroups[1];
		var intervalType = intervalGroups[2] || 'ms';
		if (intervalType === 's') {
			intervalAmount = intervalAmount * 1000;
		} else if (intervalType === 'm') {
			intervalAmount = intervalAmount * 1000 * 60;
		} else if (intervalType === 'h') {
			intervalAmount = intervalAmount * 1000 * 60 * 60;
		} else if (!!intervalType && intervalType !== 'ms') {
			console.warn('You can only specify intervals of ms, s, m, or h');
			return false;
		}
		if (intervalAmount < 10 || intervalAmount % 10 !== 0) {
			// We only deal in 10's of milliseconds for simplicity
			console.warn('You can only specify 10s of milliseconds, trust me on this one');
			return false;
		}

		this.intervalsToEmit[+intervalAmount] = _.union(this.intervalsToEmit[+intervalAmount] || [], [e]);

		this.intervalLength = greatestCommonFactor(_.keys(this.intervalsToEmit));

		this.maxTicks = _.max(_.map(_.keys(this.intervalsToEmit), function(a) { return +a; })) / this.intervalLength;

		// We assume that they mean ms if they don't specify
		// console.log('Now emitting event every', intervalAmount, 'milliseconds and the interval length is', this.intervalLength);
	});
}

EventedLoop.inherits(EventEmitter);

EventedLoop.prototype.tick = function () {
	var milliseconds = this.currentTick * this.intervalLength;
	_.each(this.intervalsToEmit, function (events, key) {
		if (milliseconds % key === 0) {
			_.each(events, function(e) { this.emit(e, e); }.bind(this));
		}
	}.bind(this));
	this.currentTick += 1;
	if (this.currentTick > this.maxTicks) {
		this.currentTick = 1;
	}
};

EventedLoop.prototype.start = function () {
	if (!this.intervalLength) {
		return console.warn('You haven\'t specified any interval callbacks. Use EventedLoop.on(\'500ms\', function () { ... }) to do so, and then you can start');
	}
	if (this.intervalId) {
		return console.log('No need to start the loop again, it\'s already started.')
	}

	this.intervalId = setInterval(this.tick.bind(this), this.intervalLength);

	if (window && !this.listeningForFocus) {
		window.addEventListener('focus', function() {
			this.start();
		}.bind(this));

		window.addEventListener('blur', function() {
			this.stop();
		}.bind(this));

		this.listeningForFocus = true;
	}
};

EventedLoop.prototype.stop = function () {
	clearInterval(this.intervalId);
	this.intervalId = undefined;
};

module.exports = EventedLoop;