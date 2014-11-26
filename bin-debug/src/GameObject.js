var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameObject = (function (_super) {
    __extends(GameObject, _super);
    function GameObject() {
        _super.call(this);
    }
    GameObject.prototype.onCreate = function () {
    };
    GameObject.prototype.onDestroy = function () {
    };
    GameObject.prototype.onEnterFrame = function (advancedTime) {
    };
    GameObject.prototype.onHit = function (gameObject) {
    };
    return GameObject;
})(egret.HashObject);
