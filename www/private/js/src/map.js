let map = L.map('map', {
    maxBounds: mapMaxBounds,
    maxZoom: 18
}).fitBounds(mapViewBounds);

if (location.href.indexOf('@') !== -1) {
    location.hash = '';
}

let hash = new L.Hash(map);

(function () {
    'use strict';

    let h = hash.parseHash(location.hash);
    if (h) {
        mapCenter = h.center;
    }
})();

let locationMarker = L.marker(mapCenter, {icon: pkmn.getLocationIcon()});

let osmLayer = L.tileLayer(tileServer, {
    errorTileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

L.layerGroup([osmLayer, locationMarker]).addTo(map);

let pokemonLayer = L.layerGroup();
let pokestopsLayer = L.layerGroup();
let luredPokestopsLayer = L.layerGroup();
let gymsLayer = L.layerGroup();
let scannedLocationsLayer = L.layerGroup();

new L.FilterButton({
    onClick: function (e) {
        'use strict';

        $('#filter-window').toggleClass('enabled');
    }
}).addTo(map);

let overlays = {
    'Pokémon': pokemonLayer,
    'Pokéstops': pokestopsLayer,
    'Lured Pokéstops': luredPokestopsLayer,
    'Gyms': gymsLayer,
    'Scanned Locations': scannedLocationsLayer
}

if (store.get('showPokemon')) {
    pokemonLayer.addTo(map);
}

if (store.get('showPokestops')) {
    pokestopsLayer.addTo(map);
}

if (store.get('showLuredPokestops')) {
    luredPokestopsLayer.addTo(map);
}

if (store.get('showGyms')) {
    gymsLayer.addTo(map);
}

if (store.get('showScannedLocations')) {
    scannedLocationsLayer.addTo(map);
}

L.control.layers(null, overlays).addTo(map);

map.on('overlayadd', function (e) {
    'use strict';

    let key;

    if (e.layer === pokemonLayer) {
        key = 'showPokemon';
    }
    else if (e.layer === pokestopsLayer) {
        key = 'showPokestops';

        if (!map.hasLayer(luredPokestopsLayer)) {
            // TODO: I hate this hack
            setTimeout(function () {
                luredPokestopsLayer.addTo(map)
            }, 100);
        }
    }
    else if (e.layer === luredPokestopsLayer) {
        key = 'showLuredPokestops';
    }
    else if (e.layer === gymsLayer) {
        key = 'showGyms';
    }
    else if (e.layer === scannedLocationsLayer) {
        key = 'showScannedLocations';
    }

    if (key) {
        store.set(key, true);
    }
});

map.on('overlayremove', function (e) {
    'use strict';

    let key;

    if (e.layer === pokemonLayer) {
        key = 'showPokemon';
    }
    else if (e.layer === pokestopsLayer) {
        key = 'showPokestops';
    }
    else if (e.layer === luredPokestopsLayer) {
        key = 'showLuredPokestops';

        if (map.hasLayer(pokestopsLayer)) {
            // TODO: I hate this hack
            setTimeout(function () {
                map.removeLayer(pokestopsLayer);
            }, 100);
        }
    }
    else if (e.layer === gymsLayer) {
        key = 'showGyms';
    }
    else if (e.layer === scannedLocationsLayer) {
        key = 'showScannedLocations';
    }

    if (key) {
        store.set(key, false);
    }
});

new L.LocateButton().addTo(map);

let initialLocationSet = false;
function onLocationFound (e) {
    'use strict';

    locationMarker.setLatLng(e.latlng)

    if (!initialLocationSet) {
        initialLocationSet = true;
        map.locate({watch: true})
    }
}

function onLocationError (e) {
    'use strict';

    if (!initialLocationSet) {
        initialLocationSet = true;
    }
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

let rawDataIsLoading = false;
function loadRawData () {
    'use strict';

    return $.ajax({
        url: 'data',
        type: 'GET',
        data: {
            'pokemon': map.hasLayer(pokemonLayer),
            'pokestops': map.hasLayer(pokestopsLayer) ? true : map.hasLayer(luredPokestopsLayer) ? 'lured' : false,
            'gyms': map.hasLayer(gymsLayer),
            'scanned_locations': map.hasLayer(scannedLocationsLayer),
            's': map.getBounds().getSouth(),
            'w': map.getBounds().getWest(),
            'n': map.getBounds().getNorth(),
            'e': map.getBounds().getEast()
        },
        dataType: 'json',
        cache: false,
        beforeSend: function () {
            if (rawDataIsLoading) {
                return false;
            }
            rawDataIsLoading = true;
        },
        complete: function () {
            rawDataIsLoading = false;
        }
    });
}

function formatHash (zoom, lat, lng) {
    'use strict';

    let precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));

    return '#' + [
        zoom,
        lat.toFixed(precision),
        lng.toFixed(precision)
    ].join('/');
}

function updatePokemonPopup (pokemon, popup) {
    'use strict';

    let pokemonId = pokemon['pokemon_id'];
    let latitude = pokemon['latitude'];
    let longitude = pokemon['longitude'];
    let disappearDate = new Date(pokemon['disappear_time']);

    let content = (
        `<div>` +
            `<strong>${pkmn.getPokemonName(pokemonId)}</strong> - ` +
            `<a href="http://www.pokemon.com/us/pokedex/${pokemonId}">#${pokemonId}</a>` +
        `</div>` +
        `<div>` +
            `Desaparece às ${utils.formatTime(disappearDate)} ` +
            `(<span class="popup-countdown" data-expire-time="${pokemon['disappear_time']}">(${utils.formatTimeDifference(0)})</span>)` +
        `</div>` +
        `<div>` +
            `Localização: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}` +
        `</div>` +
        `<div>` +
            `<a href="https://www.google.com/maps/dir/My+Location/${latitude},${longitude}" target="_blank">Get directions</a>` +
            `&nbsp;&nbsp;` +
            `<a href=".${formatHash(18, latitude, longitude)}" target="_blank">Link</a>` +
            `&nbsp;&nbsp;` +
            `<a href="javascript:hidePokemon(${pokemonId})">Ocultar</a>` +
        `</div>`
    );

    popup.setContent(content);
    updateTimeRemainingPopups();
}

function updatePokestopPopup (pokestop, popup) {
    'use strict';

    let latitude = pokestop['latitude'];
    let longitude = pokestop['longitude'];
    let lured = pokestop['lure_expiration'];

    let content;

    if (lured) {
        let lureExpirationDate = new Date(pokestop['lure_expiration']);
        content = (
            `<div>` +
                `<strong>Lured Pokéstop</strong>` +
            `</div>` +
            `<div>` +
            `<div>` +
                `Expira às ${utils.formatTime(lureExpirationDate)} ` +
                `(<span class="popup-countdown" data-expire-time="${pokestop['lure_expiration']}">${utils.formatTimeDifference(0)}</span>)` +
            `</div>`
        );
    }
    else {
        content = (
            `<div>` +
                `<strong>Pokéstop</strong>` +
            `</div>`
        );
    }

    content += (
        `<div>` +
            `Localização: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}` +
        `</div>` +
        `<div>` +
            `<a href="https://www.google.com/maps/dir/My+Location/${latitude},${longitude}" target="_blank">Get directions</a>` +
            `&nbsp;&nbsp;` +
            `<a href=".${formatHash(18, latitude, longitude)}" target="_blank">Link</a>` +
        `</div>`
    )

    popup.setContent(content);

    if (lured) {
        updateTimeRemainingPopups();
    }
}

function updateGymPopup (gym, popup) {
    'use strict';

    let latitude = gym['latitude'];
    let longitude = gym['longitude'];
    let teamId = gym['team_id'];

    let content = (
        `<div style='text-align: center;'>` +
            `<div><strong>${pkmn.getTeamName(teamId)}</strong></div>` +
            `<img src="static/images/team-${teamId}.png" srcset="static/images/team-${teamId}-2x.png 2x">` +
        `</div>`
    );

    if (teamId !== 0) {
        let points = gym['gym_points'];
        let level = pkmn.getGymLevel(points);
        content += (
            `<div>Level ${level} | Prestige: ${points}/${pkmn.getGymPointsToNextLevel(level)}</div>`
        );
    }

    content += (
        `<div>` +
            `Localização: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}` +
        `</div>` +
        `<div>` +
            `<a href="https://www.google.com/maps/dir/My+Location/${latitude},${longitude}" target="_blank">Get directions</a>` +
            `&nbsp;&nbsp;` +
            `<a href=".${formatHash(18, latitude, longitude)}" target="_blank">Link</a>` +
        `</div>`
    );

    popup.setContent(content);
}

function updateTimeRemainingPopups () {
    'use strict';

    $('.popup-countdown').each(function (index, element) {
        let expireTime = parseInt(element.getAttribute('data-expire-time'));
        let now = new Date().getTime();
        let difference = expireTime - now;
        let text;

        if (difference < 0) {
            text = 'expirado';
        }
        else {
            text = utils.formatTimeDifference(difference);
        }

        $(element).text(text);
    });
}

function clearExpired () {
    'use strict';

    let now = new Date().getTime();

    $.each(mapData.pokemon, function (key, value) {
        if (value['disappear_time'] < now) {
            pokemonLayer.removeLayer(value.marker);

            delete mapData.pokemon[key].marker;
            delete mapData.pokemon[key];
        }
    });

    $.each(mapData.pokestop, function (key, value) {
        if (value['lure_expiration'] && value['lure_expiration'] < now) {
            luredPokestopsLayer.removeLayer(value.marker);

            delete mapData.pokestops[key].marker;
            delete mapData.pokestops[key];
        }
    });

    $.each(mapData.scannedLocations, function (key, value) {
        if (value['last_modified'] + (15 * 60 * 1000) < now) {
            scannedLocationsLayer.removeLayer(value.circle);

            delete mapData.pokemon[key].circle;
            delete mapData.pokemon[key];
        }
    });
}

function clearOutOfBounds () {
    'use strict';

    let bounds = map.getBounds();
    bounds.pad(4);

    $.each(mapData.pokemon, function (key, value) {
        if (!bounds.contains(value.marker.getLatLng())) {
            pokemonLayer.removeLayer(value.marker);

            delete mapData.pokemon[key].marker;
            delete mapData.pokemon[key];
        }
    });

    $.each(mapData.pokestops, function (key, value) {
        if (!bounds.contains(value.marker.getLatLng())) {
            pokestopsLayer.removeLayer(value.marker);

            delete mapData.pokestops[key].marker;
            delete mapData.pokestops[key];
        }
    });

    $.each(mapData.gyms, function (key, value) {
        if (!bounds.contains(value.marker.getLatLng())) {
            gymsLayer.removeLayer(value.marker);

            delete mapData.gyms[key].marker;
            delete mapData.gyms[key];
        }
    });

    $.each(mapData.scannedLocations, function (key, value) {
        if (!bounds.contains(value.circle.getLatLng())) {
            scannedLocationsLayer.removeLayer(value.circle);

            delete mapData.scannedLocations[key].circle;
            delete mapData.scannedLocations[key];
        }
    });
}

let mapData = {
    pokemon: {},
    pokestops: {},
    gyms: {},
    scannedLocations: {}
};

function processPokemon (i, item) {
    'use strict';

    let pokemonId = item['pokemon_id'];
    if (store.get(`pokemonEnabled[${pokemonId}]`) === false) {
        return;
    }

    let latlng = L.latLng(item['latitude'], item['longitude']);
    let key = item['encounter_id'];

    if (key in mapData.pokemon) {
        let marker = mapData.pokemon[key].marker;

        mapData.pokemon[key] = item;
        mapData.pokemon[key].marker = marker;
    }
    else {
        let marker = L.marker(latlng, {icon: pkmn.getPokemonIcon(pokemonId)});
        let popup = L.popup();

        marker.bindPopup(popup);

        marker.on('popupopen', function (e) {
            updatePokemonPopup(item, popup);
        });

        pokemonLayer.addLayer(marker);

        mapData.pokemon[key] = item;
        mapData.pokemon[key].marker = marker;
    }
}

function processPokestop (i, item) {
    'use strict';

    let latlng = L.latLng(item['latitude'], item['longitude']);
    let key = item['latitude'] + ',' + item['longitude'];
    let lured = !!item['lure_expiration'];

    if (key in mapData.pokestops) {
        let wasLured = Boolean(mapData.pokestops[key]['lure_expiration']);
        let marker = mapData.pokestops[key].marker;

        mapData.pokestops[key] = item;
        mapData.pokestops[key].marker = marker;

        if (wasLured !== lured) {
            if (lured) {
                pokestopsLayer.removeLayer(marker);
                luredPokestopsLayer.addLayer(marker);
            }
            else {
                luredPokestopsLayer.removeLayer(marker);
                pokestopsLayer.addLayer(marker);
            }

            marker.setIcon(pkmn.getPokestopIcon(lured));
        }
    }
    else {
        let marker = L.marker(latlng, {icon: pkmn.getPokestopIcon(lured)});
        let popup = L.popup();

        marker.bindPopup(popup);

        marker.on('popupopen', function (e) {
            updatePokestopPopup(item, popup);
        });

        if (lured) {
            luredPokestopsLayer.addLayer(marker);
        }
        else {
            pokestopsLayer.addLayer(marker);
        }

        mapData.pokestops[key] = item;
        mapData.pokestops[key].marker = marker;
    }
}

function processGym (i, item) {
    'use strict';

    let latlng = L.latLng(item['latitude'], item['longitude']);
    let key = item['latitude'] + ',' + item['longitude'];
    let teamId = item['team_id'];

    if (key in mapData.gyms) {
        let marker = mapData.gyms[key].marker;

        mapData.gyms[key] = item;
        mapData.gyms[key].marker = marker;

        marker.setIcon(pkmn.getGymIcon(teamId))
    }
    else {
        let marker = L.marker(latlng, {icon: pkmn.getGymIcon(teamId)});
        let popup = L.popup();

        marker.bindPopup(popup);

        marker.on('popupopen', function (e) {
            updateGymPopup(item, popup);
        });

        gymsLayer.addLayer(marker);

        mapData.gyms[key] = item;
        mapData.gyms[key].marker = marker;
    }
}

function getScannedLocationColor (time) {
    'use strict';

    let diff = (Date.now() - time) / 1000 / 60 / 15;

    if (diff > 1) {
        diff = 1;
    }
    else if (diff < 0) {
        diff = 0;
    }

    let hue = (1 - diff) * 120;
    hue = (Math.round(hue / 5.0) * 5).toString();
    return `hsl(${hue},100%,50%)`;
}

function processScannedLocation (i, item) {
    'use strict';

    let latlng = L.latLng(item['latitude'], item['longitude']);
    let key = item['latitude'] + ',' + item['longitude'];
    let color = getScannedLocationColor(item['last_modified']);

    if (key in mapData.scannedLocations) {
        let circle = mapData.scannedLocations[key].circle;

        mapData.scannedLocations[key] = item;
        mapData.scannedLocations[key].circle = circle;

        if (circle.options.color !== color) {
            circle.setStyle({ color: color });
        }
    }
    else {
        let circle = L.circle(latlng, 70, {
            color: color,
            weight: 1,
            fillOpacity: 0.1,
            clickable: false
        });

        scannedLocationsLayer.addLayer(circle);

        mapData.scannedLocations[key] = item;
        mapData.scannedLocations[key].circle = circle;
    }
}

function reloadMap () {
    'use strict';

    clearOutOfBounds();

    loadRawData().done(function (result) {
        console.log(result)
        $.each(result.pokemon, processPokemon);
        $.each(result.pokestops, processPokestop);
        $.each(result.gyms, processGym);
        $.each(result.scanned_locations, processScannedLocation);
        updateTimeRemainingPopups()
    });
}

map.on('moveend', reloadMap);
map.on('zoomend', reloadMap);
map.on('resize', reloadMap);
map.on('overlayadd', reloadMap);
map.on('overlayremove', reloadMap);
map.on('popupopen', updateTimeRemainingPopups);

setInterval(updateTimeRemainingPopups, 1000);
setInterval(reloadMap, 5000);
setInterval(clearExpired, 5000);
setTimeout(reloadMap, 1);

function onChangePokemonFilter (pokemonId, enabled) {
    'use strict';

    if (enabled) {
        return;
    }

    $.each(mapData.pokemon, function (key, value) {
        if (value['pokemon_id'] === pokemonId) {
            pokemonLayer.removeLayer(value.marker);

            delete mapData.pokemon[key].marker;
            delete mapData.pokemon[key];
        }
    });
}

function hidePokemon (pokemonId) {
    'use strict';

    store.set(`pokemonEnabled[${pokemonId}]`, false);
    onChangePokemonFilter(pokemonId, false);

    return false;
}

console.log(hidePokemon);

(function () {
    'use strict';

    $('.filter-pkmn').each(function () {
        let pokemonId = parseInt($(this).attr('data-id'));

        $(this).prop('checked', store.get(`pokemonEnabled[${pokemonId}]`));
    });

    $('#filter-remove-all').click(function (e) {
        e.preventDefault();

        $('.filter-pkmn').prop('checked', false).trigger('change');
    });

    $('#filter-add-all').click(function (e) {
        e.preventDefault();

        $('.filter-pkmn').prop('checked', true).trigger('change');
    });

    $('#filter-close').click(function (e) {
        e.preventDefault();

        $('#filter-window').removeClass('enabled');
    });

    $('.filter-pkmn').change(function (e) {
        let pokemonId = parseInt($(this).attr('data-id'));
        let enabled = !!$(this).prop('checked');

        store.set(`pokemonEnabled[${pokemonId}]`, enabled);

        onChangePokemonFilter(pokemonId, enabled);
    });
}());
