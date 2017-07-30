/**
 * Ideas
 *
 * Puzzle like game where you have like tetris blocks and drag n drop them to build a power line
 * on a game field, power meter that ticks down.
 *
 * Light up blocks that are connected as you lay tiles out
 */
function start() {
    var utils = new ea.Utils();
    var input = new ea.Input();
    var level = new ea.Level();
    var display = new ea.Display({
        container: 'gamearea',
        width: 640,
        height: 720,
    });

    var dragging = false, placing = false;
    var selected = 0;
    var powerbar = document.getElementById('bar');
    var modal = document.getElementById("modal");

    document.getElementById("restartButton").onclick = function() {
        ea.gamemode = 1;
        level.restartLevel();
    }
    document.getElementById("helpButton").onclick = function() {
        if(ea.gamemode == 2) {
            document.getElementById('mapjson').innerHTML = JSON.stringify(level.map);
            document.getElementById('mapjson').style.display = "block";
        } else {
            document.getElementById('mapjson').style.display = "none";
        }
        modal.classList.toggle('show');
        if(modal.classList.contains('show')) {
            ea.gamemode = 3;
        }
    }
    document.getElementById("closeButton").onclick = function() {
        ea.gamemode = 1;
        modal.classList.toggle('show');
    }

    // Update power
    var powerInterval = setInterval(function() {
        if(ea.gamemode == 1) {
            ea.power--;
        }
        powerbar.style.height = ea.power+'%';
        if (ea.power < 1) {
            // WE IS KILL
            alert("Battery is empty! Try again with a fresh battery.");
            level.restartLevel();
        } else if(ea.power == 50) {
            // fade to yellow?
        }
    }, 500);

    input.setWheelCallback(function(delta) {
        if (ea.gamemode == 2) {
            selected += delta;
            if(selected < 0) selected = 0;
            if(selected >= level.blocks.length) selected = level.blocks.length;
        }
        // console.log(delta);
    });

    // use restart to load current level
    level.restartLevel();

    // update game / draw
    function update() {
        display.clear();

        if (ea.gamemode == 4) {
            return;
        }

        for (var y = 0; y < level.map.length; y++) {
            for (var x = 0; x < level.map[y].length; x++) {
                var block = level.map[y][x];
                display.drawTile(x, y, level.blocks[block], level.active[y][x]);
            }
        }

        // draw start and goal
        display.drawImage(64+level.map[0].length*64, 64, 2, 0);
        display.drawImage(0, level.map.length*64, 2, 1);
        // offset to canvas
        var cx = input.mouse.x - display.canvaspos.left;
        var cy = input.mouse.y - display.canvaspos.top;
        // offset to level
        var mx = cx - 64;
        var my = cy - 64;
        // tile pos
        var tx = Math.floor(mx / 64);
        var ty = Math.floor(my / 64);

        // display.drawText("x:"+tx+" y:"+ty, 10, 10, '#fff');
        display.drawText("Powered components: "+level.activeComponents+"/"+level.totalComponents, 64, 20, '#fff');
        display.drawText("Power: "+ea.power+"%", 64*7, 20, '#fff');
        display.drawText("Level: "+ea.level+"/"+ea.maxLevel, 64, 20+64*9, '#fff');

        if (input.isButtonPressed('left')) {
            if (!dragging) {
                if (typeof level.map[ty] !== 'undefined' && typeof level.map[ty][tx] !== 'undefined' && level.map[ty][tx] !== 0) {
                    if(!(ea.gamemode == 1 && level.blocks[level.map[ty][tx]].component)) {
                        dragging = true;
                        selected = level.map[ty][tx];
                        level.map[ty][tx] = 0;
                        level.checkWin();
                    }
                }
            }
        } else {
            if (dragging && !placing) {
                if (typeof level.map[ty] !== 'undefined' && typeof level.map[ty][tx] !== 'undefined' && level.map[ty][tx] == 0) {
                    dragging = false;
                    level.map[ty][tx] = selected;
                    level.checkWin();
                }
            }
        }

        if (input.isKeyPressed('escape')) {
            if (modal.classList.contains('show')) {
                ea.gamemode = 1;
                modal.classList.toggle('show');
            }
        }

        // if (input.isKeyPressed('insert')) {
        //     ea.gamemode = 1;
        // } else if (input.isKeyPressed('delete')) {
        //     ea.gamemode = 2;
        // }


        // mapeditor stuff
        if (ea.gamemode == 2) {

            if (input.isButtonPressed('right')) {
                dragging = false;
                selected = 0;
                level.map[ty][tx] = 0;
                level.checkWin();
            }

            if (input.isKeyPressed('space')) {
                level.loadMap('assets/maps/map2.json');
            }
            if (input.isKeyPressed('shift')) {
                level.clearMap();
            }
            if (input.isKeyPressed('enter')) {
                level.shuffleMap();
            }
            if (input.isKeyPressed('1')) {
                if (selected < 1 || selected > 4) {
                    selected = 1;
                }
                placing = true; dragging = true;
            } else if (input.isKeyPressed('2')) {
                if (selected < 5 || selected > 8) {
                    selected = 5;
                }
                placing = true; dragging = true;
            } else if (input.isKeyPressed('3')) {
                if (selected < 9 || selected > 12) {
                    selected = 9;
                }
                placing = true; dragging = true;
            } else if (input.isKeyPressed('4')) {
                if (selected < 13 || selected > 14) {
                    selected = 13;
                }
                placing = true; dragging = true;
            } else {
                placing = false;
            }
        }

        if (dragging && selected) {
            display.drawTilePX(cx - 32, cy - 32, level.blocks[selected]);
        }

        requestAnimFrame(update);
    };

    // start drawing!
    requestAnimFrame(update);
};