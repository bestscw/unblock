var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        _super.call(this);
        this.view = new egret.Bitmap();
    }
    Enemy.prototype.onCreate = function () {
        this.view.y = 0;
        this.view.texture = RES.getRes("enemy");
    };
    /**
     * 检测被打中调用此方法
     */
    Enemy.prototype.onHit = function (gameObject) {
        this.view.texture = RES.getRes("enemy2");
    };
    Enemy.prototype.onDestroy = function () {
        if (this.view && this.view.parent) {
            this.view.parent.removeChild(this.view);
        }
    };
    Enemy.prototype.onEnterFrame = function (advancedTime) {
        this.view.y += advancedTime / 5;
        if (this.view.y > CONST.stageHeight) {
            ObjectPool.getInstance().destroyObject(this);
        }
    };
    Enemy.key = "enemy";
    return Enemy;
})(GameObject);
