(function(exports) {
    'use strict';
    var Level = exports.Level = function(options) {

        this.clearMap();
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
        // ** COMPONENTS **
        this.blocks.push(new ea.Block({ // resistor?
            tx: 0, ty: 3,
            rotation: 0,
            component: true
        }));
        this.blocks.push(new ea.Block({ // something...
            tx: 0, ty: 4,
            rotation: 0,
            component: true
        }));

    }

    Level.prototype.clearMap = function() {
        this.activeComponents = 0;
        this.totalComponents = 0;
        this.map = [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
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
    }

    Level.prototype.loadMap = function(map) {
        var self = this;
        fetch(map)
            .then(response => response.json())
            .then(function(json) {
                self.activeComponents = 0;
                self.totalComponents = 0;
                self.map = json;
                for (var my = 0; my < self.map.length; my++) {
                    for (var mx = 0; mx < self.map[my].length; mx++) {
                        var block = self.blocks[self.map[my][mx]];
                        if (block.component) {
                            self.totalComponents++;
                        }
                    }
                }
                self.checkWin();
            });
        ea.power = 100;
    }

    Level.prototype.shuffleMap = function() {
        var currentIndex = (this.map.length * this.map[0].length) - 1, temporaryValue, randomIndex;
        var ry, rx, cy, cx;
        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            // convert indexes to x/y
            cy = Math.floor(currentIndex / this.map[0].length);
            cx = (currentIndex % this.map[0].length);
            ry = Math.floor(randomIndex / this.map[0].length);
            rx = (randomIndex % this.map[0].length);
            // switch values
            if(this.blocks[this.map[ry][rx]].component) {
            } else {
                if (!this.blocks[this.map[cy][cx]].component) {
                    temporaryValue = this.map[cy][cx];
                    this.map[cy][cx] = this.map[ry][rx];
                    this.map[ry][rx] = temporaryValue;
                }
                currentIndex -= 1;
            }
        }
        document.getElementById('mapjson').innerHTML = JSON.stringify(this.map);
    }

    Level.prototype.restartLevel = function() {
        this.loadMap('assets/maps/map'+ea.level+'.json');
    }

    Level.prototype.nextLevel = function() {
        ea.level++;
        this.loadMap('assets/maps/map'+ea.level+'.json');
    }

    Level.prototype.checkWin = function() {
        // reset actives
        this.activeComponents = 0;
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
                if (this.activeComponents == this.totalComponents) {
                    // vi won
                    if ((ea.level + 1) > ea.maxLevel) {
                        document.getElementById("youwon").classList.toggle('show');
                        ea.gamemode = 4;
                        return false;
                    }
                    this.nextLevel();
                }
            } else {
                // vi not won
                //
            }
        } else {
            this.active[py][px] = 0;
        }
    }

    Level.prototype.setActives = function(oldX, oldY) {
        // Check for out of bounds or if we already checked this tile
        if(oldY < 0 || oldY >= this.map.length ||
           oldX < 0 || oldX >= this.map[0].length ||
           this.active[oldY][oldX]) {
            return false;
        }

        this.active[oldY][oldX] = 1;
        var current = this.blocks[this.map[oldY][oldX]];
        if (current === 0) {
            return false;
        }

        if (current.component) {
            this.activeComponents++;
            var ret = false;
            if (oldX+1 < this.map[0].length &&
                this.getFromDirX(this.blocks[this.map[oldY][oldX+1]]) == 1 &&
                this.getFromDirY(this.blocks[this.map[oldY][oldX+1]]) == 0 &&
                this.setActives(oldX+1, oldY)) {
                    ret = true;
            }
            if (oldY+1 < this.map.length &&
                this.getFromDirX(this.blocks[this.map[oldY+1][oldX]]) == 0 &&
                this.getFromDirY(this.blocks[this.map[oldY+1][oldX]]) == 1 &&
                this.setActives(oldX, oldY+1)) {
                    ret = true;
            }
            if (oldX-1 >= 0 &&
                this.getFromDirX(this.blocks[this.map[oldY][oldX-1]]) == -1 &&
                this.getFromDirY(this.blocks[this.map[oldY][oldX-1]]) == 0 &&
                this.setActives(oldX-1, oldY)) {
                    ret = true;
            }
            if (oldY-1 >= 0 &&
                this.getFromDirX(this.blocks[this.map[oldY-1][oldX]]) == 0 &&
                this.getFromDirY(this.blocks[this.map[oldY-1][oldX]]) == -1 &&
                this.setActives(oldX, oldY-1)) {
                    ret = true;
            }
            return ret;
        }

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
        if (next.component ||
            (this.getToDirX(current) === this.getFromDirX(next) &&
            this.getToDirY(current) === this.getFromDirY(next))) {
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
