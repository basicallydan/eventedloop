EventedLoop
============

An event-based loop class which can take arbitrary numbers of intervals/callback pairs. Based on [Node.js EventEmitter](http://nodejs.org/api/events.html).

It's very simple:

```js
var EventedLoop = require('eventedloop');
var loop = new EventedLoop();
loop.every('20ms', function (e) {
  console.log('I did something at', e); // prints 'I did something at 20ms'
});
loop.start();
```

But wait, there's more! You can specify a bunch of different things to happen at different times, and they don't have to be milliseconds! (you can use `ms`, `s`, `m`, or `h`)

```js
var EventedLoop = require('eventedloop');
var loop = new EventedLoop();
loop.every('2s', function (e) {
  console.log('Every 2 seconds I will run');
});
loop.every('1m', function (e) {
  console.log('Every 1 minute I will run');
});
loop.every('50s', function (e) {
  console.log('Every 1 minute I will run');
});
loop.start();
// You can even add new intervals after it starts running
loop.every('2m', function (e) {
	console.log('Every 2 minutes I will run');
});
```

You can do as many as you like, but I highly recommend you take it easy an don't overdo it. In newer versions of Chrome, 50 intervals seems to have no detrimental effects, but of course it depends on what is happening in the callback. An example of a situation with 50 intervals is available in [this demo](https://basicallydan.github.io/eventedloop/xkcd-example/).

## API

* `loop.every(interval, callback)` - Tell the loop to execute the `callback` regularly at whatever time was specified in `interval`, which can either be milliseconds (e.g. `2ms`), seconds (e.g. `5s`), minutes (e.g. `10m`), or hours (`1h`)
* `loop.start()` - Starts the loop.
* `loop.stop()` - Stops the loop. Will not clear out all the intervals, this can be done with the inherited method from `EventEmitter`, `loop.removeAllListeners`.
* `loop.tick()` - This will cause a single iteration at the greatest common factor of time for all the given intervals, i.e., if you have two intervals at `50ms` and `75ms`, a single tick will be `25ms`. This is useful for debugging, and for mimicing slowed-down time.
* `loop.on()` - Does the same thing as `every`. Inherited from `EventEmitter`.

EventedLoop in fact inherits all the methods from [`EventEmitter`](http://nodejs.org/api/events.html).

# Limitations

* You can only set intervals at numbers whose millisecond equivalents are factors of 10ms. E.g. '1s', '20ms', '20', or '5h'.
* When the browser tab is blurred, the loop will stop. This is because of browser behaviour only allowing `setInterval` callbacks every 1000ms when not focused. I will probably make this an option with default behaviour.

# Install

## Node.js or Browserify (CommonJS)

If you are doing this on the front-end I would highly recommend [Browserify](http://browserify.org/) for using this library, and it also works with Node.JS.

```
npm install eventedloop
```

Or if you're feeling dangerous:

```
npm install --save git://github.com/basicallydan/eventedloop#master
```

## Regular ol' JavaScript

Download `eventedloop.min.js` or `eventedloop.js` and stick it your DOM somewhere, and you should find that the `EventedLoop` class is now exposed globally for your pleasure.

# Possible uses

This was created as part of a game that [Jon](https://github.com/jf8073) and I are developing, and it's quite good for games where a lot of things will be happening at different rates and you need a simple API for managing it.

You can also recreate the XKCD Frequency comic, like so: [Show me the demo](http://basicallydan.github.io/evented-loop/xkcd-example/).

It's also a nice, cleaner version of `setInterval` which can be turned on and off at will.

# Tests

If you've cloned this repo you can first `npm install` it, and then run `npm test` to run some beautiful [vows](http://vowsjs.org/) tests.

# Build

Build using [Browserify](http://browserify.org/):

```
browserify lib/main.js -o eventedloop.js
```

# Contributions

Please, please, please feel free to [open an issue](https://github.com/basicallydan/eventedloop/issues) or fork this sucker and give it a pull request. It's a pretty cool little library but it could definitely do with some love, it was knocked together in a couple of hours during a heated evening in the mountains.
