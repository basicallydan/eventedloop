EventedLoop
============

An event-based loop class which can take arbitrary numbers of intervals and callbacks.

It's very simple:

```js
var loop = new EventedLoop();
loop.on('20ms', function (e) {
  console.log('I did something at', e); // prints 'I did something at 20ms'
});
```

But wait, there's more! You can specify a bunch of different things to happen at different times, and they don't have to be milliseconds! (you can use `ms`, `s`, `m`, or `h`)

```js
var loop = new EventedLoop();
loop.on('2s', function (e) {
  console.log('Every 2 seconds I will run');
});
loop.on('1m', function (e) {
  console.log('Every 1 minute I will run');
});
```

You can do as many as you like, but I highly recommend you take it easy and **use with caution** because lots of things happening in this loop can really screw up performance.

# Limitations

* You can only set intervals at numbers whose millisecond equivalents are factors of 10. E.g. '1s', '20ms', '20', or '5h'.
* When the browser tab is blurred, the loop will stop. This is because of browser behaviour only allowing `setInterval` callbacks every 1000ms when not focused. I will probably make this an option with default behaviour.

# Install

It's not on NPM yet, I want to test it in the field a bit first and add a few new features, so you'll be installing it directly from GitHub. If you are doing this on the front-end I would highly recommend [Browserify](http://browserify.org/) for using this library.

```
npm install --save git://github.com/basicallydan/evented-loop#master
```

# Tests

If you've cloned this repo you can first `npm install` it, and then run `npm test` to run some beautiful [vows](http://vowsjs.org/) tests.

# Possible uses

This was created as part of a game that [Jon](https://github.com/jf8073) and I are developing, and it's quite good for games where a lot of things will be happening at different rates and you need a simple API for managing it.

You can also recreate the XKCD Frequency comic, like so: [Show me the demo](http://basicallydan.github.io/evented-loop/xkcd-example/).

# Contributions

Please, please, please feel free to [open an issue](https://github.com/basicallydan/evented-loop/issues) or fork this sucker and give it a pull request. It's a pretty cool little library but it could definitely do with some love, it was knocked together in a couple of hours during a heated evening in the mountains.
