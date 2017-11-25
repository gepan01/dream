module MJLobby {
	/*****
	 * 游戏内公用的消息跑马灯 
	 * */
	export class CommonSysMsgMc extends LobbyBaseVc {
		private _msgTxt: egret.TextField;
		private _noticeArr: string[] = [];
		private _txtMc: egret.DisplayObjectContainer;
		private _buffer: number;
		public constructor() {
			super();
		}
		public initUI(): void {
			this._buffer = 30;
			var bg: egret.Bitmap = LobbyResUtil.createBitmapByName("mjl_lobby_systembg");
			bg.scale9Grid = new egret.Rectangle(100, 41, 14, 23);
			bg.width = 700;
			this.addChild(bg);
			this._msgTxt = LobbyResUtil.createTextFeild(0x1a2725, egret.HorizontalAlign.LEFT, " ", 32, 50, 18);
			this._msgTxt.multiline = false;
			this._msgTxt.height += 10;
			this._txtMc = new egret.DisplayObjectContainer();
			this._txtMc.addChild(this._msgTxt);
			this._txtMc.x = 80;
			this.addChild(this._txtMc);
			this._txtMc.scrollRect = new egret.Rectangle(0, 0, 610, bg.height);
			this.visible = false;
			/********返回大厅的时候tween被游戏都移除了，延迟一会显示 */
			// var self = this;
			// setTimeout(function () {
			// 	self.noticeTest();
			// }, 200);
		}
		private noticeTest(): void {
			if(!this._msgTxt){
				return;
			}
			if(!this._noticeArr || this._noticeArr.length == 0) {
				this.scrollEnd();
				return;
			}
			this.scrollEnd();
			this._msgTxt.textFlow = (new egret.HtmlTextParser).parser(this._noticeArr.shift());
			this.startScroll();
		}
		private startScroll(): void {
			if(!this._noticeArr || this._noticeArr.length == 0){
				return;
			}
			this.visible = true;
			egret.Tween.removeTweens(this._msgTxt);
			this._msgTxt.text = this._noticeArr.shift();
			this._msgTxt.x = 618 + this._buffer;
			var w: number = this._msgTxt.textWidth < 618 ? 618 : this._msgTxt.textWidth;
			egret.Tween.get(this._msgTxt).to({ x: -(this._msgTxt.textWidth + this._buffer) }, 10 * (w + this._buffer)).call(this.noticeTest, this);
		}
		private scrollEnd(): void {
			egret.Tween.removeTweens(this._msgTxt);
			this.visible = false;
			this._msgTxt.text = "";
		}
		public onNoticeCome(e: uniLib.ZqEvent): void {
			var notice: Pmd.CommonChatUserPmd_CS = e.param;
			if (this._noticeArr == null) {
				this._noticeArr = [];
			}
			this._noticeArr.push(notice.info);
			this.startScroll();
			// 	this._msgTxt.text = this._noticeArr.shift();
			// 	this.startScroll();
		}
		public destory(): void {
			super.destory();
			this.scrollEnd();
			this._msgTxt = null;
			this._noticeArr = null;
			this._txtMc = null;
		}
	}
}