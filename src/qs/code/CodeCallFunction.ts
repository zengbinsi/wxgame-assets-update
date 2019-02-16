/// <reference path="CodeObject.ts"/>
module qs {
    /**
     * 函数调用
     */
    export class CodeCallFunction extends CodeObject {
        public isNew: boolean = false;
        public member: CodeObject | Function;
        public parameters: CodeObject[];
    }
}