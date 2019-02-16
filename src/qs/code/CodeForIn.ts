/// <reference path="CodeObject.ts"/>
module qs {
    export class CodeForIn extends CodeObject {
        public identifier: string;
        public loopObject: CodeObject;
        public executable: Executable;
    }
}