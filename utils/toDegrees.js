//@flow

/**
 * Takes a number in RADIANS and returns it in DEGREES.
 *
 * @function toDegrees
 * @param {number} RADIANS
 * @returns {number} DEGREES
 */

const toDegrees = (RADIANS: number) => {
  const DEGREES = RADIANS / (Math.PI / 180);
  return DEGREES;
};

export default toDegrees;
