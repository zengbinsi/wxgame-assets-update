module how {
    /**
     * 声音管理器
     * 必须要预加载所有声音文件
     */
    export class SoundManager {
        private static root: string = "";
        private static music: egret.SoundChannel;
        // private static effectList: egret.SoundChannel[] = [];
        private static _musicVolume: number = 1;
        public static get musicVolume(): number {
            return this._musicVolume;
        }
        private static currentMusicSource: string;
        public static set musicVolume(value: number) {
            this._musicVolume = value;
            if (this.music) {
                this.music.volume = value;
            }
        }
        private static _effectVolume: number = 1;
        public static get effectVolume(): number {
            return this._effectVolume;
        }
        public static set effectVolume(value: number) {
            this._effectVolume = value;
            // for (var i: number = 0; i < this.effectList.length; i++) {
            //     this.effectList[i].volume = value;
            // }
        }
        private static musicPostion: number;
        private static musicSource: string;
        private static musicLoop: boolean;
        private static isInited: boolean;
        private static audio: InnerAudioContext;
        public static init(stage: egret.Stage, root: string): void {
            this.root = root;
            if (!this.isInited) {
                this.isInited = true;
                stage.addEventListener(egret.Event.DEACTIVATE, this.onAppPause, this);
                stage.addEventListener(egret.Event.ACTIVATE, this.onAppResume, this);
                if (window["wx"] && wx.createInnerAudioContext) {
                    var audio = wx.createInnerAudioContext();
                    audio.loop = true;
                    audio.obeyMuteSwitch = true;
                    this.audio = audio;
                    return;
                }
            }
        }
        private static onAppPause(): void {
            if (egret.Capabilities.isMobile && !this.audio) {
                if (this.music) {
                    this.musicPostion = this.music.position;
                    this.music.stop();
                    this.music = null;
                }
                // this.stopAllEffects();
            }
        }
        private static onAppResume(): void {
            if (egret.Capabilities.isMobile && !this.audio) {
                if (this.musicSource) {
                    this.playMusic(this.musicSource, this.musicLoop, this.musicPostion);
                }
            }
            else if (this.audio) {
                console.log("继续播放声音:" + this.audio.src);
                this.audio.play();
            }
        }
        /**
         * 播放音乐，建议用mp3格式
         * @param source 相对于resource的音乐资源路径
         * @param loop 是否循环播放
         */
        public static playMusic(source: string, loop: boolean = true, startTime: number = 0): void {
            if (this.currentMusicSource == this.root + source) {
                return;
            }
            if (this.audio) {
                this.audio.src = this.root + source;
                this.audio.play();
                console.log(this.root + source);
                return;
            }
            this.currentMusicSource = this.root + source;
            if (this.music) {
                this.music.stop();
            }
            this.musicSource = this.root + source;
            this.musicLoop = loop;
            var sound: egret.Sound = RES.getRes(this.root + source);
            if (sound) {
                sound.type = egret.Sound.MUSIC;
                this.music = sound.play(startTime, loop ? 0 : 1);
                this.music.volume = this._musicVolume;
                this.music.once(egret.Event.SOUND_COMPLETE, (event: Event): void => {
                    this.music = null;
                }, this);
            }
            else {
                RES.getResAsync(this.root + source, (data, key) => {
                    if (data) {
                        data.type = egret.Sound.MUSIC;
                        if (this.music) {
                            this.music.stop();
                        }
                        this.music = data.play();
                        this.music.volume = this.musicVolume;
                    }
                    else {
                        sound = new egret.Sound();
                        sound.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
                            var s: egret.Sound = <egret.Sound>event.target;
                            s.type = egret.Sound.MUSIC;
                            if (this.music) {
                                this.music.stop();
                            }
                            this.music = s.play();
                            this.music.volume = this.musicVolume;
                        }, this);
                        sound.load(this.root + source);
                    }
                }, this);
            }
        }
        /**
         * 停止播放音乐
         */
        public static stopMusic(): void {
            if (this.audio) {
                this.audio.stop();
                return;
            }
            this.musicSource = null;
            this.music.stop();
            this.music = null;
        }
        /**
         * 播放音效，建议用mp3格式
         * @param source 相对于resource的音效资源路径
         * @param loop 是否循环播放
         */
        public static playEffect(source: string, loop: boolean = false): void {
            if (egret.Capabilities.runtimeType != egret.RuntimeType.WXGAME) {
                return;
            }
            if (!this.effectVolume) {
                return;
            }
            if (window["wx"] && wx.createInnerAudioContext) {
                var audio = wx.createInnerAudioContext();
                audio.autoplay = true;
                audio.loop = false;
                audio.src = this.root + source;
                return;
            }
            var sound: egret.Sound = RES.getRes(this.root + source);
            if (sound) {
                sound.type = egret.Sound.EFFECT;
                var effect: egret.SoundChannel = sound.play(0, loop ? 0 : 1);
                effect.volume = this._effectVolume;
                // this.effectList.push(effect);
                // effect.once(egret.Event.SOUND_COMPLETE, (event: Event): void => {
                //     var index = this.effectList.indexOf(effect);
                //     if (index != -1) {
                //         this.effectList.splice(index, 1);
                //     }
                // }, this);
            }
            else {
                RES.getResAsync(this.root + source, (data, key) => {
                    if (data) {
                        data.type = egret.Sound.EFFECT;
                        var effect: egret.SoundChannel = data.play(0, loop ? 0 : 1);
                        effect.volume = this._effectVolume;
                        // this.effectList.push(effect);
                        // effect.once(egret.Event.SOUND_COMPLETE, (event: Event): void => {
                        //     var index = this.effectList.indexOf(effect);
                        //     if (index != -1) {
                        //         this.effectList.splice(index, 1);
                        //     }
                        // }, this);
                    }
                }, this);
            }
        }
        /**
         * 停止播放所有音效
         */
        // public static stopAllEffects(): void {
        //     while (this.effectList.length) {
        //         this.effectList.shift().stop();
        //     }
        // }
    }
}