(function(exports) {
    'use strict';
    var Display = exports.Display = function(options) {
        this.options = {
            container:  options.container || null,
            width:      options.width     || 640,
            height:     options.height    || 480,
        };
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.options.width;
        this.canvas.height = this.options.height;
        this.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        };
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.tiles = document.createElement("img");
        this.tiles.src = "assets/images/tiles.png";
        document.getElementById(this.options.container).appendChild(this.canvas);
        window.addEventListener('resize', this.onResize.bind(this));
        this.onResize();
    }

    Display.prototype.drawTile = function(x, y, block, a) {
        var active = a || false;
        this.ctx.translate(64+32+x*64, 64+32+y*64);
        this.ctx.rotate(block.rotation);
        if(block === 0) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = "#000";
            this.ctx.lineWidth="1";
            this.ctx.rect(-32, -32, 64, 64);
            this.ctx.stroke();
        } else {
            if (!block) {
                return;
            }
            this.ctx.drawImage(this.tiles,
                               block.tx*32+(active?32:0), block.ty*32, 32, 32,
                               -32, -32, 64, 64);
        }
        this.ctx.rotate(-block.rotation);
        this.ctx.translate(-64-32-x*64, -64-32-y*64);
    };

    Display.prototype.drawTilePX = function(x, y, block) {
        if(block === 0) {
            return;
        } else {
            this.ctx.translate(x+32, y+32);
            this.ctx.rotate(block.rotation);
            this.ctx.drawImage(this.tiles,
                               block.tx*32, block.ty*32, 32, 32,
                               -32, -32, 64, 64);
            this.ctx.rotate(-block.rotation);
            this.ctx.translate(-x-32, -y-32);
        }
    };

    Display.prototype.drawImage = function(x, y, tx, ty) {
        this.ctx.drawImage(this.tiles,
                           tx*32, ty*32, 32, 32,
                           x, y, 64, 64);
    };

    Display.prototype.clear = function() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // this.ctx.fillStyle = 'rgba(255,255,255,1)';
        this.ctx.fillStyle = 'rgba(0,0,0,0.6)';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = '#408d55';
        this.ctx.fillRect(64, 64, 8*64, 8*64);
    }

    Display.prototype.drawText = function(string, x, y, c) {
        var col = c || '#fff';
        this.ctx.font = '22px Arial';
        this.ctx.fillStyle = col;
        this.ctx.fillText(string, x, y+20);
    }

    Display.prototype.onResize = function() {
        this.canvaspos = this.canvas.getBoundingClientRect();
    }

}(ea));
