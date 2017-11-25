module MJLobby {
	/**
	 * 弹出管理
	 */
	export class LobbyPopupManager {
		// private static  _popUpMask:egret.Sprite;
		private static showList:Array<LobbyMildAlertVC> = [];
		public constructor() {
		}
		/**
		 * 显示弹出框
		 * @param	target:显示对象
		 * @param	modal:是否添加遮罩
		 * @param	center:是否居中显示
		 * @param	useEffect:是否缓动
		 * @param	isTop:是否在最上层
		 */
		public static  addPopUp(target:egret.DisplayObjectContainer, modal:Boolean = false, center:Boolean = false, useEffect:Boolean = true,w:number=0,h:number=0,addClose:boolean = true):void
		{
			var popUpMask = new egret.Sprite();
			popUpMask.graphics.beginFill(0, 0.6);
			popUpMask.graphics.drawRect(0, 0, LobbyDataCache.defaultWidth,LobbyDataCache.defaultHeight* uniLib.ScreenUtils.scaleFactor);
			popUpMask.graphics.endFill();
			popUpMask.touchEnabled=true;
			popUpMask.name = target.hashCode + "_mask";
			if (modal){
				popUpMask.visible = true;
			}else{
				popUpMask.visible = false;
			}
			this.getContainer().addChild(popUpMask);
			this.getContainer().addChild(target);
			var targetX:number;
			var targetY:number;
			if (center)
			{
				if(w){
					targetX =LobbyDataCache.defaultWidth - w >> 1;
				}else{
					targetX = LobbyDataCache.defaultWidth - target.width >> 1;
				}
				
				if(h){
					targetY = (LobbyDataCache.defaultHeight* uniLib.ScreenUtils.scaleFactor - h )/2;
				}else{
					targetY = (LobbyDataCache.defaultHeight* uniLib.ScreenUtils.scaleFactor - target.height)/2;
				}
			}
			else
			{
				targetX=target.x;
				targetY=target.y
			}
			
			
			if (useEffect)
			{
				target.y = targetY
				target.x = targetX;
				// target.alpha = 0;
				// egret.Tween.removeTweens(target);
				// egret.Tween.get(target).to( {x: targetX,y: targetY, alpha: 1});
			}
			else
			{
				target.x=targetX;
				target.y=targetY;
			}
			if(MJLobby.MJLobbyData.getInstance().lobbyId < 1000){//暂时只判断小于1000的大厅
				target.alpha = 0;
				target.anchorOffsetX = target.width / 2;
				target.anchorOffsetY = target.height / 2;
				target.scaleX = 0.6;
				target.scaleY = 0.6;
				target.x += target.width / 2 ;
				target.y += target.height / 2;
				egret.Tween.removeTweens(target);
				egret.Tween.get(target).to({alpha:1,scaleX:1,scaleY:1},380,egret.Ease.backOut);
				if(addClose){
					popUpMask.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
							target.dispatchEventWith(LobbyUIEventConsts.CLOSE);
					},this);
				}
			}
		}
		/**
		 * 移除弹出框
		 * @param	target:显示对象
		 * @param	useEffect:是否缓动
		 * @param	removeMask:是否移除蒙版
		 */
		public static  removePopUp(target:egret.DisplayObjectContainer, useEffect:Boolean = false,removeMask:boolean = true):void
		{
			let mask;
			if(target.parent){
				mask = target.parent.getChildByName(target.hashCode+"_mask");
			}else{
				mask = this.getContainer().getChildByName(target.hashCode+"_mask");
			}
			if(mask){
				if(MJLobby.MJLobbyData.getInstance().lobbyId < 1000){//暂时只判断小于1000的大厅
					egret.Tween.removeTweens(target);
					mask.removeEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
						target.dispatchEventWith(LobbyUIEventConsts.CLOSE);
					},this);
				}
				uniLib.DisplayUtils.removeFromParent(mask);
				mask = null;
			}
			if (!useEffect)
			{
				if (target.parent)
					target.parent.removeChild(target);
			}
			else
			{
				egret.Tween.removeTweens(target);
				egret.Tween.get(target).to( {y: target.y - 200, alpha: 0}).call(this.removeTarget,this,[target]);
			}
		}
		private static removeTarget (target:egret.DisplayObjectContainer):void{
			target.alpha = 1.0;
			egret.Tween.removeTweens(target);
			if (target.parent){
				target.parent.removeChild(target);
			}
		}
		/**
		 * 轻提示
		 */ 
        public static showMildWarnShow(msg:string):void{
            LobbyResUtil.trace("轻度提示：" + msg);
            if(!msg) {
                return
            }
            var alert: LobbyMildAlertVC = new LobbyMildAlertVC();
            alert.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeStage,this);
            alert.setText(msg);
            this.getContainer().addChild(alert);
            if(this.showList.length > 0) {
                for(var index = 0;index < this.showList.length;index++) {
                    this.showList[index].y -= alert.height;
                }
            }
            this.showList.push(alert);
		}
        private static removeStage(evt:egret.Event):void{
            var alert: LobbyMildAlertVC = evt.currentTarget as LobbyMildAlertVC;
			alert.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeStage,this);
            this.showList.splice(this.showList.indexOf(alert),1);
        }
		private static getContainer():egret.DisplayObjectContainer{
			if(MJLobbyInfo.topLayer){
				return MJLobbyInfo.topLayer;
			}
 			if (uniLib.SceneMgr.instance.currentScene && uniLib.SceneMgr.instance.currentScene.tipsLayer)
			{
				return uniLib.SceneMgr.instance.currentScene.tipsLayer;
			}
            return uniLib.SceneMgr.instance.currentScene
		}
		 public static showConfirmPanel(msg: string,btnlables: Array<string>,backFn: Array<Function> = null,title: string = null,backObj:any,countdown: number = 0,needClose:boolean = false,size?:number,align:string = egret.HorizontalAlign.CENTER): void{
            var _msgTips: LobbyMsgBox = new LobbyMsgBox(needClose);
            if(!title) {
                title = "";
            }
            _msgTips.setData(title,msg,btnlables,backFn,backObj,countdown,size,align);
            _msgTips.x = Math.round((LobbyDataCache.defaultWidth - _msgTips.width) / 2);
            _msgTips.y = Math.round((LobbyDataCache.defaultHeight - _msgTips.height) / 2);
            this.addPopUp(_msgTips,true,true,true,0,0,false);
		}
	}
}