module MJLobby {
	/**
	 * 全局控制
	 */
	export class GlobalControl {
		private _hasExit: boolean;
		private static _instance: GlobalControl;
		public constructor() {
			this.init();
		}
		public static getInstance(): GlobalControl {
			if (!GlobalControl._instance) {
				GlobalControl._instance = new GlobalControl()
			}
			return GlobalControl._instance;
		}
		private init(): void {
			uniLib.Global.addEventListener(uniLib.ZqEvent.NATIVE_TO_EGERET, this.onExiteGame, this);//返回键统一处理
		}
		private onExiteGame(e: uniLib.ZqEvent = null): void {
			var data = e.param;
			if (data.cmd == uniLib.ZQGameSdk.EXITGAME) {
				if(MJLobby.MJLobbyData.getInstance().isHaoCai()){
					return;
				} 
				if (!this._hasExit) {
					this._hasExit = true;
					var msgBox: LobbyMsgBox = new LobbyMsgBox(false);
					msgBox.setData("", "是否退出游戏?", ["确定", "取消"], [this.onSureBox, this.onCancel], this);
					msgBox.x = Math.round((LobbyDataCache.defaultWidth - msgBox.width) / 2);
					msgBox.y = Math.round((LobbyDataCache.defaultHeight - msgBox.height) / 2);
					msgBox.addEventListener(LobbyUIEventConsts.CLOSE, this.close, this)
					msgBox.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => { this._hasExit = false; }, this);
					uniLib.PopUpMgr.addPopUp(msgBox, null, true, true);
				}
			}
			if (data.cmd == uniLib.ZQGameSdk.HOT_UPDATE) {
				uniLib.ZQGameSdk.restart("有新版本需要更新,是否立即更新?","确定","取消");
			}
		}

		private onRestart(evt:egret.Event):void{
			uniLib.Utils.restart("更新完成,点击确定重启","确定");
		}
		private closePanel(evt:egret.Event): void {
			uniLib.PopUpMgr.removePopUp(evt.currentTarget);
		}
		private close(evt: egret.Event): void {
			this._hasExit = false;
			uniLib.PopUpMgr.removePopUp(evt.currentTarget);
		}
		private onSureBox(): void {
			uniLib.ZQGameSdk.exit();
		}
		private onCancel(): void {
			this._hasExit = false;
		}
	}
}