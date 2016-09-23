(function (window) {
    'use strict';

    let LocationIcon = L.Icon.extend({
        options: {
            iconUrl: 'static/images/icon-marker.png',
            retinaUrl: 'static/images/icon-marker-2x.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -41]
        }
    });

    let _locationIcon = new LocationIcon();

    let PokemonIcon = L.ResponsiveIcon.extend({
        options: {
            iconSize: [65, 65],
            popupAnchor: [0, -32]
        }
    });

    let _pokemonIcons = {};
    {
        let _rare = { 115: 1, 122: 1, 128: 1, 132: 1, 144: 1, 145: 1, 146: 1, 150: 1, 151: 1, 68: 1, 6: 1, 65: 1, 94: 1, 76: 1, 89: 1, 135: 1, 137: 1, 26: 1, 113: 1, 141: 1, 38: 1, 136: 1, 139: 1, 130: 1, 131: 1, 9: 1, 110: 1, 71: 1, 59: 1, 45: 1, 97: 1, 40: 1, 31: 1, 51: 1, 3: 1, 34: 1, 91: 1, 103: 1, 57: 1, 87: 1, 62: 1, 112: 1, 5: 1, 143: 1, 105: 1, 149: 1, 107: 1, 106: 1, 78: 1, 53: 1, 134: 1, 67: 1, 28: 1, 108: 1, 124: 1, 142: 1, 64: 1, 93: 1, 12: 1, 121: 1, 125: 1, 148: 1, 82: 1, 75: 1, 101: 1, 117: 1, 8: 1, 36: 1, 80: 1, 15: 1, 2: 1, 47: 1, 49: 1, 24: 1 };
        for (let id in pkmn.getPokemon()) {
            if (_rare[id]) {
                _pokemonIcons[id] = new PokemonIcon({className: 'pokemon-sprite rare n' + id})
            }
            else {
                _pokemonIcons[id] = new PokemonIcon({className: 'pokemon-sprite n' + id})
            }
        }
    }

    let PokestopIcon = L.ResponsiveIcon.extend({
        options: {
            iconSize: [31, 31],
            popupAnchor: [0, -15]
        }
    });

    let _pokestopIcon = new PokestopIcon({className: 'pokestop'});
    let _luredPokestopIcon = new PokestopIcon({className: 'pokestop lured'});

    let GymIcon = L.ResponsiveIcon.extend({
        options: {
            iconSize: [36, 36],
            popupAnchor: [0, -18]
        }
    });

    let _gymIcons = {};
    for (let id in pkmn.getTeams()) {
        _gymIcons[id] = new GymIcon({className: 'gym n' + id})
    }

    Object.assign(window.pkmn, {
        getLocationIcon: function () {
            return _locationIcon;
        },
        getPokemonIcon: function (id) {
            return _pokemonIcons[id];
        },
        getPokestopIcon: function (lured) {
            return lured ? _luredPokestopIcon : _pokestopIcon;
        },
        getGymIcon: function (id) {
            return _gymIcons[id];
        }
    });
})(window);
