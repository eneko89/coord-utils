/*!
 * Copyright © 2016 Eneko Sanz <contact@eneko.me>
 * File distributed under the MIT license.
 *
 * Description:
 * Geographic coordinate conversion and validation. 
 */

(function() {

  'use strict';

  var geoUtils = {};

  /**
   * Convert coordinates in decimal degrees to degrees and decimal minutes.
   *
   * @param  {Number}  dec  Decimal degrees.
   *
   * @return {String}       Coordinates in the DDDº MM.MM' format (degrees
   *                        and decimal minutes with two decimals).
   */
  geoUtils.decimalToDegrees = function decimalToDegrees(dec) {
    var deg = Math.trunc(dec);
    var min = (dec - deg) * 60;
    if (min < 0) {
      min = Math.abs(min);
      if (deg === 0) {
        deg = '-' + deg;
      }
    }
    return deg + 'º ' + min.toFixed(2) + '\'';
  }

  /**
   * Convert coordinates in degrees and decimal minutes to decimal degrees.
   *
   * Important: Minutes are always positive, direction is indicated with
   * the sign of degrees, so in this case, '0' and '-0' are not the same,
   * because a longitude of -0º 40.01' is N 0º 40.01' and 0º 40.01' is
   * S 0º 40.01'.
   *
   * @param  {String}  deg  Degrees.
   *
   * @param  {String}  min  Decimal minutes.
   *
   * @return {Number}
   */
  geoUtils.degreesToDecimal = function degreesToDecimal(deg, min) {
    var dec = Math.abs(deg) + min/60.0;
    if (deg.charAt(0) === '-') {
      dec = -dec;
    }
    return dec;
  }

  /**
   * Check if coordinates are valid in DDº MM.MM' format. Degree and minute
   * symbols are optional, so 40º 26.76' and 40 26.76 are both valid.
   *
   * Direction is not supported, use negative degrees for south (S) and west
   * (W) and positives for north (N) and east (E). For example, -0º 43.02'.
   *
   * TODO: Add support for directions.
   *
   * @param  {String}          lat  Latitude in DDD MM.MM format.
   *
   * @param  {String}          lng  Longitude in DDD MM.MM format.
   *
   * @return {Object|Boolean}       False if the coordinates are invalid. If
   *                                they're valid, raw numbers in an object.
   *                                For example, for lat = 40º 26.76' returns:
   *                                { lat: ['40', '26.76'], lng: ... }. Note
   *                                that they are still in DD MM.MM format,
   *                                this method doesn't make any conversion.
   */
  geoUtils.validCoords = function validCoords(lat, lng) {

    // Regular expressions that match coordinates in DDDº MM.MM' format.
    var latRegExp = /^(-?0*[1-8]?\d|-?0*90)(?:°|º)?\s+
                    0*([1-5]?\d|60).(\d\d|\d)0*(?:'|′|´)?$/;

    var lngRegExp = /^(-?0*[1-9]?\d|-?0*1[0-7]\d|-?0*180)(?:°|º)?\s+
                    0*([1-5]?\d|60).(\d\d|\d)0*(?:'|′|´)?$/;

    // If both match, coordinates are valid. Extract numbers and return.
    if (latRegExp.test(lat) && lngRegExp.test(lng)) {

      // See RegExp.exec() in MDN to know what's happening here.
      var latResult = latRegExp.exec(lat);
      var lngResult = lngRegExp.exec(lng);

      return { lat: [ latResult[1], latResult[2] + '.' + latResult[3] ],
               lng: [ lngResult[1], lngResult[2] + '.' + lngResult[3] ] };
    } else {

      // No luck...
      return false;
    }
  }

  // Check if we are in a browser or node.js environment.
  if (typeof module !== 'undefined' && module.exports) {

    // Export as CommonJS module.
    module.exports = geoUtils;
  } else {

    // Export it as 'geoUtils' global variable.
    this.geoUtils = geoUtils;
  }

}).call(this);
