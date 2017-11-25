var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
  * 游戏容器类
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * EgerPro显示对象层级
  * Main-GameScene（sceneLayer、mainLayer、popLayer、effectLayer、maskLayer、loadLayer）
  *
  */
var GameLayerManager = (function () {
    function GameLayerManager() {
        /**
         *  场景层 如 战场、主城、副本战场之类的
         */
        this.sceneLayer = new egret.DisplayObjectContainer();
        // 主UI层 如 底部功能栏
        this.mainLayer = new egret.DisplayObjectContainer();
        // 弹窗层 如 设置、背包、装备之类的
        this.popLayer = new egret.DisplayObjectContainer();
        // 特效层 如 闪烁、飘字之类的
        this.effectLayer = new egret.DisplayObjectContainer();
        // 通讯遮罩层 和服务器通讯UI
        this.maskLayer = new egret.DisplayObjectContainer();
        // 加载遮罩层 场景切换的时候加载资源UI
        this.loadLayer = new egret.DisplayObjectContainer();
    }
    Object.defineProperty(GameLayerManager, "Instance", {
        //游戏容器管理器单例
        get: function () {
            if (!this._instance)
                this._instance = new GameLayerManager();
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    return GameLayerManager;
}());
__reflect(GameLayerManager.prototype, "GameLayerManager");
