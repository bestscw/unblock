var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        _super.call(this);
        this.view = new egret.Bitmap(RES.getRes("bullet"));
    }
    Bullet.prototype.onCreate = function () {
    };
    Bullet.prototype.onDestroy = function () {
        if (this.view && this.view.parent) {
            this.view.parent.removeChild(this.view);
        }
    };
    /**基于矩形的碰撞检测*/
    Bullet.prototype._hitTest = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    };
    Bullet.prototype.onEnterFrame = function (advancedTime) {
        this.view.y -= advancedTime / 5;
        var all_enemy = [];
        all_enemy = ObjectPool.getInstance().getObjectsByKey(Enemy.key);
        for (var i = 0; i < all_enemy.length; i++) {
            var enemy = all_enemy[i];
            if (this._hitTest(this.view, enemy.view)) {
                ObjectPool.getInstance().destroyObject(this);
                enemy.onHit();
            }
        }
        if (this.view.y < 0) {
            ObjectPool.getInstance().destroyObject(this);
        }
    };
    Bullet.key = "bullet";
    return Bullet;
})(GameObject);
