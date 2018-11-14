// @flow

import {
  getEclipticObliquity,
  getEclipticPosition,
  getEquatorialPosition,
  getGMST,
  getHourAngle,
  getJulianDay,
  getTerminatorLatitude
} from "./index";

/**
 * @function getTerminatorCoords
 * @param {number} RESOLUTION
 * @param {number} TIME
 * @returns {Array<number>}
 */

const getTerminatorCoords = (RESOLUTION: number = 2, TIME?: number) => {
  const JULIAN_DAY = getJulianDay(TIME ? new Date(TIME) : new Date());
  const EQUATORIAL_POSITION = getEquatorialPosition(
    getEclipticPosition(JULIAN_DAY).lambda,
    getEclipticObliquity(JULIAN_DAY)
  );
  const GMST = getGMST(JULIAN_DAY);

  // create array of coordinates
  let COORDS = [];
  for (let i = 0; i <= 720 * RESOLUTION; i++) {
    const LONGITUDE = -360 + i / RESOLUTION;
    const HOUR_ANGLE = getHourAngle(LONGITUDE, EQUATORIAL_POSITION, GMST);
    const LATITUDE = getTerminatorLatitude(HOUR_ANGLE, EQUATORIAL_POSITION);
    COORDS[i + 1] = [LATITUDE, LONGITUDE];
  }

  // update first and last items based on EQUATORIAL_POSITION
  if (EQUATORIAL_POSITION.delta < 0) {
    COORDS[0] = [90, -360];
    COORDS[COORDS.length] = [90, 360];
  } else {
    COORDS[0] = [-90, -360];
    COORDS[COORDS.length] = [-90, 360];
  }
};

export default getTerminatorCoords;
