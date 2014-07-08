(function (TapTempo, document) {
    'use strict';

    var tapTempo = new TapTempo(),
        button = document.getElementById('tap'),
        display = document.getElementById('tempo');

    tapTempo.ontempochange = function () {
        display.innerHTML = tapTempo.tempo;
    };

    button.addEventListener('click', function () {
        tapTempo.tap();
    }, false);

}(this.TapTempo, this.document));
