module MJLobby {
	/**
	 * 大厅数据
	 */
	export class MJLobbyData {
		private static _instance: MJLobbyData;
		public myBaseInfo: Cmd.UserBaseInfo;
		private static _gameconfig: uniLib.IGameConfig[];
		public disclaimer: number = 0;
		public showFirst: number;
		public isCreate: boolean;
		public isDLS: boolean;
		public static lastOrder: uniLib.IOrderInfo;
		public tgyId: number;
		private _createConfg: any;
		private _lobbyConfig: any;
		private _lobbyId: number;
		private _playTypeConfig: any;
		private _playTypeLabel: any;
		private _goodConfig: any;
		// public defaultGameId: number;
		public openingGameList: Array<number>;
		public checkInVo: CheckInVo;
		public showNotice: boolean = false;
		public defaultSysMsg: string;
		private _gameCreateConfig: Array<any>;
		public continueObj: Cmd.ApplyContinuePlayRoomCmd_Brd;
		public hasShowGame: boolean = false;//是否第一次显示lobby，第二次会同步玩家数据
		public defaultGameId: number;//默认GameId
		public noticeFee: number;
		public recharge: number;//已经购买过的钻石数量
		/**第一次进入存取头像避免多次请求造成报错 */
		public myDefaultHeadUrl: string;
		/**是否开放排行榜 */
		public showRank: number;
		public redPassword: string;
		/**每次是否第一次登陆 默认是true*/
		public everyFirstLogin = true;
		/**江西客家vip */
		private _vipConfig: Array<any>;
		/**比赛场cofig */
		private _matchConfig: Array<any>;
		/**金币场config */
		private _coinConfig: Array<any>;
		/**金币场vip */
		private _coinVipConfig: any;
		/**全局查看录像房间id */
		public globalRoomId: number = 0;
		/**是否录像 */
		public video: number = 0;
		/**录像数据 */
		public videoData: string = "";
		/**录像主视角uid */
		public videoUID: number;
		/**游戏网关url,nginx代理用,让一个房间的人在一个nginx,防止被攻击 */
		public gameGatewayUrl: string;
		/**是否审核模式 */
		public isShenHe = false;
		/**今日排名 */
		public todayRecord: Cmd.GetDayRankCmd_S;
		/**昨日排名 */
		public yesterdayRecord: Cmd.GetDayRankCmd_S;
		/**排行榜类型 */
		public rankType: number;
		/**免费活动时间 */
		public freeTimes: number[];
		/**红包开奖活动 提现详情 */
		public redpacket_DepositDetail: Cmd.openRecord[] = [];
		/**红包开奖信息 */
		public redpacket_info: Cmd.GetRedPackRewardInfoLobbyCmd_S;
		/**红包剩余金额 */
		public redpacket_surplus: number;
		/**是否显示红包 */
		public showRedpacket: number = 0;
		/**是否自动弹出红包 */
		public autoShowRedpacket: number = 0;
		/**金币场选择游戏ID*/
		public coinSelectGameId: number = 0;
		/**大厅界面风格  用于不同大厅风格的二级界面 
		 * 默认为0  绿谷大厅1  金币场2  比赛场3 好彩真人麻将4
		*/
		public artStyle: number = 0;
		/**风格不同y轴需要做不同的处理 */
		public artStyleInitY: number;
		/**金币场vip可以点击的领取的奖励 */
		public vipReward: Array<number>;
		/**金币场是否显示首充礼包 1显示*/
		public firstRecharge: number = 0;
		/**麻将进入消息存储 */
		private _userInfoSynLobby: Cmd.UserInfoSynLobbyCmd_S;
		/**
		 * 显示游戏端特有loading
		 */
		public static ShowGameLoading: boolean = false;
		/**当前正在进入的gameId 
		 * 目前只用于捕鱼 进入捕鱼删除大厅资源
		*/
		public curGameId: number = 0;
		/**游戏名 */
		public curGameName: string = "";
		/**上次进入的gameId 
		 *好彩退出房间的时候游戏发给游戏的事件
		*/
		public lastGameId: number = 0;
		/**上次进入游戏房间时间 */
		public lastEnterRoomTime: number = 0;
		/**是否存在官方充值存在 绑定代理商返钻 1表示存在 */
		public bindRechargeRet: number = 0;
		/**是否显示实名认证 0:不显示 1:显示*/
		public authen: number = 1;
		/**是否在预加载 */
		public isLoading: boolean = false;
			/**好彩游戏存储按钮红点（未读）数据 */
		public redPointData: Cmd.ShowRedPointLobbyCmd_S;
		/**最近一次的比配号和茶馆号 */
		public lastMatchId:number;

		/**
		 * 百人长loading
		 */
		public sceneLoading: any;
		/**游戏积分赛配置 */
		private _gameOfficalEventConfig: any;
		/**积分赛配置表 */
		private _tableOfficalEventConfig: Array<any>;
		/**积分赛奖励表 */
		private _tableRewardItemConfig: Array<any>;

		public constructor() {
		}
		public static getInstance(): MJLobbyData {
			if (!this._instance) {
				this._instance = new MJLobbyData();
			}
			return this._instance
		}
		public static getGameConfigs(): uniLib.IGameConfig[] {
			if (this._gameconfig == null) {
				this._gameconfig = [];
				var len: number = uniLib.Global.zoneList.length;
				for (var i = 0; i < len; i++) {
					var zoneInfo = uniLib.Global.zoneList[i];
					var gameCfg: uniLib.IGameConfig = this.getConfigByGameId(zoneInfo.gameid);
					if (gameCfg) {
						gameCfg.zoneInfo = zoneInfo;
						gameCfg.destroyResOnExit = true;
						this._gameconfig.unshift(gameCfg);
					}
				}
			}
			return this._gameconfig;
		}
		public getRewardItemConfigById(id: number): any {
			if (!this._tableRewardItemConfig) {
				this._tableRewardItemConfig = RES.getRes("TableRewardItemConfig_json");
			}
			return this._tableRewardItemConfig[id];
		}
		public getGameOfficalEventConfig(gameId: number): any {
			this._gameOfficalEventConfig = {};
			if (!this._tableOfficalEventConfig) {
				this._tableOfficalEventConfig = RES.getRes("TableOfficalEventConfig_json");
			}
			for (var i = 0; i < this._tableOfficalEventConfig.length; i++) {
				if (this._tableOfficalEventConfig[i].gameId == gameId) {
					this._gameOfficalEventConfig[this._tableOfficalEventConfig[i].level] = this._tableOfficalEventConfig[i];
				}
			}
			return this._gameOfficalEventConfig;
		}
		public getGameOfficalEventConfigByMatchId(matchId: number): any {
			this._gameOfficalEventConfig = {};
			if (!this._tableOfficalEventConfig) {
				this._tableOfficalEventConfig = RES.getRes("TableOfficalEventConfig_json");
			}
			for (var i = 0; i < this._tableOfficalEventConfig.length; i++) {
				if (this._tableOfficalEventConfig[i].id == matchId) {
					this._gameOfficalEventConfig[matchId] = this._tableOfficalEventConfig[i];
				}
			}
			return this._gameOfficalEventConfig;
		}
		public getGameCreateConfig(gameId: number): any {
			this._createConfg = {};
			if (!this._gameCreateConfig) {
				this._gameCreateConfig = RES.getRes("TableCreateConfigList_json");
			}
			for (var i = 0; i < this._gameCreateConfig.length; i++) {
				this._createConfg[this._gameCreateConfig[i].gameId] = this._gameCreateConfig[i];
			}
			return this._createConfg[gameId];
		}
		public getPlayTypeConfig(): any {
			if (!this._playTypeConfig) {
				var arr: Array<any> = RES.getRes("TablePlayTypeList_json");
				this._playTypeLabel = {};
				this._playTypeConfig = {};
				for (var i = 0; i < arr.length; i++) {
					this._playTypeConfig[arr[i].id] = arr[i];
					this._playTypeLabel[arr[i].playType] = arr[i].playTypeDecs;
				}
			}
			return this._playTypeConfig;
		}

		public getPlayTypeConfigById(id: number): any {
			if (!this._playTypeConfig) {
				this.getPlayTypeConfig();
			}
			return this._playTypeConfig[id];
		}

		public set lobbyId(id: number) {
			this._lobbyId = id;
			this._lobbyConfig = null;
			this.setLobbyConfig();
			this.defaultGameId = this._lobbyConfig.mahjongList[0];
			//设置分享参数
			if (!uniLib.ZQGameSdk.defaultWXShareVo) {
				uniLib.ZQGameSdk.defaultWXShareVo = new uniLib.WXShareVo();
			}
			var vo: uniLib.WXShareVo = uniLib.ZQGameSdk.defaultWXShareVo;
			vo.title = this._lobbyConfig.shareTitle;
			vo.description = this._lobbyConfig.shareContent;
			uniLib.ZQGameSdk.defaultWXShareVo = vo;

		}
		public set gameCreateConfig(arr: Array<any>) {
			this._gameCreateConfig = arr;
		}
		public get lobbyConfig(): any {
			return this._lobbyConfig;
		}

		public getLobbyConfig(): any {
			return this._lobbyConfig;
		}

		public set lobbyConfig(vo: any) {
			this._lobbyConfig = vo;
			this.defaultGameId = this._lobbyConfig.mahjongList[0];
		}
		public get lobbyId(): number {
			return this._lobbyId;
		}
		public static getGameConfig(gameId: number): uniLib.IGameConfig {
			var gameList: Array<uniLib.IGameConfig> = this.getGameConfigs();
			for (var i: number = 0; i < gameList.length; i++) {
				if (gameList[i].gameId == gameId) {
					return gameList[i];
				}
			}
		}
		private setLobbyConfig(): void {
			if (!this._lobbyConfig) {
				var arr: Array<any> = RES.getRes("TableLobbyGameList_json");
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].id == this._lobbyId) {
						this._lobbyConfig = arr[i];
						break;
					}
				}
				if (!this._lobbyConfig) {
					this._lobbyConfig = arr[0];
				}
			}
		}
		public getGameList(): Array<number> {
			this.setLobbyConfig();
			return this._lobbyConfig.mahjongList;
		}

		public getExerciseList(): Array<any> {
			this.setLobbyConfig();
			return this._lobbyConfig.exerciseList;
		}

		public getgetExerciseLabel(): Array<any> {
			this.setLobbyConfig();
			return this._lobbyConfig.exerciseLabelList;
		}

		public getHundredList(): Array<any> {
			this.setLobbyConfig();
			if (this._lobbyConfig.hasOwnProperty("hundredList")) {
				return this._lobbyConfig.hundredList;
			}
		}
		public static getMahjongGameId(): number {
			var _gameconfig: uniLib.IGameConfig[] = RES.getRes("gameList_json");
			return _gameconfig[0].gameId;
		}
		public static getConfigByGameId(gameId: number): uniLib.IGameConfig {
			var _gameconfig: uniLib.IGameConfig[] = RES.getRes("gameList_json");
			var len: number = _gameconfig.length;
			for (var i: number = 0; i < len; i++) {
				if (_gameconfig[i].gameId == gameId)
					return _gameconfig[i];
			}
			return null;
		}
		/**江西客家vip */
		public getVipConfig(): Array<any> {
			if (!this._vipConfig) {
				this._vipConfig = RES.getRes("TableMahjongVipConfig_json");
			}
			return this._vipConfig;
		}
		/**匹配场config */
		public getMatchConfig(): Array<any> {
			if (!RES.hasRes("TableMatchTypeList_json")) return;
			if (!this._matchConfig) {
				let config = RES.getRes("TableMatchTypeList_json");
				for (let parm of config) {
					if (parm.hasOwnProperty("lobbyId") && parm["lobbyId"] == this._lobbyId) {
						if (!this._matchConfig) {
							this._matchConfig = []
						}
						this._matchConfig.push(parm);
					}
				}
			}
			return this._matchConfig;
		}
		/**金币场config */
		public getCoinConfig(): Array<any> {
			if (!RES.hasRes("TableCoinHundredConfig_json")) return null;
			if (!this._coinConfig) {
				let config = RES.getRes("TableCoinHundredConfig_json");
				if (this._lobbyConfig["coinList"] && 　Array.isArray(this._lobbyConfig["coinList"])) {
					for (let i = 0; i < this._lobbyConfig["coinList"].length; i++) {
						for (let parm of config) {
							if (this._lobbyConfig["coinList"][i].gameId == parm["gameId"]
								&& this._lobbyConfig["coinList"][i].sceneId.indexOf(parm["id"]) != -1) {
								if (!this._coinConfig) {
									this._coinConfig = [];
								}
								this._coinConfig.push(parm);
							}
						}
					}
				}
			}
			return this._coinConfig
		}
		/**金币场vipConfig */
		public getCoinVipConfig(): any {
			if (!RES.getRes("TableVIPPoint_json")) return null;
			if (!this._coinVipConfig) {
				let config = RES.getRes("TableVIPPoint_json");
				for (let item of config) {
					if (item["lobbyId"] == this._lobbyId) {
						this._coinVipConfig = item;
					}
				}
			}
			return this._coinVipConfig;
		}
		/**获取登录消息 */
		public get userInfoSynLobby(): Cmd.UserInfoSynLobbyCmd_S {
			return this._userInfoSynLobby;
		}

		public set userInfoSynLobby(data: Cmd.UserInfoSynLobbyCmd_S) {
			this._userInfoSynLobby = data;
		}
		/**
		 * 根据goodId来获取配表的
		 */
		public getGooIDName(goodId: number): string {
			if (!this._goodConfig)
				this._goodConfig = RES.getRes("TableGoodsConfig_json");
			for (let item of this._goodConfig) {
				if (item["goodId"] == goodId) {
					return item["goodName"];
					break;
				}
			}
			return "";
		}
		/**获取当前选择金币场游戏的配置 */
		public getCoinCofigBySeletGameId(): any {
			let config = RES.getRes("TableCoinHundredConfig_json");
			let configArr = [];
			for (let item of MJLobbyData.getInstance().getLobbyConfig()["coinList"]) {//先筛选sceneId
				if (item["gameId"] == MJLobby.MJLobbyData.getInstance().coinSelectGameId) {
					for (let parm of config) {
						for (let i = 0; i < item["sceneId"].length; i++) {//相同的gameId有不同的场次id 兼容不同大厅配同个游戏 并且数据不同
							if (parm["id"] == item["sceneId"][i]) {//sceneId来找对应的config
								configArr.push(parm);
							}
						}
					}
					break;
				}
			}
			return configArr;
		}
		/**
		 * 活动赛事表
		 */
		public getTableEventConfig(): Array<any> {
			if (this.tableEventConfig)
				return this.tableEventConfig;
			this.tableEventConfig = RES.getRes("TableEventConfig_json");
			return this.tableEventConfig;
		}
		private tableEventConfig: Array<any>;

		public checkLoading():boolean{
			if(this.isLoading)
				LobbyPopupManager.showMildWarnShow("当前正在下载游戏，请等待游戏下载完毕");
			return this.isLoading;
		}
		/**预下载判断 */
		public hasGameRes(gameId: number): boolean {
			let gameData: uniLib.IGameConfig = MJLobbyData.getConfigByGameId(gameId);
			if (uniLib.GameModuleUtils.gameDownloaded(gameData.gameCodeUrl) == false) {
				return false;
			}else{
				return true;
			}
		}
		/**获取支付方式 152微信支付 17苹果支付*/
		public getPayplatId(): number{
			if(uniLib.Utils.isIOS()){
				if(uniLib.Global.is_sandbox != 0){
					if(uniLib.Global.payPlatId!=NaN || uniLib.Global.payPlatId != undefined || uniLib.Global.payPlatId != 0){
						 return uniLib.Global.payPlatId;
					}else{
						return 17;
					}
				}else{
					if(MJLobbyData.getInstance().myBaseInfo.playNum >= MJLobbyData.getInstance().lobbyConfig["changeRoundNum"]){
						return 152;
					}else{
						return 17;
					}
				}
			}else{
				return 152;
			}
			return 152;
		}
		/**是否移除meditor监听 */
		public isHaoCai(): boolean{
			if(this._lobbyConfig && this._lobbyConfig.hasOwnProperty("isHaocai")){
				if(this._lobbyConfig["isHaocai"] == 1){
					return true;
				}
			}
			return false;
		}
		/**公告时间控制 
		 * @param year 年
		 * @param month 月
		 * @param day 日
		*/
		public isShowNotice(year: number,month: number,day: number): boolean{
			let date = new Date(year,month -1,day,0,0,0);
			let stamp = date.getTime();
			let now = new Date().getTime();
			if(stamp >= now){
				return true;
			}
			return false;
		}
		/**
		* 滤镜彩色过滤
		*/
		public static get ColorFilter() {
			var colorMatrix = [
				0.3, 0.6, 0, 0, 0,
				0.3, 0.6, 0, 0, 0,
				0.3, 0.6, 0, 0, 0,
				0, 0, 0, 1, 0
			];
			var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
			return [colorFlilter];
		}
		/**
		 * 滤镜颜色还原
		 **/
		public static get RevertColorFilter() {
			var colorMatrix = [
				1, 0, 0, 0, 0,
				0, 1, 0, 0, 0,
				0, 0, 1, 0, 0,
				0, 0, 0, 1, 0
			];
			var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
			return [colorFlilter];
		}
		/**
		 * 添加阴影
		 **/
		public static get DropShadowFilter() {
			var distance: number = 6;           /// 阴影的偏移距离，以像素为单位
			var angle: number = 45;              /// 阴影的角度，0 到 360 度
			var color: number = 0x000000;        /// 阴影的颜色，不包含透明度
			var alpha: number = 0.7;             /// 光晕的颜色透明度，是对 color 参数的透明度设定
			var blurX: number = 16;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
			var blurY: number = 16;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
			var strength: number = 0.65;                /// 压印的强度，值越大，压印的颜色越深，而且阴影与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
			var quality: number = egret.BitmapFilterQuality.LOW;              /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
			var inner: boolean = false;            /// 指定发光是否为内侧发光，暂未实现
			var knockout: boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
			var dropShadowFilter: egret.DropShadowFilter = new egret.DropShadowFilter(distance, angle, color, alpha, blurX, blurY,
				strength, quality, inner, knockout);
			return [dropShadowFilter];
		}
	}
}
