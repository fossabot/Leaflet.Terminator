// @flow

import { toDegrees, toRadians } from "./index";

/**
 * For a given hour angle and sun position, compute the latitude of the terminator in degrees.
 *
 * @function getTerminatorLatitude
 * @param {number} HOUR_ANGLE
 * @param {Object} EQUATORIAL_POSITION
 * @returns {number} LATITUDE
 */

const getTerminatorLatitude = (
  HOUR_ANGLE: number,
  EQUATORIAL_POSITION: Object
) => {
  const TERMINATOR_LATITUDE = toDegrees(
    Math.atan(
      -Math.cos(toRadians(HOUR_ANGLE)) /
        Math.tan(toRadians(EQUATORIAL_POSITION.delta))
    )
  );
  console.log("lat:", TERMINATOR_LATITUDE);
  return TERMINATOR_LATITUDE;
};

export default getTerminatorLatitude;
