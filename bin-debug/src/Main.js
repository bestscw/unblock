/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this._time = 0;
        Main.instance = this;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    Main.prototype.onAddToStage = function (event) {
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    };
    /**
     * preload资源组加载进度
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     */
    Main.prototype.createGameScene = function () {
        egret.Profiler.getInstance().run();
        egret.Ticker.getInstance().register(this.onEnterFrame, this);
        DataManage.stageW = egret.MainContext.instance.stage.stageWidth;
        DataManage.stageH = egret.MainContext.instance.stage.stageHeight;
        DataManage.w = DataManage.stageW * DataManage.ratio;
        DataManage.h = DataManage.stageW * DataManage.ratio;
        DataManage.min_width = DataManage.w / 6;
        DataManage.min_height = DataManage.h / 6;
        //创建游戏层
        this.gameLayout = new egret.Sprite();
        this.gameLayout.y = 0;
        this.gameLayout.x = 0;
        this.gameLayout.width = DataManage.w;
        this.gameLayout.height = DataManage.h;
        DataManage.clickSound = RES.getRes("click");
        //创建游戏静态界面
        this.gameView = new GameView();
        this.gameView.createStaticView(this);
        this.gameView.addEventListener("gameRestart", this.onRestart, this);
        this.gameView.addEventListener("gamePlay", this.onGamePlay, this);
        this.gameView.createGameLayer(this.gameLayout);
        this.addChild(this.gameLayout);
        this.gameView.showGameBeginLayout();
    };
    //开始游戏
    Main.prototype.onGamePlay = function () {
        console.log('GamePlay');
        //不要重創建的判斷
        if (DataManage.particle) {
            DataManage.particle.stop();
        }
        this.gameLayout.addChild(DataManage.particle);
        DataManage.particle.start();
    };
    //重新开始游戏
    Main.prototype.onRestart = function () {
        DataManage.move_step = 0;
        this.gameView.updateScrore();
        this.gameLayout.removeChildren();
        this.gameView.createGameLayer(this.gameLayout);
    };
    Main.prototype.onEnterFrame = function (advancedTime) {
        /**
         this._time += advancedTime;
         //创建敌人
         if(this._time > CONST.enemyGap){
            this._time = 0;
            var enemy = ObjectPool.getInstance().createObject(Enemy);
            enemy.view.x = Math.random() * (CONST.stageWidth - 80);
            this.addChild(enemy.view);
        }
         **/
    };
    return Main;
})(egret.DisplayObjectContainer);
