module MJLobby {
	export class GameResUpdata {
		public constructor() {
		}

		/**
		 * 是否需要下载游戏资源
		 */
		public static isDownGame(gameId: number): boolean {
			if (GameResUpdata.GameUpdataResSize(gameId) > (1024 * 1024 * 4)) {
				return true;
			}
			return false;
		}
		/**
		 * 指定游戏更新的资源文件
		 */
		public static m_ResChangedList: {[gameId:number]:Array<{ url: string, size: number }>} = {};
		/**
		 * 指定游戏更新的资源文件
		 */
		public static GetResChangedList(gameId: number): Array<{ url: string, size: number }> {
			if (this.m_ResChangedList[gameId]) {
				return this.m_ResChangedList[gameId];
			}
			this.m_ResChangedList[gameId] = [];
			let gameConfig = this.GetGameConfig(gameId);
			if (!gameConfig)
				return [];
			let resRoot = RES.getVersionController().getVirtualUrl(gameConfig.gameResRoot);
			let allManifest = GameResUpdata.AllManifest;
			let gameManifest: Array<string> = [];
			for (let i in allManifest) {
				let item = allManifest[i];
				if (i.indexOf(resRoot) != -1) {
					gameManifest.push(item.v);
				}
			}
			let changedRes: Array<{ url: string, size: number }> = RES.getVersionController().getChangeList();
			let gameResList = this.m_ResChangedList[gameId];
			for (let item of changedRes) {
				let url = item.url;
				for(let manifest of gameManifest){
					if(url.indexOf(manifest) != -1){
						gameResList.push(item)
						break;
					}
				}
			}
			return this.m_ResChangedList[gameId];
		}
		/**
		 *native 资源版本文件 all.Manifest
		 */ 
		private static m_allManifest: { [url: string]: { v: string, s: number } } = {};
		/**
		 *native 资源版本文件 all.Manifest
		 */ 
		public static get AllManifest(): { [url: string]: { v: string, s: number } } {
			return this.m_allManifest;
		}
		/**
		 * 初始化 native 资源版本文件 all.Manifest
		 */
		public static LoadAllManifest() {
			RES.getResByUrl("all.manifest", (data) => {
				GameResUpdata.m_allManifest = data;
			}, this, RES.ResourceItem.TYPE_JSON);
		}
		/**
		 * 获取指定游戏更新的文件
		 */
		public static GameUpdataResSize(gameId: number): number {
			let gameConfig = this.GetGameConfig(gameId);
			if (!gameConfig)
				return 0;
			let resRoot = RES.getVersionController().getVirtualUrl(gameConfig.gameResRoot);
			let gameres = GameResUpdata.GetResChangedList(gameId);
			let changedSize = 0;
			for (let item of gameres) {
				changedSize += item.size;
			}
			return changedSize;
		}
		/**
		 * 获取游戏配置数据
		 */
		public static GetGameConfig(gameId: number) {
			let gameList: Array<any> = RES.getRes("gameList_json");
			let gameConfig;
			for(let i:number =0;i<gameList.length;i++){
				if(gameList[i].gameId == gameId){
					gameConfig = gameList[i];
					break;
				}
			}
			return gameConfig;
		}
		/**
		 * bit转化为string
		 */
		public static BitToString(bit: number): string {
			if (bit == null || bit < 1) {
				return;
			}
			let kb = bit / 1024;
			if (kb < 1024) {
				return kb.toFixed(2).toString() + "KB";
			}
			let m = kb / 1024;
			return m.toFixed(2).toString() + "M";
		}
	}
}