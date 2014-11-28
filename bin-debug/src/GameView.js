var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        _super.apply(this, arguments);
        this._preMoveX = 0;
        this._preMoveY = 0;
    }
    //创建全局静态界面
    GameView.prototype.createStaticView = function (rootLayout) {
        this.createShareBitmap(rootLayout);
        this.createGameBeginLayout(rootLayout);
        this.createScoreText(rootLayout);
    };
    //创建全局静态界面
    GameView.prototype.createGameLayer = function (gameLayout) {
        var bg = new egret.Bitmap(RES.getRes("gamebg-hd"));
        bg.x = 0;
        bg.y = 0;
        bg.fillMode = egret.BitmapFillMode.SCALE;
        bg.width = DataManage.stageW;
        bg.height = DataManage.stageH;
        gameLayout.addChild(bg);
        gameLayout.addChildAt(this._gameMenuLayout, 1);
        var sp = new egret.Sprite();
        sp.name = 'container';
        sp.graphics.beginFill(0xFFFFFF, 0);
        sp.graphics.lineStyle(0.2, 0xEEEEEE);
        sp.graphics.drawRect(0, 0, DataManage.w, DataManage.h);
        sp.x = 50;
        sp.y = DataManage.stageH * 0.3;
        sp.width = DataManage.w;
        sp.height = DataManage.h;
        sp.graphics.endFill();
        gameLayout.addChildAt(sp, 1);
        var r = new egret.Bitmap();
        r.texture = RES.getRes("r");
        r.x = DataManage.stageW * 0.62;
        r.y = DataManage.stageH * 0.9;
        r.width = 61;
        r.height = 39;
        r.touchEnabled = true;
        r.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this, false, 1);
        gameLayout.addChildAt(r, 2);
        var back = new egret.Bitmap();
        back.texture = RES.getRes("back");
        back.x = DataManage.stageW * 0.32;
        back.y = DataManage.stageH * 0.9;
        back.width = 61;
        back.height = 39;
        back.touchEnabled = true;
        back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this, false, 1);
        gameLayout.addChildAt(back, 2);
        var index = Math.ceil(Math.random() * 5);
        var info = RES.getRes('coordinate_1_' + DataManage.current_level);
        for (var i = 0; i < info.length; i++) {
            var style = info[i]._style;
            var x = info[i]._titleX * DataManage.ratio;
            var y = info[i]._titleY * DataManage.ratio;
            var direcion = info[i]._direction;
            var width = info[i]._width * DataManage.ratio;
            var height = info[i]._height * DataManage.ratio;
            var wood = ObjectPool.getInstance().createObject(Wood);
            wood.style = style;
            wood._width = width;
            wood._height = height;
            wood.view.x = x;
            wood.view.y = y;
            wood.direction = direcion;
            wood.view.name = wood.style + "_" + wood.direction + "_" + width + "_" + height;
            wood.view.width = width;
            wood.view.height = height;
            wood.setView();
            wood.view.touchEnabled = true;
            wood.view.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            wood.view.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this, false, 1);
            wood.view.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            wood.view.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            sp.addChild(wood.view);
        }
    };
    GameView.prototype.onTouchTap = function (event) {
        this._isTouching = true;
    };
    GameView.prototype.onTouchBegin = function (event) {
        this._isTouching = true;
        this._preMoveX = event.stageX;
        this._preMoveY = event.stageY;
    };
    GameView.prototype.onTouchEnd = function (event) {
        this._isTouching = false;
    };
    GameView.prototype.onTouchMove = function (event) {
        if (this._isTouching) {
            var x1 = event.target.x;
            var x2 = event.target.x + event.target.width;
            var y1 = event.target.y;
            var y2 = event.target.y + event.target.height;
            var name = event.target.name;
            var str = name.split('_');
            var style = parseInt(str[0]);
            DataManage.current_style = style;
            var direction = parseInt(str[1]);
            // 水平移动
            if (direction == 0) {
                var move = event.stageX - this._preMoveX;
                if (move > 0) {
                    // 向右移动
                    var number = this.moveRight(x1, x2, y1, y2);
                    number = Math.min(number, DataManage.min_width);
                    if (number > 0) {
                        DataManage.clickSound.play();
                        DataManage.move_step += 1;
                        this.updateScrore();
                        event.target.x += number;
                        event.target.y += 0;
                        this._isTouching = false;
                        if (DataManage.current_style == 0) {
                            this._isTouching = true;
                            console.log("style:0" + DataManage.w);
                            if (event.target.x > DataManage.w) {
                                var storeKey = "unblock_level_" + DataManage.current_level;
                                var score = parseInt(egret.localStorage.getItem(storeKey));
                                if (score > DataManage.move_step) {
                                    egret.localStorage.setItem(storeKey, String(score));
                                }
                                console.log('remove me');
                            }
                        }
                    }
                }
                else {
                    // 向左移动
                    var number = this.moveLeft(x1, x2, y1, y2);
                    number = Math.min(number, DataManage.min_width);
                    if (number > 0) {
                        if (event.target.x <= 0) {
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
            else if (direction == 1) {
                // 垂直移动
                var move = event.stageY - this._preMoveY;
                // 向上移动
                if (move < 0) {
                    var number = this.moveTop(x1, x2, y1, y2);
                    number = Math.max(number, -DataManage.min_width);
                    if (number < 0) {
                        DataManage.move_step += 1;
                        this.updateScrore();
                        DataManage.clickSound.play();
                        event.target.x += 0;
                        event.target.y += number;
                        this._isTouching = false;
                    }
                }
                else {
                    var number = this.moveBottom(x1, x2, y1, y2);
                    number = Math.min(number, DataManage.min_width);
                    if (number > 0) {
                        DataManage.move_step += 1;
                        this.updateScrore();
                        DataManage.clickSound.play();
                        event.target.x += 0;
                        event.target.y += number;
                        this._isTouching = false;
                    }
                }
            }
        }
        this._preMoveX = event.stageX;
        this._preMoveY = event.stageY;
    };
    GameView.prototype.moveLeft = function (x1, x2, y1, y2) {
        var max = 0;
        var woods = [];
        woods = ObjectPool.getInstance().getObjectsByKey(Wood.key);
        for (var i = 0; i < woods.length; i++) {
            var _x1 = woods[i].view.x;
            var _x2 = woods[i].view.x + woods[i].view.width;
            var _y1 = woods[i].view.y;
            var _y2 = _y1 + woods[i].view.height;
            if (x1 == _x1 && y1 == _y1)
                continue;
            if (y1 >= _y1 && y2 <= _y2) {
                if (_x2 <= x1) {
                    if (_x2 > max) {
                        max = _x2;
                    }
                }
            }
        }
        if (max >= 0) {
            if ((x1 - max) > 0) {
                return x1 - max;
            }
        }
        return 0;
    };
    GameView.prototype.moveRight = function (x1, x2, y1, y2) {
        var woods = [];
        var max = DataManage.w;
        if (DataManage.current_style == 0) {
            max = DataManage.w + DataManage.w;
        }
        woods = ObjectPool.getInstance().getObjectsByKey(Wood.key);
        for (var i = 0; i < woods.length; i++) {
            var _x1 = woods[i].view.x;
            var _y1 = woods[i].view.y;
            var _y2 = _y1 + woods[i].view.height;
            if (x1 == _x1 && y1 == _y1)
                continue;
            if (y1 >= _y1 && y2 <= _y2) {
                if (_x1 >= x2) {
                    if (_x1 < max) {
                        max = _x1;
                    }
                }
            }
        }
        if (max - x2 >= 0) {
            return max - x2;
        }
        return 0;
    };
    GameView.prototype.moveTop = function (x1, x2, y1, y2) {
        var woods = [];
        var max = 0;
        woods = ObjectPool.getInstance().getObjectsByKey(Wood.key);
        for (var i = 0; i < woods.length; i++) {
            var _x1 = woods[i].view.x;
            var _x2 = woods[i].view.x + woods[i].view.width;
            var _y1 = woods[i].view.y;
            var _y2 = _y1 + woods[i].view.height;
            if (x1 == _x1 && y1 == _y1)
                continue;
            if (x1 >= _x1 && x2 <= _x2) {
                if (_y2 <= y1) {
                    if (_y2 > max) {
                        max = _y2;
                    }
                }
            }
        }
        if (max >= 0) {
            if (max - y1 < 0) {
                return max - y1;
            }
        }
        return 0;
    };
    GameView.prototype.moveBottom = function (x1, x2, y1, y2) {
        var max = DataManage.h;
        var woods = [];
        woods = ObjectPool.getInstance().getObjectsByKey(Wood.key);
        for (var i = 0; i < woods.length; i++) {
            var _x1 = woods[i].view.x;
            var _x2 = woods[i].view.x + woods[i].view.width;
            var _y1 = woods[i].view.y;
            var _y2 = _y1 + woods[i].view.height;
            if (x1 == _x1 && y1 == _y1)
                continue;
            if (x1 >= _x1 && x2 <= _x2) {
                if (_y1 >= y2) {
                    if (_y1 < max) {
                        max = _y1;
                    }
                }
            }
        }
        if (max - y2 > 0) {
            return max - y2;
        }
        return 0;
    };
    //创建分享界面界面
    GameView.prototype.createShareBitmap = function (rootLayout) {
        var titleBitmap = new egret.Bitmap();
        titleBitmap.texture = RES.getRes("shareTips");
        titleBitmap.width = egret.MainContext.instance.stage.stageWidth;
        titleBitmap.height = egret.MainContext.instance.stage.stageHeight;
        titleBitmap.touchEnabled = true;
        titleBitmap.alpha = 50;
        titleBitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeShareTips, this);
        this.shareTips = titleBitmap;
    };
    GameView.prototype.closeShareTips = function () {
        this._gameOverLayoutParent.removeChild(this.shareTips);
    };
    //创建标题界面
    GameView.prototype.createTitleBitmap = function (rootLayout, res) {
        var titleBitmap = new egret.Bitmap();
        titleBitmap.texture = res.getTexture("menu");
        titleBitmap.width = egret.MainContext.instance.stage.stageWidth;
        rootLayout.addChild(titleBitmap);
    };
    GameView.prototype.createGameBeginLayout = function (rootLayout) {
        this._gameOverLayoutParent = rootLayout;
        this._gameBeginLayout = new egret.Sprite();
        this._gameBeginLayout.graphics.beginFill(0x666666, 1);
        this._gameBeginLayout.graphics.lineStyle(1, 0x000000);
        this._gameBeginLayout.graphics.drawRect(0, 0, DataManage.stageW, DataManage.stageH);
        this._gameBeginLayout.x = 0;
        this._gameBeginLayout.y = 0;
        this._gameBeginLayout.width = DataManage.stageW;
        this._gameBeginLayout.height = DataManage.stageH;
        this._gameBeginLayout.graphics.endFill();
        var bg = new egret.Bitmap(RES.getRes("bg"));
        bg.x = 0;
        bg.y = 0;
        bg.fillMode = egret.BitmapFillMode.SCALE;
        bg.width = DataManage.stageW;
        bg.height = DataManage.stageH;
        this._gameBeginLayout.addChild(bg);
        var btnPlay = new egret.Bitmap();
        btnPlay.texture = RES.getRes("btnPlay");
        btnPlay.x = 160;
        btnPlay.y = 170;
        btnPlay.width = 160;
        btnPlay.height = 60;
        btnPlay.touchEnabled = true;
        btnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGamePlay, this, false, 1);
        this._gameBeginLayout.addChildAt(btnPlay, 1);
        var txtPlay = new egret.TextField();
        txtPlay.x = 200;
        txtPlay.y = 180;
        txtPlay.fontFamily = '微软雅黑';
        txtPlay.text = "开始玩";
        txtPlay.textColor = 0xFFFFFF;
        txtPlay.touchEnabled = true;
        txtPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGamePlay, this, false, 1);
        this._gameBeginLayout.addChild(txtPlay);
    };
    //创建盒子背景
    GameView.prototype.createRectBackground = function (rootLayout, res) {
        var scale = new egret.Rectangle(16, 13, 69, 70);
        var bg = new egret.Bitmap();
        bg.texture = res.getTexture("background");
        bg.width = egret.MainContext.instance.stage.stageWidth;
        bg.height = egret.MainContext.instance.stage.stageWidth;
        bg.scale9Grid = scale;
        bg.y = 105;
        rootLayout.addChild(bg);
        for (var i = 0; i < 4; i++) {
            for (var t = 0; t < 4; t++) {
                var bit = new egret.Bitmap();
                bit.texture = res.getTexture("backtile");
                bit.x = 10 + (10 + bit.width) * t;
                bit.y = 105 + 10 + (10 + bit.height) * i;
                rootLayout.addChild(bit);
            }
        }
    };
    GameView.prototype.createTxtField = function (x, y, width, height, fontsize, fontFamily, text, textColor, touchEnabled, callback) {
        var txtField = new egret.TextField();
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
        if (touchEnabled) {
            txtField.touchEnabled = true;
            txtField.addEventListener(egret.TouchEvent.TOUCH_TAP, callback, this, false, 1);
        }
    };
    //显示游戏进入画面
    GameView.prototype.showGameBeginLayout = function () {
        this._gameOverLayoutParent.addChild(this._gameBeginLayout);
        //获取纹理
        var texture = RES.getRes("snow");
        //获取配置
        var config = RES.getRes("snow_json");
        //不要重創建的判斷
        if (DataManage.particle) {
            DataManage.particle.stop();
            this._gameBeginLayout.removeChild(DataManage.particle);
        }
        DataManage.particle = new particle.GravityParticleSystem(texture, config); //创建 GravityParticleSystem
        this._gameBeginLayout.addChild(DataManage.particle); //粒子庫加載到畫面
        DataManage.particle.start(); //啟動粒子庫
    };
    GameView.prototype.onRestart = function () {
        //if(this._gameOverLayout.parent)
        //{
        //this._gameOverLayout.parent.removeChild(this._gameOverLayout);
        //}
        var evt = new egret.Event("gameRestart");
        this.dispatchEvent(evt);
    };
    GameView.prototype.onGamePlay = function (evt) {
        if (this._gameBeginLayout.parent) {
            DataManage.particle.stop();
            this._gameBeginLayout.parent.removeChild(this._gameBeginLayout);
        }
        var evt2 = new egret.Event("gamePlay");
        this.dispatchEvent(evt2);
    };
    GameView.prototype.createScoreText = function (rootLayout) {
        this._gameMenuLayout = new egret.Sprite();
        this.txtMove = new egret.TextField();
        this.txtMove.x = DataManage.stageW * 0.62;
        this.txtMove.y = 120;
        this.txtMove.fontFamily = '微软雅黑';
        this.txtMove.text = "步数";
        this.txtMove.textColor = 0xFF0000;
        this._gameMenuLayout.addChild(this.txtMove);
        this.move = new egret.TextField();
        this.move.x = DataManage.stageW * 0.75;
        this.move.y = 120;
        this.move.textColor = 0xFFFFFF;
        this._gameMenuLayout.addChild(this.move);
        this.txtRecord = new egret.TextField();
        this.txtRecord.x = DataManage.stageW * 0.4;
        this.txtRecord.y = 120;
        this.txtRecord.fontFamily = '微软雅黑';
        this.txtRecord.text = "新纪录";
        this.txtRecord.textColor = 0xFF0000;
        this._gameMenuLayout.addChild(this.txtRecord);
        this.txtNewRecord = new egret.TextField();
        this.txtNewRecord.x = DataManage.stageW * 0.5;
        this.txtNewRecord.y = 120;
        this.txtNewRecord.textColor = 0xFFFFFF;
        this._gameMenuLayout.addChild(this.txtNewRecord);
        this.updateScrore();
    };
    //更新分数
    GameView.prototype.updateScrore = function () {
        var storeKey = "unblock_level_" + DataManage.current_level;
        var score = egret.localStorage.getItem(storeKey);
        this.txtNewRecord.text = score;
        this.move.text = String(DataManage.move_step);
    };
    return GameView;
})(egret.EventDispatcher);
