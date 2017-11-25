module MJLobby {
    /**
     * 启动命令
     */
	export class LobbyStartUpCommand extends Command{
        
		public constructor() {
			super();
		}
        public init():void{
            MJLobbyEventListener.getInstance().addEventListener(MahJongLobbyFacadeConsts.STARTUP,this.onEventHandle,this);
            MJLobbyEventListener.getInstance().addEventListener(MahJongLobbyFacadeConsts.SHOW_LOBBY,this.onEventHandle,this);
            MJLobbyEventListener.getInstance().addEventListener(MahJongLobbyFacadeConsts.JOIN_ROOM,this.onEventHandle,this);
            MJLobbyEventListener.getInstance().addEventListener(MahJongLobbyFacadeConsts.JOIN_VIDEOROOM,this.onEventHandle,this);
            MJLobbyEventListener.getInstance().addEventListener(MahJongLobbyFacadeConsts.JOIN_HUNDRE_ROOM,this.onEventHandle,this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.EVENT_G2L, this.getLastGameId, this);
        }
        public destory():void{
            MJLobbyEventListener.getInstance().removeEventListener(MahJongLobbyFacadeConsts.STARTUP,this.onEventHandle,this);
            MJLobbyEventListener.getInstance().removeEventListener(MahJongLobbyFacadeConsts.SHOW_LOBBY,this.onEventHandle,this);
            MJLobbyEventListener.getInstance().removeEventListener(MahJongLobbyFacadeConsts.JOIN_ROOM,this.onEventHandle,this);
            MJLobbyEventListener.getInstance().removeEventListener(MahJongLobbyFacadeConsts.JOIN_VIDEOROOM,this.onEventHandle,this);
            MJLobbyEventListener.getInstance().removeEventListener(MahJongLobbyFacadeConsts.JOIN_HUNDRE_ROOM, this.onEventHandle, this);
        }

        private onEventHandle(evt: egret.Event): void {
            switch (evt.type) {
                case MahJongLobbyFacadeConsts.STARTUP:
                    this.initController();
                    this.initProxy();
                    if (MJLobbyData.getInstance().myBaseInfo) {//返回大厅时直接实现大厅，刚进入房间是如果有默认房间直接进房间，无需显示大厅
                        this.initMediator();
                    }
                    this.sendNotification(MahJongLobbyFacadeConsts.SEND_DATA, null, LobbyDataRequestCommand.CONNECT_GAME_SERVER);
                    MessageQueue.Instance.call();
                    break;
                case MahJongLobbyFacadeConsts.SHOW_LOBBY:
                    this.initMediator();
                    break;
                 case MahJongLobbyFacadeConsts.JOIN_ROOM:
                    MJLobby.MJLobbyData.getInstance().continueObj = null;
                    var joinVo:JoinRoomVo=evt.data;
                    if(uniLib.Global.isInGame && (MJLobby.MJLobbyData.getInstance().lobbyId == 24 || joinVo.scene)){//已经在游戏的话 过滤掉 配合服务器处理 先处理好彩
                        return;
                    }
                    MJLobbyData.getInstance().everyFirstLogin = false;
                    MJLobby.MJLobbyMatchData.getInstance().isEnroll = false;
                    MJLobby.MJLobbyData.getInstance().video = 0;
                    MJLobby.MJLobbyData.getInstance().curGameId = joinVo.gameId;
                    joinVo.lobbyId = MJLobby.MJLobbyData.getInstance().lobbyId;
                    let lobbyConfig = MJLobby.MJLobbyData.getInstance().getLobbyConfig();
                    if(lobbyConfig.hasOwnProperty("lobbyMahjongSourceName")){//大厅金币麻将资源
                        joinVo.mjResName = lobbyConfig["lobbyMahjongSourceName"];
                    }else{
                        joinVo.mjResName = "";
                    }
                    if(lobbyConfig.hasOwnProperty("lobbyDiamond")){
                        joinVo.minLeaveRoomDiamond = lobbyConfig["lobbyDiamond"];
                    }else{
                        joinVo.minLeaveRoomDiamond = 100;
                    }
                    var gameData = MJLobbyData.getConfigByGameId(joinVo.gameId);
                    gameData.showBack = true;
                    gameData.extData=joinVo;
                    gameData.destroyResOnExit=false;
                    gameData.defaultOrientation=egret.OrientationMode.LANDSCAPE;
                    var zoneInfo:Pmd.ZoneInfo=new Pmd.ZoneInfo();
                    zoneInfo.zoneid=joinVo.zoneId;
                    zoneInfo.gameid=joinVo.gameId;
                    MJLobbyData.getInstance().continueObj = null;
                    if (joinVo.shareInfo) {
                        let webpageUrl = uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl;
                        if ((webpageUrl == null ||webpageUrl == "") && MJLobby.LobbyDataCache.bundleInfo && MJLobby.LobbyDataCache.bundleInfo.weixin && MJLobby.LobbyDataCache.bundleInfo.weixin.wbappid) {
                            var nick: string = MJLobbyData.getInstance().myBaseInfo.nickName;
                            if (nick.length > 8) {
                                nick = nick.slice(0, 8);
                            }
                            joinVo.shareInfo.webPageUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + MJLobby.LobbyDataCache.bundleInfo.weixin.wbappid + "&redirect_uri=http://wx.zqgame.com/addons/zqgame/gameshare.php?appid="+ MJLobby.LobbyDataCache.bundleInfo.weixin.wbappid+ "&response_type=code&scope=snsapi_base&state=" + uniLib.CompressUtil.base64encode(MJLobbyData.getInstance().myBaseInfo.uid + "|" + joinVo.roomId + "|" + nick) + "&connect_redirect=1#wechat_redirect";
                        } else {
                            joinVo.shareInfo.webPageUrl = webpageUrl + "?uid=" + MJLobbyData.getInstance().myBaseInfo.uid + "&nickName=" + MJLobbyData.getInstance().myBaseInfo.nickName;
                        }
                    }
                    gameData.zoneInfo = zoneInfo;
                    // var isIntoGame = joinVo.is
                    if (gameData) {
                        uniLib.GameModuleUtils.ExitGame(false);
                        // if(MJLobbyData.getInstance().lobbyId==LobbyIdConsts.GUIZHOU_MAHJONG){
                        //     uniLib.UIMgr.instance.showProcessBar(null, 97, 100, "加载游戏，请稍后...", "", true);
                        // }else{
                            uniLib.UIMgr.instance.showProcessBar(null, 1, 100, "加载游戏，请稍后...", "", true);
                        // }
                        
                        uniLib.GameModuleUtils.LoadGame(gameData.gameCodeUrl, gameData.gameDoc, gameData, null, function (): void {/*这里只是不想停背景音乐*/ });
                        // this.sendNotification(MJLobby.MahJongLobbyFacadeConsts.DESTORY);
                    }
                    break;
                case MahJongLobbyFacadeConsts.JOIN_VIDEOROOM:
                    MJLobby.MJLobbyData.getInstance().continueObj = null;
                    var joinVo:JoinRoomVo=evt.data;
                    MJLobby.MJLobbyData.getInstance().curGameId = joinVo.gameId;
                    joinVo.video = 1;
                    joinVo.videoUid = MJLobby.MJLobbyData.getInstance().videoUID; 
                    joinVo.lobbyId = MJLobby.MJLobbyData.getInstance().lobbyId;
                    MJLobby.MJLobbyData.getInstance().video = 1;
                    var gameData = MJLobbyData.getConfigByGameId(joinVo.gameId);
                    gameData.showBack = true;
                    gameData.extData=joinVo;
                    gameData.destroyResOnExit=false;
                    gameData.defaultOrientation=egret.OrientationMode.LANDSCAPE;
                    if (gameData) {
                        uniLib.GameModuleUtils.ExitGame(false);
                        // if(MJLobbyData.getInstance().lobbyId==LobbyIdConsts.GUIZHOU_MAHJONG){
                        //     uniLib.UIMgr.instance.showProcessBar(null, 97, 100, "加载游戏，请稍后...", "", true);
                        // }else{
                            uniLib.UIMgr.instance.showProcessBar(null, 1, 100, "加载游戏，请稍后...", "", true);
                        // }
                        uniLib.GameModuleUtils.LoadGame(gameData.gameCodeUrl, gameData.gameDoc, gameData, null, function (): void {/*这里只是不想停背景音乐*/ });
                        // this.sendNotification(MJLobby.MahJongLobbyFacadeConsts.DESTORY);
                    }
                    uniLib.Global.addEventListener(uniLib.ZqEvent.EVENT_G2L,this.gameStart,this);
                    break;
                case MahJongLobbyFacadeConsts.JOIN_HUNDRE_ROOM:
                    MJLobby.MJLobbyData.getInstance().continueObj = null;
                    var data:Cmd.EnterHundredGameLobbyCmd_S = evt.data;
                    MJLobby.MJLobbyData.getInstance().curGameId = data.gameId;
                    let vo:JoinRoomVo = new JoinRoomVo();
                    vo.gameId = data.gameId;
                    vo.zoneId = data.zoneId;
                    vo.subGameId = 1;//百人牛牛专用
                    vo.roomType = 4;//百人牛牛专用
                    vo.fish_type = 0;
                    vo.lobbyId = MJLobby.MJLobbyData.getInstance().lobbyId;
                    var gameData = MJLobbyData.getConfigByGameId(vo.gameId);
                    gameData.showBack = true;
                    if(uniLib.Global.is_sandbox == 1){
                        gameData.showBack = false;
                    }
                    gameData.extData = vo;
                    gameData.destroyResOnExit=true;
                    gameData.defaultOrientation=egret.OrientationMode.LANDSCAPE;
                    var zoneInfo:Pmd.ZoneInfo=new Pmd.ZoneInfo();
                    zoneInfo.zoneid=vo.zoneId;
                    zoneInfo.gameid=vo.gameId;
                    gameData.zoneInfo = zoneInfo;
                     if (gameData) {
                        if(!MJLobby.MJLobbyData.getInstance().isHaoCai()){
                            uniLib.GameModuleUtils.ExitGame(false);
                            uniLib.UIMgr.instance.showProcessBar(null, 1, 100, "加载游戏，请稍后...", "", true);
                        }
                        uniLib.GameModuleUtils.LoadGame(gameData.gameCodeUrl, gameData.gameDoc, gameData,MJLobbyData.getInstance().sceneLoading, function (): void {/*这里只是不想停背景音乐*/ },this,false);
                        // this.sendNotification(MJLobby.MahJongLobbyFacadeConsts.DESTORY);
                    }
                    break;
            }
        }
        private gameStart(evt:uniLib.ZqEvent):void{
            var video = new VideoStartUp();
            if(evt.param == "game_load_start"){
                video.start();
            }else if(evt.param == "ssh_load_start"){
                video.start(1);
            }else if(evt.param == "pdk_load_start"){
                video.start(2);
            }else if(evt.param == "ddz_load_start"){
                video.start(3);
            }
        }

        private getLastGameId(evt: uniLib.ZqEvent) {
			if (evt.param.hasOwnProperty("gameId")) {
				MJLobby.MJLobbyData.getInstance().lastGameId = evt.param["gameId"];
			}
		}
		 public execute(notification: puremvc.INotification): void {
            var rootView: egret.DisplayObjectContainer = notification.getBody();
            this.initController();
            this.initProxy();
            this.initMediator();
        }
        private initController():void{
            // this.facade.registerCommand(MahJongLobbyFacadeConsts.SEND_DATA,LobbyDataRequestCommand);
            // this.facade.registerCommand(MahJongLobbyFacadeConsts.DESTORY,LobbyRemoveCommand);
            MahJongLobbyFacade.getLobbyInstance().registerCommand(MahJongLobbyFacadeConsts.SEND_DATA,new LobbyDataRequestCommand());
            MahJongLobbyFacade.getLobbyInstance().registerCommand(MahJongLobbyFacadeConsts.DESTORY, new LobbyRemoveCommand());
         }
         private initMediator(): void {
             // var main:MJLobbyVc=new MJLobbyVc();
             // MJLobbyInfo.mainUILayer.addChild(main);
             var mainMediator: any = uniLib.getDefinitionByName(ViewConfig.mainMediatorName);
             ViewConfig.mainMediator = new mainMediator();
             MahJongLobbyFacade.getLobbyInstance().registerMediator(ViewConfig.mainMediator);
         }
        private initProxy():void{
             MahJongLobbyFacade.getLobbyInstance().registerProxy(new LobbyServerMJProxy())
        }
	}
}
