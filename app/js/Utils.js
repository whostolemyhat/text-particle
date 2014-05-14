var Utility = (function() {
    function pickLetter() {
        // 33 - 126
        return String.fromCharCode(randomRange(33, 126));
    }

    // http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
    function randomRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomNumber(min, max) {
        return min + Math.random() * (max - min);
    }

    // hex = colour, lum = % lighter
    // eg alterShade('#69c', 0.2) = '#7ab8f5': 20% lighter
    // also accepts negative lum values
    function alterShade(hex, lum) {
        // strip hex to make sure only numbers
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        // make sure always 6 digits
        if(hex.length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }

        lum = lum || 0;

        var rgb = '#';
        var c;
        var i;
        for(i = 0; i < 3; i++) {
            // convert to decimal
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ('00' + c).substr(c.length);
        }

        return rgb;
    }

    // utility
    function getMouseClick(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    return {
        pickLetter: pickLetter,
        randomRange: randomRange,
        getMouseClick: getMouseClick,
        alterShade: alterShade,
        randomNumber: randomNumber
    };
})();