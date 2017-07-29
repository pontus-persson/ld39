(function(exports) {
    'use strict';
    var Utils = exports.Utils = function() {
        // this.hej = 1;
    }

    // clamp value to range
    Utils.prototype.clamp = function(x, min, max) {
        return Math.min(Math.max(x, min), max)
    };

    // return zero if value is within range
    Utils.prototype.zerorange = function(x, min, max) {
        if (x < max && x > min) {
            return 0;
        }
        return x;
    };

    // Return a random hex color
    Utils.prototype.getRandomHex = function() {
        return '#'+ ('000000' + (Math.random()*0xFFFFFF<<0).toString(16)).slice(-6);
    };

    // Console log just once a second
    Utils.prototype.logsec = function(...what) {
        if (typeof this.logtime === 'undefined') {
            this.logtime = new Date();
        }
        var now = new Date();
        if(now.getTime() - this.logtime.getTime() > 1000) {
            console.log(what);
            this.logtime = now;
        }
    };

    // callback to do nothing
    Utils.prototype.preventdefault = function(e) {
        e.preventDefault();
    };

    // check if Array contains object
    Utils.prototype.arrContains = function(a, obj) {
        var i = a.length;
        while (i--) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    };

    // check if Object contains object
    Utils.prototype.objContains = function(a, obj) {
        for (var key in a) {
            if (a.hasOwnProperty(key) && a[key] == obj) return true;
        }
        return false;
    };

    // Radians to degree
    Utils.prototype.radToDeg = function(val) {
        return val * 180 / Math.PI;
    };

    // Degrees to radians
    Utils.prototype.degToRad = function(val) {
        return val / 180 * Math.PI;
    };

}(ea));
