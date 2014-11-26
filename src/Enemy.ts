class Enemy extends GameObject {
    public static key:string = "enemy";

    constructor() {
        super();
        this.view = new egret.Bitmap();
    }

    public onCreate():void {
        this.view.y = 0;
        (<egret.Bitmap>this.view).texture = RES.getRes("enemy");
    }

    /**
     * 检测被打中调用此方法
     */
    public onHit(gameObject:GameObject):void {

        (<egret.Bitmap>this.view).texture = RES.getRes("enemy2");
    }


    public onDestroy():void {
        if (this.view && this.view.parent) {
            this.view.parent.removeChild(this.view);
        }
    }

    public onEnterFrame(advancedTime:number):void {
        this.view.y += advancedTime / 5;


        if (this.view.y > CONST.stageHeight) {
            ObjectPool.getInstance().destroyObject(this);
        }
    }
}