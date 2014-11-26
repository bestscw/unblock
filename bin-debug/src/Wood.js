var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Wood = (function (_super) {
    __extends(Wood, _super);
    function Wood() {
        _super.call(this);
        this._time = 0;
        this.style = 0; // 0 要解锁的木块 1 水平短木块  2 水平长木块 3 垂直短木块 4 垂直长木块
        this.direction = 0; // 0 水平移动 1垂直移动
        this._width = 0; // 木块宽度
        this._height = 0; // 木块高度
        if (DataManage.useBitmap) {
            this.view = new egret.Bitmap();
        }
        else {
            this.view = new egret.Sprite();
        }
    }
    Wood.prototype.onCreate = function () {
        //this.view.y = 0;
    };
    Wood.prototype.setView = function () {
        if (DataManage.useBitmap) {
            this.view.texture = RES.getRes("wood_" + this.style);
        }
        else {
            this.view.graphics.beginFill(0xFFFFFF, 1);
            this.view.graphics.lineStyle(0.3, 0xEEEEEE);
            this.view.graphics.drawRect(0, 0, this._width, this._height);
            this.view.graphics.endFill();
        }
    };
    /**
     * 检测被打中调用此方法
     */
    Wood.prototype.onHit = function (gameObject) {
        this.view.texture = RES.getRes("enemy2");
    };
    Wood.prototype.onDestroy = function () {
        if (this.view && this.view.parent) {
            this.view.parent.removeChild(this.view);
        }
    };
    Wood.prototype.moveXY = function (x, y) {
        this.view.x += x;
        this.view.y += y;
    };
    Wood.prototype.onEnterFrame = function (advancedTime) {
        /**
        this.view.y += advancedTime / 5;


        if (this.view.y > CONST.stageHeight) {
            ObjectPool.getInstance().destroyObject(this);
        }
         **/
    };
    Wood.key = "wood";
    return Wood;
})(GameObject);
