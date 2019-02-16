/// <reference path="CodeObject.ts"/>
module qs {
    export class CodeFunction extends CodeObject {
        public readonly paramNames: string[];
        public readonly types: CodeMember[];
        public readonly values: CodeObject[];
        public readonly executable: Executable;
        public readonly isDynamicParams: boolean = false;
        public readonly name: string;
        public readonly isStatic: boolean;
        /**
         * 是否自动执行，function(){}()
         */
        public autoCall: boolean = false;
        /**
         * 自执行方法的参数
         */
        public parameters: CodeObject[];
        public constructor(name: string, isStatic: boolean, params: string[], types: CodeMember[], values: CodeObject[], executable: Executable, isDynamicParams: boolean, token: Token = null) {
            super(token);
            this.name = name;
            this.isStatic = isStatic;
            this.paramNames = params;
            this.types = types;
            this.values = values;
            this.executable = executable;
            this.isDynamicParams = isDynamicParams;
        }
    }
    export enum FunctionType {
        /**
         * 普通方法
         */
        Normal,
        /**
         * get方法
         */
        Get,
        /**
         * set方法
         */
        Set

    }
}