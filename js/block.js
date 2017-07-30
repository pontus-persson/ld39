/**
 * Directions
 * 1: up, 2: right, 3:down, 4: left
 */
(function(exports) {
    'use strict';
    var Block = exports.Block = function(options) {
        // tilemap position
        this.tx = options.tx || 0;
        this.ty = options.ty || 0;
        // rotation of tile
        this.rotation = options.rotation || 0;
        // is tile a component
        this.component = options.component || false;
        // direction of input and output
        this.up    = options.up    || false;
        this.right = options.right || false;
        this.down  = options.down  || false;
        this.left  = options.left  || false;
    }

    Block.prototype.asd = function(x, min, max) {
    };

}(ea));
