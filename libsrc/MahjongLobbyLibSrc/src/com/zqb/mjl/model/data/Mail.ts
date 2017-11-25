module MJLobby {
	/**
	 * 邮件
	 */
    export class Mail {
        private static m_instance: Mail;
        public static get Instance(): Mail {
            if (!this.m_instance)
                this.m_instance = new Mail();
            return this.m_instance;
        }
        private m_mail: Array<Cmd.MailInfo> = [];
        public initMail(mails: Cmd.MailInfo[]) {
            mails = mails && mails instanceof Array ? mails : [];
			this.m_mail = mails;
			Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.Mail_Changed, this.m_mail);
		}
		public add(mail: Cmd.MailInfo) {
			if (mail == null)
				return;
			this.m_mail.push(mail);
			Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.Mail_Changed, this.m_mail);
        }
        public delete(id:number){
            for (let i: number = 0; i < this.m_mail.length; i++) {
                if (this.m_mail[i].id == id) {
                    this.m_mail.splice(i, 1);
                    break;
                }
            }
            Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.Mail_Changed, this.m_mail);
        }
        public get mailList(): Array<Cmd.MailInfo> {
            return this.m_mail;
        }
        public clear(){
            this.m_mail.splice(0, this.m_mail.length);
        }
    }
}