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

    var dragging = false;
    var selected = 0;
    var powerbar = document.getElementById('bar');

    // Update power
    var powerInterval = setInterval(function() {
        ea.power--;
        powerbar.style.height = ea.power+'%';
        if (ea.power < 1) {
            // WE IS KILL
            console.log('IS KILL');
        } else if(ea.power == 50) {
            // fade to yellow?
        }
    }, 500);

    function update() {
        display.clear();

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

        display.drawText("x:"+tx+" y:"+ty, 10, 10, '#fff');

        if (input.isButtonPressed('left')) {
            if (!dragging) {
                if (typeof level.map[ty] !== 'undefined' && typeof level.map[ty][tx] !== 'undefined' && level.map[ty][tx] !== 0) {
                    dragging = true;
                    selected = level.map[ty][tx];
                    level.map[ty][tx] = 0;
                    level.checkWin();
                }
            }
        } else {
            if (dragging) {
                if (typeof level.map[ty] !== 'undefined' && typeof level.map[ty][tx] !== 'undefined' && level.map[ty][tx] == 0) {
                    dragging = false;
                    level.map[ty][tx] = selected;
                    level.checkWin();
                }
            }
        }

        if (dragging && selected) {
            // console.log(selected);
            display.drawTilePX(cx - 32, cy - 32, level.blocks[selected]);
        }

        // display.drawTile(20,52, 0, 1);
        // display.drawTile(52,52, 1, 1);

        requestAnimFrame(update);
    };

    // start drawing!
    requestAnimFrame(update);
};
