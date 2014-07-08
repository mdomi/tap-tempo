/* global describe: false, it: false, beforeEach: false, afterEach: false, sinon: false */

var TapTempo = require('../tap-tempo');

describe('TapTempo', function () {

    var oldNow,
        now;

    beforeEach(function () {
        if (!window.performance) {
            window.performance = {};
        }
        if (window.performance.now) {
            oldNow = window.performance.now;
        }
        now = window.performance.now = sinon.stub();
    });

    it('initializes itself with defaults', function () {
        var tapTempo = new TapTempo();

        expect(tapTempo.tempo).to.equal(void 0);
        expect(tapTempo.resolution).to.equal(0);
        expect(tapTempo.ontempochange).to.equal(void 0);
    });

    it('accepts configuration options', function () {
        var callback = function () {},
            tapTempo = new TapTempo({
                resolution : 1,
                ontempochange : callback,
            });

        expect(tapTempo.tempo).to.equal(void 0);
        expect(tapTempo.resolution).to.equal(1);
        expect(tapTempo.ontempochange).to.equal(callback);
    });

    it('coverts taps to a tempo', function () {
        var tapTempo = new TapTempo();

        // 500 ms in between beats = 120 bpm
        now.onCall(0).returns(1000);
        now.onCall(1).returns(1500);
        now.onCall(2).returns(2000);
        // slow down slightly to average out to 100 bpm
        now.onCall(3).returns(2800);

        tapTempo.tap();
        expect(tapTempo.tempo).to.equal(void 0, 'no tempo until more than one tap');

        tapTempo.tap();
        expect(tapTempo.tempo).to.equal(120);
        tapTempo.tap();
        expect(tapTempo.tempo).to.equal(120);
        tapTempo.tap();
        expect(tapTempo.tempo).to.equal(100);

    });

    afterEach(function () {
        window.performance.now = oldNow;
    });

});
