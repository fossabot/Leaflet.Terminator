// @flow

import { toDegrees, toRadians } from "./index";

/**
 * Compute the Sun's equatorial position from its ecliptic position.
 * Inputs are expected in degrees. Outputs are in degrees as well.
 *
 * @function getEquatorialPosition
 * @param {number} ECLIPTIC_POSITION
 * @param {number } ECLIPTIC_OBLIQUITY
 *  @returns {Object} EQUATORIAL_POSITION
 */

const getEquatorialPosition = (
  ECLIPTIC_POSITION: number,
  ECLIPTIC_OBLIQUITY: number
) => {
  let ALPHA = toDegrees(
    Math.atan(
      Math.cos(toRadians(ECLIPTIC_OBLIQUITY)) *
        Math.tan(toRadians(ECLIPTIC_POSITION))
    )
  );

  const DELTA = toDegrees(
    Math.asin(
      Math.sin(toRadians(ECLIPTIC_OBLIQUITY)) *
        Math.sin(toRadians(ECLIPTIC_POSITION))
    )
  );

  const L_QUADRANT = Math.floor(ECLIPTIC_POSITION / 90) * 90;
  const RA_QUADRANT = Math.floor(ALPHA / 90) * 90;

  ALPHA = ALPHA + (L_QUADRANT - RA_QUADRANT);

  const EQUATORIAL_POSITION = { alpha: ALPHA, delta: DELTA };
  return EQUATORIAL_POSITION;
};

export default getEquatorialPosition;
