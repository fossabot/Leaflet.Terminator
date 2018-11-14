// @flow

import { toRadians } from "./index";

/**
 * Compute the position of the Sun in ecliptic coordinates at julianDay.
 * https://en.wikipedia.org/wiki/Position_of_the_Sun#Ecliptic_coordinates
 *
 * @function getEclipticPosition
 * @param {number} JULIAN_DAY
 * @returns {Object} ECLIPTIC_POSITION
 */

const getEclipticPosition = (JULIAN_DAY: number) => {
  const { cos, sin } = Math;

  const n = JULIAN_DAY - 2451545.0; // days since start of J2000.0
  let L = 280.46 + 0.9856474 * n; // mean longitude of the Sun
  let g = 357.528 + 0.9856003 * n; // mean anomaly of the Sun

  // put L and g in the range of 0° to 360°
  L %= 360;
  g %= 360;

  const LAMBDA = L + 1.915 * sin(toRadians(g)) + 0.02 * sin(toRadians(2 * g)); // ecliptic longitude of Sun

  var R =
    1.00014 - 0.01671 * cos(toRadians(g)) - 0.0014 * cos(toRadians(2 * g)); // distance from Sun in AU

  const ECLIPTIC_POSITION = { lambda: LAMBDA, R: R };
  return ECLIPTIC_POSITION;
};

export default getEclipticPosition;
