// @flow

/**
 *  Compute the hour angle of the sun for a longitude on Earth.
 * Return the hour angle in degrees.
 *
 * @function getHourAngle
 * @param {number} LONGITUDE
 * @param {Object} EQUATORIAL_POSITION
 * @param {number} GMST
 * @returns {number} HOUR_ANGLE
 */

const getHourAngle = (
  LONGITUDE: number,
  EQUATORIAL_POSITION: Object,
  GMST: number
) => {
  const HOUR_ANGLE = (GMST + LONGITUDE / 15) * 15 - EQUATORIAL_POSITION.alpha;
  return HOUR_ANGLE;
};

export default getHourAngle;
