/**
 * Vec2
 */
(function(exports) {
    'use strict';
    var Vec2 = exports.Vec2 = function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    Vec2.prototype.len = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    Vec2.prototype.set = function(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    Vec2.prototype.setVec = function(vec) {
        this.x = vec.x;
        this.y = vec.y;
    }
    Vec2.prototype.setSub = function (v0, v1) {
        this.x = v0.x - v1.x;
        this.y = v0.y - v1.y;
        return this;
    }
    Vec2.prototype.add = function(a) {
        this.x += a;
        this.y += a;
        return this;
    }
    Vec2.prototype.addVec = function(vec) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }
    Vec2.prototype.sub = function(s) {
        this.x -= s;
        this.y -= s;
        return this;
    }
    Vec2.prototype.subVec = function(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }
    Vec2.prototype.mul = function(m) {
        this.x *= m;
        this.y *= m;
        return this;
    }
    Vec2.prototype.mulVec = function(vec) {
        this.x *= vec.x;
        this.y *= vec.y;
        return this;
    }
    Vec2.prototype.div = function(d) {
        this.x /= d;
        this.y /= d;
        return this;
    }
    Vec2.prototype.divVec = function(vec) {
        this.x /= vec.x;
        this.y /= vec.y;
        return this;
    }
    Vec2.prototype.dot = function(vec) {
        return this.x * vec.x + this.y * vec.y;
    }
    Vec2.prototype.normalize = function() {
        var l = this.len();
        if(l != 0) this.div(l);
        return this;
    }
    Vec2.prototype.invert = function() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }
    Vec2.prototype.perp = function(vec) {
        this.x = -vec.y;
        this.y =  vec.x;
        return this;
    }
    Vec2.prototype.angleTo = function(vec) {
        return Math.acos(
            (this.x * vec.x + this.y * vec.y) /
            Math.sqrt(this.x * this.x + this.y * this.y) /
            Math.sqrt(vec.x * vec.x + vec.y * vec.y)
        );
    }
    Vec2.prototype.limit = function(limit) {
        var l = this.len();
        if(l > limit) {
            this.normalize();
            this.mul(limit);
        }
        return this;
    }
    Vec2.prototype.draw = function(ctx, r) {
        var rad = r || this.len();
        ctx.beginPath();
        ctx.arc(this.x, this.y, r, 0, 2 * Math.PI);
        ctx.closePath();
        // ctx.fillStyle = vektor.getRandomHex();
        ctx.fillStyle = "#FF0000";
        ctx.fill();
    }
}(ea));