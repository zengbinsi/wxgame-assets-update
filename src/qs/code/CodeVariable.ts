/// <reference path="CodeObject.ts"/>
module qs {
    /**
     * 成员变量
     */
    export class CodeVariable extends CodeObject {
        /**
         * 变量名
         */
        public readonly name: any;
        /**
         * 值
         */
        public readonly value: any;
        /**
         * 修饰符，公共/私有等
         */
        public readonly modifier: TokenType;
        /**
         * 是否静态
         */
        public readonly isStatic: boolean;
        /**
         * 变量类型
         */
        public readonly type: any;
        public constructor(name: any, value: any, modifier: TokenType, isStatic: boolean, type: any, token: Token = null) {
            super(token);
            this.name = name;
            this.value = value;
            this.modifier = modifier;
            this.isStatic = isStatic;
            this.type = type;
        }
    }
}