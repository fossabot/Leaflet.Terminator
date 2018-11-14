// @flow

/**
 * Following the short term expression in
 * http://en.wikipedia.org/wiki/Axial_tilt#Obliquity_of_the_ecliptic_.28Earth.27s_axial_tilt.29
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
