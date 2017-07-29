(function(exports) {
    'use strict';
    var Level = exports.Level = function(options) {

        this.map = [
            [1 , 2 , 3 , 4 , 0 , 0 , 0 , 0],
            [5 , 6 , 7 , 8 , 0 , 0 , 0 , 0],
            [9 , 10, 11, 12, 0 , 0 , 0 , 0],
            [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
            [1 , 1 , 1 , 3 , 0 , 0 , 0 , 0],
            [5 , 5 , 5 , 3 , 0 , 0 , 0 , 0],
            [11, 11, 11, 3 , 0 , 0 , 0 , 0],
            [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
        ];

        this.active = [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
        ];

        this.utils = new ea.Utils();

        // hold avalible blocktypes
        this.blocks = [0]; // zero is not a block
        this.blocks.push(new ea.Block({ // 1 // right to left
            tx: 0, ty: 0,
            rotation: 0,
            right: 1, left: 2
        }));
        this.blocks.push(new ea.Block({ // 2 // left to right
            tx: 0, ty: 0,
            rotation: this.utils.degToRad(180),
            left: 1, right: 2
        }));
        this.blocks.push(new ea.Block({ // 3 // up to down
            tx: 0, ty: 0,
            rotation: this.utils.degToRad(270),
            up: 1, down: 2,
        }));
        this.blocks.push(new ea.Block({ // 4 // down to up
            tx: 0, ty: 0,
            rotation: this.utils.degToRad(90),
            down: 1, up: 2,
        }));
        // ***************
        this.blocks.push(new ea.Block({ // 5 // right to down
            tx: 0, ty: 1,
            right: 1, down: 2,
        }));
        this.blocks.push(new ea.Block({ // 6 // down to left
            tx: 0, ty: 1,
            rotation: this.utils.degToRad(90),
            down: 1, left: 2,
        }));
        this.blocks.push(new ea.Block({ // 7 // left to up
            tx: 0, ty: 1,
            rotation: this.utils.degToRad(180),
            left: 1, up: 2,
        }));
        this.blocks.push(new ea.Block({ // 8 // up to right
            tx: 0, ty: 1,
            rotation: this.utils.degToRad(270),
            up: 1, right: 2,
        }));
        // ***************
        this.blocks.push(new ea.Block({ // 9 // down to right
            tx: 0, ty: 2,
            rotation: 0,
            down: 1, right: 2,
        }));
        this.blocks.push(new ea.Block({ // 10 // left to down
            tx: 0, ty: 2,
            rotation: this.utils.degToRad(90),
            left: 1, down: 2,
        }));
        this.blocks.push(new ea.Block({ // 10 // up to left
            tx: 0, ty: 2,
            rotation: this.utils.degToRad(180),
            up: 1, left: 2,
        }));
        this.blocks.push(new ea.Block({ // 10 // right to up
            tx: 0, ty: 2,
            rotation: this.utils.degToRad(270),
            right: 1, up: 2,
        }));

    }

    Level.prototype.checkWin = function() {
        // reset actives
        this.active = [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
        ];
        // star checking from here
        var px = 7, py = 0;
        if(this.blocks[this.map[py][px]].right == 1) {
            if(this.setActives(px, py)) {
                // vi won
                console.log('YES');
                alert("YOU WON");
            } else {
                // vi not won
                console.log('NO');
            }
        } else {
            this.active[py][px] = 0;
        }
    }

    Level.prototype.setActives = function(oldX, oldY) {
        this.active[oldY][oldX] = 1;
        var current = this.blocks[this.map[oldY][oldX]];
        // console.log(current);
        var nx = oldX += this.getToDirX(current);
        var ny = oldY += this.getToDirY(current);
        // Check for GOAL
        if(ny == 7 && nx == -1) {
            return true;
        }
        // Check for out of bounds
        if(ny < 0 || ny >= this.map.length ||
           nx < 0 || nx >= this.map[0].length) {
            return false;
        }
        var next = this.blocks[this.map[ny][nx]];
        // check if "connections" are correct
        if (this.getToDirX(current) === this.getFromDirX(next) &&
            this.getToDirY(current) === this.getFromDirY(next)) {
            return this.setActives(nx, ny);
        } else {
            return false;
        }
    }

    Level.prototype.getToDirX = function(block) {
        if (block.left == 2) return -1;
        else if (block.right == 2) return 1;
        else return 0;
    }
    Level.prototype.getToDirY = function(block) {
        if (block.up == 2) return -1;
        else if (block.down == 2) return 1;
        else return 0;
    }
    Level.prototype.getFromDirX = function(block) {
        if (block.left == 1) return 1;
        else if (block.right == 1) return -1;
        else return 0;
    }
    Level.prototype.getFromDirY = function(block) {
        if (block.up == 1) return 1;
        else if (block.down == 1) return -1;
        else return 0;
    }

}(ea));
