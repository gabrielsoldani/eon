(function (window) {
    'use strict';

    function pad2 (x) {
        return (x > 9 ? '' : '0') + x;
    }

    function formatTime (date) {
        return `${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`;
    }

    function formatTimeDifference (diff) {
        let absDiff = Math.abs(absDiff);
        let sec = Math.floor(absDiff % (60 * 1000) / 1000);
        let min = Math.floor(absDiff % (60 * 60 * 1000) / (60 * 1000));
        return `${pad2(min)}m${pad2(sec)}s`;
    }

    window.utils = {
        pad2: pad2,
        formatTime: formatTime,
        formatTimeDifference: formatTimeDifference
    };
})(window);
