(function (L) {
    'use strict';

    L.ResponsiveIcon = L.DivIcon.extend({
        options: {
            html: '<div class="responsive-icon"></div>'
        }
    });

    L.responsiveIcon = function (options) {
        return new L.ResponsiveIcon(options);
    };

    L.Map.addInitHook(function () {
        var map = this;

        map.on('zoomend', function (e) {
            var container = map.getContainer();
            var zoom = map.getZoom();
            var className = container.className;

            className = className.replace(/\szoom-[0-9]{1,2}/g, '') + ' zoom-' + zoom;

            container.className = className;
        });
    });
}(L));
