var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        _super.call(this);
        this._time = 0;
        this.view = new egret.Bitmap(RES.getRes("hero"));
        this.view.x = CONST.stageWidth >> 1;
        this.view.y = CONST.stageHeight - 100;
    }
    Hero.prototype.onEnterFrame = function (advancedTime) {
        this._time += advancedTime;
        if (this._time > CONST.heroBulletGap) {
            this._time = 0;
            this.createBullet();
        }
    };
    /**
     * 创建子弹
     */
    Hero.prototype.createBullet = function () {
        var bullet = ObjectPool.getInstance().createObject(Bullet);
        Main.instance.addChild(bullet.view);
        bullet.view.x = this.view.x;
        bullet.view.y = this.view.y;
    };
    Hero.prototype.moveXY = function (x, y) {
        this.view.x += x;
        this.view.y += y;
    };
    Hero.key = "hero";
    return Hero;
})(GameObject);
