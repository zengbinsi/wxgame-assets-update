module qs {
    export class TempCase {
        public allow: any[];                  //判断条件
        public executable: Executable;         //指令列表
        public constructor(allow: any[], executable: Executable) {
            this.allow = allow;
            this.executable = executable;
        }
    }
}