var DEFAULT_RESOLUTION = 0,
    MAX_TAPS = 4,
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
    var diffs = [];
    for (var i = 0; i < tapTempo._taps.length; i = i + 1) {
        if (i > 0) {
            diffs.push(getTapDiff(tapTempo, i));
        }
    }
    tapTempo.tempo = quarterNoteDurationToBpm(average(diffs)).toFixed(tapTempo.resolution);
}

function getOption(opts, name, defaultValue) {
    if (opts && opts.hasOwnProperty(name)) {
        return opts[name];
    }
    return defaultValue;
}

function addOption(tapTempo, opts, name, defaultValue) {
    tapTempo[name] = getOption(opts, name, defaultValue);
}

function TapTempo(opts) {
    this._taps = [];
    addOption(this, opts, 'resolution', DEFAULT_RESOLUTION);
    addOption(this, opts, 'ontempochange');
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

module.exports = TapTempo;
