module test {
    export class Start {
        public constructor() {
            if (egret.Capabilities.runtimeType != egret.RuntimeType.WXGAME) {
                this.loadRES("resource/", this.start);//非微信平台直接加载资源
            }
            else {
                this.loadZIP();
            }
        }
        public start() {
            Main.app.removeChildren();
            Main.app.addChild(new Game());
        }
        public loadRES(root, cb) {
            egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
            egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter(root));
            var isComplete = false;
            RES.loadConfig("default.res.json", root).then(function () {
                RES.loadGroup("preload").then(function () {
                    var theme = new eui.Theme(root + "default.thm.json");
                    theme.addEventListener(egret.Event.COMPLETE, function () {
                        if (!isComplete) {
                            cb();
                        }
                        isComplete = true;
                    }, this);
                });
            });
        }
        public loadZIP() {
            var self = this;
            var root = wx.env.USER_DATA_PATH + "/resource/";
            var fileManager = Utils.callWX("getFileSystemManager");
            try {
                var oldZipVersion = egret.localStorage.getItem("zipVersion")
                if (oldZipVersion == Switch.zipVersion) {
                    fileManager.accessSync(wx.env.USER_DATA_PATH + "/resource/");//判断文件是否存在
                    self.loadRES(root, self.start);//启动主函数
                }
                else {
                    throw ("");
                }
            }
            catch (error) {
                try {
                    fileManager.rmdirSync(wx.env.USER_DATA_PATH + "/resource/");//删除老的
                }
                catch (error) {
                }
                self.showLoading();
                var task = Utils.callWX("downloadFile", {
                    url: Switch.zipPath,
                    success: function (res) {
                        if (res.statusCode == 200) {
                            var filePath = res.tempFilePath; // 下载路径
                            fileManager.unzip({//解压缩zip文件
                                zipFilePath: filePath,
                                targetPath: root,
                                success: function () {
                                    self.setLoadMessage("正在解压缩资源");
                                    egret.localStorage.setItem("zipVersion", Switch.zipVersion);//更新资源版本
                                    self.loadRES(root, self.start);//启动主函数
                                },
                                fail: function (res) {
                                    self.onLoadError("解压缩失败");
                                }
                            });
                        }
                        else {
                            self.onLoadError("资源下载失败，请检测网络后重试");
                        }
                    },
                    fail: function () {
                        self.onLoadError("资源下载失败，请检测网络后重试");
                    }
                });
                task.onProgressUpdate(function (res) {
                    self.setLoadMessage(res.progress + "%");
                });
            }
        }
        public showLoading() {//显示加载界面
            var bg = new egret.Shape();
            bg.graphics.beginFill(0xffffff, 1);
            bg.graphics.drawRect(0, 0, Main.app.stage.stageWidth, Main.app.stage.stageHeight);
            bg.graphics.endFill();
            Main.app.addChild(bg);
            var group = new egret.DisplayObjectContainer();
            Main.app.addChild(group);
            var icon = new egret.Bitmap();
            group.addChild(icon);
            Main.app["icon"] = icon;
            var imageLoader = new egret.ImageLoader();
            imageLoader.addEventListener(egret.Event.COMPLETE, function () {
                var texture = new egret.Texture();
                texture._setBitmapData(imageLoader.data);
                icon.texture = texture;
                this.layoutLoad();
            }, this);
            imageLoader.load(Switch.assetsServer + "icon.png");
            var nameText = new egret.TextField();
            nameText.textColor = 0x000000;
            nameText.text = Switch.gameName;
            nameText.width = Main.app.stage.stageWidth;
            nameText.height = nameText.size = 30;
            nameText.textAlign = egret.HorizontalAlign.CENTER;
            nameText.bold = true;
            group.addChild(nameText);
            Main.app["nameText"] = nameText;
            var progress = new egret.TextField();
            progress.textColor = 0x666666;
            progress.text = "请求资源中...";
            progress.width = Main.app.stage.stageWidth;
            progress.height = progress.size = 24;
            progress.textAlign = egret.HorizontalAlign.CENTER;
            Main.app["progress"] = progress;
            group.addChild(progress);
            Main.app["group"] = group;
            this.layoutLoad();
        }
        public layoutLoad() {
            var app = Main.app;
            var group = app["group"];
            var icon = app["icon"];
            var nameText = app["nameText"];
            var progress = app["progress"];
            icon.x = group.width / 2 - icon.width / 2;
            nameText.x = group.width / 2 - nameText.width / 2;
            progress.x = group.width / 2 - progress.width / 2;
            nameText.y = icon.height + 20;
            progress.y = nameText.y + nameText.height + 40;
            group.x = app.stage.stageWidth / 2 - group.width / 2;
            group.y = app.stage.stageHeight / 2 - group.height - 2;
        }
        public setLoadMessage(msg) {
            Main.app["progress"].text = msg;
        }
        public onLoadError(msg) {
            Utils.callWX("showModal", {
                title: "提示", content: msg, showCancel: false, success: function () {
                    Utils.callWX("exitMiniProgram");
                }
            });
        }
    }
}