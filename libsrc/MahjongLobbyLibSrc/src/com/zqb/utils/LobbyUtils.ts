module MJLobby {
	export class LobbyUtils {
		public static defaultColor:number=0x4E4943;
		public constructor() {
		}
		public static getGoodNameByShopId(shopId:number):any{
			var daoju:any=RES.getRes("TableGoodsConfig_json");
			var shop:Array<any>=RES.getRes("TableShopConfig_json");
			var good:any;
			var daojuVo:any;
			var goodVo:any;
			var index:number=0;
			var data:any={};
			for(var i=0;i<shop.length;i++){
				good=shop[i];
				if(good.shopId==shopId){
					good=shop[i];
					daojuVo=daoju[good.shopGoods.goodId-1];
					data.goodName=daojuVo.goodName;
					data.goodNbr=daojuVo.giftGoods[0].goodNbr;
					data.goodDesc=daojuVo.goodDesc;
					data.price=good.price;
					return data;
				}
			}
			return null;
		}
		public static changeTimeToStr(num: number): string {
			if (num == null)
				return "";
			num = num.toString().length == 10 ? num * 1000 : num;
			var date: Date = new Date();
			date.setTime(num);
			var str: string = date.getFullYear() + "-" + this.getNumStr(date.getMonth() + 1) + "-" + this.getNumStr(date.getDate()) + "  " + this.getNumStr(date.getHours()) + ":" + this.getNumStr(date.getMinutes()) + ":" + this.getNumStr(date.getSeconds());
			return str;
		}
		private static getNumStr(num:number):string{
			if(num<10){
				return "0"+num;
			}
			return num.toString();
		}
		public static getBitmapFontTxt(fontName:string,w:number,align:string=egret.HorizontalAlign.LEFT,x:number=0,y:number=0):BitmapText{
			var bitmapText:BitmapText = new BitmapText();
			bitmapText.initTxt(RES.getRes(fontName),w,align);
			bitmapText.x=x;
			bitmapText.y=y;
			return bitmapText;
		}
	}
}