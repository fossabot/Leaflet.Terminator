import L from 'leaflet';

/* Terminator.js -- Overlay day/night region on a Leaflet map */

function julian(date) {
	/* Calculate the present UTC Julian Date. Function is valid after
	 * the beginning of the UNIX epoch 1970-01-01 and ignores leap
	 * seconds. */
	let JULIAN = (date / 86400000) + 2440587.5;
	console.log("JULIAN:", JULIAN);
	return JULIAN;
}

function GMST(julianDay) {
	/* Calculate Greenwich Mean Sidereal Time according to 
		 http://aa.usno.navy.mil/faq/docs/GAST.php */
	var d = julianDay - 2451545.0;
	// Low precision equation is good enough for our purposes.
	let GMST = (18.697374558 + 24.06570982441908 * d) % 24;
	console.log("GMST:", GMST);
	return GMST;
}

var Terminator = L.Polygon.extend({
	options: {
		color: '#00',
		opacity: 0.5,
		fillColor: '#00',
		fillOpacity: 0.5,
		resolution: 2
	},

	initialize: function (options) {
		this.version = '0.1.0';
		this._R2D = 180 / Math.PI;
		this._D2R = Math.PI / 180;
		L.Util.setOptions(this, options);
		var latLng = this._compute(this.options.time)
		console.log("latLng:", latLng);
		this.setLatLngs(latLng);
	},

	setTime: function (date) {
		this.options.time = date;
		var latLng = this._compute(date);
		console.log("latLng:", latLng);
		this.setLatLngs(latLng);
	},

	_sunEclipticPosition: function (julianDay) {
		/* Compute the position of the Sun in ecliptic coordinates at
			 julianDay.  Following
			 http://en.wikipedia.org/wiki/Position_of_the_Sun */
		// Days since start of J2000.0
		var n = julianDay - 2451545.0;
		// mean longitude of the Sun
		var L = 280.460 + 0.9856474 * n;
		L %= 360;
		// mean anomaly of the Sun
		var g = 357.528 + 0.9856003 * n;
		g %= 360;
		// ecliptic longitude of Sun
		var lambda = L + 1.915 * Math.sin(g * this._D2R) +
			0.02 * Math.sin(2 * g * this._D2R);
		// distance from Sun in AU
		var R = 1.00014 - 0.01671 * Math.cos(g * this._D2R) -
			0.0014 * Math.cos(2 * g * this._D2R);
		let POSITION = {lambda: lambda, R: R};
		console.log("POSITION:", POSITION);
		return POSITION ;
	},

	_eclipticObliquity: function (julianDay) {
		// Following the short term expression in
		// http://en.wikipedia.org/wiki/Axial_tilt#Obliquity_of_the_ecliptic_.28Earth.27s_axial_tilt.29
		var n = julianDay - 2451545.0;
		// Julian centuries since J2000.0
		var T = n / 36525;
		var epsilon = 23.43929111 -
			T * (46.836769 / 3600
				- T * (0.0001831 / 3600
					+ T * (0.00200340 / 3600
						- T * (0.576e-6 / 3600
							- T * 4.34e-8 / 3600))));
		console.log("epsilon:", epsilon);
		return epsilon;
	},

	_sunEquatorialPosition: function (sunEclLng, eclObliq) {
		/* Compute the Sun's equatorial position from its ecliptic
		 * position. Inputs are expected in degrees. Outputs are in
		 * degrees as well. */
		var alpha = Math.atan(Math.cos(eclObliq * this._D2R)
			* Math.tan(sunEclLng * this._D2R)) * this._R2D;
		var delta = Math.asin(Math.sin(eclObliq * this._D2R)
			* Math.sin(sunEclLng * this._D2R)) * this._R2D;

		var lQuadrant = Math.floor(sunEclLng / 90) * 90;
		var raQuadrant = Math.floor(alpha / 90) * 90;
		alpha = alpha + (lQuadrant - raQuadrant);
		let EQUATORIAL_POSITION = {alpha: alpha, delta: delta};
		console.log("EQUATORIAL_POSITION:", EQUATORIAL_POSITION);
		return EQUATORIAL_POSITION;
	},

	_hourAngle: function (lng, sunPos, gst) {
		/* Compute the hour angle of the sun for a longitude on
		 * Earth. Return the hour angle in degrees. */
		var lst = gst + lng / 15;
		let HOUR_ANGLE = lst * 15 - sunPos.alpha;
		console.log("HOUR_ANGLE:", HOUR_ANGLE);
		return HOUR_ANGLE;
	},

	_latitude: function (ha, sunPos) {
		/* For a given hour angle and sun position, compute the
		 * latitude of the terminator in degrees. */
		var lat = Math.atan(-Math.cos(ha * this._D2R) /
			Math.tan(sunPos.delta * this._D2R)) * this._R2D;
		console.log("lat:", lat);
		return lat;
	},

	_compute: function (time) {
		var today = time ? new Date(time) : new Date();
		var julianDay = julian(today);
		var gst = GMST(julianDay);
		var latLng = [];

		var sunEclPos = this._sunEclipticPosition(julianDay);
		var eclObliq = this._eclipticObliquity(julianDay);
		var sunEqPos = this._sunEquatorialPosition(sunEclPos.lambda, eclObliq);
		for (var i = 0; i <= 720 * this.options.resolution; i++) {
			var lng = -360 + i / this.options.resolution;
			var ha = this._hourAngle(lng, sunEqPos, gst);
			latLng[i + 1] = [this._latitude(ha, sunEqPos), lng];
		}
		if (sunEqPos.delta < 0) {
			latLng[0] = [90, -360];
			latLng[latLng.length] = [90, 360];
		} else {
			latLng[0] = [-90, -360];
			latLng[latLng.length] = [-90, 360];
		}
		console.log("latLng:", latLng);
		return latLng;
	}
});

export default function terminator(options) {
	const TERMINATOR = new Terminator(options);
	console.log(TERMINATOR);
	return TERMINATOR;
};
