module how {
	/**
	 * 龙骨动画组件
	 * @author 王锡铜
	 *
	 */
    export class Animator extends eui.Group {
        /**
         * 资源根目录
         */
        public source = "";
        /**
         * 资源组
         */
        public sourceGroup = "";
        /**
         * 数据越小，播放速度越慢
         */
        public static isAdvanceTime: boolean = false;
        private armature: dragonBones.Armature;
        public playOnce: boolean = false;//播放一次
        public autoPlay: boolean = true;//自动播放
        public stopAndVisible: boolean = false;//在停止状态下是否隐藏
        public static EVENT_LOADCOMPLETE: string = "loadComplete";
        private _isLoaded: boolean = false;
        /**
         * 是否加载完成
         */
        public get isLoaded(): boolean {
            return this._isLoaded;
        }
        private okHander: Function;
        private thisObject: any;
        private params: Array<any>;
        public constructor() {
            super();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
        }

        public childrenCreated(): void {
            this.init();
        }
        protected init(index: number = 0): void {
            var dragonbonesData = RES.getRes(this.source + "_ske_json");
            var textureData = RES.getRes(this.source + "_tex_json");
            var texture = RES.getRes(this.source + "_tex_png");
            if (!dragonbonesData || !textureData || !texture) {
                if (!this._isLoaded) {//如果没加载过
                    var loader = new how.ResourceLoader();
                    loader.loadGroups([this.sourceGroup], () => {
                        this.init(index);
                    }, this);
                }
                return;
            }
            if (this.armature) {
                this.armature.display.parent.removeChild(this.armature.display);
            }
            this._isLoaded = true;
            var dragonbonesFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
            dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
            dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));

            var armatureName: string = dragonbonesData.armature[index].name;
            this.armature = dragonbonesFactory.buildArmature(armatureName, this.source);
            var armatureDisplay = this.armature.display;
            this.addChild(armatureDisplay);
            this.armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.onAnimationComplete, this);
            dragonBones.WorldClock.clock.add(this.armature);
            this.visible = !this.stopAndVisible;
            if (this.autoPlay) {
                this.play();
            }
            if (!Animator.isAdvanceTime) {
                egret.Ticker.getInstance().register(Animator.onTicker, this);
                Animator.isAdvanceTime = true;
            }
            this.dispatchEventWith(Animator.EVENT_LOADCOMPLETE);
        }
        private static onTicker(frameTime: number) {
            dragonBones.WorldClock.clock.advanceTime(frameTime / 1000);
        }
        private onRemovedFromStage() {
            this.stop();
            if (this.armature) {
                this.armature.dispose();
                dragonBones.WorldClock.clock.remove(this.armature);
                this.armature.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.onAnimationComplete, this);
                if (this.armature.display && this.armature.display.parent) {
                    this.armature.display.parent.removeChild(this.armature.display);
                }
            }
            this.armature = null;
            this.okHander = null;
            this.thisObject = null;
            this.params = null;
        }
        private onAnimationComplete(event: dragonBones.AnimationEvent): void {
            this.visible = !this.stopAndVisible;
            this.dispatchEvent(event);
            if (this.okHander) {
                this.okHander.apply(this.thisObject, this.params);
            }
        }

        public play(loopNum: number = 1): void {
            if (!this.armature) {
                return;
            }
            this.visible = true;
            if (this.playOnce) {
                this.armature.animation.play(null, 1);
            } else {
                this.armature.animation.play(null, 0);
            }
        }
        public getAnimationName(): string {
            return this.armature.animation.lastAnimationName;
        }
        public playByName(animationName?: string | null, playTimes?: number): void {
            this.armature.animation.play(animationName, playTimes);
        }

        public playWithSource(source: string, index: number = 0): void {
            this.source = source;
            this.init(index);
            this.play();
        }

        public stop(): void {
            if (this.armature && this.armature.animation) {
                this.armature.animation.stop();
                this.visible = !this.stopAndVisible;
            }
        }
        /**
         * 添加完成回调函数
         */
        public addHander(okHander: Function, thisObject: any, params?: Array<any>): void {
            this.okHander = okHander;
            this.thisObject = thisObject;
            this.params = params;
        }
    }
}
window["how"] = window["how"] || {};
window["how"]["Animator"] = how.Animator;