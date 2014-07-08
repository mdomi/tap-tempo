(function (window) {
    'use strict';

    var MAX_TAPS = 4,
        MS_PER_SECOND = 1000,
        SECONDS_PER_MINUTE = 60,
        MS_PER_MINUTE = MS_PER_SECOND * SECONDS_PER_MINUTE;

    function add(a, b) {
        return a + b;
    }

    function average(values) {
        return values.reduce(add, 0) / values.length;
    }

    function quarterNoteDurationToBpm(duration) {
        return MS_PER_MINUTE / duration;
    }

    function getTapDiff(tapTempo, i) {
        return tapTempo._taps[i] - tapTempo._taps[i - 1];
    }

    function setTempo(tapTempo) {
        var diffs = [],
            taps = tapTempo._taps;
        for (var i = 0; i < taps.length; i = i + 1) {
            if (i > 0) {
                diffs.push(getTapDiff(tapTempo, i));
            }
        }
        tapTempo.tempo = quarterNoteDurationToBpm(average(diffs)).toFixed(tapTempo.resolution);
    }

    function TapTempo() {
        this.resolution = 0;
        this._taps = [];
    }

    TapTempo.prototype._emitTempoChange = function () {
        if (typeof this.ontempochange === 'function') {
            this.ontempochange(this.tempo);
        }
    };

    TapTempo.prototype.tap = function () {
        this._taps.push(window.performance.now());

        if (this._taps.length > MAX_TAPS) {
            this._taps.shift();
        }

        setTempo(this);

        if (this._taps.length > 1) {
            this._emitTempoChange();
        }
    };

    window.TapTempo = TapTempo;

}(this));
