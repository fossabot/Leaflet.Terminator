// @flow

/**
 * Calculate Greenwich Mean Sidereal Time
 * according to http://aa.usno.navy.mil/faq/docs/GAST.php
 * https://en.wikipedia.org/wiki/Sidereal_time
 *
 * @function getGMST
 * @param {number} JULIAN_DAY
 * @returns {number} GMST
 */

const getGMST = (JULIAN_DAY: number) => {
  const GMST =
    (18.697374558 + 24.06570982441908 * (JULIAN_DAY - 2451545.0)) % 24;
  return GMST;
};

export default getGMST;
