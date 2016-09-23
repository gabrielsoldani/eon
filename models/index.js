'use strict';

module.exports = function (db) {
    return {
        Gym: require('./Gym')(db),
        Pokemon: require('./Pokemon')(db),
        Pokestop: require('./Pokestop')(db),
        ScannedLocation: require('./ScannedLocation')(db),
        Versions: require('./Versions')(db)
    };
};
