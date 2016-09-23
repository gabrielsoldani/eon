(function (L) {
    'use strict';

    let LocateButton = L.Control.extend({
        options: {
            position: 'bottomleft'
        },

        onAdd: function (map) {
            let container = L.DomUtils.create('div', 'eevee-control-locate-button');

            this._container = container;
            this._map = map;

            L.DomEvent
                .on(container, 'mousedown dblclick', L.DomEvent.stopPropagation)
                .on(container, 'click', L.DomEvent.stop)
                .on(container, 'click', this._onClick, this)
                .on(container, 'click', this._refocusOnMap, this);

            return container;
        },

        _onClick: function (e) {
            this._map.locate();
        }
    });

    L.LocateButton = LocateButton;
})(L);
