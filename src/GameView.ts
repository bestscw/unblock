class GameView extends egret.EventDispatcher
{

    //文书文本
    private txt:egret.TextField;
    private move:egret.TextField;
    public txt_time:egret.TextField;
    public txt_name:egret.TextField;
    public move_name:egret.TextField;
    public txtMove:egret.TextField;

    public colorContainer:egret.Sprite;
    public shareTips:egret.Bitmap;

    public txtColor1:egret.TextField;
    public txtColor2:egret.TextField;
    public txtColor3:egret.TextField;
    public txtColor4:egret.TextField;

    public txtMode:egret.TextField;
    public txtTitle:egret.TextField;
    public txtRecord:egret.TextField;
    public txtNewRecord:egret.TextField;


    //创建全局静态界面
    public createStaticView(rootLayout:egret.DisplayObjectContainer):void
    {
        this.createShareBitmap(rootLayout);
        this.createGameBeginLayout(rootLayout);
        this.createScoreText( rootLayout );
    }

    //创建全局静态界面
    public createGameLayer(gameLayout:egret.DisplayObjectContainer):void
    {

        var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("gamebg-hd"));
        bg.x = 0;
        bg.y = 0;
        bg.fillMode = egret.BitmapFillMode.SCALE;
        bg.width = DataManage.stageW;
        bg.height = DataManage.stageH;
        gameLayout.addChild(bg);
        gameLayout.addChildAt( this._gameMenuLayout,1 );

        var sp:egret.Sprite = new egret.Sprite();
        sp.name = 'container';
        sp.graphics.beginFill(0xFFFFFF, 0);
        sp.graphics.lineStyle(0.2,0xEEEEEE);
        sp.graphics.drawRect(0,0,DataManage.w,DataManage.h);
        sp.x = 50;
        sp.y = DataManage.stageH*0.3;
        sp.width = DataManage.w;
        sp.height = DataManage.h;
        sp.graphics.endFill();
        gameLayout.addChildAt(sp,1);

        var r:egret.Bitmap = new egret.Bitmap();
        r.texture = RES.getRes("r");
        r.x = DataManage.stageW*0.62;
        r.y = DataManage.stageH*0.9;
        r.width=61;
        r.height=39;
        r.touchEnabled = true;
        r.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRestart, this,false,1);

        gameLayout.addChildAt(r,2);

        var back:egret.Bitmap = new egret.Bitmap();
        back.texture = RES.getRes("back");
        back.x = DataManage.stageW*0.32;
        back.y = DataManage.stageH*0.9;
        back.width=61;
        back.height=39;
        back.touchEnabled = true;
        back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRestart, this,false,1);

        gameLayout.addChildAt(back,2);

        var index:number = Math.ceil(Math.random()*5);
        var info:any = RES.getRes('coordinate_1_'+DataManage.current_level);

        for (var i = 0; i < info.length; i++) {
            var style:number = info[i]._style;
            var x:number = info[i]._titleX*DataManage.ratio;
            var y:number = info[i]._titleY*DataManage.ratio;
            var direcion:number = info[i]._direction;
            var width:number = info[i]._width*DataManage.ratio;
            var height:number = info[i]._height*DataManage.ratio;

            var wood:Wood = <Wood>ObjectPool.getInstance().createObject(Wood);
            wood.style = style;
            wood._width = width;
            wood._height = height;
            wood.view.x = x;
            wood.view.y = y;
            wood.direction = direcion;
            wood.view.name = wood.style+"_"+wood.direction+"_"+width+"_"+height;
            wood.view.width = width;
            wood.view.height = height;
            wood.setView();

            wood.view.touchEnabled = true;
            wood.view.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            wood.view.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this,false,1);
            wood.view.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            wood.view.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            sp.addChild(wood.view);
        }
    }


    private _isTouching:boolean;

    private onTouchTap(event:egret.TouchEvent):void {
        this._isTouching = true;
    }

    private onTouchBegin(event:egret.TouchEvent):void {

        this._isTouching = true;
        this._preMoveX = event.stageX;
        this._preMoveY = event.stageY;
    }

    private onTouchEnd(event:egret.TouchEvent):void {
        this._isTouching = false;
    }

    private _preMoveX:number = 0;
    private _preMoveY:number = 0;
    private onTouchMove(event:egret.TouchEvent):void {
        if(this._isTouching) {

            var x1:number = event.target.x;
            var x2:number = event.target.x+event.target.width;
            var y1:number = event.target.y;
            var y2:number = event.target.y+event.target.height;

            var name:string = event.target.name;
            var str:string[] =  name.split('_');
            var style:number = parseInt(str[0]);
            DataManage.current_style = style;
            var direction:number = parseInt(str[1]);

            // 水平移动
            if(direction == 0)
            {
                var move:number = event.stageX - this._preMoveX;

                if(move > 0)
                {
                    // 向右移动
                    var number:number = this.moveRight(x1,x2,y1,y2);
                    number=Math.min(number,DataManage.min_width);
                    if(number > 0)
                    {
                        DataManage.clickSound.play();
                        DataManage.move_step += 1;
                        this.updateScrore();
                        event.target.x += number;
                        event.target.y += 0;
                        this._isTouching = false;

                        if(DataManage.current_style == 0)
                        {
                            this._isTouching = true;
                            console.log("style:0"+DataManage.w)
                            if (event.target.x > DataManage.w) {

                                var storeKey:string = "unblock_level_"+DataManage.current_level;
                                var score:number = parseInt(egret.localStorage.getItem(storeKey));

                                if(score > DataManage.move_step)
                                {
                                    egret.localStorage.setItem(storeKey,String(score));
                                }

                                console.log('remove me');
                                //ObjectPool.getInstance().destroyObject(this);
                            }
                        }
                    }
                }
                else
                {
                    // 向左移动
                    var number:number = this.moveLeft(x1,x2,y1,y2);
                    number=Math.min(number,DataManage.min_width);

                    if(number > 0)
                    {
                        if(event.target.x <= 0)
                        {
                            return;
                        }
                        DataManage.clickSound.play();
                        DataManage.move_step += 1;
                        this.updateScrore();
                        event.target.x -= number;
                        event.target.y += 0;
                        this._isTouching = false;

                    }
                }
            }
            else if(direction == 1)
            {

                // 垂直移动
                var move:number = event.stageY - this._preMoveY;

                // 向上移动
                if(move < 0)
                {
                    var number:number = this.moveTop(x1,x2,y1,y2);
                    number=Math.max(number,-DataManage.min_width);

                    if(number < 0)
                    {
                        DataManage.move_step += 1;
                        this.updateScrore();
                        DataManage.clickSound.play();
                        event.target.x += 0;
                        event.target.y += number;
                        this._isTouching = false;

                        //event.target.moveXY(0, number);
                    }

                } // 向下移动
                else
                {
                    var number:number = this.moveBottom(x1,x2,y1,y2);
                    number=Math.min(number,DataManage.min_width);

                    if(number > 0)
                    {
                        DataManage.move_step += 1;
                        this.updateScrore();
                        DataManage.clickSound.play();
                        event.target.x += 0;
                        event.target.y += number;
                        this._isTouching = false;

                        //event.target.moveXY(0, number);
                    }
                }
            }
        }
        this._preMoveX = event.stageX;
        this._preMoveY = event.stageY;
    }

    private moveLeft(x1,x2,y1,y2)
    {
        var max:number = 0;
        var woods:Array<any> = [];
        woods = ObjectPool.getInstance().getObjectsByKey(Wood.key);

        for (var i = 0; i < woods.length; i++) {
            var _x1 = woods[i].view.x;
            var _x2 = woods[i].view.x + woods[i].view.width;
            var _y1 = woods[i].view.y;
            var _y2 = _y1+ woods[i].view.height;

            if(x1 == _x1 && y1 == _y1) continue;


            if(y1 >= _y1 && y2 <= _y2)
            {
                if(_x2 <= x1)
                {

                    if(_x2 > max)
                    {
                        max = _x2;
                    }
                }
            }
        }

        if(max >= 0)
        {
            if((x1 -max) >  0)
            {
                return x1-max;
            }
        }

        return 0;
    }

    private moveRight(x1,x2,y1,y2)
    {
        var woods:Array<any> = [];
        var max:number = DataManage.w;

        if(DataManage.current_style == 0)
        {
            max = DataManage.w + DataManage.w;
        }
        woods = ObjectPool.getInstance().getObjectsByKey(Wood.key);

        for (var i = 0; i < woods.length; i++) {
            var _x1 = woods[i].view.x;
            var _y1 = woods[i].view.y;
            var _y2 = _y1+ woods[i].view.height;

            if(x1 == _x1 && y1 == _y1) continue;

            if(y1 >= _y1 && y2 <= _y2)
            {
                if(_x1 >= x2)
                {
                    if(_x1 < max)
                    {
                        max = _x1;
                    }
                }
            }
        }

        if(max-x2 >= 0)
        {

            return max-x2;
            //event.target.moveXY(max-x1, 0);
        }

        return 0;
    }

    private moveTop(x1,x2,y1,y2)
    {
        var woods:Array<any> = [];
        var max:number = 0;
        woods = ObjectPool.getInstance().getObjectsByKey(Wood.key);

        for (var i = 0; i < woods.length; i++) {
            var _x1 = woods[i].view.x;
            var _x2 = woods[i].view.x + woods[i].view.width;
            var _y1 = woods[i].view.y;
            var _y2 = _y1+ woods[i].view.height;

            if(x1 == _x1 && y1 == _y1) continue;

            if(x1 >= _x1 && x2 <= _x2)
            {
                if(_y2 <= y1)
                {
                    if(_y2 > max)
                    {
                        max = _y2;
                    }
                }
            }
        }

        if(max >= 0)
        {
            if(max-y1 < 0)
            {
                return max - y1;
            }
        }

        return 0;
    }

    private moveBottom(x1,x2,y1,y2)
    {
        var max:number = DataManage.h;
        var woods:Array<any> = [];
        woods = ObjectPool.getInstance().getObjectsByKey(Wood.key);

        for (var i = 0; i < woods.length; i++) {
            var _x1 = woods[i].view.x;
            var _x2 = woods[i].view.x + woods[i].view.width;
            var _y1 = woods[i].view.y;
            var _y2 = _y1+ woods[i].view.height;

            if(x1 == _x1 && y1 == _y1) continue;

            if(x1 >= _x1 && x2 <= _x2)
            {

                if(_y1 >= y2)
                {
                    if(_y1 < max)
                    {
                        max = _y1;
                    }
                }
            }
        }


        if(max - y2 > 0)
        {
            return max-y2;
        }


        return 0;
    }

    //创建分享界面界面
    private createShareBitmap(rootLayout:egret.DisplayObjectContainer):void
    {
        var titleBitmap:egret.Bitmap = new egret.Bitmap();
        titleBitmap.texture = RES.getRes("shareTips");
        titleBitmap.width = egret.MainContext.instance.stage.stageWidth;
        titleBitmap.height = egret.MainContext.instance.stage.stageHeight;
        titleBitmap.touchEnabled = true;
        titleBitmap.alpha = 50;
        titleBitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeShareTips, this );
        this.shareTips = titleBitmap;
    }


    private closeShareTips()
    {
        this._gameOverLayoutParent.removeChild(this.shareTips);
    }

    //创建标题界面
    private createTitleBitmap(rootLayout:egret.DisplayObjectContainer,res:egret.SpriteSheet):void
    {
        var titleBitmap:egret.Bitmap = new egret.Bitmap();
        titleBitmap.texture = res.getTexture("menu");
        titleBitmap.width = egret.MainContext.instance.stage.stageWidth;
        rootLayout.addChild( titleBitmap );
    }

    private createGameBeginLayout(rootLayout:egret.DisplayObjectContainer):void
    {
        this._gameOverLayoutParent = rootLayout;

        this._gameBeginLayout = new egret.Sprite();
        this._gameBeginLayout.graphics.beginFill(0x666666, 1);
        this._gameBeginLayout.graphics.lineStyle(1,0x000000);
        this._gameBeginLayout.graphics.drawRect(0,0,DataManage.stageW,DataManage.stageH);
        this._gameBeginLayout.x = 0;
        this._gameBeginLayout.y = 0;
        this._gameBeginLayout.width = DataManage.stageW;
        this._gameBeginLayout.height = DataManage.stageH;
        this._gameBeginLayout.graphics.endFill();

        var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("bg"));
        bg.x = 0;
        bg.y = 0;
        bg.fillMode = egret.BitmapFillMode.SCALE;
        bg.width = DataManage.stageW;
        bg.height = DataManage.stageH;
        this._gameBeginLayout.addChild(bg);

        var btnPlay:egret.Bitmap = new egret.Bitmap();
        btnPlay.texture = RES.getRes("btnPlay");
        btnPlay.x = 160;
        btnPlay.y = 170;
        btnPlay.width=160;
        btnPlay.height=60;
        btnPlay.touchEnabled = true;
        btnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGamePlay, this,false,1);
        this._gameBeginLayout.addChildAt(btnPlay,1);

        var txtPlay:egret.TextField = new egret.TextField();
        txtPlay.x = 200;
        txtPlay.y = 180;
        txtPlay.fontFamily = '微软雅黑';
        txtPlay.text = "开始玩";
        txtPlay.textColor = 0xFFFFFF;
        txtPlay.touchEnabled = true;
        txtPlay.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGamePlay, this,false,1);

        this._gameBeginLayout.addChild( txtPlay );
    }

    //创建盒子背景
    private createRectBackground(rootLayout:egret.DisplayObjectContainer,res:egret.SpriteSheet):void
    {
        var scale:egret.Rectangle = new egret.Rectangle(16,13,69,70);
        var bg:egret.Bitmap = new egret.Bitmap();
        bg.texture = res.getTexture("background");
        bg.width = egret.MainContext.instance.stage.stageWidth;
        bg.height = egret.MainContext.instance.stage.stageWidth;
        bg.scale9Grid = scale;
        bg.y = 105
        rootLayout.addChild( bg );

        for( var i:number = 0; i<4; i++)
        {
            for(var t:number = 0; t<4; t++)
            {
                var bit:egret.Bitmap = new egret.Bitmap();
                bit.texture = res.getTexture("backtile");
                bit.x = 10 + (10 + bit.width) * t;
                bit.y = 105 + 10 + (10 + bit.height) * i;
                rootLayout.addChild( bit );
            }
        }
    }

    private _gameOverLayout:egret.Sprite;
    private _gameBeginLayout:egret.Sprite;
    private _gameMenuLayout:egret.Sprite;

    private _gameOverLayoutParent:egret.DisplayObjectContainer;


    public createTxtField(x,y,width,height,fontsize,fontFamily,text,textColor,touchEnabled,callback)
    {
        var txtField:egret.TextField = new egret.TextField();
        txtField.width = width;
        txtField.height = height;
        txtField.size = fontsize;
        txtField.fontFamily = fontFamily;
        txtField.text = text;
        txtField.textColor = textColor;
        txtField.x = x;
        txtField.y = y;
        txtField.textAlign = egret.HorizontalAlign.CENTER;
        txtField.verticalAlign = egret.VerticalAlign.MIDDLE;

        if(touchEnabled)
        {
            txtField.touchEnabled = true;
            txtField.addEventListener(egret.TouchEvent.TOUCH_TAP, callback, this,false,1 );
        }
    }


    //显示游戏进入画面
    public showGameBeginLayout()
    {
        this._gameOverLayoutParent.addChild( this._gameBeginLayout );

        //var texture = RES.getRes("snow");
        //var config = RES.getRes("snowjson");
        //DataManage.particle = new particle.GravityParticleSystem(texture, config);
        //DataManage.particle.start();
    }

    private onRestart()
    {
        //if(this._gameOverLayout.parent)
        //{
            //this._gameOverLayout.parent.removeChild(this._gameOverLayout);
        //}

        var evt:egret.Event = new egret.Event("gameRestart");
        this.dispatchEvent(evt);
    }

    private onGamePlay(evt:egret.TouchEvent)
    {
        if(this._gameBeginLayout.parent)
        {
            this._gameBeginLayout.parent.removeChild(this._gameBeginLayout);
        }

        var evt2:egret.Event = new egret.Event("gamePlay");
        this.dispatchEvent(evt2);
    }


    private createScoreText(rootLayout:egret.DisplayObjectContainer):void
    {
        this._gameMenuLayout = new egret.Sprite();

        this.txtMove = new egret.TextField();
        this.txtMove.x = DataManage.stageW*0.62;
        this.txtMove.y = 120;
        this.txtMove.fontFamily = '微软雅黑';
        this.txtMove.text = "步数";
        this.txtMove.textColor = 0xFF0000;
        this._gameMenuLayout.addChild( this.txtMove );

        this.move = new egret.TextField();
        this.move.x = DataManage.stageW*0.75;
        this.move.y = 120;
        this.move.textColor = 0xFFFFFF;
        this._gameMenuLayout.addChild( this.move );


        this.txtRecord = new egret.TextField();
        this.txtRecord.x = DataManage.stageW*0.4;
        this.txtRecord.y = 120;
        this.txtRecord.fontFamily = '微软雅黑';
        this.txtRecord.text = "新纪录";
        this.txtRecord.textColor = 0xFF0000;
        this._gameMenuLayout.addChild( this.txtRecord );

        this.txtNewRecord = new egret.TextField();
        this.txtNewRecord.x = DataManage.stageW*0.5;
        this.txtNewRecord.y = 120;
        this.txtNewRecord.textColor = 0xFFFFFF;
        this._gameMenuLayout.addChild( this.txtNewRecord );



        this.updateScrore();
    }


    //更新分数
    public updateScrore()
    {
        var storeKey:string = "unblock_level_"+DataManage.current_level;
        var score:string = egret.localStorage.getItem(storeKey);
        this.txtNewRecord.text = score;
        this.move.text = String(DataManage.move_step);
    }

}