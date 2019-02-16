/// <reference path="CodeObject.ts"/>
module qs {
    export class CodeModule extends CodeObject {
        /**
         * 父成员
         */
        public parent: CodeModule;
        /**
         * 模块名
         */
        public value: string;
    }
}