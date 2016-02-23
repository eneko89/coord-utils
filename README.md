coord-utils
===========

Some simple geographic coordinate conversion and validation functions.

Usage
-----

Works both required as CommonsJS module in node or in the browser.


```javascript

var coordUtils = require('coord-utils');

var degMinLat = "43º 15.78'",
	degMinLng = "-2º 56.10'";

// Retuns false if not valid DDDº MM.MM' coordinates and the following object
// if they are valid: { lat: ['DDD', 'MM.MM'], lng: ['DDD', 'MM.MM'] }.
var result = coordUtils.validCoords(degMinLat, degMinLng);

// We convert them to decimal degrees.
var decimalLat = coordUtils.degMinToDecimal(result.lat[0], result.lat[1]),
    decimalLng = coordUtils.degMinToDecimal(result.lng[0], result.lng[1]);

// And now, back to degrees and decimal minutes.
degMinLat = coordUtils.decimalToDegMin(decimalLat),
degMinLng = coordUtils.decimalToDegMin(decimalLng);

```

To use it in the browser, download index.js from a script tag or include it in
your bundle. It will declare a 'coordUtils' global with the utility functions.

For further info about those functions, look at index.js. It's only about 100
lines long and half of them are JSDoc comments.
