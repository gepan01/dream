module MJLobby {
	export class MahJongLobbyFacadeConsts {
		public static STARTUP:string                                  = "STARTUP";
		public static SEND_DATA:string                                = "sendData"; 
		public static ENTER_LOBBY:string                                ="ENTER_LOBBY";
		public static JOIN_ROOM:string                                  ="JOIN_ROOM";//进入房间
		public static JOIN_VIDEOROOM:string								="join_videoroom";//进入录像房间
		/**加入百人场 */
		public static JOIN_HUNDRE_ROOM: string							="JOIN_HUNDRE_ROOM";
		public static CREATE_ROOM_SUCCESS:string                        ="CREATE_ROOM_SUCCESS";//创建房间成功
		public static CANCEL_ROOM:string                                ="CANCEL_ROOM";//取消房间

		public static SHOW_RECORD: string									="SHOW_RECORD";  //显示战绩
		public static SHOW_HELP: string									="SHOW_HELP";  //显示玩法
		public static SHOW_SHARE: string									="SHOW_SHARE";  //显示分享
		public static SHOW_SETTING: string									="SHOW_SETTING";  //显示设置

		public static HISTORY_DATA:string                                ="HISTORY_DATA";//战绩数据按页返回
		public static HISTORY_DETAIL_DATA:string                                ="HISTORY_DETAIL_DATA";//战绩详细数据

		public static ROOM_DESTORY:string                        ="ROOM_DESTORY";//创建房间销毁
		public static USER_INFO_DATA:string                        ="USER_INFO_DATA";//玩家数据信息

		public static DESTORY: string									="DESTORY";  //销毁
		public static SHOW_LOBBY: string									="SHOW_LOBBY";  //显示大厅
		public static LOBBY_RECONNECTION: string									="LOBBY_RECONNECTION";  //大厅断线重连
		public static GAME_LIST_DATA: string									="GAME_LIST_DATA";  //大厅列表

		public static INVITE_DATA: string									="INVITE_DATA";  //推荐人数据

		public static CHECKIN_AWARDS_DATA:string							="CHECKIN_AWARDS_DATA";//获取签到奖励返回
		public static INVITE_AWARDS_DATA:string							="INVITE_AWARDS_DATA";//获取邀请奖励返回

		public static CONFIG_LOADED:string							="CONFIG_LOADED";//大厅配置加载成功

		public static CONTINUE:string							="CONTINUE";//继续牌局
		/**发红包返回 客家*/
		public static SEND_REDPACKET_BACK: string				="send_redpacket_back";
		/**领取红包返回 客家*/
		public static GET_REDPACKET_BACK: string				="get_redpacket_back";
		/**红包记录返回 客家*/
		public static GET_REDPACKET_RECORD: string				="get_redpacket_record";
		/**加入房间确认 */
		public static CONFRIM_JOINROOM: string					="CONFRIM_JOINROOM";
		/**收到服务器发来排行榜数据 */
		public static GET_RANK_RECORD: string					="GET_RANK_RECORD";
		/**收到服务器发来领取排行榜奖励 */
		public static GET_RANK_AWARD: string					="GET_RANK_AWARD";
		/**收到服务器返回打开红包界面 */
		public static OPEN_REDPACKETPANEL: string				="OPEN_REDPACKETPANEL"
		/**收到服务器返回提现详情界面 */
		public static GET_REDPOSITDETAIL: string					="GET_REDPOSITDETAIL"
		/**收到服务器返回 红包提现成功 */
		public static GET_REDPACKET_SUCCESS: string				="GET_REDPACKET_SUCCESS";
		/**检测红包提取成功 */
		public static CHECKOPENREDPACK_OK: string				= "CHECKOPENREDPACK_OK";
		/**更新匹配组数据 */
		public static REFRESH_MATCHGROUP:string                 ="REFRESH_MATCHGROUP";
		/**进入匹配组数据 */
		public static ENTER_MATCHGROUP: string 					= "ENTER_MATCHGROUP";
		/**刷新匹配组数据 */
		public static UODATE_MATCHGROUP:string                   ="UODATE_MATCHGROUP";
		/**离开匹配组数据 */
		public static LEAVE_MATCHGROUP:string                   ="LEAVE_MATCHGROUP";
		/** */
		public static ActiveDetailRoom:string                   ="ActiveDetailRoom";
		/**进入匹配组数据 */
		public static CREATE_MATCHGROUP:string                   ="CREATE_MATCHGROUP";
		/**获取服务器发来的比赛场时间 */
		public static GET_MATCHTIME: string						="GET_MATCHTIME";
		/**比赛场报名成功 */
		public static MATCH_ENROLL_SUCCESS: string				="MATCH_ENROLL_SUCCESS";
		/**比赛场退赛 */
		public static MATCH_EXIT: string						="MATCH_EXIT";
		/**比赛场获得玩家数量 */
		public static MATCH_GETUSER_COUNT: string				="MATCH_GETUSER_COUNT";
		/**比赛场获得玩家数量排行榜 */
		public static MATCH_GETCOUNT_LIST: string				="MATCH_GETCOUNT_LIST";
		/**金币场用户签到信息返回 */
		public static SIGN_INFO: string					="SIGNINFO_RETURN";
		/**金币场用户签到返回 */
		public static SIGN_TODAY: string					="SIGNTODAY_DATA";
		/**金币场累积签到奖励 */
		public static SIGN_CONTINUE: string						="SIGN_CONTINUE";
		/**金币场排行榜信息回复 */
		public static GET_RANK_LIST: string						="GET_RANK_LIST";
		/**金币场获取大赢家排行榜奖励回复 */
		public static GET_WINCHIPS_RANK: string					="GET_WINCHIPS_RANK";
		/**金币场获取免费金币界面数据 */
		public static GET_FREEGOLD_INFO: string					="GET_FREEGOLD_INFO";
		/**金币场获取vip礼包 */
		public static COIN_GETAWARD_VIP: string					="COIN_GETAWARD_VIP";
		/**金币场首冲充值成功 */
		public static COIN_FIRSTRECHARGE: string				="COIN_FIRSTRECHARGE";
		/**金币场免费金币 */
		public static COIN_FREEGOLD: string						="COIN_FREEGOLD";
		/**金币场排行榜的个人信息 */
		public static COIN_RANK_INFO: string					= "COIN_RANK_INFO";
		/**匹配号数据 */
		public static ReturnMatchGroup							= "ReturnMatchGroup";
		/**白名单消息列表 */
		public static JoinMemberListMatch						= "JoinMemberListMatch";
		/**返回黑白名单 */
		public static MemberInfoMatchGroup						= "MemberInfoMatchGroup";
		/**返回参赛人员战绩列表 */
		public static PlayedListMatchGroup						= "PlayedListMatchGroup";
		/**客家棋牌推荐人数 */
		public static KEJIA_INVITERANK							= "KEJIA_INVITERANK";
		/**福建代理商邀请人 */
		public static LYFJ_INVITE								= "LYFJ_INVITE";
		/**福建代理商邀请返回 */
		public static LYFJ_INVITE_RETURN						= "LYFJ_INVITE_RETURN";
		/**丹东邀请人 */
		public static DANDONG_INVITE							= "DANDONG_INVITE";
		/**余款数量更新 */
		public static BANK_MONEY_UPDATE 								= "BANK_MONEY_UPDATE";
		////////////////////////好彩真人麻将/////////////////////////
		/** 收到服务器发来 好彩真人麻将救济金消息 */
		public static HC_ALMS: string							= "HC_ALMS";		
		/**收到服务器发回首充面板消息 */
		public static HC_SHOW_FIRSTRECHARGE						= "HC_SHOW_FIRSTRECHARGE";
		/**收到服务器发限时面板的返回 */
		public static HC_SHOW_LIMIT								= "HC_SHOW_LIMIT";
		/**收到服务器限时优惠兑换奖励的返回 */
		public static HC_SHOW_LIMIT_BACK						= "HC_SHOW_LIMIT_BACK";
		/**打开幸运翻翻翻面板 */
		public static HC_SHOW_LUCK								= "HC_SHOW_LUCK";
		/**返回幸运翻翻翻面板的数据 */
		public static HC_SHOW_LUCK_BACK							= "HC_SHOW_LUCK_BACK";
		/**快速开始 */
		public static HC_QUICK_START							= "HC_QUICK_START";
		/**限时优惠 */
		public static HC_ExchangeLimitActivity  				= "HC_ExchangeLimitActivity";
		/**好彩真人百人场 */
		public static HC_JOIN_HUNDRE_ROOM						= "HC_JOIN_HUNDRE_ROOM";
		/**返回活跃房间列表 */
		public static RETURN_ACTIVE_LIST_ROOM							= "RETURN_ACTIVE_LIST_ROOM";
		/**好彩真人登陆成功 */
		public static HC_LOGIN_SUCCESS									= "HC_LOGIN_SUCCESS";	
		/**好彩礼包码兑换 */
		public static HC_GIFT_CODE										= "HC_GIFT_CODE";
		/**好彩领取首充礼包 */
		public static HC_GET_FIRSTRECHARGE_REWARD						= "HC_GET_FIRSTRECHARGE_REWARD";
		/**服务器返回是否可以加入游戏信息 */
		public static HC_JudgeEnterGameLobby							= "HC_JudgeEnterGameLobby";
		/**返回之前的游戏房间 */
		public static HC_ReturnHaoCaiGameLobby							= "HC_ReturnHaoCaiGameLobby";
		/**魅力值排行榜 */
		public static HC_GETUSERCPRANKLIST_LOBBY						= "HC_GETUSERCPRANKLIST_LOBBY";
		/**添加好友 */
		public static HC_ADDFRIEND_LOBBY								= "HC_ADDFRIEND_LOBBY";
		/**服务器发来 获取好友列表数据 */
		public static HC_GETFRIENDLIST_LOBBY							= "HC_GETFRIENDLIST_LOBBY";
		/**服务器发来查找特定的玩家数据 */
		public static HC_SEARCHUSER_LOBBY								= "HC_SEARCHUSER_LOBBY";
		/**服务器发来查找好友界面数据 */
		public static HC_SEARCHFRIENDSLIST_LOBBY						= "HC_SEARCHFRIENDSLIST_LOBBY";
		/**服务器发来好友聊天 */
		public static HC_FRIENDCHAT_LOBBY								= "HC_FRIENDCHAT_LOBBY";
		/**获得金币场战绩 */
		public static HC_GETCOINGAMERECORD_LOBBY						= "HC_GETCOINGAMERECORD_LOBBY";
		/**自己送礼的回调 */
		public static HC_SENDGIFT_LOBBY_S								= "HC_SENDGIFT_ROOM_S";
		/**获取礼品券 */
		public static HC_GETGIFTCOUPON_LOBBY							= "HC_GETGIFTCOUPON_LOBBY";
		/**兑换礼品券记录个人信息 */
		public static HC_EXCHANGEGIFTCOUPONRECORDUSERINFO_LOBBY			= "HC_EXCHANGEGIFTCOUPONRECORDUSERINFO_LOBBY";
		/**删除好友 */
		public static HC_REMOVEFRIEND_LOBBY								= "HC_REMOVEFRIEND_LOBBY";
		/**修改用户信息 */
		public static USERINFO_MODIFY_LOBBY								= "USERINFO_MODIFY_LOBBY";
		/**修改用户信息失败 */
		public static USERINFO_MODIFY_FAIL								= "USERINFO_MODIFY_FAIL";
		/**好友申请列表 */
		public static HC_GETFRIENDAPPLYLIST_LOBBY						= "HC_GETFRIENDAPPLYLIST_LOBBY";
		/**同意，拒绝好友 */
		public static HC_DEALFRIENDAPPLYLIST_LOBBY						= "HC_DEALFRIENDAPPLYLIST_LOBBY";
		/** 获取任务列表*/
		public static HC_GET_GAME_TASKLIST_LOBBY                        = "HC_GET_GAME_TASKLIST_LOBBY";
		/** 领取指定游戏任务奖励 */
		public static HC_GET_GAME_TASKREWARD_LOBBY                      = "HC_GET_GAME_TASKREWARD_LOBBY";
		/**退出房间面板 */
		public static HC_QUITGAMESHOW_LOBBY								= "HC_QUITGAMESHOW_LOBBY";
		/////////////////////////////////////////////////////////////
		/**邮件改变 */
		public static Mail_Changed										= "Mail_Changed";
		/**金币改变 */
		public static Chips_Changed										= "Chips_Changed";
		/**已获取邮件东西通知 */
		public static GetItemMail										= "GetItemMail";
		  /**比赛场获取时间 */
		public static GET_BATTLE_TIME									= "GET_BATTLE_TIME";
		/**刷新某个赛事人数 */
		public static RefreshUesrNbrEvent								= "RefreshUesrNbrEvent";
		/**刷新某个赛事状态 */
		public static RefreshStateEvent									= "RefreshStateEvent";
		/**查看当前赛事 */
		public static ReturnListEvent									= "ReturnListEvent";
		/**商城购买 */
		public static BUYGOODS_LOBBY									= "BUYGOODS_LOBBY";
			/**绑定手机成功 */
		public static BIND_PHONE									= "Bind_phone";
			/**获取红包信息 */
		public static GET_REDPACKINFO									= "Get_RedPACKINFO";
		/**抢红包 */
		public static GRAB_REDPACK									= "Grab_RedPACK";
		/**红包累计奖励 */
		public static GET_MYREDPACKREWARD									= "GetMyRedPackReward";
			/**兑换红包奖励 */
		public static EX_MYREDPACK									= "Ex_MyRedPack";
			/**兑换红包奖励 */
		public static HC_USERVIP									= "Hc_UserVip";
			/**请求转盘信息 */
		public static GET_TURNTABLEINFO									= "Get_TurnTableInfo";
			/**转动转盘信息 */
		public static TURN_TURNTABLE									= "Turn_TurnTable";
		/**请求领取转盘累计奖励 */
		public static GET_TURNTABLEREWARD									= "Get_TurnTableReward";
			/**请求邮件列表 */
		public static GET_MAILLIST									= "Get_MailList";
			/**查看指定邮件 */
		public static READ_ONEMAIL									= "Read_oneMail";
		/**删除指定邮件 */
		public static DELETE_ONEMAIL									= "Delete_oneMail";
			/**领取指定邮件内的奖励 */
		public static GET_MAILREWARD									= "Get_MailReward";
			/**邮件批量操作 */
		public static BULK_MAIL									= "Bulh_Mail";
			/**按钮红点更新 */
		public static RED_POINT									= "Red_Point";
			/**顺序弹窗协议 */
		public static WINDOW_POP									= "Window_Pop";
		/**申请退出一个赛事 */
		public static RequestExitEvent									= "RequestExitEvent";
		/**申请退出一个赛事返回 */
		public static ReturnExitEvent									= "ReturnExitEvent";
		/**返回某个赛事结果 */
		public static ReturnEventResult									= "ReturnEventResult";
		/**申请参加加赛事返回 */
		public static ReturnJoinEvent									= "ReturnJoinEvent";
		/**账户字账号更新 */
		public static SubAccountUpdateEvent                             ="SubAccountUpdateEvent";
		/**实名认证 */
		public static AuthenticationLobby                             = "AuthenticationLobby";
		/**提现记录 */
		public static WithdrawalRecordEvent 							="WithdrawalRecordEvent";
		/**普通玩家，请求进入茶馆返回 */
		public static ReturnRoomMatchGroup 								= "ReturnRoomMatchGroup";
		/**返回请求的玩家头像组 */
		public static ReturnUserHeadList 								= "ReturnUserHeadList";
		/**返回黄名单列表 */
		public static ReturnYellowList                           		= "ReturnYellowList";
		/**放弃摇一摇 */
		public static AbandonShake										= "AbandonShake";
		/**进入摇一摇 */
		public static ENTERSHAKE_LOBBY="entershake_lobby";
		/**摇一摇结果返回 */
		public static SHAKE_DATA_LOBBY="shake_data_lobby";
		/**大厅红包雨 */
		public static GrabRedPackLobby                                  ="GrabRedPackLobby";
		/**改变匹配号属性事件 */
		public static ChangeMatchGroupEvent                             = "ChangeMatchGroupEvent";
		/**历史匹配记录 */
		public static HistoryMatchIdList                                = "HistoryMatchIdList";
		/**个人信息 */
		public static PersonalInfo                                      = "PersonalInfo";
        /**官方匹配组列表 */
	    public static PublicMatchList                                   = "PublicMatchList";
		/**冠名赛列表 */
		public static OfficialMatchList 								= "OfficialMatchList";
		/**等待列表*/
		public static ReturnWaitList                                	 = "ReturnWaitList";
		/**弹窗事件 */
		public static OpenWindowHandle                                  = "OpenWindowHandle";
		/**弹窗事件 */
		public static TotalRedPack                                  = "TotalRedPack";
		/**新用户红包界面 */
		public static NewUserRedPack                                  = "NewUserRedPack";
			/**领取新手红包 */
		public static ExchangeNewUserRedPack                                  = "ExchangeNewUserRedPack";
			/**话费券兑换红包界面 */
		public static GetCCRedPack                                  = "GetCCRedPack";
			/**话费券兑换红包 */
		public static ExchangeCCRedPack                                  = "ExchangeCCRedPack";
			/**返利红包界面 */
		public static GetRechargeRedPack                                  = "GetRechargeRedPack";
			/**兑换返利红包 */
		public static ExchangeRechargeRedPack                                  = "ExchangeRechargeRedPack";
			/**玩家获得红包明细 */
		public static GetUserGetRedPackInfo                                  = "GetUserGetRedPackInfo";
			/**提现记录 */
		public static GetDrawCashRecord                                  = "GetDrawCashRecord";
			/**红包提现 */
		public static RedPackDrawCash                                  = "RedPackDrawCash";
			/**新版幸运翻翻翻主界面 */
		public static NewLuckTurnCardShow                                  = "NewLuckTurnCardShow";
			/**新版幸运翻翻翻翻牌 */
		public static NewGetLuckTurnCardReward 								= "NewGetLuckTurnCardReward";
			/**返回商城列表 */
		public static ReturnShopPointList                                  = "ReturnShopPointList";
		public static HISTORY_LOG                                      = "HISTORY_LOG"
		public constructor() {
		}
	}
}
