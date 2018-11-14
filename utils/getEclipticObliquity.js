// @flow

/**
 * In astronomy, axial tilt, also known as obliquity, is the angle
 * between an object's rotational axis and its orbital axis.
 * https://en.wikipedia.org/wiki/Axial_tilt#Short_term
 *
 * @function getEclipticObliquity
 * @param {number} JULIAN_DAY
 * @returns {number} ECLIPTIC_OBLIQUITY
 */

const getEclipticObliquity = (JULIAN_DAY: number) => {
  const n = JULIAN_DAY - 2451545.0;
  const T = n / 36525; // Julian centuries since J2000.0

  const ECLIPTIC_OBLIQUITY =
    23.43929111 -
    T *
      (46.836769 / 3600 -
        T *
          (0.0001831 / 3600 +
            T *
              (0.0020034 / 3600 -
                T * (0.576e-6 / 3600 - (T * 4.34e-8) / 3600))));
  return ECLIPTIC_OBLIQUITY;
};

export default getEclipticObliquity;
