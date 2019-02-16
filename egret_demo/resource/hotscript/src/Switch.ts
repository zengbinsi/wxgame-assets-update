module test {
    export class Switch {
        public static gameName = "测试游戏";
        public static assetsServer = "https://www.xxx.com/hot/test/";//资源服务器根目录
        public static zipVersion = "0";//资源版本
        public static zipPath = Switch.assetsServer + "resource_" + Switch.zipVersion + ".zip";//资源包路径
    }
}