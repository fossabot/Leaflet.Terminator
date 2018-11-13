// @flow

/**
 * Calculate the present UTC Julian Date. Function is valid after
 * the beginning of the UNIX epoch 1970-01-01 and ignores leap seconds.
 *
 * @function getJulianDay
 * @param {number} date
 * @returns {number} JULIAN_DAY
 */

const getJulianDay = (DATE: number) => {
  const JULIAN_DAY = DATE / 86400000 + 2440587.5;
  console.log("JULIAN_DAY:", JULIAN_DAY);
  return JULIAN_DAY;
};

export default getJulianDay;
