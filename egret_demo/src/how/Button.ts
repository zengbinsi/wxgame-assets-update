module how {
	/**
	 * 所有按钮的基类
	 * 带按下缩放功能，按下声音功能，按下改变颜色功能（后面2个功能暂未加入）
	 * @author 袁浩
	 *
	 */
    export class Button extends eui.Button {
        private static _mask: eui.Rect;
        public isNeedMask: boolean = true;
        public scaleDuration: number = 100;
        public darkDuration: number = 0;
        public scaleWhenDown: number = 1;
        public darkWhenDown: number = 0.7;
        public soundPath: string = "assets/button.mp3";
        private _visible: boolean = false;
        public constructor() {
            super();
        }
        private _dark: number = 1;
        public set dark(value: number) {
            this._dark = value;
            how.DisplayUtils.dark(this, value);
        }
        public get dark(): number {
            return this._dark;
        }
        public childrenCreated() {
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOutSide, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        }
        protected onTouchBegin(e: egret.TouchEvent): void {
            this.scaleX = this.scaleWhenDown;
            this.scaleY = this.scaleWhenDown;
            if (this.darkDuration) {
                egret.Tween.get(this).to({ dark: this.darkWhenDown }, this.darkDuration);
            }
            else {
                this.dark = this.darkWhenDown;
            }
        }
        private onTouchEnd(e: egret.TouchEvent): void {
            this.scaleX = 1;
            this.scaleY = 1;
            if (this.darkDuration) {
                egret.Tween.get(this).to({ dark: 1 }, this.darkDuration);
            }
            else {
                this.dark = 1;
            }
        }

        private onTouchOutSide(e: egret.TouchEvent): void {
            this.onTouchEnd(null);
        }
        private currentTouchEnabled: boolean;
        private onTouchTab(e: egret.TouchEvent): void {
            if (RES.hasRes(this.soundPath) || egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
                SoundManager.playEffect(this.soundPath);
            }
            this.currentTouchEnabled = this.touchEnabled;
            this.touchEnabled = false;
            var timer = egret.setTimeout(function () {
                this.touchEnabled = this.currentTouchEnabled;
                egret.clearTimeout(timer);
            }, this, 200);

        }
    }
}
window["how"] = window["how"] || {};
window["how"]["Button"] = how.Button;