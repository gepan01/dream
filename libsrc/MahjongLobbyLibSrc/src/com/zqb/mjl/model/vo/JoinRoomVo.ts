module MJLobby {
	/*
	*传递给游戏的数据
	*/
	export class JoinRoomVo {
		public gameId:number;
		public roomId:number;
		public globalRoomId:number;
		public zoneId:number;
		public shareInfo:Cmd.ShareInfo;
		public video:number;
		public videoUid:number;
		public minLeaveRoomDiamond:number;
		public fish_type: number;
		public subGameId: number;
		public roomType: number;
		/**大厅金币麻将资源 */
		public mjResName: string;
		/**大厅id */
		public lobbyId: number;
		/**匹配场还是开房场  不为空表示匹配场*/
		public scene: number;
		/**开房人数 带给游戏 */
		public baseUserNbr: number;
		public constructor() {
		}
	}
}