/* global describe: false, it: false */

var TapTempo = require('../tap-tempo');

describe('TapTempo', function () {

    it('initializes itself with defaults', function () {
        var tapTempo = new TapTempo();

        expect(tapTempo.resolution).to.equal(0);
        expect(tapTempo.ontempochange).to.equal(void 0);
    });

    it('accepts configuration options', function () {
        var callback = function () {},
            tapTempo = new TapTempo({
                resolution : 1,
                ontempochange : callback,
            });

        expect(tapTempo.resolution).to.equal(1);
        expect(tapTempo.ontempochange).to.equal(callback);
    });

});
