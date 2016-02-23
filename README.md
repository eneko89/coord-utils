coord-utils
===========

Some simple geographic coordinate conversion and validation functions.

Usage
-----

Works both required as CommonsJS module in node or in the browser.


```javascript

var coordUtils = require('coord-utils');

var degMinLat = ,
	degMinLng = ;

// Retuns false if not valid DDDº MM.MM' coordinates and an the following
// object if they are valid: { lat: ['DDD', 'MM.MM'], lng: ['DDD', 'MM.MM']}.
var result = coordUtils.validCoords(degMinLat, degMinLng);

// We convert them to decimal degrees.
var decimalLat = coordUtils.degreesToDecimal(result.lat[0], result.lat[1]),
    decimalLng = coordUtils.degreesToDecimal(result.lng[0], result.lng[1]);

// And now, back to degrees and decimal minutes.
degMinLat = coordUtils.decimalToDegrees(decimalLat),
degMinLng = coordUtils.decimalToDegrees(decimalLng);

```

To use it in the browser, download index.js from a <script> tag or include it
in your bundle. It will declare a 'coordUtils' global variable with the utility
functions.

For further info about those functions, see index.js. Its only about 100 lines
long and half of them are JSDoc comments.
