// @flow

import L from "leaflet";

import {
  getEclipticObliquity,
  getEclipticPosition,
  getEquatorialPosition,
  getGMST,
  getHourAngle,
  getJulianDay,
  getTerminatorLatitude,
  toDegrees,
  toRadians
} from "./utils";

const Terminator = L.Polygon.extend({
  options: {
    color: "#000",
    fillColor: "#000",
    fillOpacity: 0.5,
    opacity: 0.5,
    resolution: 2
  },

  initialize: function(options) {
    this.version = "0.1.0";
    L.Util.setOptions(this, options);
    const COORDS = this.compute(this.options.time);
    this.setLatLngs(COORDS);
  },

  setTime: function(date) {
    this.options.time = date;
    const COORDS = this.compute(date);
    this.setLatLngs(COORDS);
  },

  compute: function(time) {
    // local constants
    const RESOLUTION = this.options.resolution;
    const TODAY = time ? new Date(time) : new Date();

    // getting constants from utility functions
    const JULIAN_DAY = getJulianDay(TODAY);
    const ECLIPTIC_POSITION = getEclipticPosition(JULIAN_DAY);
    const ECLIPTIC_OBLIQUITY = getEclipticObliquity(JULIAN_DAY);
    const EQUATORIAL_POSITION = getEquatorialPosition(
      ECLIPTIC_POSITION.lambda,
      ECLIPTIC_OBLIQUITY
    );
    const GMST = getGMST(JULIAN_DAY);

    // creating array of coordinates
    let COORDS = [];
    for (let i = 0; i <= 720 * RESOLUTION; i++) {
      const LONGITUDE = -360 + i / RESOLUTION;
      const HOUR_ANGLE = getHourAngle(LONGITUDE, EQUATORIAL_POSITION, GMST);
      COORDS[i + 1] = [
        getTerminatorLatitude(HOUR_ANGLE, EQUATORIAL_POSITION),
        LONGITUDE
      ];
    }
    if (EQUATORIAL_POSITION.delta < 0) {
      COORDS[0] = [90, -360];
      COORDS[COORDS.length] = [90, 360];
    } else {
      COORDS[0] = [-90, -360];
      COORDS[COORDS.length] = [-90, 360];
    }
    return COORDS;
  }
});

/**
 * @function terminator
 * @param {Object} OPTIONS
 * @returns {Function} Terminator
 */

const terminator = (OPTIONS: Object) => {
  const TERMINATOR = new Terminator(OPTIONS);
  return TERMINATOR;
};

export default terminator;
