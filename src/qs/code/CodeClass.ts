/// <reference path="CodeObject.ts"/>
module qs {
    export class CodeClass extends CodeObject {
        /**
         * 是否是普通对象
         */
        public isObject: boolean = false;
        /**
         * 是否是导出
         */
        public isExport: boolean = false;
        /**
         * 是否是抽象
         */
        public isAbstract: boolean = false;
        /**
         * 所属模块
         */
        public owner: CodeModule = null;
        /**
         * 类名或js类
         */
        public name: string;
        /**
         * 父类
         */
        public parent: CodeClass | Function = null;
        /**
         * 所有的成员属性
         */
        public variableMap: any = {};
        /**
         * 所有的成员属性-静态
         */
        public variableMap_static: any = {};
        /**
         * 所有的成员方法
         */
        public functionMap: any = {};
        /**
         * 所有的成员方法-静态
         */
        public functionMap_static: any = {};
        /**
         * 添加成员属性
         */
        public addVariable(variable: CodeVariable): void {
            if (!variable.isStatic) {
                this.variableMap[variable.name] = variable;
            }
            else {
                this.variableMap_static[variable.name] = variable;
            }
        }
        /**
         * 添加成员方法
         */
        public addFunction(func: CodeFunction): void {
            if (!func.isStatic) {
                this.functionMap[func.name] = func;
            }
            else {
                this.functionMap_static[func.name] = func;
            }
        }
        /**
         * 获取成员方法
         */
        public getFunction(name: string, isStatic: boolean = false): CodeFunction {
            if (!isStatic) {
                if (this.functionMap.hasOwnProperty(name)) {
                    return this.functionMap[name];
                }
                return undefined;
            }
            else {
                if (this.functionMap_static.hasOwnProperty(name)) {
                    return this.functionMap_static[name];
                }
                return undefined;
            }
        }
    }
}