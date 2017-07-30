(function(exports) {
    'use strict';
    var Audio = exports.Audio = function(options) {
        this.sounds = {};
    }

    /**
     * Load Sound and return object
     */
    Audio.prototype.loadSound = function(url, id) {
        this.sounds[id] = new Audio(url);
        this.sounds[id].src = url;
        return this.sounds[id];
    }

    /**
     * Return already loaded Sound
     */
    Audio.prototype.getSound = function(id) {
        return this.sounds[id];
    }

    /**
     * Play sound
     */
    Audio.prototype.playSound = function(id) {
        this.sounds[id].play();
    }

    /**
     * Stop sound
     */
    Audio.prototype.playSound = function(id) {
        this.sounds[id].pause();
        this.sounds[id].currentTime = 0;
    }

    /**
     * Pause sound
     */
    Audio.prototype.playSound = function(id) {
        this.sounds[id].pause();
    }

}(ea));