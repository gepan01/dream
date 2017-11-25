module Cmd {

    export function dispatch(cmd: string, obj?: any, type?: string): void {
        var facade: MJLobby.MahJongLobbyFacade = MJLobby.MahJongLobbyFacade.getLobbyInstance();
        facade.sendNotification(cmd, obj, type);
    }
    export function trace(rev: any, str: string = ""): void {
        uniLib.Console.log(str + " "/*+rev.GetType()*/, JSON.stringify(rev));
    }
    /*
     * login
     */
    export function OnUserInfoSynLobbyCmd_S(rev: Cmd.UserInfoSynLobbyCmd_S) {
        trace(rev, "UserInfoSynLobbyCmd_S");
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            if (!uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl) {//判断底层发来的分享url
                uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl = "";
            }
            uniLib.UIMgr.instance.hideLoading();
            MJLobby.MJLobbyData.getInstance().isCreate = rev.isCreate;
            MJLobby.MJLobbyData.getInstance().myDefaultHeadUrl = rev.userInfo.headUrl;
            MJLobby.MJLobbyData.getInstance().myBaseInfo = rev.userInfo;
            MJLobby.MJLobbyData.getInstance().isDLS = rev.canMarket;
            MJLobby.MJLobbyInfo.userId = rev.userInfo.uid;
            MJLobby.MJLobbyData.getInstance().disclaimer = rev.disclaimer;
            MJLobby.MJLobbyData.getInstance().noticeFee = rev.noticeFee;
            MJLobby.MJLobbyData.getInstance().recharge = rev.recharge;
            if (rev.showRank) {
                MJLobby.MJLobbyData.getInstance().showRank = rev.showRank;
            }
            if (rev.openReward) {
                MJLobby.MJLobbyData.getInstance().showRedpacket = rev.openReward;
            }
            if (rev.rankType) {
                MJLobby.MJLobbyData.getInstance().rankType = rev.rankType;
            }
            if (rev.defaultMsg && rev.defaultMsg != "") {
                MJLobby.MJLobbyData.getInstance().defaultSysMsg = rev.defaultMsg;
            }
            if (rev.showReward) {
                MJLobby.MJLobbyData.getInstance().autoShowRedpacket = rev.showReward;
            }
            if (rev.vipReward) {
                MJLobby.MJLobbyData.getInstance().vipReward = rev.vipReward;
            }
            if (rev.firstRecharge) {
                MJLobby.MJLobbyData.getInstance().firstRecharge = rev.firstRecharge;
            }
            uniLib.UserInfo.chips = rev.userInfo.diamond;
            if (MJLobby.MJLobbyData.getInstance().lobbyId == 7) {//宁波有房卡
                uniLib.UserInfo.fangka = rev.userInfo.card;
            }
            if (rev.userInfo.chips) {//金币场金币
                uniLib.UserInfo.goldChips = rev.userInfo.chips;
            } else {
                uniLib.UserInfo.goldChips = 0;
            }
            if (rev.userInfo.ticket) {//比赛场入场券
                MJLobby.MJLobbyMatchData.getInstance().ticket = rev.userInfo.ticket;
            }
            if (rev.userInfo.medal) {//比赛场勋章
                MJLobby.MJLobbyMatchData.getInstance().medal = rev.userInfo.medal;
            }
            MJLobby.MJLobbyData.getInstance().userInfoSynLobby = rev;
            if (rev.authen) {
                MJLobby.MJLobbyData.getInstance().authen = rev.authen;
            } else {
                MJLobby.MJLobbyData.getInstance().authen = 0;
            }
            if (rev.lastRoomId) {//保存最近一次匹配号id
                MJLobby.MJLobbyData.getInstance().lastMatchId = rev.lastRoomId;
            }
            var checkInVo: MJLobby.CheckInVo = new MJLobby.CheckInVo();
            checkInVo.openSingIn = rev.openSignIn;
            checkInVo.days = rev.days;
            checkInVo.canGet = rev.canGet;
            MJLobby.MJLobbyData.getInstance().checkInVo = checkInVo;
            if (rev.shareTimes) {
                MJLobby.LobbyDataCache.shareNLast = rev.shareTimes;
            }
            if (MJLobby.MJLobbyData.getInstance().lobbyId == 24) {//好彩大厅在meditor有监听 所以先走initMeditor如果有游戏的进入的话再做消除
                dispatch(MJLobby.MahJongLobbyFacadeConsts.SHOW_LOBBY);
                if (rev.userRoomInfos) {
                    var joinVo: MJLobby.JoinRoomVo = new MJLobby.JoinRoomVo();
                    joinVo.gameId = rev.userRoomInfos.gameId;
                    joinVo.zoneId = rev.userRoomInfos.zoneId;
                    joinVo.roomId = rev.userRoomInfos.roomId;
                    joinVo.globalRoomId = rev.userRoomInfos.globalRoomId;
                    joinVo.shareInfo = rev.userRoomInfos.shareInfo;
                    if (rev.userRoomInfos.scene != undefined)
                        joinVo.scene = rev.userRoomInfos.scene;
                    if (rev.userRoomInfos.baseUserNbr != undefined)
                        joinVo.baseUserNbr = rev.userRoomInfos.baseUserNbr;
                    dispatch(MJLobby.MahJongLobbyFacadeConsts.JOIN_ROOM, joinVo);
                    MJLobby.MJLobbyData.getInstance().showNotice = true;
                }
            } else {
                if (rev.userRoomInfos) {
                    var joinVo: MJLobby.JoinRoomVo = new MJLobby.JoinRoomVo();
                    joinVo.gameId = rev.userRoomInfos.gameId;
                    joinVo.zoneId = rev.userRoomInfos.zoneId;
                    joinVo.roomId = rev.userRoomInfos.roomId;
                    joinVo.globalRoomId = rev.userRoomInfos.globalRoomId;
                    joinVo.shareInfo = rev.userRoomInfos.shareInfo;
                    if (rev.userRoomInfos.scene != undefined)
                        joinVo.scene = rev.userRoomInfos.scene;
                    if (rev.userRoomInfos.baseUserNbr != undefined)
                        joinVo.baseUserNbr = rev.userRoomInfos.baseUserNbr;
                    dispatch(MJLobby.MahJongLobbyFacadeConsts.JOIN_ROOM, joinVo);
                    MJLobby.MJLobbyData.getInstance().showNotice = true;
                } else {
                    dispatch(MJLobby.MahJongLobbyFacadeConsts.SHOW_LOBBY);
                }
            }
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_LOGIN_SUCCESS);
            uniLib.NetMgr.getIp(function (data) {
                if (data) {
                    var ipdata: any = JSON.parse(data);
                    if (ipdata && ipdata.myip) {
                        if (MJLobby.MJLobbyData.getInstance().myBaseInfo) {
                            MJLobby.MJLobbyData.getInstance().myBaseInfo.ip = uniLib.StringUtils.int2ip(ipdata.myip);
                        }
                        var msg: Cmd.ClientIpCmd_C = new Cmd.ClientIpCmd_C();
                        msg.ip = ipdata.myip;
                        MJLobby.NetMgr.tcpSend(msg);
                    }
                }
            }, null);
        }
    }
    export function OnCreateConfigListLobbyCmd_S(rev: Cmd.CreateConfigListLobbyCmd_S): void {
        if (!MJLobby.MJLobbyData.getInstance().isShenHe) {
            var config: any = JSON.parse(rev.list);
            if (config.lobbyGameList) {
                MJLobby.MJLobbyData.getInstance().lobbyConfig = config.lobbyGameList;
                //重设分享参数
                if (!uniLib.ZQGameSdk.defaultWXShareVo) {
                    uniLib.ZQGameSdk.defaultWXShareVo = new uniLib.WXShareVo();
                }
                var vo: uniLib.WXShareVo = uniLib.ZQGameSdk.defaultWXShareVo;
                vo.title = config.lobbyGameList.shareTitle;
                vo.description = config.lobbyGameList.shareContent;
                uniLib.ZQGameSdk.defaultWXShareVo = vo;
            }
            if (config.createRoomConfigs) {
                MJLobby.MJLobbyData.getInstance().gameCreateConfig = config.createRoomConfigs;
            }
        }
        dispatch(MJLobby.MahJongLobbyFacadeConsts.CONFIG_LOADED);
    }
    export function OnCanCreateRoomCmd_Brd(rev: Cmd.CanCreateRoomCmd_Brd) {
        MJLobby.MJLobbyData.getInstance().isCreate = false;
        uniLib.UserInfo.chips = rev.diamond;
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ROOM_DESTORY, rev);
    }
    export function OnCreateRoomCmd_S(rev: Cmd.CreateRoomCmd_S) {
        let now = Date.now();
        if (now - enterRoomTime < 500) {
            return;
        }
        enterRoomTime = now;
        if (!rev.resultCode) {
            var joinVo: MJLobby.JoinRoomVo = new MJLobby.JoinRoomVo();
            joinVo.gameId = rev.gameId;
            joinVo.globalRoomId = rev.globalRoomId;
            joinVo.zoneId = rev.zoneId;
            joinVo.roomId = rev.roomId;
            joinVo.shareInfo = rev.shareInfo;
            if (rev.scene != undefined)
                joinVo.scene = rev.scene;
            if (rev.baseUserNbr != undefined)
                joinVo.baseUserNbr = rev.baseUserNbr;
            MJLobby.MJLobbyData.getInstance().isCreate = true;
            dispatch(MJLobby.MahJongLobbyFacadeConsts.CREATE_ROOM_SUCCESS, rev);
            if (!rev.notIntoGame) {
                dispatch(MJLobby.MahJongLobbyFacadeConsts.JOIN_ROOM, joinVo);
            }
            if (rev.url) {
                MJLobby.MJLobbyData.getInstance().gameGatewayUrl = rev.url;
            }
        }
    }
    export function OnReturnRoomCmd_S(rev: Cmd.ReturnRoomCmd_S) {
        trace(rev, "ReturnRoomCmd_S");
        if (!rev.resultCode) {
            var joinVo: MJLobby.JoinRoomVo = new MJLobby.JoinRoomVo();
            joinVo.gameId = rev.gameId;
            joinVo.globalRoomId = rev.globalRoomId;
            joinVo.zoneId = rev.zoneId;
            joinVo.roomId = rev.roomId;
            joinVo.shareInfo = rev.shareInfo;
            if (rev.scene != undefined)
                joinVo.scene = rev.scene;
            if (rev.baseUserNbr != undefined)
                joinVo.scene = rev.baseUserNbr;
            dispatch(MJLobby.MahJongLobbyFacadeConsts.JOIN_ROOM, joinVo);
            if (rev.url) {
                MJLobby.MJLobbyData.getInstance().gameGatewayUrl = rev.url;
            }
        } else {
            if (rev.resultCode == 1) {//房间不存在了,就直接改为创建状态
                MJLobby.MJLobbyData.getInstance().isCreate = true;
            }
        }
    }
    /**
     * 服务器会同时下发EnterRoomCmd_S、CreateRoomCmd_S 客户端只处理第一个
     */
    export let enterRoomTime: number = 0;
    export function OnEnterRoomCmd_S(rev: Cmd.EnterRoomCmd_S) {
        let now = Date.now();
        if (now - enterRoomTime < 500) {
            return;
        }
        enterRoomTime = now;
        if (!rev.resultCode) {
            let nowsec = Math.floor(Date.now() / 1000);
            if (!uniLib.Global.isInGame || nowsec - MJLobby.MJLobbyData.getInstance().lastEnterRoomTime > 3) {//服务器为了体验,有可能会多发这个消息,要避免多走loading
                MJLobby.MJLobbyData.getInstance().lastEnterRoomTime = nowsec;
                var joinVo: MJLobby.JoinRoomVo = new MJLobby.JoinRoomVo();
                joinVo.gameId = rev.gameId;
                joinVo.globalRoomId = rev.globalRoomId;
                joinVo.zoneId = rev.zoneId;
                joinVo.roomId = rev.roomId;
                joinVo.shareInfo = rev.shareInfo;
                if (rev.scene != undefined)
                    joinVo.scene = rev.scene;
                if (rev.baseUserNbr != undefined)
                    joinVo.baseUserNbr = rev.baseUserNbr;
                dispatch(MJLobby.MahJongLobbyFacadeConsts.JOIN_ROOM, joinVo);
                if (rev.url) {
                    MJLobby.MJLobbyData.getInstance().gameGatewayUrl = rev.url;
                }
            }
        }
    }
    /**
     *  请求进入茶馆返回 刷新最后进入的matchId,
     */
    export function OnReturnRoomMatchGroupCmd_S(rev: Cmd.ReturnRoomMatchGroupCmd_S) {
        MJLobby.MJLobbyData.getInstance().lastMatchId = rev.matchId ? rev.matchId : null;
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnRoomMatchGroup, rev);
    }
    /**
     *  记录服务器下发消息 匹配号淘汰赛返回大厅匹配
     */
    export let RefreshMatchGroup: Cmd.RefreshMatchGroupCmd_Brd
    export function OnRefreshMatchGroupCmd_Brd(rev: Cmd.RefreshMatchGroupCmd_Brd) {
        RefreshMatchGroup = rev;
        dispatch(MJLobby.MahJongLobbyFacadeConsts.REFRESH_MATCHGROUP, rev);
    }
    /**
     * 记录服务器下发消息 匹配号淘汰赛返回大厅匹配
     */
    export let EnterMatchGroup: Cmd.EnterMatchGroupCmd_S
    export let EnterMatchGroupTime: number;
    export function OnEnterMatchGroupCmd_S(rev: Cmd.EnterMatchGroupCmd_S) {
        EnterMatchGroup = rev;
        EnterMatchGroupTime = Date.now();
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ENTER_MATCHGROUP, rev);
    }
    /**刷新匹配组数据 */
    export function OnEnterMatchGroupCmd_Brd(rev: Cmd.EnterMatchGroupCmd_Brd) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.UODATE_MATCHGROUP, rev);
    }

    export function OnLeaveMatchGroupCmd_S(rev: Cmd.LeaveMatchGroupCmd_S) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.LEAVE_MATCHGROUP, rev);
    }
    export function OnLeaveMatchGroupCmd_Brd(rev: Cmd.LeaveMatchGroupCmd_Brd) {
        if (rev && rev.uid == uniLib.NetMgr.UID) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.LEAVE_MATCHGROUP, null);
        }
    }
    export function OnCreateMatchGroupCmd_S(rev: Cmd.CreateMatchGroupCmd_S) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.CREATE_MATCHGROUP, rev);
    }
    export function OnGetPracticeGameInfoRoomCmd_S(rev: Cmd.GetPracticeGameInfoRoomCmd_S) {
        if (!rev.resultCode) {
            var joinVo: MJLobby.JoinRoomVo = new MJLobby.JoinRoomVo();
            joinVo.gameId = rev.gameId;
            joinVo.globalRoomId = 0;
            joinVo.zoneId = rev.zoneId;
            joinVo.roomId = 0;
            dispatch(MJLobby.MahJongLobbyFacadeConsts.JOIN_ROOM, joinVo);
        }
    }
    export function OnActiveDetailRoomCmd_S(rev: Cmd.ActiveDetailRoomCmd_S) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ActiveDetailRoom, rev);
    }
    export function OnRemoveRoomCmd_Brd(rev: Cmd.RemoveRoomCmd_Brd) {
        trace(rev, "RemoveRoomCmd_Brd");
        MJLobby.MJLobbyData.getInstance().isCreate = false;
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ROOM_DESTORY, rev);
    }
    export function OnGetGameDataHistoryCmd_S(rev: Cmd.GetGameDataHistoryCmd_S) {
        trace(rev, "GetGameDataHistoryCmd_S");
        dispatch(MJLobby.MahJongLobbyFacadeConsts.HISTORY_DATA, rev);
    }
    export function OnGetGameDetailHistoryCmd_S(rev: Cmd.GetGameDetailHistoryCmd_S) {
        trace(rev, "GetGameDetailHistoryCmd_S");
        dispatch(MJLobby.MahJongLobbyFacadeConsts.HISTORY_DETAIL_DATA, rev);
    }
    /**房间日志 */
    export function OnGetRoomLogHistoryCmd_S(rev: Cmd.GetRoomLogHistoryCmd_S) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.HISTORY_LOG, rev);
    }
    export function OnUserInfoGetLobbyCmd_S(rev: Cmd.UserInfoGetLobbyCmd_S) {
        trace(rev, "UserInfoGetLobbyCmd_S");
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            if (rev.userInfo.uid == MJLobby.MJLobbyInfo.userId) {
                uniLib.UserInfo.chips = rev.userInfo.diamond;
                if (MJLobby.MJLobbyData.getInstance().lobbyId == 7) {
                    uniLib.UserInfo.fangka = rev.userInfo.card;
                }
                if (rev.userInfo.chips) {//金币场金币
                    uniLib.UserInfo.goldChips = rev.userInfo.chips;
                } else {
                    uniLib.UserInfo.goldChips = 0;
                }
                if (rev.userInfo.ticket) {//比赛场入场券
                    MJLobby.MJLobbyMatchData.getInstance().ticket = rev.userInfo.ticket;
                }
                if (rev.userInfo.medal) {//比赛场勋章
                    MJLobby.MJLobbyMatchData.getInstance().medal = rev.userInfo.medal;
                }
                if (rev.vipReward && Array.isArray(rev.vipReward)) {
                    MJLobby.MJLobbyData.getInstance().vipReward = rev.vipReward;
                }
                MJLobby.MJLobbyData.getInstance().myBaseInfo = rev.userInfo;
                MJLobby.MJLobbyData.getInstance().recharge = rev.recharge;
                if (rev.isCreate != undefined) {
                    MJLobby.MJLobbyData.getInstance().isCreate = rev.isCreate;
                    dispatch(MJLobby.MahJongLobbyFacadeConsts.ENTER_LOBBY, rev.userInfo);
                }
            }
            if (rev.bindRechargeRet) {
                MJLobby.MJLobbyData.getInstance().bindRechargeRet = rev.bindRechargeRet;
                MJLobby.LobbyEvents.Instance.dispatchEvent(new egret.Event(MJLobby.LobbyEvents.NOTIFY_RECHARGE_GIVE));
            }
            dispatch(MJLobby.MahJongLobbyFacadeConsts.USER_INFO_DATA, rev.userInfo);
            uniLib.Global.dispatchEvent(uniLib.ZqEvent.EVENT_L2G, "diamondChange");
            dispatch(MJLobby.MahJongLobbyFacadeConsts.LOBBY_RECONNECTION);
        } else {
            var req = new Cmd.UserInfoGetLobbyCmd_C();
            req.uid = MJLobby.MJLobbyInfo.userId;
            req.getIsCreate = true;
            req.lobbyId = MJLobby.MJLobbyData.getInstance().lobbyId;
            this.sendNotification(MJLobby.MahJongLobbyFacadeConsts.SEND_DATA, req, MJLobby.LobbyDataRequestCommand.GAME_DATA);
        }

        uniLib.NetMgr.getIp(function (data) {
            if (data) {
                var ipdata: any = JSON.parse(data);
                if (ipdata && ipdata.myip) {
                    if (MJLobby.MJLobbyData.getInstance().myBaseInfo) {
                        MJLobby.MJLobbyData.getInstance().myBaseInfo.ip = uniLib.StringUtils.int2ip(ipdata.myip);
                    }
                    var msg: Cmd.ClientIpCmd_C = new Cmd.ClientIpCmd_C();
                    msg.ip = ipdata.myip;
                    MJLobby.NetMgr.tcpSend(msg);
                }
            }
        }, null);
    }

    export function OnUserInfoModifyReturnLobyCmd_S(rev: Cmd.UserInfoModifyReturnLobyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyData.getInstance().myBaseInfo = rev.userInfo;
            dispatch(MJLobby.MahJongLobbyFacadeConsts.USER_INFO_DATA, MJLobby.MJLobbyData.getInstance().myBaseInfo);
        }
    }
    export function OnShareLobbyCmd_S(rev: Cmd.ShareLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            uniLib.UserInfo.chips = rev.remainder;
            MJLobby.LobbyDataCache.shareNLast = rev.shareTimes ? rev.shareTimes : 0;
            MJLobby.LobbyPopupManager.showMildWarnShow("分享成功，已获得奖励");
        }
    }
    export function OnChangeParentCmd_S(rev: Cmd.ChangeParentCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.LobbyPopupManager.showMildWarnShow("填写推广员ID成功");
            MJLobby.MJLobbyData.getInstance().myBaseInfo.parent = MJLobby.MJLobbyData.getInstance().tgyId;
        } else {
            MJLobby.MJLobbyData.getInstance().tgyId = 0;
        }
    }
    export function OnGetNormalGameListRoomCmd_S(rev: Cmd.GetNormalGameListRoomCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.gameIdList && rev.gameIdList[0]) {
            MJLobby.MJLobbyData.getInstance().openingGameList = rev.gameIdList;
        }
        if (rev.startTime) {
            MJLobby.MJLobbyData.getInstance().freeTimes = [];
            MJLobby.MJLobbyData.getInstance().freeTimes.push(rev.startTime);
        }
        if (rev.endTime) {
            MJLobby.MJLobbyData.getInstance().freeTimes.push(rev.endTime);
        }
        dispatch(MJLobby.MahJongLobbyFacadeConsts.GAME_LIST_DATA, rev.lastCreate);
    }
    export function OnSysMessageMahjongLobbyCmd_S(rev: Cmd.SysMessageMahjongLobbyCmd_S) {
        if (MJLobby.MJLobbyData.getInstance().lobbyId == 27) {//古越在线不要钻石改为元宝 服务器那边不好改 客户端处理一下
            rev.desc = rev.desc.replace(/钻石/g, "元宝");
        }
        if (rev.openWindow == 1) {
            //安卓系统下打开重置窗口
            if (uniLib.Utils.isAndroid()) { }
        }
        var confirm = function () {
            if (rev.openWindow != null) {
                dispatch(MJLobby.MahJongLobbyFacadeConsts.OpenWindowHandle, rev.openWindow);
            }
        };
        if (rev.pos == 1) {
            MJLobby.LobbyPopupManager.showConfirmPanel(rev.desc, ["确定"], [confirm], "", null);
        } else {
            MJLobby.LobbyPopupManager.showMildWarnShow(rev.desc);
        }
    }
    export function OnGetInviteListCmd_CS(rev: Cmd.GetInviteListCmd_CS) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.INVITE_DATA, rev);
    }
    export function OnGetInviteRewardCmd_S(rev: Cmd.GetInviteRewardCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            uniLib.UserInfo.chips = rev.diamond;
            dispatch(MJLobby.MahJongLobbyFacadeConsts.INVITE_AWARDS_DATA, rev);
            MJLobby.LobbyPopupManager.showMildWarnShow("钻石领取成功！");
        }
    }
    export function OnGetRegisterRewardCmd_S(rev: Cmd.GetRegisterRewardCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            var signArr = MJLobby.MJLobbyData.getInstance().getLobbyConfig().sign;
            if (signArr && signArr.length > 1) {
                MJLobby.LobbyPopupManager.showMildWarnShow("恭喜你签到成功，获得了" + signArr[1] + "钻石！");
            } else {
                MJLobby.LobbyPopupManager.showMildWarnShow("恭喜你签到成功");
            }
            if (MJLobby.MJLobbyData.getInstance().checkInVo) {
                MJLobby.MJLobbyData.getInstance().checkInVo.canGet = 0;
            }
            uniLib.UserInfo.chips = rev.diamond;
            dispatch(MJLobby.MahJongLobbyFacadeConsts.CHECKIN_AWARDS_DATA);
        }
    }
    export function OnApplyContinuePlayRoomCmd_Brd(rev: Cmd.ApplyContinuePlayRoomCmd_Brd) {
        MJLobby.MJLobbyData.getInstance().continueObj = rev;
        dispatch(MJLobby.MahJongLobbyFacadeConsts.CONTINUE);
    }
    export function OnSendSuonaLobbyCmd_S(rev: Cmd.SendSuonaLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.LobbyPopupManager.showMildWarnShow("发送成功！");
        }
    }
    /**
    * 封红包
    */
    export function OnExchangeKeyGet_CS(rev: Cmd.ExchangeKeyGet_CS) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.SEND_REDPACKET_BACK, rev);
        }
    }
    /**拆红包 */
    export function OnExchangeChipsReceive_CS(rev: Cmd.ExchangeChipsReceive_CS) {
        let chips = (rev && rev.exchangeInfo) ? rev.exchangeInfo.chips : null;
        if (!chips)
            return;
        if (rev.exchangeInfo.id == 2) {
            MJLobby.LobbyPopupManager.showMildWarnShow("领取成功红包" + chips + "房卡");
        } else if (rev.exchangeInfo.id == 1) {
            MJLobby.LobbyPopupManager.showMildWarnShow("领取成功红包" + chips + "钻石");
        } else {
            MJLobby.LobbyPopupManager.showMildWarnShow("领取成功红包" + chips + "金币");
        }
    }
    /**
     * 红包记录
     */
    export function OnExchangeRecordGet_CS(rev: Cmd.ExchangeRecordGet_CS) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_REDPACKET_RECORD, rev);
        }
    }

    /**钻石换房卡 */
    export function OnExchangeCardByDiamondLobbyCmd_S(rev: Cmd.ExchangeCardByDiamondLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.LobbyPopupManager.showMildWarnShow("兑换成功");
        }
    }

    /**录像功能 */
    export function OnReturnRecordLobbyCmd_S(rev: Cmd.ReturnRecordLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyData.getInstance().videoData = rev.data;
            var joinVo: MJLobby.JoinRoomVo = new MJLobby.JoinRoomVo();
            joinVo.gameId = rev.gameId;
            joinVo.globalRoomId = 0;
            joinVo.roomId = 0;
            var Json = JSON.parse(MJLobby.MJLobbyData.getInstance().videoData);
            MJLobby.MJLobbyData.getInstance().videoUID = Json.bankerUid;
            dispatch(MJLobby.MahJongLobbyFacadeConsts.JOIN_VIDEOROOM, joinVo);
        } else {
        }
    }

    /**显示进入房间人数 */
    export function OnGetRoomUserLobbyCmd_S(rev: Cmd.GetRoomUserLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.CONFRIM_JOINROOM, rev);
        }
    }
    /**排行榜数据 */
    export function OnGetDayRankCmd_S(rev: Cmd.GetDayRankCmd_S) {
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "DiamondRank");
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            if (rev.day == 1) {
                MJLobby.MJLobbyData.getInstance().todayRecord = rev;
            } else {
                MJLobby.MJLobbyData.getInstance().yesterdayRecord = rev;
            }
            dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_RANK_RECORD);
        }
    }
    /**获取奖励 */
    export function OnGetDayRankRewardCmd_S(rev: Cmd.GetDayRankRewardCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_RANK_AWARD, rev);
        }
    }
    /**处罚提示 */
    export function OnPunishUserCmd_S(rev: Cmd.PunishUserCmd_S) {
        if (rev.resultCode == MJLobby.NetConsts.FENGHAO) {
            uniLib.ZQGameSdk.restart("号已被封，请联系客服", "确定");
        } else if (rev.resultCode == MJLobby.NetConsts.TIXIAXIAN) {
            uniLib.ZQGameSdk.restart("已被管理员踢下线", "确定");
        }
    }
    /**查看提现详情 */
    export function OnGetOpenRedPackRecordLobbyCmd_S(rev: Cmd.GetOpenRedPackRecordLobbyCmd_S) {
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "RedDepositDetail");
        MJLobby.MJLobbyData.getInstance().redpacket_DepositDetail = rev.infos;
        dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_REDPOSITDETAIL);
    }

    /**红包是否可提取 */
    export function OnCheckOpenRedPackLobbyCmd_S(rev: Cmd.CheckOpenRedPackLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "openRed");
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.CHECKOPENREDPACK_OK, rev);
        }
    }

    /**红包提取*/
    export function OnOpenRedPackLobbyCmd_S(rev: Cmd.OpenRedPackLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            if (!Array.isArray(MJLobby.MJLobbyData.getInstance().redpacket_DepositDetail)) {
                MJLobby.MJLobbyData.getInstance().redpacket_DepositDetail = [];
            }
            MJLobby.MJLobbyData.getInstance().redpacket_DepositDetail.unshift(rev.info);
            MJLobby.MJLobbyData.getInstance().redpacket_surplus = rev.surplus;
            dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_REDPACKET_SUCCESS, rev);
        }
    }

    /**查看当前红包奖励 */
    export function OnGetRedPackRewardInfoLobbyCmd_S(rev: Cmd.GetRedPackRewardInfoLobbyCmd_S) {
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "redpacket");
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyData.getInstance().redpacket_info = rev;
            dispatch(MJLobby.MahJongLobbyFacadeConsts.OPEN_REDPACKETPANEL);
        }
    }
    /**进入百人场 */
    export function OnEnterHundredGameLobbyCmd_S(rev: Cmd.EnterHundredGameLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.JOIN_HUNDRE_ROOM, rev);
        }
    }
    /**服务器返回比赛场报名 */
    export function OnEntryMatchLobbyCmd_S(rev: Cmd.EntryMatchLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyMatchData.getInstance().isEnroll = true;
            // dispatch(MJLobby.MahJongLobbyFacadeConsts.MATCH_ENROLL_SUCCESS);
        }
    }

    /**服务器返回比赛场等待消息 */
    export function OnEntryMatchUserCountLobbyCmd_Brd(rev: Cmd.EntryMatchUserCountLobbyCmd_Brd) {
        MJLobby.MJLobbyMatchData.getInstance().enrollNum = [];
        MJLobby.MJLobbyMatchData.getInstance().enrollNum.push(rev.enrollment);
        MJLobby.MJLobbyMatchData.getInstance().enrollNum.push(rev.totalCount);
        dispatch(MJLobby.MahJongLobbyFacadeConsts.MATCH_ENROLL_SUCCESS);
    }

    /**比赛场退赛 */
    export function OnQuitMatchLobbyCmd_S(rev: Cmd.QuitMatchLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyMatchData.getInstance().isEnroll = false;
            MJLobby.MJLobbyMatchData.getInstance().enrollNum = [];
            MJLobby.MJLobbyMatchData.getInstance().enrollNum.push(rev.enrollment);
            MJLobby.MJLobbyMatchData.getInstance().enrollNum.push(rev.totalCount);
            dispatch(MJLobby.MahJongLobbyFacadeConsts.MATCH_EXIT);
        }
    }
    /**比赛场获取报名时间 */
    export function OnGetEnrollConditionLobbyCmd_S(rev: Cmd.GetEnrollConditionLobbyCmd_S) {
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "matchTime");
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyMatchData.getInstance().enrollTime = [];
            MJLobby.MJLobbyMatchData.getInstance().enrollNum = []
            if (rev.st) {
                MJLobby.MJLobbyMatchData.getInstance().enrollTime.push(rev.st);
            }
            if (rev.et) {
                MJLobby.MJLobbyMatchData.getInstance().enrollTime.push(rev.et);
            }
            if (rev.isEnroll) {
                if (rev.isEnroll == 1) {
                    MJLobby.MJLobbyMatchData.getInstance().isEnroll = true;
                } else {
                    MJLobby.MJLobbyMatchData.getInstance().isEnroll = false
                }
            }
            MJLobby.MJLobbyMatchData.getInstance().enrollNum.push(rev.enrollment);
            MJLobby.MJLobbyMatchData.getInstance().enrollNum.push(rev.totalCount);
            dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_MATCHTIME)
        }
    }

    /**比赛场获取人数排行 */
    export function OnGetJoinMatchRankLobbyCmd_S(rev: Cmd.GetJoinMatchRankLobbyCmd_S) {
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "matchCount");
        dispatch(MJLobby.MahJongLobbyFacadeConsts.MATCH_GETCOUNT_LIST, rev);
    }

    /**比赛场异常补偿弹窗 */
    export function OnSendMatchAbnormalLobbyCmd_Brd(rev: Cmd.SendMatchAbnormalLobbyCmd_Brd) {
        MJLobby.LobbyPopupManager.showConfirmPanel(rev.compensation, [""], [], "", this);
    }

    /**服务器返回比赛场点击获取玩家数量 */
    export function OnGetJoinMatchUserCountCmd_S(rev: Cmd.GetJoinMatchUserCountCmd_S) {
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "matchusercount");
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.MATCH_GETUSER_COUNT, rev);
        }
    }

    /**金币场用户签到消息回复 */
    export function OnUserSignInfoLobbyCmd_S(rev: Cmd.UserSignInfoLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.SIGN_INFO, rev);
        }
    }

    /**金币场用户今日签到返回 */
    export function OnUserSignTodayLobbyCmd_S(rev: Cmd.UserSignTodayLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.SIGN_TODAY, rev);
        }
    }

    /**用户累计签到奖励 */
    export function OnUserSignContinueLobbyCmd_S(rev: Cmd.UserSignContinueLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.SIGN_CONTINUE, rev);
        }
    }
    /**获取排行榜信息回复 */
    export function OnGetListRankCmd_S(rev: Cmd.GetListRankCmd_S) {
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "rank");
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_RANK_LIST, rev);
        }
    }

    /**获取大赢家排行榜奖励回复 */
    export function OnGetWinChipsRankRewardCmd_S(rev: Cmd.GetWinChipsRankRewardCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_WINCHIPS_RANK, rev);
        }
    }
    /**金币场进入免费金币界面 */
    export function OnIntoFreeGoldLobbyCmd_S(rev: Cmd.IntoFreeGoldLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_FREEGOLD_INFO, rev);
        }
    }
    /**金币场领取vip礼包 */
    export function OnGetVipRewardLobbyCmd_S(rev: Cmd.GetVipRewardLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyData.getInstance().vipReward.splice(MJLobby.MJLobbyData.getInstance().vipReward.indexOf(rev.level), 1)
            dispatch(MJLobby.MahJongLobbyFacadeConsts.COIN_GETAWARD_VIP, rev);
        }
    }
    /**金币场领取指定任务奖励 */
    export function OnGetDaysTaskRewardLobbyCmd_S(rev: Cmd.GetDaysTaskRewardLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.COIN_FREEGOLD, rev);
        }
    }
    /**破产补助弹框 */
    export function OnSendBankruptcyLobbyCmd_Brd(rev: Cmd.SendBankruptcyLobbyCmd_Brd) {
        if (RES.hasRes("LobbyTaskConfig_json") && RES.hasRes("TableGoodsConfig_json")) {
            let task = RES.getRes("LobbyTaskConfig_json");
            let good = RES.getRes("TableGoodsConfig_json");
            let taskConfig;
            let goodConfig;
            for (let item of task) {
                if (item["id"] == 4) {
                    taskConfig = item;
                    break;
                }
            }
            for (let item of good) {
                if (item["goodId"] == taskConfig["taskReward"][0].goodId) {
                    goodConfig = item;
                    break;
                }
            }
            let msg = "您的金币不足!系统赠送您" + taskConfig["taskReward"][0].goodNbr + goodConfig["goodName"] + "祝您游戏愉快!";
            MJLobby.LobbyPopupManager.showConfirmPanel(msg, [""], [], "", this);
        }
    }

    /**返回自己的所有匹配号 */
    export function OnReturnMatchGroupCmd_S(rev: Cmd.ReturnMatchGroupCmd_S) {

        dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnMatchGroup, rev);
    }
    /**申请白名单消息列表,玩家请求后主动推给匹配主 */
    export function OnJoinMemberListMatchGroupCmd_S(rev: Cmd.JoinMemberListMatchGroupCmd_S) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.JoinMemberListMatch, rev);
    }
    /**返回黑白名单 */
    export function OnReturnMemberInfoMatchGroupCmd_S(rev: Cmd.ReturnMemberInfoMatchGroupCmd_S) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.MemberInfoMatchGroup, rev);
    }
    /**返回参赛人员战绩列表 */
    export function OnPlayedListMatchGroupCmd_S(rev: Cmd.PlayedListMatchGroupCmd_S) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.PlayedListMatchGroup, rev);
    }
    ///////////////////好彩真人麻将////////////////////////////////
    export function OnGetReliefPayStatusLobbyCmd_S(rev: Cmd.GetReliefPayStatusLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_ALMS, rev);
        }
    }
    /**幸运翻翻翻 */
    export function OnGetLuckTurnCardInfoLobbyCmd_S(rev: Cmd.GetLuckTurnCardInfoLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_SHOW_LUCK, rev);
        }
    }
    /**幸运翻翻翻结果 */
    export function OnGetLuckTurnCardResultLobbyCmd_S(rev: Cmd.GetLuckTurnCardResultLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_SHOW_LUCK_BACK, rev);
        }
    }
    /**限时优惠面板 */
    export function OnLimitOfferChipsLobbyCmd_S(rev: Cmd.LimitOfferChipsLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_SHOW_LIMIT, rev);
        }
    }
    /**限时优惠面板 */
    export function OnGetLimitOfferChipsLobbyCmd_S(rev: Cmd.GetLimitOfferChipsLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_ExchangeLimitActivity, rev);
        }
    }
    /**首冲界面 */
    export function OnFirstRechargeInfoLobbyCmd_S(rev: Cmd.FirstRechargeInfoLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_SHOW_FIRSTRECHARGE, rev);
        }
    }
    /**快速开始 */
    export function OnQuickStartGameLobbyCmd_S(rev: Cmd.QuickStartGameLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_QUICK_START, rev);
        }
    }
    // 查看活跃房间列表
    export function OnActiveCreateRoomCmd_S(rev: Cmd.ActiveCreateRoomCmd_S) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.RETURN_ACTIVE_LIST_ROOM, rev);
    }
    /**礼包兑换码 */
    export function OnUserGiftCodeLobbyCmd_S(rev: Cmd.UserGiftCodeLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_GIFT_CODE, rev);
        }
    }
    /**领取首充礼包 */
    export function OnReceiveFirstRechargeLobbyCmd_S(rev: Cmd.ReceiveFirstRechargeLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_GET_FIRSTRECHARGE_REWARD, rev);
        }
    }
    /**判断是否可以加入游戏 */
    export function OnJudgeEnterGameLobbyCmd_S(rev: Cmd.JudgeEnterGameLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_JudgeEnterGameLobby, rev);
        }
    }
    /**
	 *  Echo应答,客户端探测服务器
	 *  TODO,还未使用,待升级
	 */
    export function OnClientEchoRoomCmd_SC(rev: Cmd.ClientEchoRoomCmd_SC) {
    }

    /**好彩返回之前的游戏 */
    export function OnReturnHaoCaiGameLobbyCmd_S(rev: Cmd.ReturnHaoCaiGameLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_ReturnHaoCaiGameLobby, rev);
        }
    }
    /**好彩获取魅力值排行榜 */
    export function OnGetUserCpRankListLobbyCmd_S(rev: Cmd.GetUserCpRankListLobbyCmd_S) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_GETUSERCPRANKLIST_LOBBY, rev);
    }
    /**好友获取好友列表 */
    export function OnGetFriendListLobbyCmd_S(rev: Cmd.GetFriendListLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_GETFRIENDLIST_LOBBY, rev);
        }
    }
    /**查找好友界面 */
    export function OnSearchFriendsListLobbyCmd_S(rev: Cmd.SearchFriendsListLobbyCmd_S) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_SEARCHFRIENDSLIST_LOBBY, rev);
    }
    /**好友聊天 */
    export function OnFriendChatLobbyCmd_S(rev: Cmd.FriendChatLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_FRIENDCHAT_LOBBY, rev);
        }
    }
    /**获得金币场战绩 */
    export function OnGetCoinGameRecordLobbyCmd_S(rev: Cmd.GetCoinGameRecordLobbyCmd_S) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_GETCOINGAMERECORD_LOBBY, rev);
    }
    /**获取礼品券 */
    export function OnGetGiftVoucherLobbyCmd_S(rev: Cmd.GetGiftVoucherLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_GETGIFTCOUPON_LOBBY, rev);
        }
    }
    /**兑换礼品券记录个人信息 */
    export function OnExchangeGiftVoucherRecordUserInfoLobby_S(rev: Cmd.ExchangeGiftVoucherRecordUserInfoLobby_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_EXCHANGEGIFTCOUPONRECORDUSERINFO_LOBBY, rev);
        }
    }
    /**好友申请列表 */
    export function OnGetFriendApplyListLobbyCmd_S(rev: Cmd.GetFriendApplyListLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_GETFRIENDAPPLYLIST_LOBBY, rev);
        }
    }
    /**统一，拒绝好友申请 */
    export function OnDealFriendApplyListLobbyCmd_S(rev: Cmd.DealFriendApplyListLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_DEALFRIENDAPPLYLIST_LOBBY, rev);
        }
    }
    /**绑定手机成功 */
    export function OnBindingMobilePhoneLobbyCmd_S(rev: Cmd.BindingMobilePhoneLobbyCmd_S) {
        if (!rev.resultCode) {
            Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.BIND_PHONE, rev);
        }
    }
    /**获取红包信息 */
    export function OnGetRedPackInfoLobbyCmd_S(rev: Cmd.GetRedPackInfoLobbyCmd_S) {
        // if(!rev.resultCode){
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_REDPACKINFO, rev);
        // }
    }

    /**抢红包 */
    export function OnGrabRedPackLobbyCmd_S(rev: Cmd.GrabRedPackLobbyCmd_S) {
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.GRAB_REDPACK, rev);
    }
    /**红包累计奖励 */
    export function OnGetMyRedPackRewardLobbyCmd_S(rev: Cmd.GetMyRedPackRewardLobbyCmd_S) {
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_MYREDPACKREWARD, rev);
    }
    /**兑换红包 */
    export function OnExchangeRedPackLobbyCmd_S(rev: Cmd.ExchangeRedPackLobbyCmd_S) {
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.EX_MYREDPACK, rev);
    }
    /**兑换红包 */
    export function OnGetUserVipInfoLobbyCmd_S(rev: Cmd.GetUserVipInfoLobbyCmd_S) {
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_USERVIP, rev);
    }
    /**请求转盘信息回复 */
    export function OnGetInfoTurnTableCmd_S(rev: Cmd.GetInfoTurnTableCmd_S) {
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_TURNTABLEINFO, rev);
        }
    }
    /**请求转盘信息回复 */
    export function OnTurnTurnTableCmd_S(rev: Cmd.TurnTurnTableCmd_S) {
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.TURN_TURNTABLE, rev);
        }
    }
    /**领取转盘累计奖励 */
    export function OnGetCumulativeRewordTurnTableCmd_S(rev: Cmd.GetCumulativeRewordTurnTableCmd_S) {
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_TURNTABLEREWARD, rev);
        }
    }
    /**请求邮件列表 */
    export function OnGetListMailCmd_S(rev: Cmd.GetListMailCmd_S) {
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_MAILLIST, rev);
        }
    }
    /**查看指定邮件 */
    export function OnReadMailCmd_S(rev: Cmd.ReadMailCmd_S) {
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.READ_ONEMAIL, rev);
        }
    }
    /**删除指定邮件 */
    export function OnDeleteMailCmd_S(rev: Cmd.DeleteMailCmd_S) {
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.DELETE_ONEMAIL, rev);
        }
    }
    /**领取指定邮件内的奖励 */
    export function OnGetMailRewardCmd_S(rev: Cmd.GetMailRewardCmd_S) {
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_MAILREWARD, rev);
        }
    }
    /**邮件批量操作 */
    export function OnBulkOperationMailCmd_S(rev: Cmd.BulkOperationMailCmd_S) {
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.BULK_MAIL, rev);
        }
    }
    /**游戏按钮红点 */
    export function OnShowRedPointLobbyCmd_S(rev: Cmd.ShowRedPointLobbyCmd_S) {
        MJLobby.MJLobbyData.getInstance().redPointData = rev;
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.RED_POINT, rev);
    }
    /**当累计金额发生变化时，服务器会主动推送 */
    export function OnGetTotalRedPackMoneyLobbyCmd_S(rev: Cmd.GetTotalRedPackMoneyLobbyCmd_S) {
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.TotalRedPack, rev);
    }

    /**新用户红包界面 */
    export function OnGetNewUserRedPackShowLobbyCmd_S(rev: Cmd.GetNewUserRedPackShowLobbyCmd_S) {
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.NewUserRedPack, rev);
    }
    /**领取新手红包 */
    export function OnExchangeNewUserRedPackLobbyCmd_S(rev: Cmd.ExchangeNewUserRedPackLobbyCmd_S) {
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.ExchangeNewUserRedPack, rev);
    }
    /**话费券兑换红包界面 */
    export function OnGetCCRedPackShowLobbyCmd_S(rev: Cmd.GetCCRedPackShowLobbyCmd_S) {
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.GetCCRedPack, rev);
    }
    /**话费券兑换红包 */
    export function OnExchangeCCRedPackLobbyCmd_S(rev: Cmd.ExchangeCCRedPackLobbyCmd_S) {
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.ExchangeCCRedPack, rev);
    }
    /**返利红包界面 */
    export function OnGetRechargeRedPackShowLobbyCmd_S(rev: Cmd.GetRechargeRedPackShowLobbyCmd_S) {
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.GetRechargeRedPack, rev);
    }
    /**兑换返利红包 */
    export function OnExchangeRechargeRedPackLobbyCmd_S(rev: Cmd.ExchangeRechargeRedPackLobbyCmd_S) {
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.ExchangeRechargeRedPack, rev);
    }
    /**玩家获得红包明细 */
    export function OnGetUserGetRedPackInfoLobbyCmd_S(rev: Cmd.GetUserGetRedPackInfoLobbyCmd_S) {
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.GetUserGetRedPackInfo, rev);
    }
    /**提现记录 */
    export function OnGetDrawCashRecordLobbyCmd_S(rev: Cmd.GetDrawCashRecordLobbyCmd_S) {
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.GetDrawCashRecord, rev);
    }
    /**红包提现 */
    export function OnRedPackDrawCashLobbyCmd_S(rev: Cmd.RedPackDrawCashLobbyCmd_S) {
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.RedPackDrawCash, rev);
    }
    /**新版幸运翻翻翻主界面 */
    export function OnNewLuckTurnCardShowLobbyCmd_S(rev: Cmd.NewLuckTurnCardShowLobbyCmd_S) {
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.NewLuckTurnCardShow, rev);
    } /**新版幸运翻翻翻翻牌 */
    export function OnNewGetLuckTurnCardRewardLobbyCmd_S(rev: Cmd.NewGetLuckTurnCardRewardLobbyCmd_S) {
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.NewGetLuckTurnCardReward, rev);
    }
    /**进游戏顺序弹窗 */
    export function OnSequentialPopupsLobbyCmd_S(rev: Cmd.SequentialPopupsLobbyCmd_S) {
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.WINDOW_POP, rev);
    }


    ////////////////////////////////////////////////////////////////
    export function OnIntoInviteRankLobbyCmd_S(rev: Cmd.IntoInviteRankLobbyCmd_S) {
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "inviteRank");
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.KEJIA_INVITERANK, rev);
        }
    }
    /**福建的代理商界面 */
    export function OnIntoHigherAgentLobbyCmd_S(rev: Cmd.IntoHigherAgentLobbyCmd_S) {
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "invite");
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.LYFJ_INVITE, rev);
        }
    }

    /**福建代理返回 */
    export function OnEnquireBindAgent2LobbyCmd_S(rev: Cmd.EnquireBindAgent2LobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.LYFJ_INVITE_RETURN, rev);
        }
    }
    /**丹东代理界面 */
    export function OnGetParentLobbyCmd_S(rev: Cmd.GetParentLobbyCmd_S) {
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "invite");
        dispatch(MJLobby.MahJongLobbyFacadeConsts.DANDONG_INVITE, rev);
    }
    /**余款数量更新 */
    export function OnBankMoneyUpdate_S(rev: Cmd.BankMoneyUpdate_S) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.BANK_MONEY_UPDATE, rev);
    }
    /**保险箱返回 */
    export function OnAccessBankChipsLobbyCmd_S(rev: Cmd.AccessBankChipsLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.BANK_MONEY_UPDATE);
        }
    }
    /**实名认证 */
    export function OnAuthenticationLobbyCmd_S(rev: Cmd.AuthenticationLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyData.getInstance().authen = 0;
            MJLobby.LobbyPopupManager.showMildWarnShow("实名认证已成功");
        }
    }
    /**
	 *  C-&gt;S 获取邮件列表请求
	 *  S-&gt;C 邮件列表更新
	 */
    export function OnGetListMailCmd_CS(rev: Cmd.GetListMailCmd_CS) {
        let mailList = rev.mailList && rev.mailList instanceof Array ? rev.mailList : [];
        MJLobby.Mail.Instance.initMail(mailList);
    }
    /**
	 * 新邮件广播
	 */
    export function OnNewMailCmd_Brd(rev: Cmd.NewMailCmd_Brd) {
        MJLobby.Mail.Instance.add(rev.mail);
    }
    /**
	 *  C-&gt;S 删除指定邮件请求
	 *  S-&gt;C 删除指定邮件通知
	 */
    export function OnDeleteMailCmd_CS(rev: Cmd.DeleteMailCmd_CS) {
        let ids = rev.ids && rev.ids instanceof Array ? rev.ids : [];
        for (let item of ids) {
            MJLobby.Mail.Instance.delete(item);
        }
    }
    /**
	 *  C-&gt;S 查看指定邮件请求
	 *  S-&gt;C 查看完成指定邮件通知
	 */
    export function OnReadMailCmd_CS(rev: Cmd.ReadMailCmd_CS) {
        // let ids = rev.ids && rev.ids instanceof Array ? rev.ids : [];
        // let mailList = MJLobby.Mail.Instance.mailList;
        // for (let id of ids) {
        //     let mail = mailList.first((v: MailInfo) => v.id == id);
        //     if (!mail)
        //         continue;
        // }
    }
    /**
	 *  C-&gt;S 获取邮件的东西请求
	 *  S-&gt;C 已获取邮件东西通知
	 */
    export function OnGetItemMailCmd_CS(rev: Cmd.GetItemMailCmd_CS) {
        uniLib.UserInfo.chips = rev.diamond;
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.Chips_Changed, rev.diamond);
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.GetItemMail, rev);
    }
    /**
	 * 刷新某个赛事人数
	 */
    export function OnRefreshUesrNbrEventCmd_Brd(rev: Cmd.RefreshUesrNbrEventCmd_Brd) {
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.RefreshUesrNbrEvent, rev);
    }
    /**
	 * 刷新某个赛事状态
	 */
    export function OnRefreshStateEventCmd_Brd(rev: Cmd.RefreshStateEventCmd_Brd) {
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.RefreshStateEvent, rev);

    }
    /**
	 * 查看当前赛事
	 */
    export function OnReturnListEventCmd_S(rev: Cmd.ReturnListEventCmd_S) {
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnListEvent, rev);
    }
    /**
	 * 申请退出一个赛事
	 */
    export function OnRequestExitEventCmd_C(rev: Cmd.RequestExitEventCmd_C) {
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.RequestExitEvent, rev);
    }
    /**
	 * 申请退出一个赛事返回
	 */
    export function OnReturnExitEventCmd_S(rev: Cmd.ReturnExitEventCmd_S) {
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnExitEvent, rev);
    }
    /**
	 * 返回某个赛事结果
	 */
    export function OnReturnEventResultCmd_S(rev: Cmd.ReturnEventResultCmd_S) {
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnEventResult, rev);
    }
    /**
	 * 申请参加加赛事返回
	 */
    export function OnReturnJoinEventCmd_S(rev: Cmd.ReturnJoinEventCmd_S) {
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnJoinEvent, rev);
    }
    /**商城购买相关 */
    export function OnBuyGoodsLobbyCmd_S(rev: Cmd.BuyGoodsLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.BUYGOODS_LOBBY, rev);
        }
    }
    /**退出房间面板 */
    export function OnQuitGameShowLobbyCmd_S(rev: Cmd.QuitGameShowLobbyCmd_S) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_QUITGAMESHOW_LOBBY, rev);
    }
    /** 
    * 实名认证
    */
    export function OnAuthenticationLobbyCmd_CS(rev: Cmd.AuthenticationLobbyCmd_CS) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.AuthenticationLobby, rev);
    }
    /**
     * 提现记录
     */
    export function OnCashWithdrawalLobbyCmd_S(rev: Cmd.CashWithdrawalLobbyCmd_S) {
        if (!rev.resultCode) {
            MJLobby.LobbyPopupManager.showMildWarnShow("申请提现成功，正在审核中...");
        }
    }
    /**
     * 提现记录
     */
    export function OnGetCashWithdrawalRecordLobbyCmd_S(rev: Cmd.GetCashWithdrawalRecordLobbyCmd_S) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.WithdrawalRecordEvent, rev);
    }

    /**
     * 获取服务器发来的玩家头像数据
     */
    export function OnGetUserHeadList_S(rev: Cmd.GetUserHeadList_S) {
        if (rev && rev.headList) {
            MJLobby.LobbyDataCache.addHeadUrl(rev.headList);
            dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnUserHeadList, rev);
        }
    }
    /**
     * 获取黄名单列表
     */
    export function OnReturnYellowMemberInfoMatchGroupCmd_S(rev: Cmd.ReturnYellowMemberInfoMatchGroupCmd_S) {
        if (rev && rev.list) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnYellowList, rev);
        }
    }

    /**放弃摇一摇 */
    export function OnAbandonShakeLobbyCmd_S(rev: Cmd.AbandonShakeLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.AbandonShake, rev);
        }
    }

    /**打开摇一摇界面 */
    export function OnGetShakeBaseInfoLobbyCmd_S(rev: Cmd.GetShakeBaseInfoLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyEventListener.getInstance().dispatchEventWith(MJLobby.MahJongLobbyFacadeConsts.ENTERSHAKE_LOBBY, true, rev);
        }
    }

    /**摇一摇中奖返回数据 */
    export function OnGetShakeResultLobbyCmd_S(rev: Cmd.GetShakeResultLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyEventListener.getInstance().dispatchEventWith(MJLobby.MahJongLobbyFacadeConsts.SHAKE_DATA_LOBBY, true, rev);
        }
    }
    /**
     * 大厅微信红包雨
     */
    export function OnGrabRedPackLobbyCmd_Brd(rev: Cmd.GrabRedPackLobbyCmd_Brd) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.GrabRedPackLobby, rev);
    }
    /**
     * 改变匹配号属性
     */
    export function OnChangeMatchGroupCmd_S(rev: Cmd.ChangeMatchGroupCmd_S) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ChangeMatchGroupEvent, rev);
    }
    /**
     * 历史匹配组列表
     */
    export function OnHistoryMatchIdListMatchGroupCmd_S(rev: Cmd.HistoryMatchIdListMatchGroupCmd_S) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.HistoryMatchIdList, rev);
    }
    /**
     * 官方匹配组列表
     */
    export function OnPublicMatchIdListMatchGroupCmd_S(rev: Cmd.PublicMatchIdListMatchGroupCmd_S) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.PublicMatchList, rev);
    }
    /**
     * 冠名赛列表
     */
    export function OnOfficialMatchIdListMatchGroupCmd_S(rev: Cmd.OfficialMatchIdListMatchGroupCmd_S) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.OfficialMatchList, rev);
    }
    /**
     * 返回等待列表
     */
    export function OnWaitUserListMatchGroupCmd_S(rev: Cmd.WaitUserListMatchGroupCmd_S) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnWaitList, rev);
    }
    export function OnRequestJoinMemberMatchGroupCmd_S(rev: Cmd.RequestJoinMemberMatchGroupCmd_S) {
        let msgBox = new MJLobby.LobbyMsgBox(true);
        let msg = "玩家" + rev.nickname + "申请加入匹配号" + rev.matchId + ",是否同意进入？"
        function okFunc() {
            let cmd = new Cmd.ReplyJoinMemberListMatchGroupCmd_C();
            cmd.matchId = rev.matchId;
            cmd.reply = 1;
            cmd.uid = rev.uid;
            MJLobby.LobbyServerMJProxy.getInstance().sendData(cmd);
        }
        msgBox.setData("温馨提示", msg, ["确定", "取消"], [okFunc]);
        MJLobby.LobbyPopupManager.addPopUp(msgBox, true, true);
    }
    /**返回商城列表 */
    export function OnShopPointListLobbyCmd_S(rev: Cmd.ShopPointListLobbyCmd_S) {
         dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnShopPointList, rev);
    }
}
module Pmd {
    export function OnCreatePlatOrderReturnSdkPmd_S(rev: Pmd.CreatePlatOrderReturnSdkPmd_S) {
        Cmd.trace(rev, "返回：订单号，CreatePlatOrderReturnSdkPmd_S");
        MJLobby.LobbyPopupManager.showMildWarnShow("获取订单号成功，等待支付");
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "recharge");
        if (rev.result != 0) {
            if (rev.result == 2)
                MJLobby.LobbyPopupManager.showMildWarnShow("今日已达最大充值限额(3千)");
            else
                MJLobby.LobbyPopupManager.showMildWarnShow("下订单失败!");
            return;
        }
        /**江西客家特殊 */
        if (uniLib.Global.is_sandbox == 0 && MJLobby.MJLobbyData.getInstance().lobbyId == 7) {
            uniLib.PayMgr.Instance.payByPmd(rev);
            return true;
        }
        //象山支付
        if (uniLib.Global.is_sandbox == 0 && MJLobby.MJLobbyData.getInstance().lobbyId == 1021) {
            if (uniLib.Global.isH5) {
                window.location.href = rev.redirecturl;
            }
            else if (uniLib.Utils.isIOS()) {
                uniLib.ZQGameSdk.openWeb(rev.redirecturl);
            }
            else {
                function requestCallBack(result) {
                    var xmlNode = egret.XML.parse(result);
                    var item1 = <egret.XML>xmlNode.children[0];
                    var item2 = <egret.XML>item1.children[0];
                    var resultStatue = <number>item2.attributes.value;
                    var msg = "支付失败";
                    if (resultStatue == 1) {
                        msg = "支付成功";
                    } else if (resultStatue == 4) {
                        msg = "交易进行中";
                    }
                    MJLobby.LobbyPopupManager.showMildWarnShow(msg);
                }
                function payBack() {
                    var reqPayStatus = new uniLib.HttpRequest(requestCallBack, null, this);
                    var merchant_id = 1257;
                    var three_trade_no = rev.platorder;
                    var key = "c9b387874eb1c3f811e9e833f968aac9"
                    var signstr = "merchant_id=" + merchant_id + "&three_trade_no=" + three_trade_no + "&key=" + key;
                    var sign = uniLib.StringUtils.MD5(signstr).toUpperCase();
                    var url = "https://api.tongle.net/gateway/Querypay/ThreePayStatus.aspx?merchant_id=" + merchant_id + "&three_trade_no=" + three_trade_no + "&sign=" + sign;
                    console.error(url);
                    reqPayStatus.open(url);
                    reqPayStatus.send("url");
                }
                uniLib.PayMgr.Instance.payByPmd(rev, payBack, this);
                return;
            }
        }
        var payInfo: uniLib.IOrderInfo = <uniLib.IOrderInfo>{};
        payInfo.platOrder = rev.platorder;
        payInfo.gameOrder = rev.gameorder;
        var goodVo: any = MJLobby.LobbyUtils.getGoodNameByShopId(rev.goodid);
        payInfo.goodName = goodVo.goodName;
        payInfo.currencyName = goodVo.goodDesc;
        payInfo.price = rev.ordermoney;
        // if (MJLobby.MJLobbyData.getInstance().lobbyId == MJLobby.LobbyIdConsts.FUJIAN_MAHJONG) {
        if (MJLobby.LobbyDataCache.bundleInfo && MJLobby.LobbyDataCache.bundleInfo.goods_type) {
            payInfo.goodId = "9020_" + MJLobby.LobbyDataCache.bundleInfo.goods_type + "_" + rev.goodid;
        } else {
            payInfo.goodId = rev.appgoodid;
        }
        if (MJLobby.MJLobbyData.getInstance().lobbyId == 24) {
            if (uniLib.Utils.isIOS()) {
                payInfo.goodId = "9020_" + MJLobby.LobbyDataCache.bundleInfo.goods_type + "_" + rev.goodid;
            } else {
                payInfo.goodId = rev.appgoodid;
            }
        }
        // } else {
        //     payInfo.goodId = rev.appgoodid;
        // }

        // payInfo.goodId = rev.goodid.toString();
        payInfo.payUrl = rev.redirecturl;
        payInfo.noticeurl = rev.noticeurl;
        payInfo.payplatid = rev.payplatid.toString();
        if (rev.sign) {
            payInfo.sign = rev.sign;
        }
        if (rev.extdata) {
            payInfo.sign = rev.extdata;
        }
        if (Number(uniLib.Global.platInfo.platid) == 1) {
            payInfo.uid = uniLib.Global.platInfo.uid;
        } else {
            payInfo.uid = String(MJLobby.MJLobbyInfo.userId);
        }
        if (rev.createtime) {
            payInfo.creatTime = Number(rev.createtime);
        } else {
            payInfo.creatTime = new Date().getTime();
        }

        if (rev.goodnum) {
            payInfo.count = rev.goodnum;
        }

        MJLobby.MJLobbyData.lastOrder = payInfo;
        uniLib.Console.log("order success,gameOrder:" + JSON.stringify(payInfo));
        uniLib.PayMgr.Instance.pay(payInfo, function (dat?: any) {
            uniLib.Console.log("start serch order:" + dat);
            if (dat.code == 0) {
                var msg: Pmd.RechargeQueryRequestIOSSdkPmd_C = new Pmd.RechargeQueryRequestIOSSdkPmd_C();
                msg.gameorder = MJLobby.MJLobbyData.lastOrder.gameOrder;
                msg.originalmoney = MJLobby.MJLobbyData.lastOrder.price;
                msg.roleid = MJLobby.NetMgr.UID;
                msg.ordermoney = MJLobby.MJLobbyData.lastOrder.price;
                msg.token = MJLobby.MJLobbyData.lastOrder.sign;
                if (dat.data && dat.data.paytoken)
                    msg.token = dat.data.paytoken;
                msg.extdata = rev.data.extdata;
                if (uniLib.Global.payPlatId != 0) {
                    msg.payplatid = Number(MJLobby.MJLobbyData.lastOrder.payplatid);
                } else {
                    msg.payplatid = (uniLib.Global.platInfo.platid == Pmd.PlatType.PlatType_Normal ? Pmd.PlatType.PlatType_AiBei : uniLib.Global.platInfo.platid);
                }
                MJLobby.NetMgr.tcpSend(msg);
            }
        });
        return true;
    }
    export function OnNotifyRechargeRequestSdkPmd_S(rev: Pmd.NotifyRechargeRequestSdkPmd_S) {
        Cmd.trace(rev, "支付成功返回，NotifyRechargeRequestSdkPmd_S");
        MJLobby.LobbyPopupManager.showMildWarnShow("充值成功");
        uniLib.UserInfo.chips = Number(rev.extdata);
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.COIN_FIRSTRECHARGE, rev.goodid);
    }
}
onerror = function (errorMessage: any, scriptURI?: any, lineNumber?: any, columnNumber?: any, errorObj?: any) {
    var str = "大厅异常捕获:gameid:" + uniLib.Global.gameId + ":lobbyid:" + uniLib.Global.lobbyGameId + ":" + errorMessage + "url:" + scriptURI + "line:" + lineNumber;
    uniLib.Console.error(str);
    if (uniLib["DebugView"]) {
        uniLib["DebugView"].Instance.addLog(str);
    }
    var msg: Cmd.ClientErrorLogToServerLobbyCmd_C = new Cmd.ClientErrorLogToServerLobbyCmd_C();
    msg.gameid = uniLib.Global.gameId;
    msg.log = str;
    MJLobby.NetMgr.tcpSend(msg);
    //uniLib["DebugView"].Instance.show();
}
