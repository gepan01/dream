var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var GX;
(function (GX) {
    var Socket = (function () {
        function Socket() {
            this.init();
        }
        Socket.prototype.init = function () {
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
        };
        Socket.prototype.connect = function (host, port) {
            //连接服务器
            this.socket.connect(host, port);
        };
        Socket.prototype.send = function (value) {
            var byte = new egret.ByteArray();
            byte.writeUTF(value);
            byte.writeBoolean(false);
            byte.writeInt(123);
            byte.position = 0;
            this.socket.writeBytes(byte, 0, byte.bytesAvailable);
            this.socket.flush();
        };
        Socket.prototype.onReceiveMessage = function () {
            var byte = new egret.ByteArray();
            this.socket.readBytes(byte);
            var msg = byte.readUTF();
            var boo = byte.readBoolean();
            var num = byte.readInt();
        };
        Socket.prototype.onSocketOpen = function () {
            alert(222);
        };
        Socket.prototype.onSocketClose = function () {
            alert(333);
        };
        Socket.prototype.onSocketError = function () {
            alert(444);
        };
        return Socket;
    }());
    GX.Socket = Socket;
    __reflect(Socket.prototype, "GX.Socket");
    var WebSocket = (function () {
        function WebSocket() {
        }
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
        WebSocket.connect = function () {
            this.socket.connect("127.0.0.1", 8181);
        };
        WebSocket.tcpSend = function (data) {
            if (data == null)
                return;
            var value = JSON.stringify(data);
            this.socket.send(value);
        };
        WebSocket.socket = new Socket();
        return WebSocket;
    }());
    GX.WebSocket = WebSocket;
    __reflect(WebSocket.prototype, "GX.WebSocket");
})(GX || (GX = {}));
