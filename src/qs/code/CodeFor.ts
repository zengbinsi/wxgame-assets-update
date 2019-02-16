/// <reference path="CodeObject.ts"/>
module qs {
    export class CodeFor extends CodeObject {
        public beginExecutable: Executable;            //开始执行
        public condition: CodeObject;                        //跳出条件
        public loopExecutable: Executable;             //循环执行
        public blockExecutable: Executable;            //for内容
        public setContextExecutable(blockExecutable: Executable): void {
            this.blockExecutable = blockExecutable;
        }
    }
}