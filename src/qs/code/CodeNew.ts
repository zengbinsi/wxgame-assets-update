/// <reference path="CodeObject.ts"/>
module qs {
    export class CodeNew extends CodeObject {
        public readonly newObject: CodeObject;
        public constructor(newObject: CodeObject, token: Token = null) {
            super(token);
            this.newObject = newObject;
        }
    }
}