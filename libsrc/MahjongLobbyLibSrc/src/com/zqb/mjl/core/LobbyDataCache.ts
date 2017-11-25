module MJLobby {
    /**
     * 数据缓存
     */
	export class LobbyDataCache {
        public static langObj: any;//语言数据
        public static stageHight: number;
        public static stageWidth: number;
        public static defaultWidth:number=1280;//默认设计尺寸
        public static defaultHeight: number = 720;//默认设计尺寸
        public static costType:number=4;//货币类型
        public static imei: string;//设备码
        public static version:string="1.0.0";//版本号
        public static gameID:number;
        public static shareNLast:number=0;//分享次数
        public static lobbyId:number=2;//1-5区分不同大厅
        public static bundleInfo: any;//原生层发来的info
        /**头像缓存组 */
		private static headUrlList: Cmd.UserHead[];
		public constructor() {
        }
        /**通过uid获取headURL */
        public static getHeadUrlByUid(uid: number) :string{
			if (!this.headUrlList || this.headUrlList.length < 1) {
                this.headUrlList = [];
				return null;
            }
            for (var i = 0; i < this.headUrlList.length;i++){
                var item = this.headUrlList[i];
                if (item.uid == uid) {
                    return item.headUrl;
                }
            }
            return null;
        }
        /**添加headUrl */
        public static addHeadUrl(userHead: Cmd.UserHead[]) {
            if (!userHead)
                return;    
            if (!this.headUrlList) {
                this.headUrlList = [];
            }
            for (let item of userHead) {
                var index = this.findIndex(item.uid)
                if (index!=-1) {
                    this.headUrlList[index] = item;
                } else {
                    this.headUrlList.push(item);
                }
            }
        }
        /**寻找相同head */
        private static findIndex(uid: number): number {
            for (let i = 0; i < this.headUrlList.length; i++) {
                if (uid == this.headUrlList[i].uid) {
                    return i;
                }
            }
            return -1;
        }
        
	}
}