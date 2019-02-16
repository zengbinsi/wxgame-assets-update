/// <reference path="CodeObject.ts"/>
module qs {
    export class CodeAssign extends CodeObject {
        public readonly member: CodeMember;
        public readonly value: CodeObject;
        public readonly assignType: TokenType;
        public constructor(member: CodeMember, value: CodeObject, assignType: TokenType, token: Token = null) {
            super(token);
            this.member = member;
            this.value = value;
            this.assignType = assignType;
        }
    }
}