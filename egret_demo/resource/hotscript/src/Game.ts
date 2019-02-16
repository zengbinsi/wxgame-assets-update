module test {
    export class Game extends eui.UILayer {
        protected createChildren(): void {
            super.createChildren();
            this.left = this.right = this.top = this.bottom = 0;
            this.initIndexUI();
        }
        private initIndexUI() {
            this.removeChildren();
            var bg = new eui.Rect();
            bg.percentWidth = bg.percentHeight = 100;
            bg.fillColor = 0x000000;
            this.addChild(bg);
            var gameName = new eui.Label();
            gameName.top = 150;
            gameName.horizontalCenter = 0;
            gameName.text = "过年猜字";
            gameName.size = 60;
            gameName.textColor = 0xffffff;
            gameName.bold = true;
            this.addChild(gameName);
            var startButton = UIUtils.getButton(0x1694a1, "开始游戏");
            startButton.horizontalCenter = startButton.verticalCenter = 0;
            this.addChild(startButton);
            startButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                this.initGameUI();
            }, this);
        }
        private rightCount: number = 0;
        private questionIndex: number = 0;
        private level: eui.Label;
        private tiled: eui.Group;
        private question: eui.Label;
        private initGameUI() {
            this.removeChildren();
            var backButton = UIUtils.getButton(0x4e94ac, "返回首页");
            this.addChild(backButton);
            backButton.x = backButton.y = 30;
            backButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                this.initIndexUI();
            }, this);
            this.setIdiom();
            var level = new eui.Label();
            level.verticalCenter = -320;
            level.horizontalCenter = 0;
            level.text = "共猜对" + this.rightCount + "道题";
            level.size = 35;
            level.textColor = 0xffffff;
            level.bold = true;
            this.addChild(level);
            this.level = level;
        }
        private setIdiom(): void {
            this.question && this.removeChild(this.question);
            this.tiled && this.removeChild(this.tiled);
            this.questionIndex = Math.floor(Math.random() * Config.questionList.length);
            var question = new eui.Label();
            question.verticalCenter = -240;
            question.horizontalCenter = 0;
            question.text = Config.questionList[this.questionIndex] + "（打一字）";
            question.size = 40;
            question.textColor = 0xffffff;
            question.bold = true;
            this.addChild(question);
            this.question = question;
            var labelList = [];
            labelList.push(Config.answerList[this.questionIndex]);
            labelList.push(Config.answerList[Math.floor(Math.random() * Config.answerList.length)]);
            labelList.push(Config.answerList[Math.floor(Math.random() * Config.answerList.length)]);
            labelList.push(Config.answerList[Math.floor(Math.random() * Config.answerList.length)]);
            labelList.push(Config.answerList[Math.floor(Math.random() * Config.answerList.length)]);
            labelList.push(Config.answerList[Math.floor(Math.random() * Config.answerList.length)]);
            labelList.push(Config.answerList[Math.floor(Math.random() * Config.answerList.length)]);
            labelList.push(Config.answerList[Math.floor(Math.random() * Config.answerList.length)]);
            labelList.push(Config.answerList[Math.floor(Math.random() * Config.answerList.length)]);
            labelList.sort(function (a, b): number { return Math.random() < 0.5 ? -1 : 1; });
            var tiled = UIUtils.getTiled(10, 10);
            tiled.verticalCenter = tiled.horizontalCenter = 0;
            // tiled.width = 70 + 10 + 70 + 10 + 70;
            // tiled.height = 70 + 10 + 70 + 10 + 70;
            this.addChild(tiled);
            this.tiled = tiled;
            for (var i = 0; i < labelList.length; i++) {
                var answerButton = UIUtils.getButton(0xFD9E05, labelList[i], 0xffffff, 100, 100, 60);
                this.tiled.addChild(answerButton);
                answerButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event: egret.TouchEvent) {
                    var message = "";
                    if (event.currentTarget.getChildAt(1)["text"] == Config.answerList[this.questionIndex]) {
                        this.rightCount++;
                        this.level.text = "共猜对" + this.rightCount + "道题";
                        message = "恭喜你，猜对了！";
                    }
                    else {
                        message = "很遗憾，猜错了！";
                    }
                    if (egret.Capabilities.runtimeType != egret.RuntimeType.WXGAME) {
                        alert(message);
                    }
                    else {
                        wx.showModal({ title: "提示", content: message, showCancel: false });
                    }
                    this.setIdiom();
                }, this);
            }
        }
    }
    class Config {
        public static answerList = [
            "亲",
            "库",
            "奉",
            "喜",
            "音",
            "彦",
            "衙",
            "笙",
            "赤",
            "佧",
            "槎",
            "秸",
            "柒",
            "饴",
            "熹",
            "沉",
            "写",
            "受",
            "宁",
            "脆",
            "今",
            "宴",
            "恐",
            "总",
            "京",
            "鼹",
            "京",
            "电",
            "滂",
            "咫",
            "荨",
            "兵",
            "总",
            "熔",
            "织",
            "兑",
            "言",
            "悦",
            "阅",
            "说",
            "根",
            "淞",
            "氦",
            "狮",
            "杂",
            "杂",
            "晨",
            "羌",
            "玛",
            "丘",
            "秉",
            "翠",
            "翠",
            "箫",
            "米",
            "脱",
            "艽",
            "旭",
            "交",
            "郊",
            "兰",
            "期",
            "钟",
            "朕",
            "腔",
            "兴",
            "洲",
            "训",
            "政",
            "翠",
            "谅",
            "谅",
            "谅",
            "棉",
            "棉",
            "酝",
            "浒",
            "香",
            "谟",
            "秽",
            "伺",
            "恬",
            "侏",
            "百",
            "舌",
            "恬",
            "辞",
            "矛",
            "忏",
            "讼",
            "鸨",
            "佬",
            "德",
            "恁",
            "恁",
            "荏",
            "皇",
            "抽",
            "储",
            "金",
            "晦",
            "眠",
            "几",
            "劫",
            "构",
            "穹",
            "穹",
            "河",
            "哉",
            "讲",
            "心",
            "催",
            "恐",
            "莅",
            "棉",
            "宁",
            "楮",
            "阁",
            "蕴",
            "散",
            "举",
            "恪",
            "湖",
            "缆",
            "僮",
            "深",
            "淋",
            "榻",
            "淬",
            "构",
            "黜",
            "苟",
            "始",
            "实",
            "宣",
            "弛",
            "宿",
            "脂",
            "戥",
            "悉",
            "槊",
            "广",
            "湘",
            "麻",
            "刘",
            "忍",
            "瑟",
            "迪",
            "土",
            "埔"
        ];
        public static questionList = [
            "“八一”六十载",
            "“七一”直抵花城",
            "“十一”双方皆怀念",
            "“文昭关”选段",
            "“五一”厂里放影片",
            "“五一”前夕何宽松",
            "“西出阳关无故人”",
            "《人生》上下集",
            "20-2",
            "３＋８",
            "７８．３",
            "阿里山小吃",
            "爱将余热献光明",
            "爱心几度付流水",
            "爱心寄与笔底情",
            "爱友别离又相聚",
            "安敢裙钗换男装",
            "安危抛脑后",
            "安下心来读书",
            "安心度日",
            "安心平凡工作",
            "安心只为翻了身",
            "安阳风光",
            "安阳会子",
            "安阳即景",
            "俺大人不在",
            "岸",
            "八尺龙头",
            "八尺龙须",
            "八达岭",
            "八方归心",
            "八方援助受灾人",
            "八方支援前线",
            "八哥",
            "八哥的传说",
            "八哥偏心",
            "八哥守门",
            "八哥学舌",
            "八卦山之春",
            "八角楼旁水相连",
            "八戒大怒",
            "八戒行者随长老",
            "八九不离十"
        ];
    }
}