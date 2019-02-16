class ThemeAdapter implements eui.IThemeAdapter {
    private root: string;
    public constructor(root: string = "") {
        this.root = root;
    }
    public getTheme(url: string, onSuccess: Function, onError: Function, thisObject: any): void {
        function onResGet(e: string): void {
            onSuccess.call(thisObject, e);
        }
        function onResError(e: RES.ResourceEvent): void {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(() => {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl(this.root + "gameEui.json", (data, url) => {
                window["JSONParseClass"]["setData"](data);
                onResGet(data);
                egret.callLater(() => {
                    onSuccess.call(thisObject, generateEUI2);
                }, this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    }
}
declare var generateEUI: { paths: string[], skins: any }
declare var generateEUI2: { paths: string[], skins: any }
class AssetAdapter implements eui.IAssetAdapter {
    public getAsset(source: string, compFunc: Function, thisObject: any): void {
        function onGetRes(data: any): void {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    }
}