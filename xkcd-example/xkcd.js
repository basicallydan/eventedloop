var EventedLoop = require('../main.js');
var loop = new EventedLoop();

var events = [
	{
		"name":"heartbeat",
		"loop_seconds":0.86,
		"per_hour":4186.05,
		"needs_adj":"*",
		"loop_seconds_adj":0.96,
		"per_hour_adj":3750.00
	},
	{
		"name":"one birth",
		"loop_seconds":0.24,
		"per_hour":15000.00,
		"needs_adj":"*",
		"loop_seconds_adj":0.34,
		"per_hour_adj":10588.24
	},
	{
		"name":"one death",
		"loop_seconds":0.56,
		"per_hour":6428.57,
		"needs_adj":"*",
		"loop_seconds_adj":0.66,
		"per_hour_adj":5454.55
	},
	{
		"name":"someone edits wikipedia",
		"loop_seconds":0.67,
		"per_hour":5373.13,
		"needs_adj":"*",
		"loop_seconds_adj":0.77,
		"per_hour_adj":4675.32
	},
	{
		"name":"someone buys a vibrator",
		"loop_seconds":2.99,
		"per_hour":1204.01,
		"needs_adj":"",
		"loop_seconds_adj":2.99,
		"per_hour_adj":1204.01
	},
	{
		"name":"China builds a car",
		"loop_seconds":1.89,
		"per_hour":1904.76,
		"needs_adj":"*",
		"loop_seconds_adj":1.99,
		"per_hour_adj":1809.05
	},
	{
		"name":"Japan builds a car",
		"loop_seconds":4.01,
		"per_hour":897.76,
		"needs_adj":"",
		"loop_seconds_adj":4.01,
		"per_hour_adj":897.76
	},
	{
		"name":"Germany builds a car",
		"loop_seconds":5.80,
		"per_hour":620.69,
		"needs_adj":"",
		"loop_seconds_adj":5.80,
		"per_hour_adj":620.69
	},
	{
		"name":"The US builds a car",
		"loop_seconds":6.95,
		"per_hour":517.99,
		"needs_adj":"",
		"loop_seconds_adj":6.95,
		"per_hour_adj":517.99
	},
	{
		"name":"Someone else builds a car",
		"loop_seconds":1.03,
		"per_hour":3495.15,
		"needs_adj":"*",
		"loop_seconds_adj":1.13,
		"per_hour_adj":3185.84
	},
	{
		"name":"a european union resident has their first kiss",
		"loop_seconds":5.53,
		"per_hour":650.99,
		"needs_adj":"",
		"loop_seconds_adj":5.53,
		"per_hour_adj":650.99
	},
	{
		"name":"the US Fire Department puts out a fire",
		"loop_seconds":23.00,
		"per_hour":156.52,
		"needs_adj":"",
		"loop_seconds_adj":23.00,
		"per_hour_adj":156.52
	},
	{
		"name":"Some hits a hole-in-one",
		"loop_seconds":180.00,
		"per_hour":20.00,
		"needs_adj":"",
		"loop_seconds_adj":180.00,
		"per_hour_adj":20.00
	},
	{
		"name":"My turn signal blinks",
		"loop_seconds":0.94,
		"per_hour":3829.79,
		"needs_adj":"*",
		"loop_seconds_adj":1.04,
		"per_hour_adj":3461.54
	},
	{
		"name":"The turn signal of the car in front of me blinks",
		"loop_seconds":0.90,
		"per_hour":4000.00,
		"needs_adj":"*",
		"loop_seconds_adj":1.00,
		"per_hour_adj":3600.00
	},
	{
		"name":"earthquake (magnitude 1)",
		"loop_seconds":2.43,
		"per_hour":1481.48,
		"needs_adj":"",
		"loop_seconds_adj":2.43,
		"per_hour_adj":1481.48
	},
	{
		"name":"earthquake (magnitude 2)",
		"loop_seconds":24.26,
		"per_hour":148.39,
		"needs_adj":"",
		"loop_seconds_adj":24.26,
		"per_hour_adj":148.39
	},
	{
		"name":"earthquake (magnitude 3)",
		"loop_seconds":242.60,
		"per_hour":14.84,
		"needs_adj":"",
		"loop_seconds_adj":242.60,
		"per_hour_adj":14.84
	},
	{
		"name":"earthquake (magnitude 4)",
		"loop_seconds":2426.00,
		"per_hour":1.48,
		"needs_adj":"",
		"loop_seconds_adj":2426.00,
		"per_hour_adj":1.48
	},
	{
		"name":"a member of the uk parliament flushes a toilet",
		"loop_seconds":10.06,
		"per_hour":357.85,
		"needs_adj":"",
		"loop_seconds_adj":10.06,
		"per_hour_adj":357.85
	},
	{
		"name":"An airline flight takes off",
		"loop_seconds":0.93,
		"per_hour":3870.97,
		"needs_adj":"*",
		"loop_seconds_adj":1.03,
		"per_hour_adj":3495.15
	},
	{
		"name":"Someone buys <em>To Kill a Mockingbird</em>",
		"loop_seconds":42.05,
		"per_hour":85.61,
		"needs_adj":"",
		"loop_seconds_adj":42.05,
		"per_hour_adj":85.61
	},
	{
		"name":"Someone's pet cat kills a mockingbird",
		"loop_seconds":1.82,
		"per_hour":1978.02,
		"needs_adj":"*",
		"loop_seconds_adj":1.92,
		"per_hour_adj":1875.00
	},
	{
		"name":"Someone in Phoenix buys new shoes",
		"loop_seconds":1.08,
		"per_hour":3333.33,
		"needs_adj":"*",
		"loop_seconds_adj":1.18,
		"per_hour_adj":3050.85
	},
	{
		"name":"Someone in Phoenix puts on a condom",
		"loop_seconds":2.05,
		"per_hour":1756.10,
		"needs_adj":"",
		"loop_seconds_adj":2.05,
		"per_hour_adj":1756.10
	},
	{
		"name":"Someone locks their keys in their car",
		"loop_seconds":2.43,
		"per_hour":1481.48,
		"needs_adj":"",
		"loop_seconds_adj":2.43,
		"per_hour_adj":1481.48
	},
	{
		"name":"A sagittarius named Amelia drinks a soda",
		"loop_seconds":7.79,
		"per_hour":462.13,
		"needs_adj":"",
		"loop_seconds_adj":7.79,
		"per_hour_adj":462.13
	},
	{
		"name":"A dog bites someone in the US",
		"loop_seconds":7.01,
		"per_hour":513.55,
		"needs_adj":"",
		"loop_seconds_adj":7.01,
		"per_hour_adj":513.55
	},
	{
		"name":"Someone steals a bicycle",
		"loop_seconds":24.93,
		"per_hour":144.40,
		"needs_adj":"",
		"loop_seconds_adj":24.93,
		"per_hour_adj":144.40
	},
	{
		"name":"A bald eagle catches a fish",
		"loop_seconds":2.69,
		"per_hour":1338.29,
		"needs_adj":"",
		"loop_seconds_adj":2.69,
		"per_hour_adj":1338.29
	},
	{
		"name":"50,000 Plastic Bottles are Produced",
		"loop_seconds":1.27,
		"per_hour":2834.65,
		"needs_adj":"*",
		"loop_seconds_adj":1.37,
		"per_hour_adj":2627.74
	},
	{
		"name":"50,000 Plastic Bottles are Recycled",
		"loop_seconds":4.64,
		"per_hour":775.86,
		"needs_adj":"",
		"loop_seconds_adj":4.64,
		"per_hour_adj":775.86
	},
	{
		"name":"A bright meteor is visible somewhere",
		"loop_seconds":1.15,
		"per_hour":3130.43,
		"needs_adj":"*",
		"loop_seconds_adj":1.25,
		"per_hour_adj":2880.00
	},
	{
		"name":"Old Faithful Erupts",
		"loop_seconds":5640.00,
		"per_hour":0.64,
		"needs_adj":"",
		"loop_seconds_adj":5640.00,
		"per_hour_adj":0.64
	},
	{
		"name":"A fishing boat catches a shark",
		"loop_seconds":0.83,
		"per_hour":4337.35,
		"needs_adj":"*",
		"loop_seconds_adj":0.93,
		"per_hour_adj":3870.97
	},
	{
		"name":"Some in the US is diagnosed with cancer",
		"loop_seconds":18.99,
		"per_hour":189.57,
		"needs_adj":"",
		"loop_seconds_adj":18.99,
		"per_hour_adj":189.57
	},
	{
		"name":"Someone in the US dies from cancer",
		"loop_seconds":54.34,
		"per_hour":66.25,
		"needs_adj":"",
		"loop_seconds_adj":54.34,
		"per_hour_adj":66.25
	},
	{
		"name":"Someone adopts a dog from a shelter",
		"loop_seconds":15.60,
		"per_hour":230.77,
		"needs_adj":"",
		"loop_seconds_adj":15.60,
		"per_hour_adj":230.77
	},
	{
		"name":"Someone adopts a cat from a shelter",
		"loop_seconds":21.30,
		"per_hour":169.01,
		"needs_adj":"",
		"loop_seconds_adj":21.30,
		"per_hour_adj":169.01
	},
	{
		"name":"Someone gets married",
		"loop_seconds":0.75,
		"per_hour":4800.00,
		"needs_adj":"*",
		"loop_seconds_adj":0.85,
		"per_hour_adj":4235.29
	},
	{
		"name":"Someone registers a domain",
		"loop_seconds":0.64,
		"per_hour":5625.00,
		"needs_adj":"*",
		"loop_seconds_adj":0.74,
		"per_hour_adj":4864.86
	},
	{
		"name":"Someone in the US buys a house",
		"loop_seconds":6.22,
		"per_hour":578.78,
		"needs_adj":"",
		"loop_seconds_adj":6.22,
		"per_hour_adj":578.78
	},
	{
		"name":"Someone in the US gets a tattoo",
		"loop_seconds":2.06,
		"per_hour":1747.57,
		"needs_adj":"",
		"loop_seconds_adj":2.06,
		"per_hour_adj":1747.57
	},
	{
		"name":"The star <em>PSR J1748-2446AD</em> Rotates 1,000 times",
		"loop_seconds":1.40,
		"per_hour":2571.43,
		"needs_adj":"*",
		"loop_seconds_adj":1.50,
		"per_hour_adj":2400.00
	},
	{
		"name":"Someone lies about their age to sign up for Facebook",
		"loop_seconds":4.32,
		"per_hour":833.33,
		"needs_adj":"",
		"loop_seconds_adj":4.32,
		"per_hour_adj":833.33
	},
	{
		"name":"Someone breaks and iPhone screen",
		"loop_seconds":0.93,
		"per_hour":3870.97,
		"needs_adj":"*",
		"loop_seconds_adj":1.03,
		"per_hour_adj":3495.15
	},
	{
		"name":"A little league player strikes out",
		"loop_seconds":1.23,
		"per_hour":2926.83,
		"needs_adj":"*",
		"loop_seconds_adj":1.33,
		"per_hour_adj":2706.77
	},
	{
		"name":"Someone has sex in North Dakota",
		"loop_seconds":1.38,
		"per_hour":2608.70,
		"needs_adj":"*",
		"loop_seconds_adj":1.48,
		"per_hour_adj":2432.43
	},
	{
		"name":"Justin Bieber gains a follower on Twitter",
		"loop_seconds":4.73,
		"per_hour":761.10,
		"needs_adj":"",
		"loop_seconds_adj":4.73,
		"per_hour_adj":761.10
	},
	{
		"name":"Someone in Denver orders a pizza",
		"loop_seconds":1.27,
		"per_hour":2834.65,
		"needs_adj":"*",
		"loop_seconds_adj":1.37,
		"per_hour_adj":2627.74
	}
];
$('document').ready(function () {
	var eventsDiv = $('.events');

	function addEvent(name, frequency) {
		var newDiv = $('<div class="event"><div class="text">' + name + '</div></div>').appendTo(eventsDiv);
		try {
			loop.on(frequency, function (event, milliseconds) {
				newDiv.animate({
					color: '#000000'
				}, Math.min(500, milliseconds) * 0.3, function () {
					$(this).animate({
						color: '#dddddd'
					}, Math.min(500, milliseconds) * 0.3);
				});
			});
		} catch (e) {
			newDiv.remove();
			alert(e.message);
		}
	}

	$.each(events, function(i, e) {
		addEvent(e.name, e.loop_seconds + 's');
	});
	loop.start();

	$('.new-event-form').submit(function (e) {
		e.preventDefault();
		var name = $('#event-name').val();
		var frequency = $('#event-frequency').val();

		try {
			addEvent(name, frequency);
		} catch (e) {
			alert(e.message);
		}
	});
});