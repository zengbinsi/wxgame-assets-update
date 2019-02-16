/// <reference path="CodeObject.ts"/>
module qs {
    export class CodeMember extends CodeObject {
        /**
         * 父成员
         */
        public readonly parent: CodeMember;
        /**
         * 成员值
         * obj["key"]、obj[0]
         */
        public readonly value: any;
        /**
         * 计算标识
         */
        public calc: Calc = Calc.NONE;
        public constructor(value: any, token: Token = null, parent: CodeMember = null) {
            super(token);
            this.value = value;
            this.parent = parent;
        }
    }
    //计算标识，++或者--
    export enum Calc {
        /**
         * 无
         */
        NONE,
        /**
         * 前置++
         */
        PRE_INCREMENT,
        /**
         * 后置++
         */
        POST_INCREMENT,
        /**
         * 前置--
         */
        PRE_DECREMENT,
        /**
         * 后置--
         */
        POST_DECREMENT
    }
}