module MJLobby {
	/**
	 * 头像类，头像加载后缓存到内存
	 */
	export class LobbyHeadMc extends egret.Sprite{
        private _headUrl: string;
        private _headMc: egret.Bitmap;
        private _width: number;
        private _height: number;
        private _headLoad:HeadLoader;
        private _showDefault:boolean;
        private _dataLoading:DataLoading;
        private _uid: number;
		public constructor(width:number,height:number,showDefault:boolean=true,showLoading:boolean=false) {
            super();
            this._width = width;
            this._height = height;
            this._showDefault=showDefault;
            if(this._showDefault){
                this._headMc = LobbyResUtil.createBitmapByName("defaultHead");
                this._headMc.width = this._width;
                this._headMc.height = this._height;
                this.addChild(this._headMc);
            }
            if(showLoading){
                this._dataLoading=new DataLoading();
                this._dataLoading.x=Math.round(width/2);
                this._dataLoading.y=Math.round(height/2);
                this.addChild(this._dataLoading);
                this._dataLoading.play();
            }
            
		}
        private removeLoading():void{
			if(this._dataLoading){
				this._dataLoading.destory();
				this._dataLoading=null;
			}
		}
        public destory():void{
            LobbyResUtil.removeAllChildren(this);
            LobbyResUtil.removeFromParent(this);
            if(this._headMc.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
                this._headMc.removeEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                    this.dispatchEventWith(LobbyUIEventConsts.HEAD_CLICK_CALLBACK,true,this._uid);
                },this);
            }
            this.removeLoading();
            if(this._headLoad){
                this._headLoad.destroy();
                this._headLoad=null;
            }
            this._headMc=null;
        }
		public set headUrl(url:string){
            if(url && url.indexOf("http") == -1){
                if(this._headUrl){
                    url = this._headUrl;
                }else{
                    return;
                }
            }
            if(this._headUrl&&this._headUrl==url){
                return;
            }
            this._headUrl = url;
            if(this._showDefault){
                this._headMc.texture=LobbyResUtil.createTexture("defaultHead");
            }
            if(!this._headLoad){
                 this._headLoad=new HeadLoader();
            }
            if(this._headUrl){
                this._headLoad.load(this._headUrl,this.loaded,null,this);
            }
		}
        private loaded(data:egret.BitmapData):void{
            this.removeLoading();
            if(!this._headMc){
                this._headMc = new egret.Bitmap(data);
                this.addChild(this._headMc);
            }else{
                this._headMc.bitmapData = data;
            }
             this._headMc.width = this._width;
            this._headMc.height = this._height;
        }
       
        public setUId(uid: number){
            this._uid = uid;
            this._headMc.touchEnabled = true
            this._headMc.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                this.dispatchEventWith(LobbyUIEventConsts.HEAD_CLICK_CALLBACK,true,this._uid);
            },this);
        }
	}
}