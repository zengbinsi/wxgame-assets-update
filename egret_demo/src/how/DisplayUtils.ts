module how {
	/**
	 * 显示对象工具类
	 * @author 袁浩
	 *
	 */
    export class DisplayUtils {
        public constructor() {
        }
        /**
         * 获取扇形
         */
        public static getSector(r: number = 100, startFrom: number = 0, angle: number = 360, color: number = 0xff0000): egret.Shape {
            var shape: egret.Shape = new egret.Shape();
            var x: number = 0;
            var y: number = 0;
            shape.graphics.beginFill(color);
            //shape.graphics.lineStyle(0, 0xff0000);
            startFrom = startFrom * Math.PI / 180;
            var isClockwise: boolean = true;//是否顺时针
            if (angle < 0) {
                isClockwise = false;
            }
            shape.graphics.drawArc(x, y, r, startFrom, startFrom + angle * Math.PI / 180, !isClockwise);
            shape.graphics.lineTo(x, y);
            shape.graphics.lineTo(x + r * Math.cos(startFrom), y + r * Math.sin(startFrom));
            //            shape.graphics.moveTo(x,y);
            //            angle = (Math.abs(angle) > 360) ? 360 : angle;
            //            var n: number = Math.ceil(Math.abs(angle) / 45);
            //            var angleA: number = angle / n;
            //            angleA = angleA * Math.PI / 180;
            //            startFrom = startFrom * Math.PI / 180;
            //            shape.graphics.lineTo(x + r * Math.cos(startFrom),y + r * Math.sin(startFrom));
            //            for(var i = 1;i <= n;i++) {
            //                startFrom += angleA;
            //                var angleMid = startFrom - angleA / 2;
            //                var bx = x + r / Math.cos(angleA / 2) * Math.cos(angleMid);
            //                var by = y + r / Math.cos(angleA / 2) * Math.sin(angleMid);
            //                var cx = x + r * Math.cos(startFrom);
            //                var cy = y + r * Math.sin(startFrom);
            //                shape.graphics.curveTo(bx,by,cx,cy);
            //            }
            //            if(angle != 360) {
            //                shape.graphics.lineTo(x,y);
            //            }
            shape.graphics.endFill();
            return shape;
        }
        /**
         * 获取矩形
         */
        public static getRect(width: number, height: number, alpha: number = 1, color: number = 0xff0000): egret.Shape {
            var shape: egret.Shape = new egret.Shape();
            shape.graphics.beginFill(color, alpha);
            shape.graphics.drawRect(0, 0, width, height);
            shape.graphics.endFill();
            return shape;
        }

        private static _poolDisplay: any = {};
        /*
         * 获取池对象
         * */
        public static getPoolDisplayObject(displayClass: any): egret.DisplayObject {
            var displayObj: egret.DisplayObject = null;
            var arr: any[] = [];
            var className: string = egret.getQualifiedClassName(displayClass);
            if (this._poolDisplay[className]) {
                arr = this._poolDisplay[className];
            }

            if (arr.length > 0) {
                displayObj = arr.pop();
            }
            else {
                displayObj = new displayClass();
            }

            return displayObj;
        }
        /*
         * 回收池对象
         * */
        public static recyclePoolDisplayObject(displayObj: egret.DisplayObject): void {
            //重置显示对象基本参数
            if (displayObj.parent) {
                displayObj.parent.removeChild(displayObj);
            }
            displayObj.alpha = 1;
            displayObj.visible = true;
            displayObj.scaleX = displayObj.scaleY = 1;
            displayObj.mask = null;
            displayObj.x = displayObj.y = 0;

            var arr: any[] = [];
            var className: string = egret.getQualifiedClassName(displayObj);
            if (this._poolDisplay[className]) {
                arr = this._poolDisplay[className];
            }
            else {
                this._poolDisplay[className] = arr;
            }
            arr.push(displayObj);
        }
        //清除回收池对象
        public static clearAllPoolDisplayObject(): void {
            for (var key in this._poolDisplay) {
                var arr: egret.DisplayObject[] = this._poolDisplay[key];
                while (arr.length > 0) {
                    var tmp: egret.DisplayObject = arr.pop();
                    tmp = null;
                }
            }
            this._poolDisplay = {};
        }
        //恢复灰化图片
        public static restoreEuiImage(argImage: eui.Image): void {
            if (this._darkGroup && this._darkGroup[argImage.hashCode]) {
                this.clearDarkImage(this._darkGroup[argImage.hashCode]);
            }
        }

        private static _darkGroup: any;
        //图片灰化
        public static darkEuiImage(argImage: eui.Image): void {
            if (!this._darkGroup) {
                this._darkGroup = {};
            }

            var group: eui.Group;
            var img: eui.Image;
            if (!this._darkGroup[argImage.hashCode]) {
                group = new eui.Group();
                this._darkGroup[argImage.hashCode] = group;
                img = new eui.Image();
                img.source = argImage.source;
                var rect: eui.Rect = new eui.Rect();
                rect.top = 0;
                rect.bottom = 0;
                rect.right = 0;
                rect.left = 0;
                rect.fillColor = 0x0;
                rect.fillAlpha = 0.3;
                group.addChild(img);
                group.addChild(rect);
                group.mask = img;

                if (!argImage.parent.contains(group)) {
                    argImage.parent.addChild(group);
                    group.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveGroup, this);
                }
            }
            else {
                group = this._darkGroup[argImage.hashCode];
                img = <eui.Image>group.getChildAt(0);
                img.source = argImage.source;
            }
        }

        private static onRemoveGroup(event: egret.Event): void {
            var group: eui.Group = event.currentTarget;
            this.clearDarkImage(group);
        }

        private static clearDarkImage(group: eui.Group): void {
            for (var key in this._darkGroup) {
                if (this._darkGroup[key] == group) {
                    this._darkGroup[key] = null;
                    delete this._darkGroup[key];
                    break;
                }
            }

            group.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveGroup, this);
            if (group.parent) {
                group.parent.removeChild(group);
                group.mask = null;
            }
        }
        public static gray(img: egret.DisplayObject): void {
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            img.filters = [colorFlilter];
        }
        public static dark(img: egret.DisplayObject, light: number = 0.3): void {
            var colorMatrix = [
                light, 0, 0, 0, 0,
                0, light, 0, 0, 0,
                0, 0, light, 0, 0,
                0, 0, 0, 1, 0,
                0, 0, 0, 0, 1
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            img.filters = [colorFlilter];
        }
        /**
        * 振动对象
        */
        public static vibration(display: egret.DisplayObject): void {
            display.removeEventListener(egret.Event.ENTER_FRAME, this.onSceneEnterFrame, this);
            display["i"] = 0;
            display.addEventListener(egret.Event.ENTER_FRAME, this.onSceneEnterFrame, this);
            display.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisplayRemoved, this);
        }
        private static vibrationArrayY: Array<number> = [-1, 1, 2, -2, -3, 3, 2, -2, 0];
        private static vibrationArrayX: Array<number> = [-1, 1, 2, -2, -3, 3, 2, -2, 0];
        private static onDisplayRemoved(event: egret.Event) {
            var display = event.currentTarget as egret.DisplayObject;
            display.removeEventListener(egret.Event.ENTER_FRAME, this.onSceneEnterFrame, this);
            display.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisplayRemoved, this);
        }
        private static onSceneEnterFrame(event: egret.Event) {
            var display = event.currentTarget as egret.DisplayObject;
            if (display["i"] < this.vibrationArrayY.length) {
                display.y += this.vibrationArrayY[display["i"]];
                display.x += this.vibrationArrayX[display["i"]];
            }
            else {
                display.removeEventListener(egret.Event.ENTER_FRAME, this.onSceneEnterFrame, this);
                display.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisplayRemoved, this);
                display["i"] = 0;
            }
            display["i"]++;
        }
        /**
         * 从canvas中创建一张位图
         */
        public static createDisplayObject(width: number, height: number, canvas: HTMLCanvasElement): egret.Bitmap {
            const bitmapdata = new egret.BitmapData(canvas);
            bitmapdata.$deleteSource = false;
            const texture = new egret.Texture();
            texture._setBitmapData(bitmapdata);
            const bitmap = new egret.Bitmap(texture);
            bitmap.width = width;
            bitmap.height = height;
            return bitmap;
        }
    }
}
