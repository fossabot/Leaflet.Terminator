[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Frlueder%2FLeaflet.Terminator.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Frlueder%2FLeaflet.Terminator?ref=badge_shield)

Leaflet.Terminator
==================

Overlay day and night regions on a Leaflet Earth map.

Demo: http://joergdietrich.github.io/Leaflet.Terminator/

Leaflet.Terminator extends the Polygon class. Adding the terminator to a leaflet map is as easy as 

```html
<script src="https://unpkg.com/leaflet"></script>
<script src="https://unpkg.com/@joergdietrich/leaflet.terminator"></script>
```
```js
var map = L.map('map').addLayer(L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'));
L.terminator().addTo(map)
```

Or with npm:

```js
import L from 'leaflet';
import terminator from '@joergdietrich/leaflet.terminator';

var map = L.map('map').addLayer(L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'))
terminator().addTo(map);
```


In addition to all Polygon options, Leaflet.Terminator has a new
option "resolution", which gives the step size at which the terminator
points are computed. The step size is 1°/resolution, i.e. higher
resolution values have smaller step sizes and more points in the
polygon. The default value is 2.


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Frlueder%2FLeaflet.Terminator.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Frlueder%2FLeaflet.Terminator?ref=badge_large)