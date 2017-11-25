var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GX;
(function (GX) {
    /**
     * 可记录调用"this"的函数代理
     */
    var SinglecastEvent = (function () {
        function SinglecastEvent(action, self) {
            this.action = action;
            this.self = self;
        }
        SinglecastEvent.prototype.call = function () {
            var argArray = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argArray[_i] = arguments[_i];
            }
            return this.apply(argArray);
        };
        SinglecastEvent.prototype.apply = function (argArray) {
            if (this.action == null)
                return;
            return this.action.apply(this.self, argArray);
        };
        return SinglecastEvent;
    }());
    GX.SinglecastEvent = SinglecastEvent;
    __reflect(SinglecastEvent.prototype, "GX.SinglecastEvent");
    /**
     * 记录所有的挂载事件
     */
    var Event = (function () {
        function Event() {
        }
        Event.prototype.add = function (multicase) {
            if (this.eventList == null)
                this.eventList = [];
            this.eventList.push(multicase);
        };
        Event.prototype.removeAll = function () {
            for (var _i = 0, _a = this.eventList; _i < _a.length; _i++) {
                var item = _a[_i];
                item.removeAll();
            }
            this.eventList.clear();
        };
        return Event;
    }());
    GX.Event = Event;
    __reflect(Event.prototype, "GX.Event");
    /**
     * 多播事件
     */
    var MulticastEvent = (function () {
        function MulticastEvent() {
            MulticastEvent.EventList.add(this);
        }
        MulticastEvent.prototype.call = function () {
            var argArray = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argArray[_i] = arguments[_i];
            }
            return this.apply(argArray);
        };
        MulticastEvent.prototype.apply = function (argArray) {
            var len = this.length;
            if (len == 0)
                return;
            // 单播情况的优化
            if (len == 1) {
                var f = this.list[0];
                f.apply(argArray);
                return;
            }
            // 多播调用时必须拷贝一份，避免调用过程中容器修改
            for (var _i = 0, _a = this.list.clone(); _i < _a.length; _i++) {
                var f = _a[_i];
                f.apply(argArray);
            }
        };
        /**
         * 挂载事件回调
         * @param action
         * @return 返回挂载的事件回调函数本身，方便lambda挂载结果记录以供移除
         */
        MulticastEvent.prototype.add = function (action, thisArg) {
            if (action == null)
                return action;
            if (this.list == null)
                this.list = [];
            this.list.push(new SinglecastEvent(action, thisArg));
            return action;
        };
        /**
         * 卸载事件回调
         * @param action
         * @return 卸载成功，false表示该事件中并不包含给定的回调
         */
        MulticastEvent.prototype.remove = function (action) {
            if (typeof action !== "function" || this.list == null)
                return false;
            return this.list.removeFirst(function (i) { return i.action == action; });
        };
        /**
         * 卸载所有以指定对象作为调用this的回调函数
         */
        MulticastEvent.prototype.removeOn = function (thisArg) {
            if (this.list == null)
                return 0;
            return this.list.removeAll(function (i) { return i.self == thisArg; });
        };
        /**
         * 卸载所有挂载的事件
         */
        MulticastEvent.prototype.removeAll = function () {
            this.list = null;
        };
        Object.defineProperty(MulticastEvent.prototype, "length", {
            /**
             * 得到事件中包含的回调数目
             */
            get: function () {
                if (this.list == null)
                    return 0;
                return this.list.length;
            },
            enumerable: true,
            configurable: true
        });
        MulticastEvent.EventList = new Event();
        return MulticastEvent;
    }());
    GX.MulticastEvent = MulticastEvent;
    __reflect(MulticastEvent.prototype, "GX.MulticastEvent");
})(GX || (GX = {}));
