(function (window) {
    'use strict';

    var StoreTypes = {
        Boolean: {
            parse: function (str) {
                return ['1', 'yes', 'true'].indexOf(str.toLowerCase()) >= 0;
            },
            stringify: function (b) {
                return b ? 'true' : 'false';
            }
        },
        JSON: {
            parse: function (str) {
                return JSON.parse(str)
            },
            stringify: function (json) {
                return JSON.stringify(json)
            }
        },
        String: {
            parse: function (str) {
                return str
            },
            stringify: function (str) {
                return str
            }
        },
        Number: {
            parse: function (str) {
                return parseInt(str, 10)
            },
            stringify: function (number) {
                return number.toString()
            }
        }
    };

    var Store = function (options) {
        this.options = options;
    };

    Store.prototype.getOption = function (key) {
        var option = this.options[key]
        if (!option) {
            throw new Error(`Store key ${key} was not defined`);
        }
        return option
    };

    Store.prototype.get = function (key) {
        var option = this.getOption(key);
        var optionType = option.type;
        var rawValue = localStorage[key];
        if (rawValue === null || rawValue === undefined) {
            return option.default;
        }
        var value = optionType.parse(rawValue);
        return value;
    };

    Store.prototype.set = function (key, value) {
        var option = this.getOption(key);
        var optionType = option.type || StoreTypes.String;
        var rawValue = optionType.stringify(value);
        localStorage[key] = rawValue;
    };

    Store.prototype.reset = function (key) {
        localStorage.removeItem(key);
    };

    Store.prototype.resetAll = function () {
        localStorage.clear();
    };

    window.StoreTypes = StoreTypes;
    window.Store = Store;

    window.store = new Store({
        'storeVersion': {
            default: 0,
            type: StoreTypes.Number
        },
        'showPokemon': {
            default: true,
            type: StoreTypes.Boolean
        },
        'showPokestops': {
            default: false,
            type: StoreTypes.Boolean
        },
        'showLuredPokestops': {
            default: true,
            type: StoreTypes.Boolean
        },
        'showGyms': {
            default: false,
            type: StoreTypes.Boolean
        },
        'showScannedLocations': {
            default: false,
            type: StoreTypes.Boolean
        },
        'pokemonEnabled[1]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[2]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[3]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[4]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[5]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[6]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[7]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[8]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[9]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[10]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[11]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[12]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[13]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[14]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[15]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[16]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[17]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[18]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[19]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[20]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[21]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[22]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[23]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[24]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[25]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[26]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[27]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[28]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[29]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[30]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[31]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[32]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[33]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[34]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[35]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[36]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[37]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[38]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[39]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[40]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[41]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[42]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[43]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[44]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[45]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[46]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[47]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[48]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[49]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[50]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[51]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[52]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[53]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[54]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[55]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[56]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[57]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[58]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[59]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[60]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[61]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[62]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[63]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[64]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[65]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[66]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[67]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[68]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[69]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[70]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[71]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[72]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[73]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[74]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[75]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[76]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[77]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[78]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[79]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[80]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[81]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[82]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[83]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[84]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[85]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[86]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[87]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[88]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[89]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[90]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[91]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[92]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[93]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[94]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[95]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[96]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[97]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[98]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[99]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[100]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[101]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[102]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[103]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[104]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[105]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[106]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[107]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[108]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[109]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[110]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[111]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[112]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[113]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[114]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[115]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[116]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[117]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[118]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[119]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[120]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[121]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[122]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[123]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[124]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[125]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[126]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[127]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[128]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[129]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[130]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[131]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[132]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[133]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[134]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[135]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[136]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[137]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[138]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[139]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[140]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[141]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[142]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[143]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[144]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[145]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[146]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[147]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[148]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[149]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[150]': { default: true, type: StoreTypes.Boolean },
        'pokemonEnabled[151]': { default: true, type: StoreTypes.Boolean }
    });

    if (store.get('storeVersion') < 1) {
        store.resetAll();
        store.set('storeVersion', 1);
    }
})(window);
