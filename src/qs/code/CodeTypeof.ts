/// <reference path="CodeObject.ts"/>
module qs {
    export class CodeTypeof extends CodeObject {
        public readonly value: CodeObject;
        public constructor(value: CodeObject, token: Token = null) {
            super(token);
            this.value = value;
        }
    }
}