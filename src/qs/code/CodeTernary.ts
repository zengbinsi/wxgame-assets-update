/// <reference path="CodeObject.ts"/>
module qs {
    export class CodeTernary extends CodeObject {
        public allow: CodeObject;    //判断条件
        public true: CodeObject;     //成立返回
        public false: CodeObject;    //不成立返回
    }
}