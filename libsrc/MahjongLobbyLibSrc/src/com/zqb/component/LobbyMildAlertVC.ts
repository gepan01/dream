module MJLobby {
	/**
	 *
	 * 中度提示面板，飘文字
	 *
	 */
	export class LobbyMildAlertVC extends LobbyBaseVc{
        private _bg: egret.Bitmap;
        private _text: egret.TextField;
		public constructor() {
            super();
		}
		public initUI():void{
            let str = "tipsBg";
            if(RES.getRes("tipsBg")){
                str = "tipsBg";
            }else{
                str = "mjl_tipsBg";
            }
            this._bg = LobbyResUtil.createBitmapByName(str);
            this.addChild(this._bg);
            this._text = LobbyResUtil.createTextFeild(0xFFFFFF,egret.HorizontalAlign.CENTER,"",22,8,10,786);
            this._text.multiline = true;
            this.addChild(this._text);
		}
		/**
		 * 
		 * @param message
		 * 
		 */
        public  setText(message:string):void
		{
            if(!message) {
                return;
            }
            this._text.text = message;
            this._bg.height = this._text.textHeight * 2;
            this.x = Math.round((LobbyDataCache.defaultWidth - this.width) / 2);
            this.y = LobbyDataCache.defaultHeight;
            egret.Tween.get(this).to({ y: Math.round((LobbyDataCache.defaultHeight - this.height) / 2)-60 },500,egret.Ease.circOut).call(this.showDelay,this);
        }
        private showDelay():void{
            egret.Tween.get(this).wait(2000).to({ y: -this.height },500,egret.Ease.circOut).call(this.destory,this);
        }
        public  destory(): void {
            LobbyResUtil.removeAllChildren(this);
            LobbyResUtil.removeFromParent(this);
            this._bg = null;
            this._text = null;
        }
	}
}
