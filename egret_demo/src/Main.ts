class Main extends eui.UILayer {
    /**
     * 非热更新代码的版本号-微信的配置在version.js文件里面
     */
    public static nativeVersion = 0;
    /**
     * 这个变量留给脚本中调用的
     */
    public static app: Main = null;
    protected createChildren(): void {
        super.createChildren();
        Main.app = this;
        this.checkCode();
    }
    /**
     * 检查代码使用本地的还是热更新的
     */
    private checkCode() {
        var version = 0;//服务器发来的版本号
        if (Main.nativeVersion > version) {//如果本地版本比服务器高则用本地代码
            this.addChild(new Game());
        }
        else {
            this.queryCode();
        }
    }
    /**
     * 请求热更新代码
     */
    private queryCode() {
        if (egret.Capabilities.runtimeType != egret.RuntimeType.WXGAME) {//如果不是微信环境，比如调试时则请求resoutce/hotsript下面的代码
            this.getCode();
        }
        else {//如果是微信的环境
            //从服务器请求代码，这里自己实现
        }
    }
    private tsList = [
        "UIUtils.ts",
        "Start.ts",
        "Switch.ts",
        "Utils.ts",
        "Game.ts"
    ];
    private code = "";
    private getCode(): void {
        var request: egret.HttpRequest = new egret.HttpRequest();
        request.open("resource/hotscript/src/" + this.tsList.shift());
        request.withCredentials = false;
        request.addEventListener(egret.Event.COMPLETE, () => {
            var code = request.response;
            this.code += code;
            if (this.tsList.length == 0) {
                this.runScript(this.code);
            }
            else {
                this.getCode();
            }
        }, this);
        request.send();
    }
    private runScript(code: string): void {
        qs.run(code, "test.Start", window);//this.code是一大串包含代码的字符串
        //以下是更为简单的例子
        // qs.run(`
        //     class Start{
        //         public constructor() {
        //             console.log('你好，世界！');
        //         }
        //     }
        // `, 'Start');
    }
}
