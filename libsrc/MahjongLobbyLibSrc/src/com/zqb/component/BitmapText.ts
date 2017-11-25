module MJLobby {
	/**
	 * 图片字
	 */
	export class BitmapText extends egret.DisplayObjectContainer{
		private _bitmapTxt:egret.BitmapText;
		private _width:number;
		private _align:string;
		private _text:string;
		public constructor() {
			super();
		}

		public initTxt(font:egret.BitmapFont,w:number,align:string=egret.HorizontalAlign.LEFT):void{
			this._width=w;
			
			if(!this._bitmapTxt){
				this._bitmapTxt=new egret.BitmapText();
				this._bitmapTxt.font=font;
				this.addChild(this._bitmapTxt);
			}
			this._align=align;
		}
		public set text(str:string){
			this._bitmapTxt.text=str;
			if(this._align==egret.HorizontalAlign.LEFT){
				this._bitmapTxt.x=0;
			}else if(this._align==egret.HorizontalAlign.RIGHT){
				this._bitmapTxt.x=this._width-this._bitmapTxt.width;
			}else{
				this._bitmapTxt.x=Math.round((this._width-this._bitmapTxt.width)/2);
			}
		}
	}
}