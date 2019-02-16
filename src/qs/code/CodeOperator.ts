/// <reference path="CodeObject.ts"/>
module qs {
    /**
     * 运算符号
     */
    export class CodeOperator extends CodeObject {
        /**
         * 左边值
         */
        public left: CodeObject;
        /**
         * 右边值
         */
        public right: CodeObject;
        /**
         * 符号类型
         */
        public operator: TokenType;
        public constructor(right: CodeObject, left: CodeObject, operator: TokenType, token: Token = null) {
            super(token);
            this.left = left;
            this.right = right;
            this.operator = operator;
        }
    }
}