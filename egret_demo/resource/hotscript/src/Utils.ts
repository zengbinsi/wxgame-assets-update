module test {
    export class View extends eui.Component {
        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onStart, this);
        }
        protected onStart(): void {
        }
    }
    export class Panel extends View {
        public data: any;
        public strech(): void {
            this.left = this.right = this.top = this.bottom = 0;
        }
        /**
         * 播放标题缓动
         * @param panel 面板
         */
        protected playTitleTween(panel) {
            panel.title_0.scaleX = panel.title_0.scaleY =
                panel.title_1.scaleX = panel.title_1.scaleY =
                panel.title_2.scaleX = panel.title_2.scaleY =
                panel.title_3.scaleX = panel.title_3.scaleY =
                0;
            egret.Tween.get(panel.title_0).to({ scaleX: 1, scaleY: 1 }, 200);
            egret.Tween.get(panel.title_1).wait(100).to({ scaleX: 1, scaleY: 1 }, 200);
            egret.Tween.get(panel.title_2).wait(200).to({ scaleX: 1, scaleY: 1 }, 200);
            egret.Tween.get(panel.title_3).wait(300).to({ scaleX: 1, scaleY: 1 }, 200);
        }
    }
    export class Utils {
        public static onOpenGameResult = null;
        public static lastOpenGameTime = null;
        /**
         * 当有面板被创建时
         */
        public static onPanelCreated(panel) { };
        /**
         * 当有面板被移除时
         */
        public static onPanelRemoved(panel) { };
        /**
         * 发送http消息
         */
        public static send(path, data, onComplete, thisObj, method?, isJson?) {
            isJson = isJson == null ? true : isJson;
            data = data || {};
            data.gameType = Main.gameType;
            method = method || egret.HttpMethod.GET;
            var request = new egret.HttpRequest();
            var dataStr = "";
            for (var key in data) {
                dataStr += encodeURI(key) + "=" + encodeURI(data[key]) + "&";
            }
            var newURL = method == egret.HttpMethod.GET ? path + "?" + dataStr : path;
            request.open(newURL, method);
            request.withCredentials = false;
            request.addEventListener(egret.Event.COMPLETE, function (event) {
                onComplete.call(this, !isJson ? event.currentTarget.response : JSON.parse(event.currentTarget.response));
            }, thisObj);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
                console.log("网络请求失败：" + path);
            }, this);
            request.send(data);
            console.log("发送http请求：" + path);
        }
        /**
         * 当前场景
         */
        public static currentScene = null;
        /**
         * 打开游戏
         */
        public static openGame(appId, gameUrl, onOpenGameResult) {
            if (egret.Capabilities.runtimeType != egret.RuntimeType.WXGAME) {
                onOpenGameResult && onOpenGameResult(true);
            }
            else {
                Utils.callWX("navigateToMiniProgram", { appId: appId, path: gameUrl });
                this.onOpenGameResult = onOpenGameResult;
                this.lastOpenGameTime = Date.now();
            }
        }
        /**
         * 关闭互推窗口时请调用这个方法
         */
        public static clearOpenGame() {
            this.onOpenGameResult = null;
        }
        /**
         * 执行微信方法，如callWX("shareAppMessage",object)
         * @funcName 方法名
         * @data 参数
         */
        public static callWX(funcName, data?) {
            if (wx) {
                return wx[funcName].call(wx, data);
            }
        }
        /**
         * 添加一个场景，会自动移除上一个场景
         * @skinName 场景皮肤名称
         * @onCreated 当场景创建完成
         */
        public static addScene(skinName, SceneClass) {
            if (Utils.currentScene) {
                Main.app.removeChild(Utils.currentScene);
                Utils.currentScene = null;
            }
            var scene = new SceneClass();
            scene.skinName = skinName;
            scene.left = scene.right = scene.top = scene.bottom = 0;
            Main.app.addChild(scene);
            Utils.currentScene = scene;
            return scene;
        }
        /**
         * 最后打开的面板
         */
        public static lastPanel = null;
        public static panelCount = 0;
        /**
         * 添加一个面板
         * @skinName 面板皮肤名称
         * @onCreated 当面板创建完成
         */
        public static addPanel(PanelClass, skinName, data?) {
            Utils.panelCount++;
            data = data || {};
            var group = new eui.Group();
            group.left = group.right = group.top = group.bottom = 0;
            var bg = new eui.Rect();
            bg.alpha = 0.8;
            bg.left = bg.right = bg.top = bg.bottom = 0;
            group.addChild(bg);
            var panel = new PanelClass();
            panel.skinName = skinName;
            panel.data = data;
            panel.addEventListener(eui.UIEvent.CREATION_COMPLETE, function () {
                Utils.onPanelCreated(panel);
            }, panel);
            group.addChild(panel);
            Main.app.addChild(group);
            Utils.lastPanel = panel;
            return panel;
        }
        /**
         * 移除面板
         * @panel 面板对象
         */
        public static removePanel(panel?) {
            panel = panel || Utils.lastPanel;
            if (Utils.lastPanel == panel) {
                Utils.lastPanel = null;
            }
            if (panel.parent) {
                Utils.panelCount--;
            }
            panel.parent && Main.app.removeChild(panel.parent);
            Utils.onPanelRemoved(panel);
        }
    }
}