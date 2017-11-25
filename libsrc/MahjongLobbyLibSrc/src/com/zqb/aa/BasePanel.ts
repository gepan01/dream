module MJLobby {
	/**
	 * 基础面板
	 */
	export class BasePanel extends LobbyBaseVc {
		private _closeBtn: LobbyGameButton;
		private _bg: egret.Bitmap;
		private _title: egret.Bitmap;
		private _initY: number;
		private _titleBg: egret.Bitmap;
		public constructor() {
			super();
		}
		public initUI(): void {
			this._initY = -13;
			this._bg = LobbyResUtil.createBitmapByName("mjl_msgPanel");
			this._bg.scale9Grid = new egret.Rectangle(450, 110, 60, 80);
			this._bg.width = 577;
			this._bg.height = 482 - this._initY;
			this._bg.touchEnabled = true;
			this._bg.y = this._initY;
			this.addChild(this._bg);
			this._closeBtn = new LobbyGameButton(["mjl_closebtn", "mjl_closebtn2"]);
			this._closeBtn.x = this._bg.width - 61;
			this._closeBtn.y = -10;
			this.addChild(this._closeBtn);
			this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandle, this);
			if (MJLobby.MJLobbyData.getInstance().artStyle == 1) {
				this._bg.scale9Grid = new egret.Rectangle(44, 36, 483, 132);
				this._titleBg = LobbyResUtil.createBitmapByName("mjl_common_titleBg");
				this._titleBg.x = this._bg.width / 2 - this._titleBg.width / 2;
				this.addChild(this._titleBg);
				this._bg.y = this._titleBg.y + this._titleBg.height;
				this._closeBtn.y = this._bg.y - 30;
			}else if(MJLobby.MJLobbyData.getInstance().artStyle == 2){
				this._bg.scale9Grid = new egret.Rectangle(97,215,16,19);
				this._titleBg = LobbyResUtil.createBitmapByName("mjl_common_titleBg");
				this.addChild(this._titleBg);
				this._closeBtn.y = -30;
			}else if(MJLobby.MJLobbyData.getInstance().artStyle == 4){
				this._bg.y = this._initY + 40;
				this._bg.scale9Grid = new egret.Rectangle(0, 0, 803, 542);
				this._closeBtn.y = this._bg.y - 10;
			}
			this.initPanel();

		}
		public initPanel(): void {

		}
		/**设置标题资源 如果需要改位置 使用get set  Title*/
		public set title(iconUrl: string) {
			if (!this._title) {
				this._title = LobbyResUtil.createBitmapByName(iconUrl);
				this._title.x = Math.round((246 - this._title.width) / 2);
				this._title.y = 11;
				this.addChild(this._title);
				if (MJLobby.MJLobbyData.getInstance().artStyle == 1) {
					this._title.y = this._titleBg.y + 20;
					this._title.x = this._titleBg.x + (this._titleBg.width - this._title.width) / 2;
				}else if(MJLobby.MJLobbyData.getInstance().artStyle == 2){
					this._title.y = this._titleBg.y + 10;
					this._title.x = this._titleBg.x + (this._titleBg.width - this._title.width) / 2;
				}else if(MJLobbyData.getInstance().artStyle == 4){
					this._title.y = this._bg.y - 6;
					this._title.x = this._bg.width / 2 - this._title.width / 2;
				}
			}
		}
		public setSize(w: number, h: number): void {
			this._bg.width = w;
			this._bg.height = h - this._initY;
			this._closeBtn.x = this._bg.width - 61;
			if (MJLobby.MJLobbyData.getInstance().artStyle == 1) {
				this._titleBg.x = this._bg.width / 2 - this._titleBg.width / 2;
				this._titleBg.y = this._bg.y - this._titleBg.height;
			}else if(MJLobby.MJLobbyData.getInstance().artStyle == 2){
				this._titleBg.x = this._bg.width / 2 - this._titleBg.width / 2;
				this._titleBg.y = this._bg.y - 20;
				this._closeBtn.x = this._bg.width - 50;
			}
			else if(MJLobby.MJLobbyData.getInstance().artStyle == 4){
				// this._title.x = this._bg.width / 2 - this._title.width / 2;
				this._closeBtn.x = this._bg.width - 50;
				this._closeBtn.y = this._bg.y - 10;
			}
		}
		/**获得背景图属性 */
		public get Bg(): egret.Bitmap{
			return this._bg;
		}

		public set Bg(bg: egret.Bitmap){
			this._bg = bg;
		}

		/**获得标题属性 */
		public get Title(): egret.Bitmap{
			return this._title;
		}

		public set Title(title: egret.Bitmap){
			this._title = title;
		}

		/**获得标题背景属性 */
		public get TitleBg(): egret.Bitmap{
			return this._titleBg;
		}

		public set TitleBg(titleBg: egret.Bitmap){
			this._titleBg = titleBg;
		}

		/**获得关闭按钮属性 */
		public get closeBtn(): LobbyGameButton{
			return this._closeBtn;
		}

		public set closeBtn(closeBtn: LobbyGameButton){
			this._closeBtn = closeBtn;
		}


		/**是否显示背景 */
		public hideTitle(show:boolean){
			if(this._titleBg){
				this._titleBg.visible = show;
			}
			if(this._title){
				this._title.visible = show;
			}
		}
		public closeHandle(evt: egret.TouchEvent): void {
			this.dispatchEventWith(LobbyUIEventConsts.CLOSE);
		}
		public setCloseBtnPosition(x: number = null, y: number = null) {
			if (x != null)
				this._closeBtn.x = x;
			if (y != null)
				this._closeBtn.y = y;
		}
		public setTitlePosition(x: number = null, y: number = null) {
			if (x != null)
				this._title.x = x;
			if (y != null)
				this._title.y = y;
		}
		public setTitleBgPosition(x: number = null, y: number = null) {
			if (x != null)
				this._titleBg.x = x;
			if (y != null)
				this._titleBg.y = y;
		}
		public destory(): void {
			super.destory();
			if (this._closeBtn) {
				this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandle, this);
				this._closeBtn = null;
			}
			this._bg = null;
			this._title = null;
			this._titleBg = null;
		}

	}
}