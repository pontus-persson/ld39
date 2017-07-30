/**
 * Main game object, settings etc should go here
 */
var ea = window.ea = {
    name: "Esoteric Alteration",
    gamespeed: 1.0,
    gamemode: 1, // 1 normal, 2 mapedit
    power: 100,
    level: 1,
    maxLevel: 6,
}

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame    ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();