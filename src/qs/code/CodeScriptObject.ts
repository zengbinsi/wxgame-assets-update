/// <reference path="CodeObject.ts"/>
module qs {
    export class CodeScriptObject extends CodeObject {
        public readonly value: any;
        public constructor(value: any, token: Token = null) {
            super(token);
            this.value = value;
        }
    }
}