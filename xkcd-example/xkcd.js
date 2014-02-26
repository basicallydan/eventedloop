var loop = new EventedLoop();

var events = [
	{
		"name":"heartbeat",
		"loop_seconds":0.86
	},
	{
		"name":"one birth",
		"loop_seconds":0.24
	},
	{
		"name":"one death",
		"loop_seconds":0.56
	},
	{
		"name":"someone edits wikipedia",
		"loop_seconds":0.67
	},
	{
		"name":"someone buys a vibrator",
		"loop_seconds":2.99
	},
	{
		"name":"China builds a car",
		"loop_seconds":1.89
	},
	{
		"name":"Japan builds a car",
		"loop_seconds":4.01
	},
	{
		"name":"Germany builds a car",
		"loop_seconds":5.80
	},
	{
		"name":"The US builds a car",
		"loop_seconds":6.95
	},
	{
		"name":"Someone else builds a car",
		"loop_seconds":1.03
	},
	{
		"name":"a european union resident has their first kiss",
		"loop_seconds":5.53
	},
	{
		"name":"the US Fire Department puts out a fire",
		"loop_seconds":23.00
	},
	{
		"name":"Some hits a hole-in-one",
		"loop_seconds":180.00
	},
	{
		"name":"My turn signal blinks",
		"loop_seconds":0.94
	},
	{
		"name":"The turn signal of the car in front of me blinks",
		"loop_seconds":0.90
	},
	{
		"name":"earthquake (magnitude 1)",
		"loop_seconds":2.43
	},
	{
		"name":"earthquake (magnitude 2)",
		"loop_seconds":24.26
	},
	{
		"name":"earthquake (magnitude 3)",
		"loop_seconds":242.60
	},
	{
		"name":"earthquake (magnitude 4)",
		"loop_seconds":2426.00
	},
	{
		"name":"a member of the uk parliament flushes a toilet",
		"loop_seconds":10.06
	},
	{
		"name":"An airline flight takes off",
		"loop_seconds":0.93
	},
	{
		"name":"Someone buys <em>To Kill a Mockingbird</em>",
		"loop_seconds":42.05
	},
	{
		"name":"Someone's pet cat kills a mockingbird",
		"loop_seconds":1.82
	},
	{
		"name":"Someone in Phoenix buys new shoes",
		"loop_seconds":1.08
	},
	{
		"name":"Someone in Phoenix puts on a condom",
		"loop_seconds":2.05
	},
	{
		"name":"Someone locks their keys in their car",
		"loop_seconds":2.43
	},
	{
		"name":"A sagittarius named Amelia drinks a soda",
		"loop_seconds":7.79
	},
	{
		"name":"A dog bites someone in the US",
		"loop_seconds":7.01
	},
	{
		"name":"Someone steals a bicycle",
		"loop_seconds":24.93
	},
	{
		"name":"A bald eagle catches a fish",
		"loop_seconds":2.69
	},
	{
		"name":"50,000 Plastic Bottles are Produced",
		"loop_seconds":1.27
	},
	{
		"name":"50,000 Plastic Bottles are Recycled",
		"loop_seconds":4.64
	},
	{
		"name":"A bright meteor is visible somewhere",
		"loop_seconds":1.15
	},
	{
		"name":"Old Faithful Erupts",
		"loop_seconds":5640.00
	},
	{
		"name":"A fishing boat catches a shark",
		"loop_seconds":0.83
	},
	{
		"name":"Some in the US is diagnosed with cancer",
		"loop_seconds":18.99
	},
	{
		"name":"Someone in the US dies from cancer",
		"loop_seconds":54.34
	},
	{
		"name":"Someone adopts a dog from a shelter",
		"loop_seconds":15.60
	},
	{
		"name":"Someone adopts a cat from a shelter",
		"loop_seconds":21.30
	},
	{
		"name":"Someone gets married",
		"loop_seconds":0.75
	},
	{
		"name":"Someone registers a domain",
		"loop_seconds":0.64
	},
	{
		"name":"Someone in the US buys a house",
		"loop_seconds":6.22
	},
	{
		"name":"Someone in the US gets a tattoo",
		"loop_seconds":2.06
	},
	{
		"name":"The star <em>PSR J1748-2446AD</em> Rotates 1,000 times",
		"loop_seconds":1.40
	},
	{
		"name":"Someone lies about their age to sign up for Facebook",
		"loop_seconds":4.32
	},
	{
		"name":"Someone breaks and iPhone screen",
		"loop_seconds":0.93
	},
	{
		"name":"A little league player strikes out",
		"loop_seconds":1.23
	},
	{
		"name":"Someone has sex in North Dakota",
		"loop_seconds":1.38
	},
	{
		"name":"Justin Bieber gains a follower on Twitter",
		"loop_seconds":4.73
	},
	{
		"name":"Someone in Denver orders a pizza",
		"loop_seconds":1.27
	}
];
$('document').ready(function () {
	var eventsDiv = $('.events');

	function addEvent(name, frequency) {
		var newDiv = $('<div class="event"><div class="text">' + name + '</div></div>').appendTo(eventsDiv);
		try {
			loop.every(frequency, function (event, milliseconds) {
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
		} catch (error) {
			alert(error.message);
		}
	});
});