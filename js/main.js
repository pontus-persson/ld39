/**
 * Main game object, settings etc should go here
 */
var ea = window.ea = {
    name: "Esoteric Alteration",
    gamespeed: 1.0,
    gamestatus: 1,
    power: 100
}

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame    ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();