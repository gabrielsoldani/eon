(function (L) {
    'use strict';

    let LocateButton = L.Control.extend({
        options: {
            position: 'bottomleft'
        },

        onAdd: function (map) {
            let container = L.DomUtil.create('div', 'eevee-control-locate-button');

            this._container = container;
            this._map = map;

            L.DomEvent.disableClickPropagation(container);
            if (!L.Browser.touch) {
                L.DomEvent.disableScrollPropagation(container);
            }

            L.DomEvent
                .on(container, 'click', L.DomEvent.stop)
                .on(container, 'click', this._onClick, this)
                .on(container, 'click', this._refocusOnMap, this);

            this._map.on('locationerror', this._removeClass, this);
            this._map.on('locationfound', this._removeClass, this);

            return container;
        },

        _onClick: function (e) {
            L.DomUtil.addClass(this._container, 'locating');
            this._map.stopLocate().locate({setView: true, maxZoom: 16});
        },

        _removeClass: function (e) {
            L.DomUtil.removeClass(this._container, 'locating');
        }
    });

    L.LocateButton = LocateButton;

    let FilterButton = L.Control.extend({
        options: {
            position: 'topright'
        },

        onAdd: function (map) {
            let container = L.DomUtil.create('div', 'eevee-control-filter-button');

            this._container = container;
            this._map = map;

            L.DomEvent.disableClickPropagation(container);
            if (!L.Browser.touch) {
                L.DomEvent.disableScrollPropagation(container);
            }

            L.DomEvent
                .on(container, 'click', L.DomEvent.stop)
                .on(container, 'click', this._onClick, this)
                .on(container, 'click', this._refocusOnMap, this);

            return container;
        },

        _onClick: function (e) {
            if (this.options.onClick) {
                this.options.onClick(e);
            }
        }
    });

    L.FilterButton = FilterButton;
})(L);
