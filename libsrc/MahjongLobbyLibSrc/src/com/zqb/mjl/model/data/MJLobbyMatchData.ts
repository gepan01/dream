module MJLobby {
	/**
	 * 比赛场数据
	 */
	export class MJLobbyMatchData {
		private static _instance: MJLobbyMatchData;

		public static getInstance():MJLobbyMatchData{
			if(!this._instance){
				this._instance=new MJLobbyMatchData();
			}
			return this._instance
		}
		public ticket: Array<Cmd.ticketObj>;
		public medal: Array<Cmd.medalObj>;
		/**是否报名 */
		public isEnroll: boolean = false;
		/**报名时间 */
		public enrollTime: Array<string> = [];
		/**报名人数 */
		public enrollNum: Array<number> = [];
	}
}