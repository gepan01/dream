// TypeScript file
module GX {
    export class Socket {
        private socket: egret.WebSocket;
        constructor() {
            this.init();
        }
        private init() {
            this.socket = new egret.WebSocket();
            //设置数据格式为二进制，默认为字符串
            this.socket.type = egret.WebSocket.TYPE_BINARY;
            //添加收到数据侦听，收到数据会调用此方法
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            //添加链接打开侦听，连接成功会调用此方法
            this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
            this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            //添加异常侦听，出现异常会调用此方法
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        }
        public connect(host: string, port: number) {
            //连接服务器
            this.socket.connect(host, port);
        }
        public send(value: string) {
            var byte: egret.ByteArray = new egret.ByteArray();
            byte.writeUTF(value);
            byte.writeBoolean(false);
            byte.writeInt(123);
            byte.position = 0;
            this.socket.writeBytes(byte, 0, byte.bytesAvailable);
            this.socket.flush();
        }
        private onReceiveMessage() {
            var byte: egret.ByteArray = new egret.ByteArray();
            this.socket.readBytes(byte);
            var msg: string = byte.readUTF();
            var boo: boolean = byte.readBoolean();
            var num: number = byte.readInt();

        }
        private onSocketOpen() {
            alert(222)

        }
        private onSocketClose() {
            alert(333)
        }
        private onSocketError() {
            alert(444)
        }
    }
    export class WebSocket {
        public static socket = new Socket();
        /**
         * Connect the socket to the specified host and port number
         * @param host Name or IP address of the host to be connected
         * @param port Port number to be connected
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将套接字连接到指定的主机和端口
         * @param host 要连接到的主机的名称或 IP 地址
         * @param port 要连接到的端口号
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        public static connect() {
            this.socket.connect("127.0.0.1",3000);
        }
        public static tcpSend(data: any) {
            if (data == null)
                return;
            let value = JSON.stringify(data);
            this.socket.send(value)
        }
    }
}