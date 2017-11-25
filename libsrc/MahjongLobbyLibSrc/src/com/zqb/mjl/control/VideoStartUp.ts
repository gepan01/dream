module MJLobby {
	export class VideoStartUp {
		public constructor() {
		}
		private _timer:egret.Timer;
		private _startTime: number;
		/**播过的录像 */
		private _lookedVideo: any[] = [];
		/**json数组 */
		private _videoArr: any[] = [];
		private _stopVideo: boolean = false;
		private _pauseTime: number;
		private _lastTime: number = 0;
		private isFirst: boolean = true;
		private isAdvance: boolean = true;
		/**录像类型 0麻将 1十三水 2 跑得快 3斗地主*/
		private _videoType: number = 0;
		public start(num: number = 0):void{
			if(!MJLobby.MJLobbyData.getInstance().videoData){
				return;
			}
			this._videoType = num;
			this._lastTime = 0;
			this.isFirst = true;
			this.isAdvance = true;
			uniLib.Global.addEventListener(uniLib.ZqEvent.EVENT_G2L,this.onMoon,this);
			this._startTime = new Date().getTime();
			this._stopVideo = false;
			var videoJson = JSON.parse(MJLobby.MJLobbyData.getInstance().videoData);
			MJLobby.MJLobbyData.getInstance().videoUID = videoJson.bankerUid;
			for(let i = 0; i < videoJson.list.length; i++){
				this._videoArr.push(videoJson.list[i]);
			}
			this._timer = new egret.Timer(100);
			this._timer.addEventListener(egret.TimerEvent.TIMER,this.videoStart,this);
			this._timer.start();
		}

		private videoStart(evt: egret.TimerEvent){
			var offsettime = new Date().getTime() - this._startTime;
			var len = this._videoArr.length;
			if(len == 0){
				// uniLib.Global.dispatchEvent(uniLib.ZqEvent.EVENT_L2G,"video_play_finish");
				this._timer.stop();
				return;
			}
			if(this.isFirst){
				this.advanceVideo(0);
				this.isFirst = false;
			}
			if(this.isAdvance){
				var msg1 = this._videoArr[0].msg;
				if(uniLib.Global.jsonCompress){
					if(this._videoArr[0].hasOwnProperty("msg"))
						msg1 = JSON.stringify(uniLib.Global.DeCompress(JSON.parse(this._videoArr[0].msg)));
					else
						return;
				}
				if(this._videoType == 0){//麻将直接快进到开始游戏
					if(msg1.indexOf("Cmd.StartMahjongCmd_Brd") != -1){
						this.isAdvance = false;
					}
				}else if(this._videoType == 1){//十三水直接快进到比牌
					if(msg1.indexOf("Cmd.CompareCardRoomCmd_Brd") != -1){
						this.isAdvance = false;
					}
				} else if (this._videoType == 2) {//刘主任fuck跑得快
					if (msg1.indexOf("Cmd.GameStart_Brd") != -1) {
						this.isAdvance = false;
					}
				}else if(this._videoType == 3){//斗地主
					if (msg1.indexOf("Cmd.StartPokerCmd_Brd") != -1) {
						this.isAdvance = false;
					}
				}
				//poker类游戏
				if (msg1.indexOf("Cmd.RoomSeatUpdateCmd_S") != -1) {
					if (this._timer.delay != 500)
						this._timer.delay = 500;
				}
				this.advanceVideo(1);
				return;
			}
			for(let i = 0; i < len; i++){
				if(Number(this._videoArr[0].time) <= offsettime){
					this.advanceVideo(0);
				}
			}
		}

		private onMoon(evt: uniLib.ZqEvent){
			switch(evt.param){
				case "video_back":
					MJLobby.LobbyPopupManager.showMildWarnShow("暂未开放，还在思考");
					// this.backBtnVideo();
				break;
				case "video_advance":
					this.advanceVideo(1);
				break;
				case "video_close":
					this._timer.stop();
					this.destory();
				break;
				case "video_stop":
					this.stopVideo();
				break;
				case "video_replay":
					this.resetVideo();
				break;
			}
		}
		/**
		 * 录像前进
		 * num = 1代表手动前进  num = 0代表自动前进
		 */
		private advanceVideo(num: number): void{
			if(!this._videoArr[0] || !this._videoArr[0].msg) {
				// uniLib.Global.dispatchEvent(uniLib.ZqEvent.EVENT_L2G,"video_play_finish");
				this._timer.stop();
				return;
			}
			if(num == 1){
				this._startTime -= this._videoArr[0].time - this._lastTime;
			}
			var msg1 = this._videoArr[0].msg;
			if(uniLib.Global.jsonCompress){
				if(this._videoArr[0].hasOwnProperty("msg"))
					msg1 = JSON.stringify(uniLib.Global.DeCompress(JSON.parse(this._videoArr[0].msg)));
				else
					return;
			}
			var msg = JSON.parse(msg1);
			if(this._videoType == 0){//麻将
				if(msg1.indexOf("Cmd.SelfCardMahjongCmd_S") != -1 
				|| msg1.indexOf("Cmd.SendCardMahjongCmd_S") != -1
				|| msg1.indexOf("Cmd.EnterMahjongCmd_Brd") != -1
				|| msg1.indexOf("Cmd.BarCardMahjongCmd_Brd") != -1
				|| msg1.indexOf("Cmd.EnsureLackOpCmd_S") != -1//万开云定缺
				|| msg1.indexOf("Cmd.exChangeCardMahjongCmd_S") != -1//万开云开局换牌
				|| msg1.indexOf("Cmd.ChangeCardDataMahjong_S") != -1){//万州麻将的换牌数据
					if(msg.data){
						msg.data.ownerid = this._videoArr[0].uid;
					}else{
						this.advanceFunc();
						return;
					}
				}else if(msg1.indexOf("Cmd.EnterMahjongCmd_S") != -1 ){
					if(this._videoArr[0].uid != MJLobby.MJLobbyData.getInstance().videoUID){
						this.advanceFunc();
						return;
					}
				}else if(msg1.indexOf("Cmd.FlowerMahjongCmd_Brd") != -1){//补花 屏蔽掉没有手牌信息的消息
					if(msg.data && !msg.data.myCardSet && this._videoArr[0].uid != MJLobby.MJLobbyData.getInstance().videoUID){
						this.advanceFunc();
						return;
					}
				}
			}else if(this._videoType == 1){//十三水
				if(msg1.indexOf("_Brd") != -1){
					if(msg.data){
						msg.data.ownerid = this._videoArr[0].uid;
					}else{
						this.advanceFunc();
						return;
					}
				}else if(msg1.indexOf("Cmd.RoomEnterRoomCmd_S") != -1){
					if(this._videoArr[0].uid != MJLobby.MJLobbyData.getInstance().videoUID){
						this.advanceFunc();
						return;
					}
				}
			}else if(this._videoType == 2){//刘主任fuck跑得快
				if(msg1.indexOf("_Brd") != -1){
					if(msg.data){
						msg.data.ownerid = this._videoArr[0].uid;
					}else{
						this.advanceFunc();
						return;
					}
				}else if(msg1.indexOf("Cmd.JoinRoomReq_S") != -1){
					if(this._videoArr[0].uid != MJLobby.MJLobbyData.getInstance().videoUID){
						this.advanceFunc();
						return;
					}
				}
			}else if(this._videoType == 3){//斗地主录像
				if(msg1.indexOf("_Brd") != -1 
				|| msg1.indexOf("Cmd.SelfCardPokerCmd_S") != -1){
					if(msg.data){
						msg.data.ownerid = this._videoArr[0].uid;
					}else{
						this.advanceFunc();
						return;
					}
				}else if(msg1.indexOf("Cmd.EnterPokerCmd_S") != -1){
					if(this._videoArr[0].uid != MJLobby.MJLobbyData.getInstance().videoUID){
						this.advanceFunc();
						return;
					}
				}
			}
			uniLib.NetMgr.tcpSend(msg);
			this.advanceFunc();
		}
		/**
		* 前进一步对数组数据进行操作
		 */
		private advanceFunc(){
			this._lastTime = this._videoArr[0].time;
			var oldData = this._videoArr[0];
			this._lookedVideo.push(oldData);
			this._videoArr.shift();
			this._timer.start();
		}

		private backBtnVideo(): void{
			for(let i = this._lookedVideo.length - 1; i >= 0; i--){
				var msg = this._lookedVideo[i].msg;
				if(uniLib.Global.jsonCompress){
					msg = JSON.stringify(uniLib.Global.DeCompress(JSON.parse(this._lookedVideo[i].msg)));
				}
				if(msg.indexOf("Cmd.OutCardMahjongCmd_Brd") != -1
				|| msg.indexOf("Cmd.SendCardMahjongCmd_S") != -1){
					var json = JSON.parse(this._lookedVideo[i].msg);
					var req = new Cmd.RecallOneCardMahjongCmd_S();
					if(json.data.uid && json.data.uid != 0){
						req.uid = json.data.uid;
					}else{
						req.uid = this._lookedVideo[i].uid;
					}
					req.thisId = json.data.thisId;
                	uniLib.NetMgr.tcpSend(req);
					// if(msg.indexOf("Cmd.OutCardMahjongCmd_S") != -1){
						for(let j = this._lookedVideo.length -1; j >= i;j--){
							this._videoArr.unshift(this._lookedVideo[j]);
						}
						this._lookedVideo.splice(i,this._lookedVideo.length - i);
						this._pauseTime = new Date().getTime();
						this._timer.stop();
						this._stopVideo = true;
						break;
					// }
				}
			}
		}

		private stopVideo():void{
			if(!this._stopVideo){
				this._pauseTime = new Date().getTime();
				this._timer.stop();
				this._stopVideo = true;
			} else {
				this._startTime += new Date().getTime() - this._pauseTime;
				this._timer.start();
				this._stopVideo = false;
			}
		}

		private resetVideo():void{
			this._videoArr = [];
			this._videoArr.concat(this._lookedVideo);
			this._lookedVideo = [];
			this._startTime = new Date().getTime();
			this._timer.start();
		}

		public destory(): void{
			this._videoArr = [];
			this._lookedVideo = [];
			if(this._timer){
				this._timer.removeEventListener(egret.TimerEvent.TIMER,this.videoStart,this);
				this._timer.stop();
				this._timer = null;
			}
			uniLib.Global.removeEventListener(uniLib.ZqEvent.EVENT_G2L,this.onMoon,this);
		}
	}
}
