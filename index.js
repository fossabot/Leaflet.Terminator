// @flow

import L from "leaflet";

import { getTerminatorCoords } from "./utils";

const Terminator = L.Polygon.extend({
  options: {
    color: "#000",
    fillColor: "#000",
    fillOpacity: 0.5,
    opacity: 0.5,
    resolution: 2
  },

  initialize: function(options) {
    this.version = "0.1.0";
    L.Util.setOptions(this, options);
    const COORDS = getTerminatorCoords(this.options.time);
    this.setLatLngs(COORDS);
  },

  setTime: function(date) {
    this.options.time = date;
    const COORDS = getTerminatorCoords(date);
    this.setLatLngs(COORDS);
  }
});

/**
 * @function terminator
 * @param {Object} OPTIONS
 * @returns {Function} Terminator
 */

const terminator = (OPTIONS: Object) => {
  const TERMINATOR = new Terminator(OPTIONS);
  return TERMINATOR;
};

export default terminator;
