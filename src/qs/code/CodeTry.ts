/// <reference path="CodeObject.ts"/>
module qs {
    export class CodeTry extends CodeObject {
        public tryExecutable: Executable;//try指令执行
        public catchExecutable: Executable;//catch指令执行
        public identifier: string;                   //异常对象
    }
}