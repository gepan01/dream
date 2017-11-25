module MJLobby {
	export class LobbyEvents extends egret.EventDispatcher {
		private static _self: LobbyEvents = null;
		/**
		 * 加载完成
		 */
		public static NOTIFY_CONNECT_TIMEOUT: string = "NOTIFY_CONNECT_TIMEOUT";
		/**服务器发来显示是否存在官方充值代理商充值送钻 */
		public static NOTIFY_RECHARGE_GIVE: string = "NOTIFY_RECHARGE_GIVE";
		public static get Instance(): LobbyEvents {
			if (this._self == null) {
				this._self = new LobbyEvents();
			}
			return this._self;
		}
	}
}