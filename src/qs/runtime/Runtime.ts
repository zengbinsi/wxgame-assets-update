var __extends = this && this.__extends || function __extends(t, e) {
    function r() {
        this.constructor = t;
    }
    for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
    r.prototype = e.prototype, t.prototype = new r();
};
module qs {
    export interface IReturnData {
        value: any;
        isOver: boolean;
        isContinue: boolean;
        isBreak: boolean;
        blockType: BlockType;
        parent: IReturnData;
        context: any;
    }
    /**
     * 运行环境
     */
    export class Runtime {
        /**
         * 上下文对象，用于保存临时变量等
         */
        // private context: Function;
        /**
         * 当前this指针
         */
        private currentThis: Function;
        /**
         * 当前正在解析的类
         */
        private codeClass: CodeClass;
        private parser: Parser;
        public run(mainClass: CodeClass, parser: Parser): any {
            this.parser = parser;
            var MainClass;
            for (var i = 0; i < parser.codeClassList.length; i++) {
                var codeClass = parser.codeClassList[i];
                var ClassObject = this.parseClass(codeClass);
                if (mainClass == codeClass) {
                    MainClass = ClassObject;
                }
            }
            return MainClass;
        }
        private parseClass(codeClass: CodeClass): any {
            this.codeClass = codeClass;
            var owner = this.parser.globalObj;
            var ownerNames = this.getPathList(codeClass);
            ownerNames.pop();
            for (var i = 0; i < ownerNames.length; i++) {
                owner[ownerNames[i]] = owner[ownerNames[i]] || {};
                owner = owner[ownerNames[i]];
            }
            var parent = null;
            if (codeClass.parent instanceof CodeObject) {
                var oldCodeClass = this.codeClass;
                parent = this.parseClass(codeClass.parent);
                this.codeClass = oldCodeClass;
            }
            else {
                parent = codeClass.parent;
            }
            var self = this;
            var _Class = owner[codeClass.name] = (function (_super) {
                var _codeClass = codeClass;
                !!parent && __extends(QSClass, _super);
                function QSClass() {//构造函数
                    this[".classPath"] = self.getClassPath(_codeClass);
                    this[".super"] = _super;//保存父类引用
                    var args = arguments;
                    var func = _codeClass.getFunction("constructor");
                    if (func) {//如果有构造则执行构造
                        return self.callConstructor(codeClass.variableMap, func, this, _super, args);
                    }
                    else {
                        var _this = (_super && _super.apply(this, arguments)) || this;
                        self.currentThis = _this;
                        for (var key in codeClass.variableMap) {//super调用之后立即给成员变量赋值
                            this[key] = self.resolveOperand(codeClass.variableMap[key].value, {
                                value: void 0, isOver: false, isContinue: false, isBreak: false,
                                blockType: BlockType.Function, parent: null, context: _this
                            });
                        }
                        return _this;
                    }
                }
                // self.context = QSClass;
                for (var key in codeClass.functionMap) {//成员方法
                    if (key != "constructor") {
                        var preStr = key.substring(0, 5);
                        if (preStr == ".get.") {//如果是get方法
                            var getKey = key.substr(5);
                            Object.defineProperty(QSClass.prototype, getKey, {
                                get: self.resolveOperand(codeClass.functionMap[key], {
                                    value: void 0, isOver: false, isContinue: false, isBreak: false,
                                    blockType: BlockType.Function, parent: null, context: {}
                                }),
                                enumerable: true,
                                configurable: true
                            });
                        }
                        else if (preStr == ".set.") {//如果是set方法
                            var setKey = key.substr(5);
                            Object.defineProperty(QSClass.prototype, setKey, {
                                set: self.resolveOperand(codeClass.functionMap[key], {
                                    value: void 0, isOver: false, isContinue: false, isBreak: false,
                                    blockType: BlockType.Function, parent: null, context: {}
                                }),
                                enumerable: true,
                                configurable: true
                            });
                        }
                        else {
                            QSClass.prototype[key] = self.resolveOperand(codeClass.functionMap[key], {
                                value: void 0, isOver: false, isContinue: false, isBreak: false,
                                blockType: BlockType.Function, parent: null, context: {}
                            });
                        }
                    }
                }
                for (var key in codeClass.variableMap_static) {//静态属性
                    QSClass[key] = self.resolveOperand(codeClass.variableMap_static[key].value, {
                        value: void 0, isOver: false, isContinue: false, isBreak: false,
                        blockType: BlockType.Function, parent: null, context: {}
                    });
                }
                for (var key in codeClass.functionMap_static) {//静态方法
                    QSClass[key] = self.resolveOperand(codeClass.functionMap_static[key], {
                        value: void 0, isOver: false, isContinue: false, isBreak: false,
                        blockType: BlockType.Function, parent: null, context: {}
                    });
                }
                return QSClass;
            } (parent));
            return _Class;
        }
        /**
         * 执行构造函数
         */
        private callConstructor(variableMap: any, codeFunction: CodeFunction, thisObject: any, _super: any, args: IArguments): any {
            var instructionList = codeFunction.executable.instructionList;//指令集
            var _this = this.currentThis = thisObject;
            if (_super && instructionList[0].token.lexeme != "super") {
                throw new ExecutionError(codeFunction.token, "构造函数里面缺少super");
            }
            if (instructionList[0].token.lexeme == "super" && instructionList[0].opcode == Opcode.CALL_FUNCTION) {
                _this = this.currentThis = (_super && _super.call(thisObject, args)) || thisObject;
            }
            for (var key in variableMap) {//super调用之后立即给成员变量赋值
                _this[key] = this.resolveOperand(variableMap[key].value, {
                    value: void 0, isOver: false, isContinue: false, isBreak: false,
                    blockType: BlockType.Function, parent: null, context: _this
                });
            }
            //执行剩余指令
            this.parseExecutable(codeFunction, null, _this)();
            return _this;
        }
        private returnValue: any;
        /**
         * 执行指令集
         */
        private parseExecutable(codeFunction: CodeFunction, parentReturnData: IReturnData, thisObject: any = null): Function {
            var self = this;
            var tempFunc = (function () {
                var executable = codeFunction.executable;
                var paramNames = codeFunction.paramNames;
                var values = codeFunction.values;
                var _this = thisObject;
                function tempFunc() {
                    self.currentThis = this;
                    for (var i = 0; i < paramNames.length; i++) {
                        tempFunc[paramNames[i]] = arguments[i] || self.resolveOperand(values[i], parentReturnData);
                    }
                    // var oldContextObject = self.context;
                    // self.context = tempFunc;
                    var returnData: IReturnData = {
                        value: void 0, isOver: false, isContinue: false, isBreak: false,
                        blockType: BlockType.Function, parent: parentReturnData, context: tempFunc
                    };
                    self.executable(executable, returnData);
                    // self.context = oldContextObject;
                    return returnData.value;
                }
                return tempFunc;
            })();
            if (!thisObject) {
                return tempFunc;
            }
            else {
                return tempFunc.bind(thisObject);
            }
        }
        private executable(executable: Executable, returnData: IReturnData) {
            for (var i = 0; i < executable.instructionList.length; i++) {
                this.exeInstruction(executable.instructionList[i], returnData);
                if (returnData.isOver || returnData.isContinue || returnData.isBreak) {
                    break;
                }
            }
        }
        /**
         * 执行单个指令
         */
        private exeInstruction(instruction: Instruction, returnData: IReturnData): void {
            var opcode = instruction.opcode;
            switch (opcode) {
                case Opcode.VAR: this.processVar(instruction, returnData); break;
                case Opcode.RET: this.processReturn(instruction, returnData); break;
                case Opcode.RESOLVE: this.processResolve(instruction, returnData); break;
                case Opcode.CONTINUE: this.processContinue(instruction, returnData); break;
                case Opcode.BREAK: this.processBreak(instruction, returnData); break;
                case Opcode.CALL_FUNCTION: this.processCallFunction(instruction, returnData); break;
                case Opcode.CALL_IF: this.processCallIf(instruction, returnData); break;
                case Opcode.CALL_FOR: this.processCallFor(instruction, returnData); break;
                case Opcode.CALL_FORIN: this.processCallForIn(instruction, returnData); break;
                case Opcode.CALL_FORSIMPLE: this.processCallForSimple(instruction, returnData); break;//ts暂不支持这种用法
                case Opcode.CALL_WHILE: this.processCallWhile(instruction, returnData); break;
                case Opcode.CALL_SWITCH: this.processCallSwitch(instruction, returnData); break;
                case Opcode.CALL_TRY: this.processTry(instruction, returnData); break;
                case Opcode.THROW: this.processThrow(instruction, returnData); break;
                case Opcode.NEW: this.processNew(instruction, returnData); break;
                case Opcode.Typeof: this.processTypeof(instruction, returnData); break;
                case Opcode.Delete: this.processDelete(instruction, returnData); break;
            }
        }
        private processBreak(instruction: Instruction, returnData: IReturnData) {
            this.invokeBreak(instruction.value, returnData);
        }
        private invokeBreak(con: CodeObject, returnData: IReturnData) {
            returnData.isBreak = true;
            if (!this.isSupportBreak(returnData.blockType)) {
                if (returnData.parent == null) {
                    throw new ExecutionError(con.token, "this block is not support continue");
                }
                this.invokeBreak(con, returnData.parent);
            }
        }
        private processContinue(instruction: Instruction, returnData: IReturnData) {
            this.invokeContinue(instruction.value, returnData);
        }
        private invokeContinue(con: CodeObject, returnData: IReturnData) {
            returnData.isContinue = true;
            if (!this.isSupportContinue(returnData.blockType)) {
                if (returnData.parent == null) {
                    throw new ExecutionError(con.token, "this block is not support continue");
                }
                this.invokeContinue(con, returnData.parent);
            }
        }
        private processCallFor(instruction: Instruction, returnData: IReturnData): void {
            var code = instruction.value as CodeFor;
            var forReturnData = {
                value: void 0, isOver: false, isContinue: false, isBreak: false,
                blockType: BlockType.For, parent: returnData, context: {}
            };
            this.executable(code.beginExecutable, forReturnData);
            var condition: boolean;
            for (; ;) {
                if (code.condition != null) {
                    condition = this.resolveOperand(code.condition, forReturnData);
                    if (!condition) {
                        break;
                    }
                }
                this.executable(code.blockExecutable, forReturnData);
                if (forReturnData.isBreak) {
                    break;
                }
                if (forReturnData.isOver) {
                    break;
                }
                this.executable(code.loopExecutable, forReturnData);
                if (forReturnData.isContinue) {
                    continue;
                }
            }
        }
        private processCallForIn(instruction: Instruction, returnData: IReturnData): void {
            var code = instruction.value as CodeForIn;
            var loopObj = this.resolveOperand(code.loopObject, returnData);
            for (var key in loopObj) {
                if (loopObj == null) {
                    return;
                }
                var context = {};
                context[code.identifier] = key;
                var forReturnData: IReturnData = {
                    value: void 0, isOver: false, isContinue: false, isBreak: false, blockType: BlockType.Forin,
                    parent: returnData, context: context
                };
                if (forReturnData.isBreak) {
                    break;
                }
                if (forReturnData.isOver) {
                    break;
                }
                this.executable(code.executable, forReturnData);
                if (forReturnData.isContinue) {
                    continue;
                }
            }
        }
        private processCallWhile(instruction: Instruction, returnData: IReturnData): void {
            var code = instruction.value as CodeWhile;
            var condition = code.while;
            for (; ;) {
                var whileReturnData: IReturnData = {
                    value: void 0, isOver: false, isContinue: false, isBreak: false, blockType: BlockType.While,
                    parent: returnData, context: {}
                };
                if (!this.processCondition(condition, BlockType.While, whileReturnData)) {
                    break;
                }
                if (returnData.isBreak) {
                    break;
                }
                if (returnData.isOver) {
                    break;
                }
                if (returnData.isContinue) {
                    continue;
                }
            }
        }
        private processCallSwitch(instruction: Instruction, returnData: IReturnData): void {
            var code = instruction.value as CodeSwitch;
            var obj = this.resolveOperand(code.condition, returnData);
            var exec = false;
            var switchReturnData: IReturnData = {
                value: void 0, isOver: false, isContinue: false,
                isBreak: false, blockType: BlockType.Switch, parent: returnData, context: {}
            };
            for (var i = 0; i < code.cases.length; i++) {
                var c = code.cases[i];
                for (var j = 0; j < c.allow.length; j++) {
                    var allow = c.allow[j];
                    var a = null;
                    if (allow instanceof CodeObject) {
                        a = this.resolveOperand(allow, returnData);
                    }
                    else {
                        a = allow;
                    }
                    if (a == obj) {
                        exec = true;
                        this.executable(c.executable, switchReturnData);
                        break;
                    }
                }
            }
            if (exec == false && code.default != null) {
                this.executable(code.default.executable, switchReturnData);
            }
        }
        private processTry(instruction: Instruction, returnData: IReturnData): void {
            var code = instruction.value as CodeTry;
            try {
                var tryReturnData: IReturnData = {
                    value: void 0, isOver: false, isContinue: false, isBreak: false,
                    blockType: returnData.blockType, parent: returnData, context: {}
                };
                this.executable(code.tryExecutable, tryReturnData);
            }
            catch (error) {
                var context = {};
                context[code.identifier] = error;//设置异常对象
                var catchReturnData: IReturnData = {
                    value: void 0, isOver: false, isContinue: false, isBreak: false,
                    blockType: returnData.blockType, parent: returnData, context: context
                };
                this.executable(code.catchExecutable, catchReturnData);
            }
        }
        private processThrow(instruction: Instruction, returnData: IReturnData): void {
            var code = instruction.value as CodeThrow;
            var obj = this.resolveOperand(code.obj, returnData);
            throw obj;
        }
        private processNew(instruction: Instruction, returnData: IReturnData): void {
            this.parseNew(instruction.value, returnData);
        }
        private processDelete(instruction: Instruction, returnData: IReturnData): void {
            this.parseDelete(instruction.value, returnData);
        }
        private processTypeof(instruction: Instruction, returnData: IReturnData): void {
            var code = instruction.value as CodeTypeof;
            typeof this.resolveOperand(code.value, returnData);
        }
        private processCallForSimple(instruction: Instruction, returnData: IReturnData): void {
            var code = instruction.value as CodeForSimple;
            var begin = this.resolveOperand(code.begin, returnData);
            if (typeof begin != 'number') {
                throw new ExecutionError(code.token, "forsimple 初始值必须是number");
            }
            var finished = this.resolveOperand(code.finished, returnData);
            if (typeof finished != 'number') {
                throw new ExecutionError(code.token, "forsimple 最大值必须是number");
            }
            var step;
            if (code.step != null) {
                var stepNumber = this.resolveOperand(code.step, returnData);
                if (typeof stepNumber != 'number') {
                    throw new ExecutionError(code.token, "forsimple Step必须是number");
                }
                step = stepNumber;
            }
            else {
                step = 1;
            }
            var variables = code.variables;
            for (var i = begin; i <= finished; i += step) {
                variables[code.identifier] = i;
                var forReturnData: IReturnData = {
                    value: void 0, isOver: false, isContinue: false, isBreak: false,
                    blockType: BlockType.For, parent: returnData, context: {}
                };
                this.executable(code.blockExecutable, forReturnData);
                if (forReturnData.isBreak) {
                    break;
                }
                if (forReturnData.isOver) {
                    break;
                }
                if (forReturnData.isContinue) {
                    continue;
                }
            }
        }
        private isSupportBreak(blockType: BlockType): boolean {
            return blockType == BlockType.For || blockType == BlockType.Forin || blockType == BlockType.While;
        }
        private isSupportContinue(blockType: BlockType): boolean {
            return blockType == BlockType.For || blockType == BlockType.Forin || blockType == BlockType.While;
        }
        private processVar(instruction: Instruction, returnData: IReturnData) {
            var name = instruction.value;
            returnData.context[name] = null;//定义的对象默认为空
            // returnData.context[name] = undefined;
        }
        private processReturn(instruction: Instruction, returnData: IReturnData) {
            this.invokeReturnValue(this.resolveOperand(instruction.value, returnData), returnData);
        }
        private invokeReturnValue(value: any, returnData: IReturnData): void {
            returnData.isOver = true;
            if (returnData.blockType == BlockType.Function) {
                returnData.value = value;
            }
            else {
                this.invokeReturnValue(value, returnData.parent);
            }
        }
        private processCondition(con: TempCondition, blockType: BlockType, returnData: IReturnData): boolean {
            if (con == null) {
                return false;
            }
            if (con.allow != null) {
                var b = this.resolveOperand(con.allow, returnData);
                if (!b) {//如果条件不成立
                    return false;
                }
            }
            this.executable(con.executable, {
                value: void 0, isOver: false, isContinue: false, isBreak: false, blockType: blockType,
                parent: returnData, context: {}
            })
            return true;
        }
        private processCallIf(instruction: Instruction, returnData: IReturnData): void {
            var code = instruction.value as CodeIf;
            if (this.processCondition(code.If, BlockType.If, returnData)) {
                return;
            }
            for (var i = 0; i < code.elseIf.length; ++i) {
                if (this.processCondition(code.elseIf[i], BlockType.If, returnData))
                    return;
            }
            this.processCondition(code.Else, BlockType.If, returnData);
        }
        private processResolve(instruction: Instruction, returnData: IReturnData) {
            this.resolveOperand(instruction.value, returnData);
        }
        private processCallFunction(instruction: Instruction, returnData: IReturnData) {
            this.parseCall(instruction.value, returnData);
        }
        /**
         * 解析运算符
         */
        private parseOperate(operate: CodeOperator, returnData: IReturnData): any {
            var type = operate.operator;
            var left = this.resolveOperand(operate.left, returnData);
            var right;
            if (type == TokenType.Plus) {
                right = this.resolveOperand(operate.right, returnData);
                return left + right;
            }
            else if (type == TokenType.Minus || type == TokenType.Multiply || type == TokenType.Divide || type == TokenType.Modulo ||
                type == TokenType.InclusiveOr || type == TokenType.Combine || type == TokenType.XOR || type == TokenType.Shr || type == TokenType.Shi) {
                if (typeof left != 'number') {
                    throw new ExecutionError(operate.token, "运算符[左边]必须是number类型");
                }
                right = this.resolveOperand(operate.right, returnData);
                if (typeof right != 'number') {
                    throw new ExecutionError(operate.token, "运算符[右边]必须是number类型");
                }
                switch (type) {
                    case TokenType.Minus:
                        return left - right;
                    case TokenType.Multiply:
                        return left * right;
                    case TokenType.Divide:
                        return left / right;
                    case TokenType.Modulo:
                        return left % right;
                    case TokenType.InclusiveOr:
                        return left | right;
                    case TokenType.Combine:
                        return left & right;
                    case TokenType.XOR:
                        return left ^ right;
                    case TokenType.Shr:
                        return left >> right;
                    case TokenType.Shi:
                        return left << right;
                }
            }
            else if (type == TokenType.And || type == TokenType.Or || type == TokenType.Equal || type == TokenType.NotEqual
                || type == TokenType.Greater || type == TokenType.GreaterOrEqual || type == TokenType.Less || type == TokenType.LessOrEqual) {
                switch (type) {
                    case TokenType.And:
                        if (!left) {
                            return left;
                        }
                        else {
                            right = this.resolveOperand(operate.right, returnData);
                            return left && right;
                        }
                    // right = this.resolveOperand(operate.right, returnData);
                    // return left && right;
                    case TokenType.Or:
                        if (left) {
                            return left;
                        }
                        else {
                            right = this.resolveOperand(operate.right, returnData);
                            return left || right;
                        }
                    // right = this.resolveOperand(operate.right, returnData);
                    // return left || right;
                    case TokenType.Equal:
                        right = this.resolveOperand(operate.right, returnData);
                        return left == right;
                    case TokenType.NotEqual:
                        right = this.resolveOperand(operate.right, returnData);
                        return left != right;
                    case TokenType.Greater:
                        right = this.resolveOperand(operate.right, returnData);
                        return left > right;
                    case TokenType.GreaterOrEqual:
                        right = this.resolveOperand(operate.right, returnData);
                        return left >= right;
                    case TokenType.Less:
                        right = this.resolveOperand(operate.right, returnData);
                        return left < right;
                    case TokenType.LessOrEqual:
                        right = this.resolveOperand(operate.right, returnData);
                        return left <= right;
                }
            }
            else if (type == TokenType.Instanceof) {
                right = this.resolveOperand(operate.right, returnData);
                return left instanceof right;
            }
            else {
                throw new ExecutionError(operate.token, "nonsupport operate [" + type + "] with " + left.Type);
            }
        }
        private resolveOperand(value: CodeObject, returnData: IReturnData): any {
            if (value == null) {
                return null;
            }
            var ret = this.resolveOperand_impl(value, returnData);
            if (value.not) {
                ret = !ret;
            }
            if (value.doubleNot) {
                ret = !!ret;
            }
            else if (value.negative) {
                if (typeof ret != 'number') {
                    throw new ExecutionError(value.token, "Script Object Type [" + ret.Type + "] is cannot use [-] sign");
                }
                ret = -ret;
            }
            return ret;
        }
        private resolveOperand_impl(codeObject: CodeObject, returnData: IReturnData): any {
            if (codeObject instanceof CodeTypeof) {
                return typeof this.resolveOperand(codeObject.value, returnData);
            }
            if (codeObject instanceof CodeScriptObject) {
                return codeObject.value;
            }
            else if (codeObject instanceof CodeDelete) {
                return this.parseDelete(codeObject, returnData);
            }
            else if (codeObject instanceof CodeFunction) {
                return this.parseExecutable(codeObject, returnData);
            }
            else if (codeObject instanceof CodeCallFunction) {
                return this.parseCall(codeObject, returnData);
            }
            else if (codeObject instanceof CodeMember) {
                return this.getVariable(codeObject, returnData);
            }
            else if (codeObject instanceof CodeArray) {
                return this.parseArray(codeObject, returnData);
            }
            else if (codeObject instanceof CodeClass) {
                if (codeObject.isObject) {
                    var obj = {};
                    for (var key in codeObject.variableMap) {
                        obj[key] = this.resolveOperand(codeObject.variableMap[key].value, returnData);
                    }
                    // for (var key in codeObject.functionMap) {
                    //     obj[key] = codeObject.functionMap[key];
                    // }
                    return obj;
                }
                else {
                    return this.getClass(codeObject);
                }
            }
            else if (codeObject instanceof CodeOperator) {
                return this.parseOperate(codeObject, returnData);
            }
            else if (codeObject instanceof CodeTernary) {
                return this.parseTernary(codeObject, returnData);
            }
            else if (codeObject instanceof CodeAssign) {
                return this.parseAssign(codeObject, returnData);
            }
            else if (codeObject instanceof CodeNew) {
                return this.parseNew(codeObject, returnData);
            }
            return null;
        }
        private parseDelete(codeDelete: CodeDelete, returnData: IReturnData): any {
            return this.setVariable(codeDelete.value as CodeMember, undefined, returnData);
        }
        private parseCall(codeCallFunction: CodeCallFunction | CodeFunction, returnData: IReturnData): any {
            var params = [];
            for (var i = 0; i < codeCallFunction.parameters.length; i++) {
                params.push(this.resolveOperand(codeCallFunction.parameters[i], returnData));
            }
            var func: Function = null;
            if (codeCallFunction instanceof CodeFunction) {
                func = this.resolveOperand(codeCallFunction, returnData);
                func.apply(this.parser.globalObj, params)
            }
            else {
                var caller = null;
                if (codeCallFunction.member instanceof CodeObject) {
                    func = this.resolveOperand(codeCallFunction.member, returnData);
                }
                else {
                    func = codeCallFunction.member;
                }
                if (!func) {
                    throw new ExecutionError(codeCallFunction.token, "Cannot read property '" + (codeCallFunction.member as CodeMember).value + "' of undefined");
                }
                if (!codeCallFunction.isNew) {
                    var isSuper = false;
                    if (codeCallFunction.member instanceof CodeMember) {
                        var parent = codeCallFunction.member.parent;
                        if (parent) {
                            // while (parent) {
                            //     if (parent.value == "super") {
                            //         isSuper = true;
                            //     }
                            //     parent = parent.parent;
                            // }
                        }
                        else {
                            isSuper = codeCallFunction.member.value == "super";
                            if (isSuper) {
                                func = this.currentThis[".super"];
                            }
                        }
                    }
                    var oldThisObject = this.currentThis;
                    if (codeCallFunction.member[".this"]) {//如果存在调用者
                        this.currentThis = codeCallFunction.member[".this"];
                        // return !isSuper ? func.apply(codeCallFunction.member[".this"], params) : func.apply(this.thisObject, params);
                    }
                    else {
                        this.currentThis = this.parser.globalObj;
                    }
                    var result = !isSuper ? func.apply(this.currentThis, params) : func.apply(oldThisObject, params);
                    this.currentThis = oldThisObject;
                    return result;
                }
                else {
                    var oldThisObject = this.currentThis;
                    var result = new (func.bind.apply(func, [null].concat(params)));
                    this.currentThis = oldThisObject;
                    return result;
                }
            }
        }
        private parseTernary(ternary: CodeTernary, returnData: IReturnData): any {
            var b = this.resolveOperand(ternary.allow, returnData);
            return !!b ? this.resolveOperand(ternary.true, returnData) : this.resolveOperand(ternary.false, returnData);
        }
        private getClass(codeClass: CodeClass): any {
            if (!codeClass.owner) {
                return this.parser.globalObj[codeClass.name];
            }
            else {
                var names = this.getPathList(codeClass)
                var result = this.parser.globalObj;
                for (var i = 0; i < names.length; i++) {
                    result = result[names[i]];
                }
                return result;
            }
        }
        private getClassPath(codeClass: CodeClass): string {
            var pathList = this.getPathList(codeClass);
            var result = "";
            for (var i = 0; i < pathList.length; i++) {
                result += pathList[i] + ".";
            }
            if (result) {
                result = result.substring(0, result.length - 1);
            }
            return result;
        }
        private getPathList(codeClass: CodeClass): string[] {
            var names = [codeClass.name];
            var parentModule = codeClass.owner;
            if (parentModule) {
                names.push(parentModule.value);
                while (parentModule.parent) {
                    parentModule = parentModule.parent;
                    names.push(parentModule.value);
                }
            }
            names.reverse();
            return names;
        }
        private parseNew(codeNew: CodeNew, returnData: IReturnData): any {
            var isCall = false;
            if (codeNew.newObject instanceof CodeCallFunction) {
                isCall = true;
                codeNew.newObject.isNew = true;
            }
            var classObject = this.resolveOperand(codeNew.newObject, returnData);
            if (classObject == null) {
                throw new ExecutionError(codeNew.token, "要实例化的类[" + classObject + "]不存在");
            }
            return isCall ? classObject : new classObject();
        }
        private parseArray(codeArray: CodeArray, returnData: IReturnData): any {
            var array = [];
            for (var i = 0; i < codeArray.elements.length; ++i) {
                array.push(this.resolveOperand(codeArray.elements[i], returnData));
            }
            return array;
        }
        private getContextValue(returnData: IReturnData, key: string): any {
            var result = null;
            while (returnData && !returnData.context.hasOwnProperty(key)) {
                returnData = returnData.parent;
            }
            if (returnData) {
                return returnData.context[key];
            }
            else if (this.currentThis && this.currentThis.hasOwnProperty(key)) {
                return this.currentThis[key];
            }
            else {
                if (this.codeClass.owner) {
                    return this.parser.globalObj[this.codeClass.owner.value][key] || this.parser.globalObj[key];
                }
                else {
                    return this.parser.globalObj[key];
                }
            }
        }
        private getVariable(member: CodeMember, returnData: IReturnData): any {
            if (member.parent) {
                var oldMember = member;
                var members = [member];
                while (member.parent) {
                    member = member.parent;
                    members.push(member);
                }
                members.reverse();
                // var result = members.length > 0 && this.context[this.getMemberValue(members[0], returnData)] != null ? this.context : this.parser.globalObj;
                var result = undefined;
                if (members[0] instanceof CodeCallFunction) {
                    result = this.resolveOperand(member, returnData);
                }
                else {
                    if (result === undefined) {
                        result = this.getContextValue(returnData, this.getMemberValue(members[0], returnData));
                    }
                }
                if (members.length > 0) {
                    if (members[0].value == "this") {
                        result = this.currentThis;
                    }
                    if (members[0].value == "super") {
                        result = this.currentThis[".super"].prototype;
                    }
                }
                oldMember[".this"] = result;
                if (result) {
                    members.shift();
                }
                var codeClass = this.parser.classPathMap;
                var parent = undefined;
                for (var i = 0; i < members.length; i++) {
                    if (result) {
                        parent = result;
                        result = members[i] instanceof CodeCallFunction ? this.resolveOperand(members[i], returnData) : result[this.getMemberValue(members[i], returnData)];
                    }
                    if (codeClass) {
                        codeClass = codeClass[members[i].value];
                    }
                }
                oldMember[".this"] = parent;//保存调用者
                if (result === undefined && codeClass) {
                    var oldCodeClass = this.codeClass;
                    var result = this.parseClass(codeClass);
                    this.codeClass = oldCodeClass;
                    return result;
                }
            }
            else {//从同模块或者全局中查找
                if (member.value == "this") {
                    result = this.currentThis;
                }
                else if (member.value == "super") {
                    result = this.currentThis[".super"].prototype;
                }
                else {
                    var value = this.getMemberValue(member, returnData);
                    var result = this.getContextValue(returnData, value);
                    if (result === undefined) {
                        var names = this.getPathList(this.codeClass);
                        names.pop();
                        var result = this.parser.globalObj;
                        for (var i = 0; i < names.length; i++) {
                            result = result[names[i]];
                        }
                        result = result[value] || this.parser.globalObj[value];
                    }
                }
            }
            if (member instanceof CodeMember && member.calc != Calc.NONE) {
                if (typeof result != 'number') {
                    throw new ExecutionError(member.token, "++或者--只能应用于Number类型");
                }
                else if (member.calc == Calc.POST_DECREMENT) {
                    result--;
                }
                else if (member.calc == Calc.POST_INCREMENT) {
                    result++;
                }
                else if (member.calc == Calc.PRE_DECREMENT) {
                    --result;
                }
                else if (member.calc == Calc.PRE_INCREMENT) {
                    ++result;
                }
                this.setVariable(member, result, returnData);
            }
            return result;
        }
        private getMemberValue(member: CodeMember, returnData: IReturnData): any {
            if (member.value instanceof CodeScriptObject) {
                return member.value.value;
            }
            else if (
                typeof member.value == 'boolean' ||
                typeof member.value == 'number' ||
                typeof member.value == 'string'
            ) {
                return member.value;
            }
            else if (member instanceof CodeMember) {
                return this.resolveOperand(member.value, returnData);
            }
            else {
                return this.resolveOperand(member, returnData);
            }
        }
        private setVariable(member: CodeMember, value: any, returnData: IReturnData): any {
            if (member.parent) {
                // var members = [member];
                // while (member.parent) {
                //     member = member.parent;
                //     members.push(member);
                // }
                // members.reverse();
                // // var result = members.length > 0 && returnData.context[members[0].value] !== undefined ? returnData.context : this.parser.globalObj;
                // var result = this.getContextValue(returnData, members[0].value);
                // if (members.length > 0) {
                //     if (members[0].value == "this") {
                //         result = this.currentThis;
                //         members.shift();//给this的属性的赋值操作需要删除第一个this，否则下面的循环会调用不到
                //     }
                //     if (members[0].value == "super") {
                //         result = this.currentThis[".super"];
                //     }
                // }
                // var parent = null;
                // var name = null;
                // if (result == this.parser.globalObj) {//从模块中找一遍
                //     var names = this.getPathList(this.codeClass);
                //     names.pop();
                //     var result = this.parser.globalObj;
                //     for (var i = 0; i < names.length; i++) {
                //         result = result[names[i]];
                //     }
                //     if (member.parent) {
                //         result = member.parent instanceof CodeCallFunction ? this.resolveOperand(member.parent, returnData) : result[this.getMemberValue(member.parent, returnData)];
                //     }
                //     if (result) {
                //         result = member instanceof CodeCallFunction ? this.resolveOperand(member, returnData) : result[this.getMemberValue(member, returnData)] || this.parser.globalObj[this.getMemberValue(member, returnData)];
                //     }
                // }
                var oldMember = member;
                var members = [member];
                while (member.parent) {
                    member = member.parent;
                    members.push(member);
                }
                members.reverse();
                // var result = members.length > 0 && this.context[this.getMemberValue(members[0], returnData)] != null ? this.context : this.parser.globalObj;
                var result = undefined;
                if (members[0] instanceof CodeCallFunction) {
                    result = this.resolveOperand(member, returnData);
                }
                else {
                    if (result === undefined) {
                        result = this.getContextValue(returnData, this.getMemberValue(members[0], returnData));
                    }
                }
                if (members.length > 0) {
                    if (members[0].value == "this") {
                        result = this.currentThis;
                    }
                    if (members[0].value == "super") {
                        result = this.currentThis[".super"].prototype;
                    }
                }
                oldMember[".this"] = result;
                if (result) {
                    members.shift();
                }
                var codeClass = this.parser.classPathMap;
                var parent = undefined;
                for (var i = 0; i < members.length; i++) {
                    if (result) {
                        parent = result;
                        result = members[i] instanceof CodeCallFunction ? this.resolveOperand(members[i], returnData) : result[this.getMemberValue(members[i], returnData)];
                    }
                    if (codeClass) {
                        codeClass = codeClass[members[i].value];
                    }
                }
                oldMember[".this"] = parent;//保存调用者
                if (parent && value === undefined) {//delete操作
                    return delete parent[this.getMemberValue(oldMember, returnData)];
                }
                else if (parent) {
                    parent[this.getMemberValue(oldMember, returnData)] = value;
                }
            }
            else {
                // this.parser.globalObj[this.getMemberValue(member)] = value;
                var key = this.getMemberValue(member, returnData);
                var oldReturnData = returnData;
                var isSeted = false;//是否已经设置过值
                while (returnData && returnData.context[key] === undefined) {
                    if (returnData.parent) {
                        returnData = returnData.parent;
                        if (returnData.context[key] !== undefined) {
                            returnData.context[key] = value;
                            isSeted = true;
                            break;
                        }
                    }
                    else {
                        break;
                    }
                }
                if (!isSeted) {
                    oldReturnData.context[this.getMemberValue(member, returnData)] = value;
                }
            }
        }
        private parseAssign(codeAssign: CodeAssign, returnData: IReturnData): any {
            if (codeAssign.assignType == TokenType.Assign) {
                var value = this.resolveOperand(codeAssign.value, returnData);
                this.setVariable(codeAssign.member, value, returnData);
                return value;
            }
            else {
                var value = this.getVariable(codeAssign.member, returnData);
                if (typeof value == 'string') {
                    if (codeAssign.assignType == TokenType.AssignPlus) {
                        value += this.resolveOperand(codeAssign.value, returnData);
                        this.setVariable(codeAssign.member, value, returnData);
                        return value;
                    }
                    else {
                        throw new ExecutionError(codeAssign.token, "string类型只支持[+=]赋值操作");
                    }
                }
                if (typeof value == 'number') {
                    var right = this.resolveOperand(codeAssign.value, returnData);
                    if (typeof value != 'number') {
                        throw new ExecutionError(codeAssign.token, "[+= -=...]值只能为 number类型");
                    }
                    switch (codeAssign.assignType) {
                        case TokenType.AssignPlus:
                            value += right;
                            break;
                        case TokenType.AssignMinus:
                            value -= right;
                            break;
                        case TokenType.AssignMultiply:
                            value *= right;
                            break;
                        case TokenType.AssignDivide:
                            value /= right;
                            break;
                        case TokenType.AssignModulo:
                            value %= right;
                            break;
                        default:
                            throw new ExecutionError(codeAssign.token, "Double不支持的运算符 " + codeAssign.assignType);
                    }
                    this.setVariable(codeAssign.member, value, returnData);
                    return value;
                }
                throw new ExecutionError(codeAssign.token, "[+= -=...]左边值只能为number或者string");
            }
        }
    }
}