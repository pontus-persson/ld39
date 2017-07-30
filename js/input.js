/**
 * Input handler
 *
 * todo?: get a combined wanted input type thing, for example: input.getMovement() that
 * returns a vector of player movement that takes both controller and keyboard input
 * into consideration.
 *
 */
(function(exports) {
    'use strict';
    var Input = exports.Input = function(options) {
        // Holds pressed keys as keycodes
        this.keysPressed = {};
        this.keys = {
            // other
            'shift':16, 'ctrl':17, 'enter':13, 'space':32, 'escape':27, '+':107, '-':109, 'insert':45, 'delete':46, 'home':36, 'end':35,
            // numbers
            '1':49, '2':50, '3':51, '4':52, '5':53, '6':54, '7':55, '8':56, '9':57, '0':58,
            // letters
            'w':87, 'a':65, 's':83, 'd':68,
            // arrowkeys
            'up':38, 'left':37, 'down':40, 'right':39,
        };
        // Holds mouse buttons pressed
        this.buttonsPressed = {};
        this.buttons = {
            'left':   0,
            'middle': 1,
            'right':  2,
        };
        // window relative mouse position
        this.mouse = new ea.Vec2();
        this.lastmouse = new ea.Vec2();

        // gamepad variables
        this.controllers = [];
        this.controllerSensitivity = 0.1;

        // Bind all the things
        window.addEventListener('keydown', this.keyDown.bind(this));
        window.addEventListener('keyup', this.keyUp.bind(this));
        window.addEventListener('mousemove', this.mouseMove.bind(this));
        window.addEventListener('mousedown', this.mouseDown.bind(this));
        window.addEventListener('mouseup', this.mouseUp.bind(this));
        window.addEventListener('gamepadconnected', this.gamepadAdd.bind(this));
        window.addEventListener('gamepaddisconnected', this.gamepadRemove.bind(this));
        // IE9, Chrome, Safari, Opera
        window.addEventListener("mousewheel", this.mousewheelHandler.bind(this), false);
        // Firefox
        window.addEventListener("DOMMouseScroll", this.mousewheelHandler.bind(this), false);
    }

    /**
     * Keyboard functions
     */
    Input.prototype.keyDown = function(e) { // handle keyboard press down of key
        var event = e || window.event;
        this.keysPressed[event.keyCode] = true;
        // console.log(event.keyCode);
    }

    Input.prototype.keyUp = function(e) { // handles keyboard release of key
        var event = e || window.event;
        this.keysPressed[event.keyCode] = false;
    }

    Input.prototype.isKeyPressed = function(key) { // return if specific key is pressed
        if (this.keys[key]) {
            return this.keysPressed[this.keys[key]];
        }
        return false;
    }

    /**
     * Mouse functions
     */
    Input.prototype.mouseMove = function(e) {
        this.lastmouse.setVec(this.mouse);
        this.mouse.set(e.pageX || e.clientX, e.pageY || e.clientY);
    }

    Input.prototype.mouseDown = function(e) {
        // e.preventDefault();
        this.buttonsPressed[e.button] = true;
    }

    Input.prototype.mouseUp = function(e) {
        // e.preventDefault();
        this.buttonsPressed[e.button] = false;
    }

    Input.prototype.isButtonPressed = function(button) {
        return this.buttonsPressed[this.buttons[button]];
    }

    /**
     * GAMEPAD stuff!
     */
    Input.prototype.gamepadAdd = function(gamepad) {
        gamepad = gamepad.gamepad || gamepad;
        console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
            gamepad.index, gamepad.id,
            gamepad.buttons.length, gamepad.axes.length
        );
        this.controllers[gamepad.index] = gamepad;
    }

    Input.prototype.gamepadRemove = function(gamepad) {
        gamepad = gamepad.gamepad || gamepad;
        console.log("Gamepad disconnected from index %d: %s",
            gamepad.index, gamepad.id
        );
        delete this.controllers[gamepad.index];
    }

    Input.prototype.gamepadUpdate = function(e) {
        var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
        for (var i = 0; i < gamepads.length; i++) {
            if (gamepads[i]) {
                if (gamepads[i].index in this.controllers) {
                    this.controllers[gamepads[i].index] = gamepads[i];
                } else {
                    this.gamepadAdd(gamepads[i]);
                }
            }
        }
    }

    Input.prototype.gamepadGetAxis = function(index) {
        if(this.controllers.length < 1) return [0,0];
        // 1 = 0,  2 = 2
        // 3 = 4,  4 = 6
        var i = (index - 1) * 2;
        var axes = this.controllers[0].axes;
        if(axes[i] && axes[i+1]) {
            return [
                ea.zerorange(axes[i],   -this.controllerSensitivity, this.controllerSensitivity),
                ea.zerorange(axes[i+1], -this.controllerSensitivity, this.controllerSensitivity)
            ];
        }
        return [0,0];
    }

    Input.prototype.gamepadGetButton = function(index) {
        if(this.controllers.length < 1) return 0;
        var buttons = this.controllers[0].buttons;
        if(buttons[index] && buttons[index].pressed) {
            return buttons[index].value;
        }
        return false;
        // Do this in update and create "events" for button presses?
        // for (var i = 0; i < buttons.length; i++) {
        //     var button = buttons[i];
        //     if(button.pressed) {
        //         console.log("button pressed at index %d value %f", i, button.value);
        //     }
        // }
    }

    Input.prototype.mousewheelHandler = function(event) {
        var e = window.event || event;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        // console.log(delta);
        if (this.wheelCallback) {
            this.wheelCallback(delta);
        }
        return false;
    }

    Input.prototype.setWheelCallback = function(callback) {
        this.wheelCallback = callback;
    }

}(ea));