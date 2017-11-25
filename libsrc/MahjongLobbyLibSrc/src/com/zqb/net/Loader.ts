module MJLobby {
	/**
	 *
	 * @author 
	 *
	 */
	export class Loader extends egret.DisplayObjectContainer{
        private _url: string;
        private _width:number;
        private _height:number;
		public constructor(url:string,w?:number,h?:number) {
            super();
            this._url = url;
            this._height=h;
            this._width=w;
            this.load();
		}
		private load():void{
            var loader: egret.URLLoader = new egret.URLLoader();
            //设置加载方式为纹理
            loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
            //添加加载完成侦听
            loader.addEventListener(egret.Event.COMPLETE,this.onLoadComplete,this);
            //添加加载失败侦听
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onLoadError,this);
            var url: string = this._url;
            var request: egret.URLRequest = new egret.URLRequest(url);
            //开始加载
            loader.load(request);
		}
        private onLoadComplete(event: egret.Event): void {
            uniLib.Console.log("onLoadComplete");
            var loader: egret.URLLoader = <egret.URLLoader>event.target;
            //获取加载到的纹理对象
            var texture: egret.Texture = <egret.Texture>loader.data;
            var bitMap: egret.Bitmap = new egret.Bitmap(texture);
            bitMap.width=this._width;
            bitMap.height=this._height;
            this.addChild(bitMap);
        }

        private onLoadError(): void {
            uniLib.Console.log("onLoadError");
        }
	}
}
