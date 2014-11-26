class Wood extends GameObject {
    public static key:string = "wood";
    private _time:number = 0;

    public style:number = 0; // 0 要解锁的木块 1 水平短木块  2 水平长木块 3 垂直短木块 4 垂直长木块
    public direction:number = 0; // 0 水平移动 1垂直移动
    public _width:number = 0; // 木块宽度
    public _height:number = 0; // 木块高度

    constructor() {
        super();
        if(DataManage.useBitmap)
        {
            this.view = new egret.Bitmap();
        }
        else
        {
            this.view = new egret.Sprite();
        }

    }

    public onCreate():void {
        //this.view.y = 0;
    }

    public setView():void
    {
        if(DataManage.useBitmap)
        {
            (<egret.Bitmap>this.view).texture = RES.getRes("wood_"+this.style);
        }
        else
        {
            (<egret.Sprite>this.view).graphics.beginFill( 0xFFFFFF, 1);
            (<egret.Sprite>this.view).graphics.lineStyle(0.3,0xEEEEEE);
            (<egret.Sprite>this.view).graphics.drawRect( 0, 0, this._width, this._height );
            (<egret.Sprite>this.view).graphics.endFill();
        }
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

    public moveXY(x:number, y:number):void {
        this.view.x += x;
        this.view.y += y;
    }

    public onEnterFrame(advancedTime:number):void {



        /**
        this.view.y += advancedTime / 5;


        if (this.view.y > CONST.stageHeight) {
            ObjectPool.getInstance().destroyObject(this);
        }
         **/
    }
}