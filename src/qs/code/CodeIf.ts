/// <reference path="CodeObject.ts"/>
module qs {
    export class CodeIf extends CodeObject {
        public If: TempCondition;
        public Else: TempCondition;
        public elseIf: Array<TempCondition> = [];
        public addElseIf(con: TempCondition): void {
            this.elseIf.push(con);
        }
    }
}