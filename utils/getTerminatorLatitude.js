// @flow

import { toDegrees, toRadians } from "./index";

/**
 * For a given hour angle and sun position,
 * compute the latitude of the terminator in degrees.
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
  const { atan, cos, tan } = Math;
  const TERMINATOR_LATITUDE = toDegrees(
    atan(
      -cos(toRadians(HOUR_ANGLE)) / tan(toRadians(EQUATORIAL_POSITION.delta))
    )
  );
  return TERMINATOR_LATITUDE;
};

export default getTerminatorLatitude;
