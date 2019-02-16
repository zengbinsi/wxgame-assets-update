/// <reference path="CodeObject.ts"/>
module qs {
    export class CodeSwitch extends CodeObject {

        public condition: CodeObject;
        public default: TempCase;
        public cases = new Array<TempCase>();
        public addCase(con: TempCase): void {
            this.cases.push(con);
        }
    }
}