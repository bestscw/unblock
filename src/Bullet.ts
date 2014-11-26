class Bullet extends GameObject {
    public static key:string = "bullet";

    constructor() {
        super();
        this.view = new egret.Bitmap(RES.getRes("bullet"));
    }

    public onCreate():void {

    }

    public onDestroy():void {
        if (this.view && this.view.parent) {
            this.view.parent.removeChild(this.view);
        }
    }

    /**基于矩形的碰撞检测*/
    private _hitTest(obj1:egret.DisplayObject,obj2:egret.DisplayObject):boolean
    {
        var rect1:egret.Rectangle = obj1.getBounds();
        var rect2:egret.Rectangle = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;

        return rect1.intersects(rect2);
    }

    public onEnterFrame(advancedTime:number):void {
        this.view.y -= advancedTime / 5;

        var all_enemy:Array<any> = [];
        all_enemy = ObjectPool.getInstance().getObjectsByKey(Enemy.key);
        for (var i = 0; i < all_enemy.length; i++) {
            var enemy = all_enemy[i];
            if(this._hitTest(this.view,enemy.view))
            {
                ObjectPool.getInstance().destroyObject(this);
                enemy.onHit();
            }
        }

        if (this.view.y < 0) {
            ObjectPool.getInstance().destroyObject(this);
        }
    }
}