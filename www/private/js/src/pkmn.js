(function (window) {
    'use strict';

    var _pokemonNames = {
        1: 'Bulbasaur',
        2: 'Ivysaur',
        3: 'Venusaur',
        4: 'Charmander',
        5: 'Charmeleon',
        6: 'Charizard',
        7: 'Squirtle',
        8: 'Wartortle',
        9: 'Blastoise',
        10: 'Caterpie',
        11: 'Metapod',
        12: 'Butterfree',
        13: 'Weedle',
        14: 'Kakuna',
        15: 'Beedrill',
        16: 'Pidgey',
        17: 'Pidgeotto',
        18: 'Pidgeot',
        19: 'Rattata',
        20: 'Raticate',
        21: 'Spearow',
        22: 'Fearow',
        23: 'Ekans',
        24: 'Arbok',
        25: 'Pikachu',
        26: 'Raichu',
        27: 'Sandshrew',
        28: 'Sandslash',
        29: 'Nidoran♀',
        30: 'Nidorina',
        31: 'Nidoqueen',
        32: 'Nidoran♂',
        33: 'Nidorino',
        34: 'Nidoking',
        35: 'Clefairy',
        36: 'Clefable',
        37: 'Vulpix',
        38: 'Ninetales',
        39: 'Jigglypuff',
        40: 'Wigglytuff',
        41: 'Zubat',
        42: 'Golbat',
        43: 'Oddish',
        44: 'Gloom',
        45: 'Vileplume',
        46: 'Paras',
        47: 'Parasect',
        48: 'Venonat',
        49: 'Venomoth',
        50: 'Diglett',
        51: 'Dugtrio',
        52: 'Meowth',
        53: 'Persian',
        54: 'Psyduck',
        55: 'Golduck',
        56: 'Mankey',
        57: 'Primeape',
        58: 'Growlithe',
        59: 'Arcanine',
        60: 'Poliwag',
        61: 'Poliwhirl',
        62: 'Poliwrath',
        63: 'Abra',
        64: 'Kadabra',
        65: 'Alakazam',
        66: 'Machop',
        67: 'Machoke',
        68: 'Machamp',
        69: 'Bellsprout',
        70: 'Weepinbell',
        71: 'Victreebel',
        72: 'Tentacool',
        73: 'Tentacruel',
        74: 'Geodude',
        75: 'Graveler',
        76: 'Golem',
        77: 'Ponyta',
        78: 'Rapidash',
        79: 'Slowpoke',
        80: 'Slowbro',
        81: 'Magnemite',
        82: 'Magneton',
        83: 'Farfetch\'d',
        84: 'Doduo',
        85: 'Dodrio',
        86: 'Seel',
        87: 'Dewgong',
        88: 'Grimer',
        89: 'Muk',
        90: 'Shellder',
        91: 'Cloyster',
        92: 'Gastly',
        93: 'Haunter',
        94: 'Gengar',
        95: 'Onix',
        96: 'Drowzee',
        97: 'Hypno',
        98: 'Krabby',
        99: 'Kingler',
        100: 'Voltorb',
        101: 'Electrode',
        102: 'Exeggcute',
        103: 'Exeggutor',
        104: 'Cubone',
        105: 'Marowak',
        106: 'Hitmonlee',
        107: 'Hitmonchan',
        108: 'Lickitung',
        109: 'Koffing',
        110: 'Weezing',
        111: 'Rhyhorn',
        112: 'Rhydon',
        113: 'Chansey',
        114: 'Tangela',
        115: 'Kangaskhan',
        116: 'Horsea',
        117: 'Seadra',
        118: 'Goldeen',
        119: 'Seaking',
        120: 'Staryu',
        121: 'Starmie',
        122: 'Mr. Mime',
        123: 'Scyther',
        124: 'Jynx',
        125: 'Electabuzz',
        126: 'Magmar',
        127: 'Pinsir',
        128: 'Tauros',
        129: 'Magikarp',
        130: 'Gyarados',
        131: 'Lapras',
        132: 'Ditto',
        133: 'Eevee',
        134: 'Vaporeon',
        135: 'Jolteon',
        136: 'Flareon',
        137: 'Porygon',
        138: 'Omanyte',
        139: 'Omastar',
        140: 'Kabuto',
        141: 'Kabutops',
        142: 'Aerodactyl',
        143: 'Snorlax',
        144: 'Articuno',
        145: 'Zapdos',
        146: 'Moltres',
        147: 'Dratini',
        148: 'Dragonair',
        149: 'Dragonite',
        150: 'Mewtwo',
        151: 'Mew'
    }

    var _pokemonIds = {
        'bulbasaur': 1,
        'ivysaur': 2,
        'venusaur': 3,
        'charmander': 4,
        'charmeleon': 5,
        'charizard': 6,
        'squirtle': 7,
        'wartortle': 8,
        'blastoise': 9,
        'caterpie': 10,
        'metapod': 11,
        'butterfree': 12,
        'weedle': 13,
        'kakuna': 14,
        'beedrill': 15,
        'pidgey': 16,
        'pidgeotto': 17,
        'pidgeot': 18,
        'rattata': 19,
        'raticate': 20,
        'spearow': 21,
        'fearow': 22,
        'ekans': 23,
        'arbok': 24,
        'pikachu': 25,
        'raichu': 26,
        'sandshrew': 27,
        'sandslash': 28,
        'nidoranf': 29,
        'nidorina': 30,
        'nidoqueen': 31,
        'nidoranm': 32,
        'nidorino': 33,
        'nidoking': 34,
        'clefairy': 35,
        'clefable': 36,
        'vulpix': 37,
        'ninetales': 38,
        'jigglypuff': 39,
        'wigglytuff': 40,
        'zubat': 41,
        'golbat': 42,
        'oddish': 43,
        'gloom': 44,
        'vileplume': 45,
        'paras': 46,
        'parasect': 47,
        'venonat': 48,
        'venomoth': 49,
        'diglett': 50,
        'dugtrio': 51,
        'meowth': 52,
        'persian': 53,
        'psyduck': 54,
        'golduck': 55,
        'mankey': 56,
        'primeape': 57,
        'growlithe': 58,
        'arcanine': 59,
        'poliwag': 60,
        'poliwhirl': 61,
        'poliwrath': 62,
        'abra': 63,
        'kadabra': 64,
        'alakazam': 65,
        'machop': 66,
        'machoke': 67,
        'machamp': 68,
        'bellsprout': 69,
        'weepinbell': 70,
        'victreebel': 71,
        'tentacool': 72,
        'tentacruel': 73,
        'geodude': 74,
        'graveler': 75,
        'golem': 76,
        'ponyta': 77,
        'rapidash': 78,
        'slowpoke': 79,
        'slowbro': 80,
        'magnemite': 81,
        'magneton': 82,
        'farfetchd': 83,
        'doduo': 84,
        'dodrio': 85,
        'seel': 86,
        'dewgong': 87,
        'grimer': 88,
        'muk': 89,
        'shellder': 90,
        'cloyster': 91,
        'gastly': 92,
        'haunter': 93,
        'gengar': 94,
        'onix': 95,
        'drowzee': 96,
        'hypno': 97,
        'krabby': 98,
        'kingler': 99,
        'voltorb': 100,
        'electrode': 101,
        'exeggcute': 102,
        'exeggutor': 103,
        'cubone': 104,
        'marowak': 105,
        'hitmonlee': 106,
        'hitmonchan': 107,
        'lickitung': 108,
        'koffing': 109,
        'weezing': 110,
        'rhyhorn': 111,
        'rhydon': 112,
        'chansey': 113,
        'tangela': 114,
        'kangaskhan': 115,
        'horsea': 116,
        'seadra': 117,
        'goldeen': 118,
        'seaking': 119,
        'staryu': 120,
        'starmie': 121,
        'mrmime': 122,
        'scyther': 123,
        'jynx': 124,
        'electabuzz': 125,
        'magmar': 126,
        'pinsir': 127,
        'tauros': 128,
        'magikarp': 129,
        'gyarados': 130,
        'lapras': 131,
        'ditto': 132,
        'eevee': 133,
        'vaporeon': 134,
        'jolteon': 135,
        'flareon': 136,
        'porygon': 137,
        'omanyte': 138,
        'omastar': 139,
        'kabuto': 140,
        'kabutops': 141,
        'aerodactyl': 142,
        'snorlax': 143,
        'articuno': 144,
        'zapdos': 145,
        'moltres': 146,
        'dratini': 147,
        'dragonair': 148,
        'dragonite': 149,
        'mewtwo': 150,
        'mew': 151
    }

    function getPokemonName (id) {
        return _pokemonNames[id.toString()] || `Unknown #${id}`;
    }

    function getPokemonId (name) {
        name = name.replace('♀', 'M');
        name = name.replace('♂', 'F')
        name = name.replace(/\W+/, '');
        name = name.toLowerCase();
        return _pokemonIds[name];
    }

    function getPokemon () {
        return Object.keys(_pokemonNames);
    }

    var _teamNames = {
        '0': 'Neutral',
        '1': 'Mystic',
        '2': 'Valor',
        '3': 'Instinct'
    };

    var _teamIds = {
        'uncontested': 0,
        'none': 0,
        'neutral': 0,
        'mystic': 1,
        'valor': 2,
        'instinct': 3
    };

    function getTeamName (id) {
        return _teamNames[id.toString()] || `Unknown #${id}`;
    }

    function getTeamId (name) {
        name = name.replace(/\W+/, '');
        name = name.toLowerCase();
        return _teamIds[name];
    }

    function getTeams () {
        return Object.keys(_teamIds);
    }

    var _prestige = [2000, 4000, 8000, 12000, 16000, 20000, 30000, 40000, 50000];

    function getGymLevel (points) {
        points = points < 50000 ? points : 50000;

        var level = 1;
        while (points >= _prestige[level - 1]) {
            level++;
        }

        return level;
    }

    function getGymPointsToNextLevel (level) {
        return level >= 10 ? 50000 : _prestige[level - 1];
    }

    var pkmn = {
        getPokemonName: getPokemonName,
        getPokemonId: getPokemonId,
        getPokemon: getPokemon,

        getTeamName: getTeamName,
        getTeamId: getTeamId,
        getTeams: getTeams,

        getGymLevel: getGymLevel,
        getGymPointsToNextLevel: getGymPointsToNextLevel
    };

    window.pkmn = pkmn;
})(window);
