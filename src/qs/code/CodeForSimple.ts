/// <reference path="CodeObject.ts"/>
module qs {
    export class CodeForSimple extends CodeObject {
        public identifier: string;
        public begin: CodeObject;
        public finished: CodeObject;
        public step: CodeObject;
        public blockExecutable: Executable;            //for内容
        public variables: any = {};  //变量
        public setContextExecutable(blockExecutable: Executable): void {
            this.blockExecutable = blockExecutable;
        }
    }
}