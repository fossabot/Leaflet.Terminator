//@flow

/**
 * Takes a number in DEGREES and returns it in RADIANS.
 *
 * @function toRadians
 * @param {number} DEGREES
 * @returns {number} RADIANS
 */

const toRadians = (DEGREES: number) => {
  const RADIANS = DEGREES * (Math.PI / 180);
  return RADIANS;
};

export default toRadians;
