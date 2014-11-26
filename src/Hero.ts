class Hero extends GameObject {
    public static key:string = "hero";
    private _time:number = 0;

    constructor() {
        super();
        this.view = new egret.Bitmap(RES.getRes("hero"));
        this.view.x = CONST.stageWidth >> 1;
        this.view.y = CONST.stageHeight - 100;
    }

    public onEnterFrame(advancedTime:number):void {
        this._time += advancedTime;
        if (this._time > CONST.heroBulletGap) {
            this._time = 0;
            this.createBullet();
        }
    }

    /**
     * 创建子弹
     */
    private createBullet():void {
        var bullet:Bullet = <Bullet>ObjectPool.getInstance().createObject(Bullet);
        Main.instance.addChild(bullet.view);
        bullet.view.x = this.view.x;
        bullet.view.y = this.view.y;
    }

    public moveXY(x:number, y:number):void {
        this.view.x += x;
        this.view.y += y;
    }
}