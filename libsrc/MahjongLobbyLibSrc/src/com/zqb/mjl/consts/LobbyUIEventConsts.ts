module MJLobby {
	export class LobbyUIEventConsts {
		public static GO_TO_DEMO: string = "GO_TO_DEMO";
		public static SHOW_CREATE_PANEL: string = "SHOW_CREATE_PANEL";
		public static SHOW_JOIN_PANEL: string = "SHOW_JOIN_PANEL";
		public static SHOW_TGY: string = "SHOW_TGY";
		public static CLOSE: string = "CLOSE";
		public static CLOSE_RECORD: string = "CLOSE_RECORD";
		public static CREATE_ROOM: string = "CREATE_ROOM";
		public static SettingMatch: string = "SettingMatch";
		public static JOIN_ROOM: string = "JOIN_ROOM";
		public static ACTIVE_LIST_ROOM: string = "ACTIVE_LIST_ROOM"; //当前活跃房间列表
		public static CLICK: string = "CLICK";
		public static BACK_ROOM: string = "BACK_ROOM";
		public static SET_TGY: string = "SET_TGY";

		public static SHOW_RECORD: string = "SHOW_RECORD";  //显示战绩
		public static SHOW_HELP: string = "SHOW_HELP";  //显示玩法
		public static SHOW_SHARE: string = "SHOW_SHARE";  //显示分享
		public static SHOW_SETTING: string = "SHOW_SETTING";  //显示设置
		public static SHOW_NOTICE: string = "SHOW_NOTICE";  //显示系统公告
		public static SHOW_MARKET: string = "SHOW_MARKET";  //显示商城
		public static SHOW_VIP: string = "SHOW_VIP";  //显示VIP
		public static SHOW_REDPACKET: string = "SHOW_REDPACKET";  //显示红包

		public static SHOW_USERINFO: string = "SHOW_USERINFO";  //显示玩家信息
		public static LOGIN_OUT: string = "LOGIN_OUT";  //退出登录

		public static GET_HISTORY_DATA: string = "GET_HISTORY_DATA";  //获取战绩数据；
		public static GET_HISTORY_DETAIL_DATA: string = "GET_HISTORY_DETAIL_DATA";  //获取战绩详细数据；

		public static CHANGE: string = "CHANGE";  //变化；
		public static SHARE_SUCCESS: string = "SHARE_SUCCESS";  //分享成功；
		/**砖石转化房卡 */
		public static SHOW_DTK: string = "SHOW_DTK";
		/**钻石转化为房卡操作 */
		public static ACTION_DTK: string = "ACTION_DTK";
		public static RESET_CHECKBOX: string = "RESET_CHECKBOX";
		/**商店按钮点击 */
		public static SHOP_BTN_CLICK: string = "SHOP_BTN_CLICK";
		/**首冲 */
		public static FIRST_RECHARGE_CLICK: string = "FIRST_RECHARGE_CLICK";

		public static GET_CHECKIN_AWARDS: string = "GET_CHECKIN_AWARDS";//获取签到奖励
		public static GET_INVITE: string = "GET_INVITE";//获取邀请数据
		public static GET_INVITE_AWARDS: string = "GET_INVITE_AWARDS";//获取推荐奖励
		public static GET_RANK_DATA: string = "GET_RANK_DATA";//获取排行榜数据
		/**加入练习场 */
		public static JOIN_PRACTICEROOM: string = "join_practiceroom";
		public static SEND_HORN: string = "SEND_HORN";
		public static SHOW_HORN: string = "SHOW_HORN";
		/**发红包 */
		public static SEND_REDPACKET: string = "send_redpacket";
		/**拆红包 */
		public static CHAI_REDPACKET: string = "chai_redpacket";
		/**请求红包记录 */
		public static GET_REDPACKET_RECORD: string = "get_redpacket_record";
		/**请求查看录像 */
		public static REQ_LOOK_VIDEO: string = "req_look_video";
		/**打牌查看录像面板 */
		public static OPEN_LOOK_RECORDPANEL: string = "open_look_recordpanel";
		/**查看录像发送Id */
		public static LOOK_RECORD_ID: string = "look_record_id";
		/**请求代理 */
		public static REQ_DLS: string = "REQ_DLS";
		/**点击排行按钮 */
		public static CLICK_RANKBTN: string = "CLICK_RANKBTN";
		/**点击排行领取按钮 */
		public static GET_RANK_AWARD: string = "GET_RANK_AWARD";
		/**今日排行榜点击*/
		public static CLICK_TODAY_RANK: string = "CLICK_TODAY_RANK";
		/**昨日排行榜点击 */
		public static CLICK_YESTORDAY_RANK: string = "CLICK_YESTORDAY_RANK";
		/**红包开奖按钮点击 */
		public static REDPACKET_BTN_CLICK: string = "REDPACKET_BTN_CLICK";
		/**检测红包开启事件 */
		public static CHECKREDPACKET_OPEN: string = "CHECKREDPACKET_OPEN";
		/**开红包按钮点击事件 */
		public static OPEN_REDPACKET: string = "OPEN_REDPACKET";
		/**请求提现详情 */
		public static REDPACKET_DepositDetailPanel: string = "REDPACKET_DepositDetailPanel";
		/**前往比赛场 */
		public static GO_TO_MATCH: string = "GO_TO_MATCH";
		/**比赛场选场点击 */
		public static CHOOSE_MATCH_CLICK: string = "CHOOSE_MATCH_CLICK";
		/**比赛场报名 */
		public static ENROLL_MATCH: string = "ENROLL_MATCH";
		/**比赛场获取时间 */
		public static GET_MATCH_TIME: string = "GET_MATCH_TIME";
		/**比赛场获取排行榜 */
		public static GET_MATCH_COUNT: string = "GET_MATCH_COUNT";
		/**金币场选择游戏进入选场界面 */
		public static COIN_SELECT_GAMEID: string = "COIN_SELECT_GAMEID";
		/**显示活动按钮 */
		public static SHOW_ACTION_BTN: string = "SHOW_ACTION_BTN";
		/**金币场获取签到信息 */
		public static COIN_GETSIGN_DATA: string = "COIN_GETSIGN_DATA";
		/**金币场签到按钮点击 */
		public static COIN_SIGN_CLICK: string = "COIN_SIGN_CLICK";
		/**金币场领取签到奖励 */
		public static COIN_GETSIGN_AWARD: string = "COIN_GETSIGN_AWARD";
		/**金币场激活vip */
		public static COIN_ACTYVATE_VIP: string = "COIN_ACTYVATE_VIP";
		/**金币场每日活动点击 */
		public static COIN_FREEGOLD_CLICK: string = "COIN_FREEGOLD_CLICK";
		/**金币场请求 */
		public static COIN_FREEGOLD_REQ: string = "COIN_FREEGOLD_REQ";
		/**金币场获取vip奖励 */
		public static COIN_GETVIP_AWARD: string = "COIN_GETVIP_AWARD";
		/**金币场获取排行榜信息 */
		public static COIN_GETRANK_LIST: string = "COIN_GETRANK_LIST";
		/**金币场修改个人签名 */
		public static CHANGE_USER_SIGN: string = "CHANGE_USER_SIGN";
		/**丹东大厅邀请码 */
		public static DANDONG_INVITE: string = "DANDONG_INVITE";
		/**实名认证 */
		public static CERTIFICATION_CLICK: string = "CERTIFICATION_CLICK";
		/**实名认证发给服务器 */
		public static SEND_CERTIFICATION: string = "SEND_CERTIFICATION";
		/**玩法全部互斥事件 用来更新面创建房间面板 */
		public static EXCLUDE_ALLPLAYTYPE: string = "EXCLUDE_ALLPLAYTYPE";
		/////////////////好彩真人//////////////////
		/**商店 */
		public static HC_SHOW_SHOP: string = "HC_SHOW_SHOP";
		/**通知按钮 */
		public static HC_SHOW_NOTICE: string = "HC_SHOW_NOTICE";
		/**救济金 */
		public static HC_SHOW_ALMS: string = "HC_SHOW_ALMS";
		/**活动 */
		public static HC_SHOW_ACTIVITY: string = "HC_SHOW_ACTIVITY";
		/**任务 */
		public static HC_SHOW_TASK: string = "HC_SHOW_TASK";
		/**首充 */
		public static HC_SHOW_FIRSTRECHARGE: string = "HC_SHOW_FIRSTRECHARGE";
		/**限时活动 */
		public static HC_SHOW_LIMIT: string = "HC_SHOW_LIMIT";
		/**设置 */
		public static HC_SHOW_SETTING: string = "HC_SHOW_SETTING";
		/**快速游戏 */
		public static HC_FASETSTART: string = "HC_FASETSTART";
		/**兑换限时活动 */
		public static HC_ExchangeLimitActivity: string = "HC_ExchangeLimitActivity";
		/**展示幸运翻翻翻面板 */
		public static HC_SHOW_LUCK: string = "HC_SHOW_LUCK";
		/**翻卡 */
		public static HC_TRUN_CARD: string = "HC_TRUN_CARD";
		/**快速开始 */
		public static HC_QUICK_START: string = "HC_QUICK_START";
		public static HC_openLuckLotteryRolePanel: string = "HC_openLuckLotteryRolePanel";
		/**礼包兑换 */
		public static HC_GIFT_EXCHANGE: string = "HC_GIFT_EXCHANGE";
		/**领取首充礼包 */
		public static HC_GET_FIRSTRECHARGE_REWARD: string = "HC_GET_FIRSTRECHARGE_REWARD";
		/**礼包码兑换 */
		public static HC_GIFT_CODE: string = "HC_GIFT_CODE";
		/**判断是否可以加入游戏 */
		public static HC_JudgeEnterGameLobby: string = "HC_JudgeEnterGameLobby";
		/**返回之前的游戏房间 */
		public static HC_ReturnHaoCaiGameLobby: string = "HC_ReturnHaoCaiGameLobby";
		/**打开wifi加载按钮 */
		public static HC_OpenIsWifiLoadingPanel: string = "HC_OpenIsWifiLoadingPanel";
		/**继续加载游戏 */
		public static HC_ContinueGameIsWifiLoadingPanel: string = "HC_ContinueGameIsWifiLoadingPanel";

		/**红包活动 */
		public static HC_SHOW_REDPACKETPANEL: string = "HC_Show_redPacketPanel";
		/**抢红包 */
		public static HC_SHOW_GRABREDPACK: string = "HC_Show_grabReadPack";
		/**红包累计奖励*/
		public static HC_SHOW_REDPACKREWARD: string = "HC_Show_redPackReward";
		/**红包奖励明细*/
		public static HC_SHOW_REDPACKDETAIL: string = "HC_Show_redPackDetail";
		/**获取验证码*/
		public static HC_SHOW_GETCODE: string = "HC_Show_getCode";
		/**绑定手机*/
		public static HC_SHOW_BINDINGPHONE: string = "HC_Show_bindingPhone";
		/////////////////////////////////////////
		/**头像点击事件 回调 */
		public static HEAD_CLICK_CALLBACK: string = "HEAD_CLICK_CALLBACK"
		/**进入俱乐部 */
		public static SHOW_CLUB: string = "SHOW_CLUB"
		/**房间管理 */
		public static ROOM_MANAGE: string = "ROOM_MANAGE";
		/**邀请人排行榜 */
		public static INVITE_RANK_CLICK: string = "INVITE_RANK_CLICK";
		/**福建代理商邀请按钮点击 */
		public static LYFJ_INVITE_CLICK: string = "LYFJ_INVITE_CLICK";
		/**保险箱按钮 */
		public static SAFE_BTN_CLICK: string = "SAFE_BTN_CLICK";
		/**保险箱存取 */
		public static SAFE_POPPUSH_CLICK: string = "SAFE_POPPUSH_CLICK";
		/**前往赛事场(西安用) */
		public static SHOW_TO_BATTLE: string = "SHOW_TO_BATTLE";
		/**赛事场选场点击(西安用) */
		public static CHOOSE_BATTLE_CLICK: string = "CHOOSE_BATTLE_CLICK";
		/**赛事场报名(西安用) */
		public static ENROLL_BATTLE = "ENROLL_BATTLE";
		/**赛事场数据更新(西安用) */
		public static BATTLE_DATA_UPDATA = "BATTLE_DATA_UPDATA";
		public constructor() {
		}
	}
}
