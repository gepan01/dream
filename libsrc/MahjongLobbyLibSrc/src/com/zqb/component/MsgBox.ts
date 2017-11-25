module MJLobby {
	/**
	 * 确定面板
	 */
    export class LobbyMsgBox extends egret.Sprite {
        private yesBtn: LobbyGameButton;
        private noBtn: LobbyGameButton;
        private title: egret.TextField;
        private info: egret.TextField;
        private _backFn: Array<Function>;
        private _backObj: any;
        private _needClose: boolean;//是否需要closeBtn
        public constructor(needClose: boolean) {
            super();
            this.touchEnabled = true;
            this._needClose = needClose;
            this.initUI();
        }
        private initUI(): void {
            var bg: egret.Bitmap = LobbyResUtil.createBitmapByName("mjl_msgBoxBg");
            bg.scale9Grid = new egret.Rectangle(180, 60, 90, 60);
            bg.width = 635;
            bg.height = 391;
            this.addChild(bg);
            this.title = LobbyResUtil.createTextFeild(0x3e3e49, egret.HorizontalAlign.CENTER, "", 32, 140, 18, 191);
            this.info = LobbyResUtil.createTextFeild(0x3e3e49,egret.HorizontalAlign.CENTER,"",32,66,39,508);
            this.info.lineSpacing = 2;
            this.addChild(this.info);
            this.addChild(this.title);
            if(MJLobby.MJLobbyData.getInstance().artStyle == 2){
                bg.texture = RES.getRes("mjl_msgPanel");
                bg.scale9Grid = new egret.Rectangle(97,215,16,19);
            }else if(MJLobby.MJLobbyData.getInstance().artStyle == 4){
                bg.texture = RES.getRes("mjl_msgPanel");
                bg.scale9Grid = new egret.Rectangle(0,0,0,0);
                this.info.textColor = 0xFFFFFF;
            } else if (MJLobby.MJLobbyData.getInstance().artStyle == 5) {
                this.info.textColor = 0xFFFFFF;
            }
            if (this._needClose) {
                var closeBtn: LobbyGameButton = new LobbyGameButton(["mjl_closebtn", "mjl_closebtn2"]);
                closeBtn.x = bg.width - 61;
                closeBtn.y = -10;
                closeBtn.addClickArea(20);
                closeBtn.touchEnabled = true;
                closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.addChild(closeBtn);
            }
        }
        private onClose(evt: egret.TouchEvent): void {
            LobbyPopupManager.removePopUp(this);
            this.dispatchEventWith(LobbyUIEventConsts.CLOSE);
            this.destory();
        }
        public setData(title: string, msg: string, labelarr: Array<any> = null, backFn: Array<Function> = null, backObject: any = null, countdown: number = 0, size: number = 32,align: string = egret.HorizontalAlign.CENTER): void {
            this._backFn = backFn;
            this._backObj = backObject;
            this.info.size = size;
            this.title.text = title;
            this.info.text = msg;
            this.info.textAlign = align;
            this.info.y = 20 + Math.round((254 - this.info.textHeight) / 2);
            if (labelarr.length == 1) {
                if (!labelarr[0] || labelarr[0] == "") {
                    labelarr[0] = "确定";
                }
                this.yesBtn = new LobbyGameButton(["mjl_common_sure1", "mjl_common_sure2"]);
                this.yesBtn.x = Math.round((this.width - this.yesBtn.width) / 2);
                this.yesBtn.y = this.height - 105;
                if (labelarr[0] == "确定" && MJLobby.MJLobbyData.getInstance().artStyle != 4) {
                    let yesWord = LobbyResUtil.createBitmapByName("mjl_txt_sure", 65, 8);
                    this.yesBtn.addChild(yesWord);
                }
                this.addChild(this.yesBtn);
            } else if (labelarr.length == 2) {
                if (!labelarr[0] || labelarr[0] == "") {
                    labelarr[0] = "确定";
                }
                if (!labelarr[1] || labelarr[1] == "") {
                    labelarr[1] = "取消";
                }
                this.yesBtn = new LobbyGameButton(["mjl_common_sure1", "mjl_common_sure2"]);
                this.yesBtn.x = 635 / 2 - this.yesBtn.width - 10;
                this.yesBtn.y = 290;
                if (labelarr[0] == "确定" && MJLobby.MJLobbyData.getInstance().artStyle != 4) {
                    let yesWord = LobbyResUtil.createBitmapByName("mjl_txt_sure", 65, 8);
                    this.yesBtn.addChild(yesWord);
                }
                this.addChild(this.yesBtn);
                this.noBtn = new LobbyGameButton(["mjl_common_cancel1", "mjl_common_cancel2"]);
                this.noBtn.x = 635 / 2 + 10;
                this.noBtn.y = 290;
                if(MJLobby.MJLobbyData.getInstance().artStyle == 4){
                    this.yesBtn.y = this.noBtn.y = this.height - this.yesBtn.height - 50;
                }
                if (labelarr[1] == "取消" && MJLobby.MJLobbyData.getInstance().artStyle != 4) {
                    let noWord = LobbyResUtil.createBitmapByName("mjl_txt_cancel", 65, 8);
                    this.noBtn.addChild(noWord);
                }
                this.addChild(this.noBtn);
            }
            if (this._backFn && this._backFn[0]) {
                this.yesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._backFn[0], this._backObj);
            }
            if (this._backFn && this._backFn[1]) {
                this.noBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._backFn[1], this._backObj);
            }
            if (this.yesBtn) {
                this.yesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            }
            if (this.noBtn) {
                this.noBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            }
            this.title.x = (635 - this.title.width) / 2;
        }
        public set titleY(value:number){
            this.title.y = value;
        }
        public set titleColor(value:number){
            this.title.textColor = value;
        }
        public set msgColor(value:number){
            this.info.textColor = value;
        }
        public destory(): void {
            if (this.yesBtn) {
                if (this._backFn && this._backFn[0]) {
                    this.yesBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._backFn[0], this._backObj);
                }
                this.yesBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.yesBtn = null;
            }
            if (this.noBtn) {
                this.noBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                if (this._backFn && this._backFn[1]) {
                    this.noBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._backFn[1], this._backObj);
                }
                this.noBtn = null;
            }
            this.title = null;
            this.info = null;
            this._backFn = null;
            this._backObj = null;
            LobbyResUtil.removeFromParent(this);
            LobbyResUtil.removeAllChildren(this);
        }

    }
}
