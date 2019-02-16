module qs {
    export class TempCondition {
        public allow: CodeObject;                        //判断条件
        public executable: Executable;             //指令列表
        public constructor(allow: CodeObject, executable: Executable) {
            this.allow = allow;
            this.executable = executable;
        }
    }
}