var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var qs;
(function (qs) {
    var CodeObject = /** @class */ (function () {
        function CodeObject(token) {
            if (token === void 0) { token = null; }
            this.token = token;
        }
        return CodeObject;
    }());
    qs.CodeObject = CodeObject;
})(qs || (qs = {}));
/// <reference path="CodeObject.ts"/>
var qs;
(function (qs) {
    var CodeArray = /** @class */ (function (_super) {
        __extends(CodeArray, _super);
        function CodeArray() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.elements = [];
            return _this;
        }
        return CodeArray;
    }(qs.CodeObject));
    qs.CodeArray = CodeArray;
})(qs || (qs = {}));
/// <reference path="CodeObject.ts"/>
var qs;
(function (qs) {
    var CodeAssign = /** @class */ (function (_super) {
        __extends(CodeAssign, _super);
        function CodeAssign(member, value, assignType, token) {
            if (token === void 0) { token = null; }
            var _this = _super.call(this, token) || this;
            _this.member = member;
            _this.value = value;
            _this.assignType = assignType;
            return _this;
        }
        return CodeAssign;
    }(qs.CodeObject));
    qs.CodeAssign = CodeAssign;
})(qs || (qs = {}));
/// <reference path="CodeObject.ts"/>
var qs;
(function (qs) {
    /**
     * 函数调用
     */
    var CodeCallFunction = /** @class */ (function (_super) {
        __extends(CodeCallFunction, _super);
        function CodeCallFunction() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isNew = false;
            return _this;
        }
        return CodeCallFunction;
    }(qs.CodeObject));
    qs.CodeCallFunction = CodeCallFunction;
})(qs || (qs = {}));
/// <reference path="CodeObject.ts"/>
var qs;
(function (qs) {
    var CodeClass = /** @class */ (function (_super) {
        __extends(CodeClass, _super);
        function CodeClass() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 是否是普通对象
             */
            _this.isObject = false;
            /**
             * 是否是导出
             */
            _this.isExport = false;
            /**
             * 是否是抽象
             */
            _this.isAbstract = false;
            /**
             * 所属模块
             */
            _this.owner = null;
            /**
             * 父类
             */
            _this.parent = null;
            /**
             * 所有的成员属性
             */
            _this.variableMap = {};
            /**
             * 所有的成员属性-静态
             */
            _this.variableMap_static = {};
            /**
             * 所有的成员方法
             */
            _this.functionMap = {};
            /**
             * 所有的成员方法-静态
             */
            _this.functionMap_static = {};
            return _this;
        }
        /**
         * 添加成员属性
         */
        CodeClass.prototype.addVariable = function (variable) {
            if (!variable.isStatic) {
                this.variableMap[variable.name] = variable;
            }
            else {
                this.variableMap_static[variable.name] = variable;
            }
        };
        /**
         * 添加成员方法
         */
        CodeClass.prototype.addFunction = function (func) {
            if (!func.isStatic) {
                this.functionMap[func.name] = func;
            }
            else {
                this.functionMap_static[func.name] = func;
            }
        };
        /**
         * 获取成员方法
         */
        CodeClass.prototype.getFunction = function (name, isStatic) {
            if (isStatic === void 0) { isStatic = false; }
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
        };
        return CodeClass;
    }(qs.CodeObject));
    qs.CodeClass = CodeClass;
})(qs || (qs = {}));
/// <reference path="CodeObject.ts"/>
var qs;
(function (qs) {
    var CodeDelete = /** @class */ (function (_super) {
        __extends(CodeDelete, _super);
        function CodeDelete(value, token) {
            if (token === void 0) { token = null; }
            var _this = _super.call(this, token) || this;
            _this.value = value;
            return _this;
        }
        return CodeDelete;
    }(qs.CodeObject));
    qs.CodeDelete = CodeDelete;
})(qs || (qs = {}));
/// <reference path="CodeObject.ts"/>
var qs;
(function (qs) {
    var CodeFor = /** @class */ (function (_super) {
        __extends(CodeFor, _super);
        function CodeFor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CodeFor.prototype.setContextExecutable = function (blockExecutable) {
            this.blockExecutable = blockExecutable;
        };
        return CodeFor;
    }(qs.CodeObject));
    qs.CodeFor = CodeFor;
})(qs || (qs = {}));
/// <reference path="CodeObject.ts"/>
var qs;
(function (qs) {
    var CodeForIn = /** @class */ (function (_super) {
        __extends(CodeForIn, _super);
        function CodeForIn() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CodeForIn;
    }(qs.CodeObject));
    qs.CodeForIn = CodeForIn;
})(qs || (qs = {}));
/// <reference path="CodeObject.ts"/>
var qs;
(function (qs) {
    var CodeForSimple = /** @class */ (function (_super) {
        __extends(CodeForSimple, _super);
        function CodeForSimple() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.variables = {}; //变量
            return _this;
        }
        CodeForSimple.prototype.setContextExecutable = function (blockExecutable) {
            this.blockExecutable = blockExecutable;
        };
        return CodeForSimple;
    }(qs.CodeObject));
    qs.CodeForSimple = CodeForSimple;
})(qs || (qs = {}));
/// <reference path="CodeObject.ts"/>
var qs;
(function (qs) {
    var CodeFunction = /** @class */ (function (_super) {
        __extends(CodeFunction, _super);
        function CodeFunction(name, isStatic, params, types, values, executable, isDynamicParams, token) {
            if (token === void 0) { token = null; }
            var _this = _super.call(this, token) || this;
            _this.isDynamicParams = false;
            /**
             * 是否自动执行，function(){}()
             */
            _this.autoCall = false;
            _this.name = name;
            _this.isStatic = isStatic;
            _this.paramNames = params;
            _this.types = types;
            _this.values = values;
            _this.executable = executable;
            _this.isDynamicParams = isDynamicParams;
            return _this;
        }
        return CodeFunction;
    }(qs.CodeObject));
    qs.CodeFunction = CodeFunction;
    var FunctionType;
    (function (FunctionType) {
        /**
         * 普通方法
         */
        FunctionType[FunctionType["Normal"] = 0] = "Normal";
        /**
         * get方法
         */
        FunctionType[FunctionType["Get"] = 1] = "Get";
        /**
         * set方法
         */
        FunctionType[FunctionType["Set"] = 2] = "Set";
    })(FunctionType = qs.FunctionType || (qs.FunctionType = {}));
})(qs || (qs = {}));
/// <reference path="CodeObject.ts"/>
var qs;
(function (qs) {
    var CodeIf = /** @class */ (function (_super) {
        __extends(CodeIf, _super);
        function CodeIf() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.elseIf = [];
            return _this;
        }
        CodeIf.prototype.addElseIf = function (con) {
            this.elseIf.push(con);
        };
        return CodeIf;
    }(qs.CodeObject));
    qs.CodeIf = CodeIf;
})(qs || (qs = {}));
/// <reference path="CodeObject.ts"/>
var qs;
(function (qs) {
    var CodeMember = /** @class */ (function (_super) {
        __extends(CodeMember, _super);
        function CodeMember(value, token, parent) {
            if (token === void 0) { token = null; }
            if (parent === void 0) { parent = null; }
            var _this = _super.call(this, token) || this;
            /**
             * 计算标识
             */
            _this.calc = Calc.NONE;
            _this.value = value;
            _this.parent = parent;
            return _this;
        }
        return CodeMember;
    }(qs.CodeObject));
    qs.CodeMember = CodeMember;
    //计算标识，++或者--
    var Calc;
    (function (Calc) {
        /**
         * 无
         */
        Calc[Calc["NONE"] = 0] = "NONE";
        /**
         * 前置++
         */
        Calc[Calc["PRE_INCREMENT"] = 1] = "PRE_INCREMENT";
        /**
         * 后置++
         */
        Calc[Calc["POST_INCREMENT"] = 2] = "POST_INCREMENT";
        /**
         * 前置--
         */
        Calc[Calc["PRE_DECREMENT"] = 3] = "PRE_DECREMENT";
        /**
         * 后置--
         */
        Calc[Calc["POST_DECREMENT"] = 4] = "POST_DECREMENT";
    })(Calc = qs.Calc || (qs.Calc = {}));
})(qs || (qs = {}));
/// <reference path="CodeObject.ts"/>
var qs;
(function (qs) {
    var CodeModule = /** @class */ (function (_super) {
        __extends(CodeModule, _super);
        function CodeModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CodeModule;
    }(qs.CodeObject));
    qs.CodeModule = CodeModule;
})(qs || (qs = {}));
/// <reference path="CodeObject.ts"/>
var qs;
(function (qs) {
    var CodeNew = /** @class */ (function (_super) {
        __extends(CodeNew, _super);
        function CodeNew(newObject, token) {
            if (token === void 0) { token = null; }
            var _this = _super.call(this, token) || this;
            _this.newObject = newObject;
            return _this;
        }
        return CodeNew;
    }(qs.CodeObject));
    qs.CodeNew = CodeNew;
})(qs || (qs = {}));
/// <reference path="CodeObject.ts"/>
var qs;
(function (qs) {
    /**
     * 运算符号
     */
    var CodeOperator = /** @class */ (function (_super) {
        __extends(CodeOperator, _super);
        function CodeOperator(right, left, operator, token) {
            if (token === void 0) { token = null; }
            var _this = _super.call(this, token) || this;
            _this.left = left;
            _this.right = right;
            _this.operator = operator;
            return _this;
        }
        return CodeOperator;
    }(qs.CodeObject));
    qs.CodeOperator = CodeOperator;
})(qs || (qs = {}));
/// <reference path="CodeObject.ts"/>
var qs;
(function (qs) {
    var CodeScriptObject = /** @class */ (function (_super) {
        __extends(CodeScriptObject, _super);
        function CodeScriptObject(value, token) {
            if (token === void 0) { token = null; }
            var _this = _super.call(this, token) || this;
            _this.value = value;
            return _this;
        }
        return CodeScriptObject;
    }(qs.CodeObject));
    qs.CodeScriptObject = CodeScriptObject;
})(qs || (qs = {}));
/// <reference path="CodeObject.ts"/>
var qs;
(function (qs) {
    var CodeSwitch = /** @class */ (function (_super) {
        __extends(CodeSwitch, _super);
        function CodeSwitch() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.cases = new Array();
            return _this;
        }
        CodeSwitch.prototype.addCase = function (con) {
            this.cases.push(con);
        };
        return CodeSwitch;
    }(qs.CodeObject));
    qs.CodeSwitch = CodeSwitch;
})(qs || (qs = {}));
/// <reference path="CodeObject.ts"/>
var qs;
(function (qs) {
    var CodeTernary = /** @class */ (function (_super) {
        __extends(CodeTernary, _super);
        function CodeTernary() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CodeTernary;
    }(qs.CodeObject));
    qs.CodeTernary = CodeTernary;
})(qs || (qs = {}));
/// <reference path="CodeObject.ts"/>
var qs;
(function (qs) {
    var CodeThrow = /** @class */ (function (_super) {
        __extends(CodeThrow, _super);
        function CodeThrow() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CodeThrow;
    }(qs.CodeObject));
    qs.CodeThrow = CodeThrow;
})(qs || (qs = {}));
/// <reference path="CodeObject.ts"/>
var qs;
(function (qs) {
    var CodeTry = /** @class */ (function (_super) {
        __extends(CodeTry, _super);
        function CodeTry() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CodeTry;
    }(qs.CodeObject));
    qs.CodeTry = CodeTry;
})(qs || (qs = {}));
/// <reference path="CodeObject.ts"/>
var qs;
(function (qs) {
    var CodeTypeof = /** @class */ (function (_super) {
        __extends(CodeTypeof, _super);
        function CodeTypeof(value, token) {
            if (token === void 0) { token = null; }
            var _this = _super.call(this, token) || this;
            _this.value = value;
            return _this;
        }
        return CodeTypeof;
    }(qs.CodeObject));
    qs.CodeTypeof = CodeTypeof;
})(qs || (qs = {}));
/// <reference path="CodeObject.ts"/>
var qs;
(function (qs) {
    /**
     * 成员变量
     */
    var CodeVariable = /** @class */ (function (_super) {
        __extends(CodeVariable, _super);
        function CodeVariable(name, value, modifier, isStatic, type, token) {
            if (token === void 0) { token = null; }
            var _this = _super.call(this, token) || this;
            _this.name = name;
            _this.value = value;
            _this.modifier = modifier;
            _this.isStatic = isStatic;
            _this.type = type;
            return _this;
        }
        return CodeVariable;
    }(qs.CodeObject));
    qs.CodeVariable = CodeVariable;
})(qs || (qs = {}));
/// <reference path="CodeObject.ts"/>
var qs;
(function (qs) {
    var CodeWhile = /** @class */ (function (_super) {
        __extends(CodeWhile, _super);
        function CodeWhile() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CodeWhile;
    }(qs.CodeObject));
    qs.CodeWhile = CodeWhile;
})(qs || (qs = {}));
var qs;
(function (qs) {
    var TempCase = /** @class */ (function () {
        function TempCase(allow, executable) {
            this.allow = allow;
            this.executable = executable;
        }
        return TempCase;
    }());
    qs.TempCase = TempCase;
})(qs || (qs = {}));
var qs;
(function (qs) {
    var TempCondition = /** @class */ (function () {
        function TempCondition(allow, executable) {
            this.allow = allow;
            this.executable = executable;
        }
        return TempCondition;
    }());
    qs.TempCondition = TempCondition;
})(qs || (qs = {}));
var qs;
(function (qs) {
    var TempOperator = /** @class */ (function () {
        function TempOperator(oper, level) {
            /**
             * 优先级
             */
            this.level = 0;
            this.operator = oper;
            this.level = level;
            TempOperator.init();
        }
        TempOperator.init = function () {
            if (this.operators) {
                return;
            }
            this.operators = {};
            this.operators[qs.TokenType.InclusiveOr] = new TempOperator(qs.TokenType.InclusiveOr, 1);
            this.operators[qs.TokenType.Combine] = new TempOperator(qs.TokenType.Combine, 1);
            this.operators[qs.TokenType.XOR] = new TempOperator(qs.TokenType.XOR, 1);
            this.operators[qs.TokenType.Shi] = new TempOperator(qs.TokenType.Shi, 1);
            this.operators[qs.TokenType.Shr] = new TempOperator(qs.TokenType.Shr, 1);
            this.operators[qs.TokenType.And] = new TempOperator(qs.TokenType.And, 1);
            this.operators[qs.TokenType.Or] = new TempOperator(qs.TokenType.Or, 1);
            this.operators[qs.TokenType.Instanceof] = new TempOperator(qs.TokenType.Instanceof, 2);
            this.operators[qs.TokenType.Equal] = new TempOperator(qs.TokenType.Equal, 2);
            this.operators[qs.TokenType.NotEqual] = new TempOperator(qs.TokenType.NotEqual, 2);
            this.operators[qs.TokenType.Greater] = new TempOperator(qs.TokenType.Greater, 2);
            this.operators[qs.TokenType.GreaterOrEqual] = new TempOperator(qs.TokenType.GreaterOrEqual, 2);
            this.operators[qs.TokenType.Less] = new TempOperator(qs.TokenType.Less, 2);
            this.operators[qs.TokenType.LessOrEqual] = new TempOperator(qs.TokenType.LessOrEqual, 2);
            this.operators[qs.TokenType.Plus] = new TempOperator(qs.TokenType.Plus, 3);
            this.operators[qs.TokenType.Minus] = new TempOperator(qs.TokenType.Minus, 3);
            this.operators[qs.TokenType.Multiply] = new TempOperator(qs.TokenType.Multiply, 4);
            this.operators[qs.TokenType.Divide] = new TempOperator(qs.TokenType.Divide, 4);
            this.operators[qs.TokenType.Modulo] = new TempOperator(qs.TokenType.Modulo, 4);
        };
        //获得运算符
        TempOperator.getOper = function (oper) {
            this.init();
            if (this.operators[oper] != undefined) {
                return this.operators[oper];
            }
            return null;
        };
        return TempOperator;
    }());
    qs.TempOperator = TempOperator;
})(qs || (qs = {}));
var qs;
(function (qs) {
    var ExecutionError = /** @class */ (function (_super) {
        __extends(ExecutionError, _super);
        function ExecutionError(token, message) {
            var _this = this;
            var msg = " 行数:" + (token.line + 1) + "  列数:" + token.index + "  标记:" +
                token.name + "  关键字[" + token.lexeme + "]\n\t" + message;
            _this = _super.call(this, !token ? message : msg) || this;
            _this.name = "脚本执行错误";
            return _this;
        }
        return ExecutionError;
    }(Error));
    qs.ExecutionError = ExecutionError;
})(qs || (qs = {}));
var qs;
(function (qs) {
    var ParserError = /** @class */ (function (_super) {
        __extends(ParserError, _super);
        function ParserError(token, message) {
            var _this = this;
            var msg = " 行数:" + (token.line + 1) + "  列数:" + token.index + "  标记:" +
                token.name + "  关键字[" + token.lexeme + "]\n\t" + message;
            _this = _super.call(this, !token ? message : msg) || this;
            _this.name = "脚本解析错误";
            return _this;
        }
        return ParserError;
    }(Error));
    qs.ParserError = ParserError;
})(qs || (qs = {}));
var qs;
(function (qs) {
    var BaseParser = /** @class */ (function () {
        function BaseParser(tokens) {
            /**
             * 当前读到token索引
             */
            this.index = 0;
            this.tokens = tokens;
        }
        /**
         * 是否还有更多需要解析的语法
         */
        BaseParser.prototype.hasMoreTokens = function () {
            return this.index < this.tokens.length;
        };
        /**
         * 获得第一个Token
         */
        BaseParser.prototype.readToken = function () {
            if (!this.hasMoreTokens()) {
                throw new Error("Unexpected end of token stream.");
            }
            return this.tokens[this.index++];
        };
        /**
         * 返回第一个Toke
         */
        BaseParser.prototype.peekToken = function () {
            if (!this.hasMoreTokens()) {
                throw new Error("Unexpected end of token stream.");
            }
            return this.tokens[this.index];
        };
        /**
         * 回滚Token
         */
        BaseParser.prototype.undoToken = function () {
            if (this.index <= 0) {
                throw new Error("No more tokens to undo.");
            }
            --this.index;
        };
        /**
         * 读取,
         */
        BaseParser.prototype.readComma = function () {
            var token = this.readToken();
            if (token.type != qs.TokenType.Comma)
                throw new qs.ParserError(token, "Comma ',' expected.");
        };
        /**
         * 读取 未知字符
         */
        BaseParser.prototype.readIdentifier = function () {
            var token = this.readToken();
            // if (token.type != TokenType.Identifier) {
            //     throw new ParserError(token, "Identifier expected.");
            // }
            return token.lexeme.toString();
        };
        /**
         * 读取{
         */
        BaseParser.prototype.readLeftBrace = function () {
            var token = this.readToken();
            if (token.type != qs.TokenType.LeftBrace)
                throw new qs.ParserError(token, "Left brace '{' expected.");
        };
        /**
         * 读取)
         */
        BaseParser.prototype.readRightPar = function () {
            var token = this.readToken();
            if (token.type != qs.TokenType.RightPar)
                throw new qs.ParserError(token, "Right par ')' expected.");
        };
        /**
         * 读取>
         */
        BaseParser.prototype.readGreater = function () {
            var token = this.readToken();
            if (token.type != qs.TokenType.Greater)
                throw new qs.ParserError(token, "Right par ')' expected.");
        };
        /**
         * 读取}
         */
        BaseParser.prototype.readRightBrace = function () {
            var token = this.readToken();
            if (token.type != qs.TokenType.RightBrace)
                throw new qs.ParserError(token, "Right brace '}' expected.");
        };
        /**
         * 读取[
         */
        BaseParser.prototype.readLeftBracket = function () {
            var token = this.readToken();
            if (token.type != qs.TokenType.LeftBracket)
                throw new qs.ParserError(token, "Left bracket '[' expected for array indexing expression.");
        };
        /**
         * 读取]
         */
        BaseParser.prototype.readRightBracket = function () {
            var token = this.readToken();
            if (token.type != qs.TokenType.RightBracket)
                throw new qs.ParserError(token, "Right bracket ']' expected for array indexing expression.");
        };
        /**
         * 读取(
         */
        BaseParser.prototype.readLeftParenthesis = function () {
            var token = this.readToken();
            if (token.type != qs.TokenType.LeftPar)
                throw new qs.ParserError(token, "Left parenthesis '(' expected.");
        };
        /**
         * 读取)
         */
        BaseParser.prototype.readRightParenthesis = function () {
            var token = this.readToken();
            if (token.type != qs.TokenType.RightPar)
                throw new qs.ParserError(token, "Right parenthesis ')' expected.");
        };
        /**
         * 读取;
         */
        BaseParser.prototype.readSemiColon = function () {
            var token = this.readToken();
            if (token.type != qs.TokenType.SemiColon)
                throw new qs.ParserError(token, "SemiColon ';' expected.");
        };
        /**
         * 读取var
         */
        BaseParser.prototype.readVar = function () {
            var token = this.readToken();
            if (token.type != qs.TokenType.Var)
                throw new qs.ParserError(token, "Var 'var' expected.");
        };
        /**
         * 读取in
         */
        BaseParser.prototype.readIn = function () {
            var token = this.readToken();
            if (token.type != qs.TokenType.In)
                throw new qs.ParserError(token, "In 'in' expected.");
        };
        /**
         * 读取:
         */
        BaseParser.prototype.readColon = function () {
            var token = this.readToken();
            if (token.type != qs.TokenType.Colon)
                throw new qs.ParserError(token, "Colon ':' expected.");
        };
        /**
         * 读取 module
         */
        BaseParser.prototype.readModule = function () {
            var token = this.readToken();
            if (token.type != qs.TokenType.Module) {
                throw new qs.ParserError(token, "Module 'module' expected.");
            }
            return token.lexeme.toString();
        };
        /**
         * 读取class
         */
        BaseParser.prototype.readClass = function () {
            var token = this.readToken();
            if (token.type != qs.TokenType.Class)
                throw new qs.ParserError(token, "Class 'class' expected.");
        };
        /**
         * 读取function
         */
        BaseParser.prototype.readFunction = function () {
            var token = this.readToken();
            if (token.type != qs.TokenType.Function)
                throw new qs.ParserError(token, "function 'function' expected.");
        };
        /**
         * 读取catch
         */
        BaseParser.prototype.readCatch = function () {
            var token = this.readToken();
            if (token.type != qs.TokenType.Catch)
                throw new qs.ParserError(token, "Catch 'catch' expected.");
        };
        /**
         * 获取export修饰符
         */
        BaseParser.prototype.getExport = function () {
            if (this.peekToken().type == qs.TokenType.Export) {
                this.readToken();
                return true;
            }
            return false;
        };
        /**
         * 获取abstract修饰符
         */
        BaseParser.prototype.getAbstract = function () {
            if (this.peekToken().type == qs.TokenType.Abstract) {
                this.readToken();
                return true;
            }
            return false;
        };
        return BaseParser;
    }());
    qs.BaseParser = BaseParser;
})(qs || (qs = {}));
var qs;
(function (qs) {
    /**
     * 词法解析器
     */
    var Lexer = /** @class */ (function () {
        /**
         * 词法解析器
         * @buffer 代码
         */
        function Lexer(buffer) {
            /**
             * 当前存储的单词
             */
            this.word = null;
            /**
             * 所有行
             */
            this.lines = [];
            /**
             * 标记列表
             */
            this.tokens = [];
            this._commentList = [];
            /**
             * 单个注释
             */
            this.commentWord = "";
            /**
             * 摘要的字符数
             */
            this.breviaryLength = 20;
            /**
             * 当前解析行数
             */
            this.line = 0;
            /**
             * 当前解析字符索引
             */
            this.index = 0;
            this._lexType = qs.LexType.None;
            buffer = buffer.replace(/\r\n/g, "\n"); //windows系统换行替换
            var lines = buffer.split("\n"); //获取所有行
            for (var i = 0; i < lines.length; i++) {
                lines[i] += "\n";
            }
            this.breviary = lines[0] || ""; //设置摘要
            this.lines = lines; //设置所有行
        }
        Object.defineProperty(Lexer.prototype, "commentList", {
            /**
             * 注释列表
             */
            get: function () {
                return this._commentList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Lexer.prototype, "lexType", {
            /**
             * 当前词法类型
             */
            get: function () {
                return this._lexType;
            },
            set: function (value) {
                this._lexType = value;
                if (this._lexType == qs.LexType.None) {
                    this.word = "";
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Lexer.prototype, "isEndOfLine", {
            /**
             * 是否一行结束
             */
            get: function () {
                return this.index >= this.lines[this.line].length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Lexer.prototype, "isEndOfBuffer", {
            /**
             * 是否解析结束
             */
            get: function () {
                return this.line >= this.lines.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 读取一个字符
         */
        Lexer.prototype.readChar = function () {
            if (this.isEndOfBuffer) {
                throw new Error("End of source reached." + "at:" + this.line + ":" + this.index);
            }
            var ch = this.lines[this.line].charAt(this.index++);
            if (this.index >= this.lines[this.line].length) {
                this.index = 0;
                ++this.line;
            }
            return ch;
        };
        /**
         * 忽略一行
         */
        Lexer.prototype.ignoreLine = function () {
            ++this.line;
            this.index = 0;
        };
        /**
         * 增加一个标记
         */
        Lexer.prototype.addToken = function (type, lexeme) {
            if (lexeme === void 0) { lexeme = null; }
            lexeme = lexeme != null ? lexeme : this.char;
            this.tokens.push(new qs.Token(type, lexeme, this.line, this.index));
            this.lexType = qs.LexType.None;
        };
        /**
         * 抛出一个无效字符的异常
         */
        Lexer.prototype.throwInvalidCharacterException = function (ch) {
            throw new Error("无效的字符 [" + ch + "]  Line:" + (this.line + 1) + " Column:" + this.index
                + " [" + this.lines[this.line] + "]");
        };
        /**
         * 添加一个注释
         */
        Lexer.prototype.addComment = function () {
            if (qs.Utils.isLetterOrDigit(this.char) || this.char == '@') {
                this.commentWord += this.char;
            }
            else {
                if (this.commentWord.length != 0) {
                    this._commentList.push(this.commentWord);
                }
                this.commentWord = "";
            }
        };
        /**
         * 回滚字符读取
         */
        Lexer.prototype.undoReadChar = function () {
            if (this.line == 0 && this.index == 0) {
                throw new Error("Cannot undo char beyond start of source." + ":" + this.line + ":" + this.index);
            }
            --this.index;
            if (this.index < 0) {
                --this.line;
                this.index = this.lines[this.line].length - 1;
            }
        };
        /**
         * 解析字符串
         */
        Lexer.prototype.getTokens = function () {
            this.line = 0;
            this.index = 0;
            this.lexType = qs.LexType.None;
            this.tokens.length = 0;
            while (!this.isEndOfBuffer) {
                if (this.isEndOfLine) {
                    this.ignoreLine();
                    continue;
                }
                this.char = this.readChar();
                var value;
                switch (this.lexType) {
                    case qs.LexType.None:
                        switch (this.char) {
                            case ' ':
                            case '\t':
                            case '\n':
                            case '\r':
                                break;
                            case '(':
                                this.addToken(qs.TokenType.LeftPar);
                                break;
                            case ')':
                                this.addToken(qs.TokenType.RightPar);
                                break;
                            case '[':
                                this.addToken(qs.TokenType.LeftBracket);
                                break;
                            case ']':
                                this.addToken(qs.TokenType.RightBracket);
                                break;
                            case '{':
                                this.addToken(qs.TokenType.LeftBrace);
                                break;
                            case '}':
                                this.addToken(qs.TokenType.RightBrace);
                                break;
                            case ',':
                                this.addToken(qs.TokenType.Comma);
                                break;
                            case ':':
                                this.addToken(qs.TokenType.Colon);
                                break;
                            case ';':
                                this.addToken(qs.TokenType.SemiColon);
                                break;
                            case '?':
                                this.addToken(qs.TokenType.QuestionMark);
                                break;
                            case '.':
                                this.lexType = qs.LexType.PeriodOrParams;
                                break;
                            case '+':
                                this.lexType = qs.LexType.PlusOrIncrementOrAssignPlus;
                                break;
                            case '-':
                                this.lexType = qs.LexType.MinusOrDecrementOrAssignMinus;
                                break;
                            case '*':
                                this.lexType = qs.LexType.MultiplyOrAssignMultiply;
                                break;
                            case '/':
                                this.lexType = qs.LexType.CommentOrDivideOrAssignDivide;
                                this.addComment();
                                break;
                            case '%':
                                this.lexType = qs.LexType.ModuloOrAssignModulo;
                                break;
                            case '=':
                                this.lexType = qs.LexType.AssignOrEqual;
                                break;
                            case '&':
                                this.lexType = qs.LexType.AndOrCombine;
                                break;
                            case '|':
                                this.lexType = qs.LexType.OrOrInclusiveOr;
                                break;
                            case '!':
                                this.lexType = qs.LexType.NotOrNotEqual;
                                break;
                            case '>':
                                this.lexType = qs.LexType.GreaterOrGreaterEqual;
                                break;
                            case '<':
                                this.lexType = qs.LexType.LessOrLessEqual;
                                break;
                            case '^':
                                this.lexType = qs.LexType.XorOrAssignXor;
                                break;
                            case '@':
                                this.lexType = qs.LexType.SimpleStringStart;
                                break;
                            case "\"":
                                this.lexType = qs.LexType.String;
                                break;
                            case '\'':
                                this.lexType = qs.LexType.SingleString;
                                break;
                            default:
                                if (this.char == '_' || this.char == '$' || qs.Utils.isLetter(this.char)) {
                                    this.lexType = qs.LexType.Identifier;
                                    this.word = "" + this.char;
                                }
                                else if (this.char == '0') {
                                    this.lexType = qs.LexType.NumberOrHexNumber;
                                    this.word = "";
                                }
                                else if (qs.Utils.isDigit(this.char)) {
                                    this.lexType = qs.LexType.Number;
                                    this.word = "" + this.char;
                                }
                                else {
                                    this.throwInvalidCharacterException(this.char);
                                }
                                break;
                        }
                        break;
                    case qs.LexType.PeriodOrParams:
                        if (this.char == '.') {
                            this.lexType = qs.LexType.Params;
                        }
                        else {
                            this.addToken(qs.TokenType.Period, ".");
                            this.undoReadChar();
                        }
                        break;
                    case qs.LexType.Params:
                        if (this.char == '.') {
                            this.addToken(qs.TokenType.Params, "...");
                        }
                        else {
                            this.throwInvalidCharacterException(this.char);
                        }
                        break;
                    case qs.LexType.PlusOrIncrementOrAssignPlus:
                        if (this.char == '+') {
                            this.addToken(qs.TokenType.Increment, "++");
                        }
                        else if (this.char == '=') {
                            this.addToken(qs.TokenType.AssignPlus, "+=");
                        }
                        else {
                            this.addToken(qs.TokenType.Plus, "+");
                            this.undoReadChar();
                        }
                        break;
                    case qs.LexType.MinusOrDecrementOrAssignMinus:
                        if (this.char == '-') {
                            this.addToken(qs.TokenType.Decrement, "--");
                        }
                        else if (this.char == '=') {
                            this.addToken(qs.TokenType.AssignMinus, "-=");
                        }
                        else {
                            this.addToken(qs.TokenType.Minus, "-");
                            this.undoReadChar();
                        }
                        break;
                    case qs.LexType.MultiplyOrAssignMultiply:
                        if (this.char == '=') {
                            this.addToken(qs.TokenType.AssignMultiply, "*=");
                        }
                        else {
                            this.addToken(qs.TokenType.Multiply, "*");
                            this.undoReadChar();
                        }
                        break;
                    case qs.LexType.CommentOrDivideOrAssignDivide:
                        switch (this.char) {
                            case '/':
                                this.lexType = qs.LexType.LineComment;
                                this.addComment();
                                break;
                            case '*':
                                this.lexType = qs.LexType.BlockCommentStart;
                                this.addComment();
                                break;
                            case '=':
                                this.addToken(qs.TokenType.AssignDivide, "/=");
                                break;
                            default:
                                this.addToken(qs.TokenType.Divide, "/");
                                this.undoReadChar();
                                break;
                        }
                        break;
                    case qs.LexType.ModuloOrAssignModulo:
                        if (this.char == '=') {
                            this.addToken(qs.TokenType.AssignModulo, "%=");
                        }
                        else {
                            this.addToken(qs.TokenType.Modulo, "%");
                            this.undoReadChar();
                        }
                        break;
                    case qs.LexType.LineComment:
                        if (this.char == '\n') {
                            this.lexType = qs.LexType.None;
                        }
                        break;
                    case qs.LexType.BlockCommentStart:
                        if (this.char == '*') {
                            this.lexType = qs.LexType.BlockCommentEnd;
                        }
                        this.addComment();
                        break;
                    case qs.LexType.BlockCommentEnd:
                        if (this.char == '/') {
                            this.lexType = qs.LexType.None;
                        }
                        else {
                            this.lexType = qs.LexType.BlockCommentStart;
                        }
                        this.addComment();
                        break;
                    case qs.LexType.AssignOrEqual:
                        if (this.char == '=') {
                            this.addToken(qs.TokenType.Equal, "==");
                        }
                        else {
                            this.addToken(qs.TokenType.Assign, "=");
                            this.undoReadChar();
                        }
                        break;
                    case qs.LexType.AndOrCombine:
                        if (this.char == '&') {
                            this.addToken(qs.TokenType.And, "&&");
                        }
                        else if (this.char == '=') {
                            this.addToken(qs.TokenType.AssignCombine, "&=");
                        }
                        else {
                            this.addToken(qs.TokenType.Combine, "&");
                            this.undoReadChar();
                        }
                        break;
                    case qs.LexType.OrOrInclusiveOr:
                        if (this.char == '|') {
                            this.addToken(qs.TokenType.Or, "||");
                        }
                        else if (this.char == '=') {
                            this.addToken(qs.TokenType.AssignInclusiveOr, "|=");
                        }
                        else {
                            this.addToken(qs.TokenType.InclusiveOr, "|");
                            this.undoReadChar();
                        }
                        break;
                    case qs.LexType.XorOrAssignXor:
                        if (this.char == '=') {
                            this.addToken(qs.TokenType.AssignXOR, "^=");
                        }
                        else {
                            this.addToken(qs.TokenType.XOR, "^");
                            this.undoReadChar();
                        }
                        break;
                    case qs.LexType.GreaterOrGreaterEqual:
                        if (this.char == '=') {
                            this.addToken(qs.TokenType.GreaterOrEqual, ">=");
                        }
                        else if (this.char == '>') {
                            this.lexType = qs.LexType.ShrOrAssignShr;
                        }
                        else {
                            this.addToken(qs.TokenType.Greater, ">");
                            this.undoReadChar();
                        }
                        break;
                    case qs.LexType.LessOrLessEqual:
                        if (this.char == '=') {
                            this.addToken(qs.TokenType.LessOrEqual, "<=");
                        }
                        else if (this.char == '<') {
                            this.lexType = qs.LexType.ShiOrAssignShi;
                        }
                        else {
                            this.addToken(qs.TokenType.Less, "<");
                            this.undoReadChar();
                        }
                        break;
                    case qs.LexType.ShrOrAssignShr:
                        if (this.char == '=') {
                            this.addToken(qs.TokenType.AssignShr, ">>=");
                        }
                        else {
                            this.addToken(qs.TokenType.Shr, ">>");
                            this.undoReadChar();
                        }
                        break;
                    case qs.LexType.ShiOrAssignShi:
                        if (this.char == '=') {
                            this.addToken(qs.TokenType.AssignShi, "<<=");
                        }
                        else {
                            this.addToken(qs.TokenType.Shi, "<<");
                            this.undoReadChar();
                        }
                        break;
                    case qs.LexType.NotOrNotEqual:
                        if (this.char == '=') {
                            this.addToken(qs.TokenType.NotEqual, "!=");
                        }
                        else {
                            this.addToken(qs.TokenType.Not, "!");
                            this.undoReadChar();
                        }
                        break;
                    case qs.LexType.String:
                        if (this.char == "\"") {
                            this.addToken(qs.TokenType.String, this.word);
                        }
                        else if (this.char == '\\') {
                            this.lexType = qs.LexType.StringEscape;
                        }
                        else if (this.char == '\r' || this.char == '\n') {
                            this.throwInvalidCharacterException(this.char);
                        }
                        else {
                            this.word += this.char;
                        }
                        break;
                    case qs.LexType.StringEscape:
                        if (this.char == '\\' || this.char == "\"") {
                            this.word += this.char;
                            this.lexType = qs.LexType.String;
                        }
                        else if (this.char == 't') {
                            this.word += '\t';
                            this.lexType = qs.LexType.String;
                        }
                        else if (this.char == 'r') {
                            this.word += '\r';
                            this.lexType = qs.LexType.String;
                        }
                        else if (this.char == 'n') {
                            this.word += '\n';
                            this.lexType = qs.LexType.String;
                        }
                        else {
                            this.throwInvalidCharacterException(this.char);
                        }
                        break;
                    case qs.LexType.SingleString:
                        if (this.char == '\'') {
                            this.addToken(qs.TokenType.String, this.word);
                        }
                        else if (this.char == '\\') {
                            this.lexType = qs.LexType.SingleStringEscape;
                        }
                        else if (this.char == '\r' || this.char == '\n') {
                            this.throwInvalidCharacterException(this.char);
                        }
                        else {
                            this.word += this.char;
                        }
                        break;
                    case qs.LexType.SingleStringEscape:
                        if (this.char == '\\' || this.char == '\'') {
                            this.word += this.char;
                            this.lexType = qs.LexType.SingleString;
                        }
                        else if (this.char == 't') {
                            this.word += '\t';
                            this.lexType = qs.LexType.SingleString;
                        }
                        else if (this.char == 'r') {
                            this.word += '\r';
                            this.lexType = qs.LexType.SingleString;
                        }
                        else if (this.char == 'n') {
                            this.word += '\n';
                            this.lexType = qs.LexType.SingleString;
                        }
                        else {
                            this.throwInvalidCharacterException(this.char);
                        }
                        break;
                    case qs.LexType.SimpleStringStart:
                        if (this.char == "\"") {
                            this.lexType = qs.LexType.SimpleString;
                        }
                        else if (this.char == '\'') {
                            this.lexType = qs.LexType.SingleSimpleString;
                        }
                        else {
                            this.throwInvalidCharacterException(this.char);
                        }
                        break;
                    case qs.LexType.SimpleString:
                        if (this.char == "\"") {
                            this.lexType = qs.LexType.SimpleStringQuotationMarkOrOver;
                        }
                        else {
                            this.word += this.char;
                        }
                        break;
                    case qs.LexType.SimpleStringQuotationMarkOrOver:
                        if (this.char == "\"") {
                            this.word += "\"";
                            this.lexType = qs.LexType.SimpleString;
                        }
                        else {
                            this.addToken(qs.TokenType.String, this.word);
                            this.undoReadChar();
                        }
                        break;
                    case qs.LexType.SingleSimpleString:
                        if (this.char == '\'') {
                            this.lexType = qs.LexType.SingleSimpleStringQuotationMarkOrOver;
                        }
                        else {
                            this.word += this.char;
                        }
                        break;
                    case qs.LexType.SingleSimpleStringQuotationMarkOrOver:
                        if (this.char == '\'') {
                            this.word += '\'';
                            this.lexType = qs.LexType.SingleSimpleString;
                        }
                        else {
                            this.addToken(qs.TokenType.String, this.word);
                            this.undoReadChar();
                        }
                        break;
                    case qs.LexType.NumberOrHexNumber:
                        if (this.char == 'x') {
                            this.lexType = qs.LexType.HexNumber;
                        }
                        else {
                            this.word = "0";
                            this.lexType = qs.LexType.Number;
                            //							this.addToken(TokenType.Number, 0);
                            this.undoReadChar();
                        }
                        break;
                    case qs.LexType.Number:
                        if (qs.Utils.isDigit(this.char) || this.char == '.') {
                            this.word += this.char;
                        }
                        else {
                            value = parseFloat(this.word);
                            this.addToken(qs.TokenType.Number, value);
                            this.undoReadChar();
                        }
                        break;
                    case qs.LexType.HexNumber:
                        if (qs.Utils.isHexDigit(this.char)) {
                            this.word += this.char;
                        }
                        else {
                            if (qs.Utils.isNullOrEmpty(this.word)) {
                                this.throwInvalidCharacterException(this.char);
                            }
                            value = parseInt("0x" + this.word);
                            this.addToken(qs.TokenType.Number, value);
                            this.undoReadChar();
                        }
                        break;
                    case qs.LexType.Identifier:
                        if (this.char == '_' || this.char == '$' || qs.Utils.isLetterOrDigit(this.char)) {
                            this.word += this.char;
                        }
                        else {
                            var tokenType;
                            switch (this.word) {
                                case "module":
                                case 'namespace':
                                    tokenType = qs.TokenType.Module;
                                    break;
                                case "abstract":
                                    tokenType = qs.TokenType.Abstract;
                                    break;
                                case "export":
                                    tokenType = qs.TokenType.Export;
                                    break;
                                case "class":
                                    tokenType = qs.TokenType.Class;
                                    break;
                                case "interface":
                                    tokenType = qs.TokenType.Interface;
                                    break;
                                case "public":
                                    tokenType = qs.TokenType.Public;
                                    break;
                                case "protected":
                                    tokenType = qs.TokenType.Protected;
                                    break;
                                case "private":
                                    tokenType = qs.TokenType.Private;
                                    break;
                                case "dynamic":
                                    tokenType = qs.TokenType.Dynamic;
                                    break;
                                case "extends":
                                    tokenType = qs.TokenType.Extends;
                                    break;
                                case "override":
                                    tokenType = qs.TokenType.Override;
                                    break;
                                case "void":
                                    tokenType = qs.TokenType.Void;
                                    break;
                                case "NaN":
                                    tokenType = qs.TokenType.NaN;
                                    break;
                                case "import":
                                    tokenType = qs.TokenType.Import;
                                    break;
                                case "static":
                                    tokenType = qs.TokenType.Static;
                                    break;
                                case "get":
                                    if (this.char == " ") {
                                        tokenType = qs.TokenType.Get;
                                    }
                                    else {
                                        tokenType = qs.TokenType.Identifier;
                                    }
                                    break;
                                case "set":
                                    if (this.char == " ") {
                                        tokenType = qs.TokenType.Set;
                                    }
                                    else {
                                        tokenType = qs.TokenType.Identifier;
                                    }
                                    break;
                                case "each":
                                    tokenType = qs.TokenType.Each;
                                    break;
                                case "new":
                                    tokenType = qs.TokenType.New;
                                    break;
                                case "const":
                                    tokenType = qs.TokenType.Const;
                                    break;
                                case "var":
                                    tokenType = qs.TokenType.Var;
                                    break;
                                case "function":
                                    tokenType = qs.TokenType.Function;
                                    break;
                                case "if":
                                    tokenType = qs.TokenType.If;
                                    break;
                                case "else":
                                    tokenType = qs.TokenType.Else;
                                    break;
                                case "while":
                                    tokenType = qs.TokenType.While;
                                    break;
                                case "for":
                                    tokenType = qs.TokenType.For;
                                    break;
                                case "in":
                                    tokenType = qs.TokenType.In;
                                    break;
                                case "switch":
                                    tokenType = qs.TokenType.Switch;
                                    break;
                                case "case":
                                    tokenType = qs.TokenType.Case;
                                    break;
                                case "default":
                                    tokenType = qs.TokenType.Default;
                                    break;
                                case "try":
                                    tokenType = qs.TokenType.Try;
                                    break;
                                case "catch":
                                    tokenType = qs.TokenType.Catch;
                                    break;
                                case "throw":
                                    tokenType = qs.TokenType.Throw;
                                    break;
                                case "continue":
                                    tokenType = qs.TokenType.Continue;
                                    break;
                                case "break":
                                    tokenType = qs.TokenType.Break;
                                    break;
                                case "return":
                                    tokenType = qs.TokenType.Return;
                                    break;
                                case "null":
                                    tokenType = qs.TokenType.Null;
                                    break;
                                case "true":
                                case "false":
                                    tokenType = qs.TokenType.Boolean;
                                    break;
                                case "is":
                                    tokenType = qs.TokenType.Is;
                                    break;
                                case "instanceof":
                                    tokenType = qs.TokenType.Instanceof;
                                    break;
                                case "typeof":
                                    tokenType = qs.TokenType.Typeof;
                                    break;
                                case "delete":
                                    tokenType = qs.TokenType.Delete;
                                    break;
                                case "as":
                                    tokenType = qs.TokenType.As;
                                    break;
                                case "delete":
                                    tokenType = qs.TokenType.Delete;
                                    break;
                                default:
                                    tokenType = qs.TokenType.Identifier;
                                    break;
                            }
                            if (tokenType == qs.TokenType.Boolean) {
                                this.tokens.push(new qs.Token(tokenType, this.word == "true", this.line, this.index));
                            }
                            else if (tokenType == qs.TokenType.Null) {
                                this.tokens.push(new qs.Token(tokenType, null, this.line, this.index));
                            }
                            else if (tokenType == qs.TokenType.NaN) {
                                this.tokens.push(new qs.Token(tokenType, NaN, this.line, this.index));
                            }
                            else {
                                this.tokens.push(new qs.Token(tokenType, this.word, this.line, this.index));
                            }
                            this.undoReadChar();
                            this.lexType = qs.LexType.None;
                        }
                        break;
                }
            }
            return this.tokens;
        };
        return Lexer;
    }());
    qs.Lexer = Lexer;
})(qs || (qs = {}));
var qs;
(function (qs) {
    /**
     * 词法类型
     */
    var LexType;
    (function (LexType) {
        /**
         * 没有关键字
         */
        LexType[LexType["None"] = 0] = "None";
        /**
         * = 等于或者相等
         */
        LexType[LexType["AssignOrEqual"] = 1] = "AssignOrEqual";
        /**
         * / 注释或者除号
         */
        LexType[LexType["CommentOrDivideOrAssignDivide"] = 2] = "CommentOrDivideOrAssignDivide";
        /**
         * 行注释
         */
        LexType[LexType["LineComment"] = 3] = "LineComment";
        /**
         * 区域注释开始
         */
        LexType[LexType["BlockCommentStart"] = 4] = "BlockCommentStart";
        /**
         * 区域注释结束
         */
        LexType[LexType["BlockCommentEnd"] = 5] = "BlockCommentEnd";
        /**
         * .或者多参符(...)
         */
        LexType[LexType["PeriodOrParams"] = 6] = "PeriodOrParams";
        /**
         * 多参符(...)
         */
        LexType[LexType["Params"] = 7] = "Params";
        /**
         * + 或者 ++ 或者 +=
         */
        LexType[LexType["PlusOrIncrementOrAssignPlus"] = 8] = "PlusOrIncrementOrAssignPlus";
        /**
         * - 或者 -=
         */
        LexType[LexType["MinusOrDecrementOrAssignMinus"] = 9] = "MinusOrDecrementOrAssignMinus";
        /**
         * * 或者 *=
         */
        LexType[LexType["MultiplyOrAssignMultiply"] = 10] = "MultiplyOrAssignMultiply";
        /**
         * % 或者 %=
         */
        LexType[LexType["ModuloOrAssignModulo"] = 11] = "ModuloOrAssignModulo";
        /**
         * & 或者 &= 或者 &&
         */
        LexType[LexType["AndOrCombine"] = 12] = "AndOrCombine";
        /**
         * | 或者 |= 或者 ||
         */
        LexType[LexType["OrOrInclusiveOr"] = 13] = "OrOrInclusiveOr";
        /**
         * ^ 或者 ^=
         */
        LexType[LexType["XorOrAssignXor"] = 14] = "XorOrAssignXor";
        /**
         * << 或者 <<=
         */
        LexType[LexType["ShiOrAssignShi"] = 15] = "ShiOrAssignShi";
        /**
         * >> 或者 >>=
         */
        LexType[LexType["ShrOrAssignShr"] = 16] = "ShrOrAssignShr";
        /**
         * ! 非或者不等于
         */
        LexType[LexType["NotOrNotEqual"] = 17] = "NotOrNotEqual";
        /**
         * > 大于或者大于等于
         */
        LexType[LexType["GreaterOrGreaterEqual"] = 18] = "GreaterOrGreaterEqual";
        /**
         * < 小于或者小于等于
         */
        LexType[LexType["LessOrLessEqual"] = 19] = "LessOrLessEqual";
        /**
         * " 字符串
         */
        LexType[LexType["String"] = 20] = "String";
        /**
         * \ 格式符
         */
        LexType[LexType["StringEscape"] = 21] = "StringEscape";
        /**
         * ' 字符串 单引号开始结束</summary>
         */
        LexType[LexType["SingleString"] = 22] = "SingleString";
        /**
         * \ 格式符</summary>
         */
        LexType[LexType["SingleStringEscape"] = 23] = "SingleStringEscape";
        /**
         * @ 开始字符串
         */
        LexType[LexType["SimpleStringStart"] = 24] = "SimpleStringStart";
        /**
         * @" 不格式化的字符串 类似c# @符号
         */
        LexType[LexType["SimpleString"] = 25] = "SimpleString";
        /**
         * 字符串内出现"是引号还是结束符
         */
        LexType[LexType["SimpleStringQuotationMarkOrOver"] = 26] = "SimpleStringQuotationMarkOrOver";
        /**
         * @" 不格式化的字符串 类似c# @符号
         */
        LexType[LexType["SingleSimpleString"] = 27] = "SingleSimpleString";
        /**
         * 字符串内出现"是引号还是结束符
         */
        LexType[LexType["SingleSimpleStringQuotationMarkOrOver"] = 28] = "SingleSimpleStringQuotationMarkOrOver";
        /**
         * 十进制数字或者十六进制数字
         */
        LexType[LexType["NumberOrHexNumber"] = 29] = "NumberOrHexNumber";
        /**
         * 十进制数字
         */
        LexType[LexType["Number"] = 30] = "Number";
        /**
         * 十六进制数字
         */
        LexType[LexType["HexNumber"] = 31] = "HexNumber";
        /**
         * 描述符
         */
        LexType[LexType["Identifier"] = 32] = "Identifier";
    })(LexType = qs.LexType || (qs.LexType = {}));
})(qs || (qs = {}));
/// <reference path="BaseParser.ts"/>
var qs;
(function (qs) {
    /**
     * 语法解析器
     */
    var Parser = /** @class */ (function (_super) {
        __extends(Parser, _super);
        /**
         * 语法解析器
         * @tokens 标记列表
         * @breviary 摘要
         */
        function Parser(tokens, globalObj) {
            var _this = _super.call(this, tokens) || this;
            /**
             * 脚本类数据
             */
            _this.classPathMap = {};
            /**
             * 所有的脚本类
             */
            _this.codeClassList = [];
            _this.globalObj = globalObj;
            _this.parse();
            return _this;
        }
        /**
         * 解析脚本
         * @returns 脚本类数据
         */
        Parser.prototype.parse = function () {
            while (this.hasMoreTokens()) {
                this._parse();
            }
            return this.classPathMap;
        };
        Parser.prototype._parse = function () {
            var owner = this.parseModule();
            if (owner) {
                this.readLeftBrace();
            }
            while (true) {
                var codeClass = new qs.CodeClass();
                codeClass.owner = owner;
                //解析类
                this.parseClass(codeClass);
                if (!this.hasMoreTokens() ||
                    (codeClass.owner && this.peekToken().type == qs.TokenType.RightBrace)) {
                    break;
                }
            }
            if (owner) {
                this.readRightBrace();
            }
            return codeClass;
        };
        /**
         * 解析模块
         */
        Parser.prototype.parseModule = function () {
            var codeModule = null;
            if (this.peekToken().type == qs.TokenType.Module) {
                this.readModule();
                var moduleName = this.readIdentifier();
                codeModule = new qs.CodeModule(this.peekToken());
                var classPathMap = this.classPathMap[moduleName] || {};
                this.classPathMap[moduleName] = classPathMap;
                codeModule.value = moduleName;
                codeModule.classPathMap = classPathMap;
                while (this.peekToken().type == qs.TokenType.Period) {
                    this.readToken();
                    moduleName = this.readIdentifier();
                    var childModule = new qs.CodeModule(this.peekToken());
                    childModule.value = moduleName;
                    childModule.parent = codeModule;
                    codeModule = childModule;
                    classPathMap = classPathMap[moduleName] = classPathMap[moduleName] || {};
                    codeModule.classPathMap = classPathMap;
                }
            }
            return codeModule;
        };
        /**
         * 解析类
         */
        Parser.prototype.parseClass = function (codeClass) {
            var isExport = this.getExport(); //是否导出
            var isAbstract = this.getAbstract(); //是否抽象
            this.readClass(); //读取class关键字
            codeClass.name = this.readIdentifier(); //读取类名
            if (codeClass.owner) {
                codeClass.owner.classPathMap[codeClass.name] = codeClass;
            }
            else {
                this.classPathMap[codeClass.name] = codeClass;
            }
            this.codeClassList.push(codeClass);
            this.readExtend(codeClass); //读取继承
            this.readMembers(codeClass); //读取成员
        };
        /**
         * 读取成员
         */
        Parser.prototype.readMembers = function (codeClass) {
            if (codeClass === void 0) { codeClass = null; }
            this.readLeftBrace(); //读取{
            while (this.peekToken().type != qs.TokenType.RightBrace) {
                var token = this.peekToken();
                var isStatic = false;
                var isGet = false;
                var isSet = false;
                var modifier = qs.TokenType.Public;
                if (token.type == qs.TokenType.Public || token.type == qs.TokenType.Private || token.type == qs.TokenType.Protected) {
                    modifier = token.type;
                    this.readToken();
                    token = this.peekToken();
                }
                if (token.type == qs.TokenType.Static) {
                    this.readToken();
                    isStatic = true;
                }
                if (token.type == qs.TokenType.Get) {
                    this.readToken();
                    isGet = true;
                }
                if (token.type == qs.TokenType.Set) {
                    this.readToken();
                    isSet = true;
                }
                var key = this.readToken().lexeme;
                if (this.peekToken().type == qs.TokenType.LeftPar) {
                    this.undoToken();
                    this.undoToken();
                    codeClass.addFunction(this.parseFunctionDeclaration(modifier, isStatic));
                }
                else {
                    var type = null; //属性类型
                    if (this.peekToken().type == qs.TokenType.Colon) {
                        if (codeClass.isObject) {
                            this.readToken();
                            type = this.getObject();
                        }
                        else {
                            this.readToken();
                            type = this.getOneObject(true);
                        }
                    }
                    if (this.peekToken().type == qs.TokenType.Assign) {
                        this.readToken();
                        token = this.peekToken();
                        if (token.type == qs.TokenType.New) {
                            token = this.readToken();
                            codeClass.addVariable(new qs.CodeVariable(key, this.getNew(), modifier, isStatic, type, token));
                        }
                        else {
                            codeClass.addVariable(new qs.CodeVariable(key, this.getObject(), modifier, isStatic, type, token));
                        }
                    }
                    else {
                        if (!codeClass.name) {
                            codeClass.addVariable(new qs.CodeVariable(key, type || key, modifier, isStatic, type, token));
                        }
                        else {
                            codeClass.addVariable(new qs.CodeVariable(key, undefined, modifier, isStatic, type, token));
                        }
                    }
                }
                var peek = this.peekToken();
                if (peek.type == qs.TokenType.Comma || peek.type == qs.TokenType.SemiColon) {
                    this.readToken();
                }
            }
            this.readRightBrace();
        };
        /**
         * 解析区域代码内容( {} 之间的内容)
         */
        Parser.prototype.parseStatementBlock = function (executable, readLeftBrace, finished) {
            if (readLeftBrace === void 0) { readLeftBrace = true; }
            if (finished === void 0) { finished = qs.TokenType.RightBrace; }
            if (readLeftBrace) {
                this.readLeftBrace();
            }
            var tokenType;
            while (this.hasMoreTokens()) {
                tokenType = this.readToken().type;
                if (tokenType == finished) {
                    break;
                }
                this.undoToken();
                this.parseStatement(executable);
            }
        };
        //解析区域代码内容 ({} 之间的内容)
        Parser.prototype.parseStatement = function (executable) {
            var token = this.readToken();
            switch (token.type) {
                case qs.TokenType.Public:
                    throw new qs.ParserError(token, "方法内的声明不支持public ");
                case qs.TokenType.Protected:
                    throw new qs.ParserError(token, "方法内的声明不支持protected ");
                case qs.TokenType.Private:
                    throw new qs.ParserError(token, "方法内的声明不支持private ");
                case qs.TokenType.Var:
                    this.parseVar(executable);
                    break;
                case qs.TokenType.If:
                    this.parseIf(executable);
                    break;
                case qs.TokenType.For:
                    this.parseFor(executable);
                    break;
                case qs.TokenType.While:
                    this.parseWhile(executable);
                    break;
                case qs.TokenType.Switch:
                    this.parseSwtich(executable);
                    break;
                case qs.TokenType.Try:
                    this.parseTry(executable);
                    break;
                case qs.TokenType.Throw:
                    this.parseThrow(executable);
                    break;
                case qs.TokenType.Return:
                    this.parseReturn(executable);
                    break;
                case qs.TokenType.Identifier:
                case qs.TokenType.Increment:
                case qs.TokenType.Decrement:
                    this.parseExpression(executable);
                    break;
                case qs.TokenType.New:
                    this.getNew(executable);
                    break;
                case qs.TokenType.Typeof:
                    this.getTypeof(executable);
                    break;
                case qs.TokenType.Delete:
                    this.getDelete(executable);
                    break;
                case qs.TokenType.Break:
                    executable.addInstruction(new qs.Instruction(qs.Opcode.BREAK, new qs.CodeObject(token), token));
                    break;
                case qs.TokenType.Continue:
                    executable.addInstruction(new qs.Instruction(qs.Opcode.CONTINUE, new qs.CodeObject(token), token));
                    break;
                case qs.TokenType.Function:
                    var codeFunction = this.parseFunction();
                    if (codeFunction.autoCall) {
                        executable.addInstruction(new qs.Instruction(qs.Opcode.CALL_FUNCTION, codeFunction, token));
                    }
                    break;
                case qs.TokenType.SemiColon:
                    break;
                case qs.TokenType.LeftPar:
                    this.parseStatementBlock(executable, false, qs.TokenType.RightPar);
                    break;
                case qs.TokenType.As:
                    this.getObject();
                    break;
                default:
                    throw new qs.ParserError(token, "不支持的语法 ");
            }
        };
        //解析Var关键字
        Parser.prototype.parseVar = function (executable) {
            for (;;) {
                executable.addInstruction(new qs.Instruction(qs.Opcode.VAR, this.readIdentifier(), this.peekToken()));
                var peek = this.peekToken();
                if (peek.type == qs.TokenType.Colon) {
                    this.readToken();
                    this.readToken();
                    peek = this.peekToken();
                }
                if (peek.type == qs.TokenType.Assign) {
                    this.undoToken();
                    this.undoToken();
                    if (this.peekToken().type == qs.TokenType.Colon) {
                        this.undoToken();
                    }
                    else {
                        this.readToken();
                    }
                    this.parseStatement(executable);
                }
                peek = this.readToken();
                if (peek.type != qs.TokenType.Comma) {
                    this.undoToken();
                    break;
                }
            }
        };
        //解析if(判断语句)
        Parser.prototype.parseIf = function (executable) {
            var ret = new qs.CodeIf();
            ret.If = this.parseCondition(true, new qs.Executable(qs.BlockType.If, executable));
            for (;;) {
                var token = this.readToken();
                if (token.type == qs.TokenType.Else) {
                    if (this.peekToken().type == qs.TokenType.If) {
                        this.readToken();
                        ret.addElseIf(this.parseCondition(true, new qs.Executable(qs.BlockType.If, executable)));
                    }
                    else {
                        this.undoToken();
                        break;
                    }
                }
                else {
                    this.undoToken();
                    break;
                }
            }
            if (this.peekToken().type == qs.TokenType.Else) {
                this.readToken();
                ret.Else = this.parseCondition(false, new qs.Executable(qs.BlockType.If, executable));
            }
            executable.addInstruction(new qs.Instruction(qs.Opcode.CALL_IF, ret, this.peekToken()));
        };
        //解析判断内容
        Parser.prototype.parseCondition = function (condition, executable) {
            var con = null;
            if (condition) {
                this.readLeftParenthesis();
                con = this.getObject();
                this.readRightParenthesis();
            }
            this.parseStatementBlock(executable);
            return new qs.TempCondition(con, executable);
        };
        //解析for语句
        Parser.prototype.parseFor = function (executable) {
            this.readToken();
            this.readToken();
            this.readToken();
            if (this.peekToken().type == qs.TokenType.In) {
                this.undoToken();
                this.undoToken();
                this.undoToken();
                this.parseForeach(executable);
            }
            else {
                this.undoToken();
                this.undoToken();
                this.undoToken();
                this.readLeftParenthesis();
                var partIndex = this.index;
                var token = this.readToken();
                if (token.type == qs.TokenType.Identifier) {
                    var assign = this.readToken();
                    if (assign.type == qs.TokenType.Assign) {
                        var obj = this.getObject();
                        var comma = this.readToken();
                        if (comma.type == qs.TokenType.Comma) {
                            this.parseFor_Simple(executable, token.lexeme + "", obj);
                            return;
                        }
                    }
                }
                this.index = partIndex;
                this.parseFor_impl(executable);
            }
        };
        //解析单纯for循环
        Parser.prototype.parseFor_Simple = function (executable, Identifier, obj) {
            var ret = new qs.CodeForSimple();
            ret.identifier = Identifier;
            ret.begin = obj;
            ret.finished = this.getObject();
            if (this.peekToken().type == qs.TokenType.Comma) {
                this.readToken();
                ret.step = this.getObject();
            }
            this.readRightParenthesis();
            var forExecutable = new qs.Executable(qs.BlockType.For, executable);
            this.parseStatementBlock(forExecutable);
            ret.setContextExecutable(forExecutable);
            executable.addInstruction(new qs.Instruction(qs.Opcode.CALL_FORSIMPLE, ret, this.peekToken()));
        };
        //解析正规for循环
        Parser.prototype.parseFor_impl = function (executable) {
            var ret = new qs.CodeFor();
            var token = this.readToken();
            if (token.type != qs.TokenType.SemiColon) {
                this.undoToken();
                var forBeginExecutable = new qs.Executable(qs.BlockType.ForBegin, executable);
                this.parseStatementBlock(forBeginExecutable, false, qs.TokenType.SemiColon);
                ret.beginExecutable = forBeginExecutable;
            }
            token = this.readToken();
            if (token.type != qs.TokenType.SemiColon) {
                this.undoToken();
                ret.condition = this.getObject();
                this.readSemiColon();
            }
            token = this.readToken();
            if (token.type != qs.TokenType.RightPar) {
                this.undoToken();
                var forLoopExecutable = new qs.Executable(qs.BlockType.ForLoop, executable);
                this.parseStatementBlock(forLoopExecutable, false, qs.TokenType.RightPar);
                ret.loopExecutable = forLoopExecutable;
            }
            var forExecutable = new qs.Executable(qs.BlockType.For, executable);
            this.parseStatementBlock(forExecutable);
            ret.setContextExecutable(forExecutable);
            executable.addInstruction(new qs.Instruction(qs.Opcode.CALL_FOR, ret, this.peekToken()));
        };
        //解析foreach语句
        Parser.prototype.parseForeach = function (executable) {
            var ret = new qs.CodeForIn();
            this.readLeftParenthesis();
            this.readVar();
            ret.identifier = this.readIdentifier();
            if (this.peekToken().type == qs.TokenType.Colon) {
                this.readColon();
                this.readIdentifier();
            }
            this.readIn();
            ret.loopObject = this.getObject();
            this.readRightParenthesis();
            var forEachExecutable = new qs.Executable(qs.BlockType.Forin, executable);
            this.parseStatementBlock(forEachExecutable);
            ret.executable = forEachExecutable;
            executable.addInstruction(new qs.Instruction(qs.Opcode.CALL_FORIN, ret, this.peekToken()));
        };
        //解析while（循环语句）
        Parser.prototype.parseWhile = function (executable) {
            var ret = new qs.CodeWhile();
            ret.while = this.parseCondition(true, new qs.Executable(qs.BlockType.While, executable));
            executable.addInstruction(new qs.Instruction(qs.Opcode.CALL_WHILE, ret, this.peekToken()));
        };
        //解析swtich语句
        Parser.prototype.parseSwtich = function (executable) {
            var ret = new qs.CodeSwitch();
            this.readLeftParenthesis();
            ret.condition = this.getObject();
            this.readRightParenthesis();
            this.readLeftBrace();
            for (;;) {
                var token = this.readToken();
                if (token.type == qs.TokenType.Case) {
                    var vals = [];
                    this.parseCase(vals);
                    var switchExecutable = new qs.Executable(qs.BlockType.Switch, executable);
                    this.parseStatementBlock(switchExecutable, false, qs.TokenType.Break);
                    ret.addCase(new qs.TempCase(vals, switchExecutable));
                }
                else if (token.type == qs.TokenType.Default) {
                    this.readColon();
                    var switchExecutable = new qs.Executable(qs.BlockType.Switch, executable);
                    this.parseStatementBlock(switchExecutable, false, qs.TokenType.Break);
                    ret.default = new qs.TempCase(null, switchExecutable);
                }
                else if (token.type != qs.TokenType.SemiColon) {
                    this.undoToken();
                    break;
                }
            }
            this.readRightBrace();
            executable.addInstruction(new qs.Instruction(qs.Opcode.CALL_SWITCH, ret, this.peekToken()));
        };
        //解析case
        Parser.prototype.parseCase = function (vals) {
            // var val = this.readToken();
            // if (val.type == TokenType.String || val.type == TokenType.Number) {
            vals.push(this.getObject(false));
            // }
            // else {
            //     throw new ParserError(val, "case 语句 只支持 string和number类型");
            // }
            this.readColon();
            if (this.readToken().type == qs.TokenType.Case) {
                this.parseCase(vals);
            }
            else {
                this.undoToken();
            }
        };
        //解析try catch
        Parser.prototype.parseTry = function (executable) {
            var ret = new qs.CodeTry();
            var exec = new qs.Executable(qs.BlockType.Function, executable);
            this.parseStatementBlock(exec);
            ret.tryExecutable = exec;
            this.readCatch();
            this.readLeftParenthesis();
            ret.identifier = this.readIdentifier();
            var peek = this.peekToken();
            if (peek.type == qs.TokenType.Colon) {
                this.readToken();
                this.readToken();
                peek = this.peekToken();
            }
            this.readRightParenthesis();
            exec = new qs.Executable(qs.BlockType.Function, executable);
            this.parseStatementBlock(exec);
            ret.catchExecutable = exec;
            executable.addInstruction(new qs.Instruction(qs.Opcode.CALL_TRY, ret, this.peekToken()));
        };
        //解析throw
        Parser.prototype.parseThrow = function (executable) {
            var ret = new qs.CodeThrow();
            ret.obj = this.getObject();
            executable.addInstruction(new qs.Instruction(qs.Opcode.THROW, ret, this.peekToken()));
        };
        //解析return
        Parser.prototype.parseReturn = function (executable) {
            var peek = this.peekToken();
            if (peek.type == qs.TokenType.RightBrace ||
                peek.type == qs.TokenType.SemiColon) {
                executable.addInstruction(new qs.Instruction(qs.Opcode.RET, null, this.peekToken()));
            }
            else {
                executable.addInstruction(new qs.Instruction(qs.Opcode.RET, this.getObject(), this.peekToken()));
            }
        };
        //解析表达式
        Parser.prototype.parseExpression = function (executable) {
            this.undoToken();
            var peek = this.peekToken();
            var member = this.getObject();
            if (member instanceof qs.CodeCallFunction) {
                executable.addInstruction(new qs.Instruction(qs.Opcode.CALL_FUNCTION, member, peek));
            }
            else if (member instanceof qs.CodeMember) {
                if (member.calc != qs.Calc.NONE) {
                    executable.addInstruction(new qs.Instruction(qs.Opcode.RESOLVE, member, peek));
                }
                // else if (this.peekToken().type != TokenType.RightPar) {
                //     throw new ParserError(peek, "变量后缀不支持此操作符  " + this.peekToken().lexeme);
                // }
            }
            else if (member instanceof qs.CodeAssign) {
                executable.addInstruction(new qs.Instruction(qs.Opcode.RESOLVE, member, peek));
            }
            else if (member instanceof qs.CodeOperator) {
                executable.addInstruction(new qs.Instruction(qs.Opcode.RESOLVE, member, peek));
            }
            else {
                throw new qs.ParserError(peek, "语法不支持起始符号为 " + peek.lexeme);
            }
        };
        Parser.prototype.getOneObject = function (isType) {
            if (isType === void 0) { isType = false; }
            var codeObject = null;
            var token = this.readToken();
            var not = false;
            var doubleNot = false;
            var negative = false;
            var calc = qs.Calc.NONE;
            if (token.type == qs.TokenType.Not) {
                not = true;
                token = this.readToken();
                if (token.type == qs.TokenType.Not) {
                    not = false;
                    doubleNot = true;
                    token = this.readToken();
                }
            }
            else if (token.type == qs.TokenType.Minus) {
                negative = true;
                token = this.readToken();
            }
            else if (token.type == qs.TokenType.Increment) {
                calc = qs.Calc.PRE_INCREMENT;
                token = this.readToken();
            }
            else if (token.type == qs.TokenType.Decrement) {
                calc = qs.Calc.PRE_DECREMENT;
                token = this.readToken();
            }
            switch (token.type) {
                case qs.TokenType.Identifier:
                    codeObject = new qs.CodeMember(token.lexeme, token);
                    break;
                case qs.TokenType.LeftPar://()=>void、():void=>{}
                    if (!isType) {
                        //lambda表达式-todo
                        codeObject = this.getObject();
                        this.readRightParenthesis();
                    }
                    else {
                        var token = this.peekToken();
                        while (token.type != qs.TokenType.Assign) {
                            token = this.readToken();
                        }
                        this.readGreater();
                        var type = this.getOneObject();
                        codeObject = Function;
                    }
                    break;
                case qs.TokenType.Function:
                    codeObject = this.parseFunction();
                    break;
                case qs.TokenType.LeftBracket:
                    this.undoToken();
                    codeObject = this.getArray();
                    break;
                case qs.TokenType.LeftBrace:
                    this.undoToken();
                    codeObject = new qs.CodeClass();
                    codeObject.isObject = true;
                    this.readMembers(codeObject);
                    break;
                case qs.TokenType.Void:
                case qs.TokenType.Null:
                case qs.TokenType.NaN:
                case qs.TokenType.Boolean:
                case qs.TokenType.Number:
                case qs.TokenType.String:
                    codeObject = new qs.CodeScriptObject(token.lexeme, token);
                    break;
                case qs.TokenType.New:
                    codeObject = this.getNew();
                    break;
                case qs.TokenType.Typeof:
                    codeObject = this.getTypeof();
                    break;
                case qs.TokenType.Delete:
                    codeObject = this.getDelete();
                    break;
                default:
                    throw new qs.ParserError(token, "Object起始关键字错误 ");
            }
            codeObject = this.getVariable(codeObject);
            codeObject.not = not;
            codeObject.doubleNot = doubleNot;
            codeObject.negative = negative;
            if (codeObject instanceof qs.CodeMember) {
                if (calc != qs.Calc.NONE) {
                    codeObject.calc = calc;
                }
                else {
                    var token = this.readToken();
                    if (token.type == qs.TokenType.Increment) {
                        calc = qs.Calc.POST_INCREMENT;
                    }
                    else if (token.type == qs.TokenType.Decrement) {
                        calc = qs.Calc.POST_DECREMENT;
                    }
                    else {
                        this.undoToken();
                    }
                    if (calc != qs.Calc.NONE) {
                        codeObject.calc = calc;
                    }
                }
            }
            else if (calc != qs.Calc.NONE) {
                throw new qs.ParserError(token, "++ 或者 -- 只支持变量的操作");
            }
            return codeObject;
        };
        /**
         * 解析匿名函数
         */
        Parser.prototype.parseFunction = function () {
            return this.parseFunctionDeclaration();
        };
        /**
         * 解析成员函数
         */
        Parser.prototype.parseFunctionDeclaration = function (modifier, isStatic) {
            if (modifier === void 0) { modifier = qs.TokenType.Public; }
            if (isStatic === void 0) { isStatic = false; }
            var token = this.readToken();
            var functionType = qs.FunctionType.Normal;
            if (token.type == qs.TokenType.Get) {
                functionType = qs.FunctionType.Get;
            }
            if (token.type == qs.TokenType.Set) {
                functionType = qs.FunctionType.Set;
            }
            var name = null;
            if (token.type != qs.TokenType.LeftPar && this.peekToken().type != qs.TokenType.RightPar) {
                name = this.readIdentifier();
                name = functionType == qs.FunctionType.Get ? ".get." + name : name;
                name = functionType == qs.FunctionType.Set ? ".set." + name : name;
            }
            if (token.type != qs.TokenType.LeftPar) {
                this.readLeftParenthesis();
            }
            var params = [];
            var types = [];
            var values = [];
            var isDynamicParams = false;
            if (this.peekToken().type != qs.TokenType.RightPar) {
                while (true) {
                    token = this.readToken();
                    if (token.type == qs.TokenType.Params) {
                        token = this.readToken();
                        isDynamicParams = true;
                    }
                    if (token.type != qs.TokenType.Identifier) {
                        throw new qs.ParserError(token, "Unexpected token '" + token.lexeme + "' in function declaration.");
                    }
                    var strParameterName = token.lexeme.toString();
                    token = this.peekToken();
                    if (token.type == qs.TokenType.QuestionMark) {
                        this.readToken();
                    }
                    if (token.type == qs.TokenType.Colon) {
                        this.readColon();
                        var codeObject = this.getObject();
                        if (codeObject instanceof qs.CodeAssign) {
                            types.push(codeObject.member);
                            values.push(codeObject.value);
                        }
                        else {
                            types.push(codeObject);
                            values.push(undefined);
                        }
                    }
                    else if (token.type == qs.TokenType.Assign) {
                        this.undoToken();
                        var codeAssign = this.getObject();
                        values.push(codeAssign.value);
                    }
                    else {
                        types.push(null);
                        values.push(undefined);
                    }
                    params.push(strParameterName);
                    token = this.peekToken();
                    if (token.type == qs.TokenType.Comma && !isDynamicParams) {
                        this.readComma();
                    }
                    else if (token.type == qs.TokenType.RightPar) {
                        break;
                    }
                    else {
                        throw new qs.ParserError(token, "Comma ',' or right parenthesis ')' expected in function declararion.");
                    }
                }
            }
            this.readRightParenthesis();
            token = this.readToken();
            if (token.type == qs.TokenType.Colon) {
                this.getObject();
            }
            else {
                this.undoToken();
            }
            var executable = new qs.Executable(qs.BlockType.Function);
            this.parseStatementBlock(executable);
            var codeFunction = new qs.CodeFunction(name, isStatic, params, types, values, executable, isDynamicParams, token);
            token = this.readToken();
            this.undoToken();
            if (token.type == qs.TokenType.LeftPar) {
                codeFunction.parameters = this.getCallFunction(null).parameters;
                codeFunction.autoCall = true;
            }
            return codeFunction;
        };
        //返回三元运算符
        Parser.prototype.getTernary = function (parent) {
            if (this.peekToken().type == qs.TokenType.QuestionMark) {
                var ret = new qs.CodeTernary();
                ret.allow = parent;
                this.readToken();
                ret.true = this.getObject(false);
                this.readColon();
                ret.false = this.getObject(false);
                return ret;
            }
            return parent;
        };
        /**
         * 获取数组
         */
        Parser.prototype.getArray = function () {
            this.readLeftBracket();
            var token = this.peekToken();
            var codeArray = new qs.CodeArray();
            while (token.type != qs.TokenType.RightBracket) {
                if (this.peekToken().type == qs.TokenType.RightBracket) {
                    break;
                }
                codeArray.elements.push(this.getObject());
                token = this.peekToken();
                if (token.type == qs.TokenType.Comma) {
                    this.readComma();
                }
                else if (token.type == qs.TokenType.RightBracket) {
                    break;
                }
                else
                    throw new qs.ParserError(token, "Comma ',' or right parenthesis ']' expected in array object.");
            }
            this.readRightBracket();
            return codeArray;
        };
        //返回实例化
        Parser.prototype.getNew = function (executable) {
            if (executable === void 0) { executable = null; }
            var codeNew = new qs.CodeNew(this.getObject(), this.peekToken());
            if (executable != null) {
                executable.addInstruction(new qs.Instruction(qs.Opcode.NEW, codeNew, this.peekToken()));
            }
            return codeNew;
        };
        //返回typeof
        Parser.prototype.getTypeof = function (executable) {
            if (executable === void 0) { executable = null; }
            var codeTypeof = new qs.CodeTypeof(this.getObject(), this.peekToken());
            if (executable != null) {
                executable.addInstruction(new qs.Instruction(qs.Opcode.Typeof, codeTypeof, this.peekToken()));
            }
            return codeTypeof;
        };
        //返回delete
        Parser.prototype.getDelete = function (executable) {
            if (executable === void 0) { executable = null; }
            var codeDelete = new qs.CodeDelete(this.getObject(), this.peekToken());
            if (executable != null) {
                executable.addInstruction(new qs.Instruction(qs.Opcode.Delete, codeDelete, this.peekToken()));
            }
            return codeDelete;
        };
        /**
         * 获取变量数据
         */
        Parser.prototype.getVariable = function (parent) {
            var codeObject = parent;
            for (;;) {
                var token = this.readToken();
                if (token.type == qs.TokenType.Period) {
                    var identifier = this.readIdentifier();
                    codeObject = new qs.CodeMember(identifier, this.peekToken(), codeObject);
                    if (this.peekToken().type == qs.TokenType.LeftBracket) {
                        this.readToken();
                        if (this.peekToken().type == qs.TokenType.RightBracket) {
                            this.readToken();
                            return codeObject;
                        }
                        else {
                            this.undoToken();
                            // this.undoToken();
                        }
                    }
                }
                else if (token.type == qs.TokenType.LeftBracket) {
                    var keyObject = this.getObject();
                    // if (keyObject instanceof CodeScriptObject) {
                    codeObject = new qs.CodeMember(keyObject, this.peekToken(), codeObject);
                    // }
                    // else {
                    //     throw new ParserError(token, "获取变量只能是 number或string");
                    // }
                    if (this.peekToken().type == qs.TokenType.RightBracket) {
                        this.readRightBracket();
                    }
                    // if (member instanceof CodeScriptObject) {
                    //     var obj = (member as CodeScriptObject).value;
                    //     // if (obj is ScriptNumber){
                    //     //     ret = new CodeMember((ScriptNumber)obj, ret,this.peekToken());
                    //     // }
                    //     // else if (obj is ScriptString){
                    //     //     ret = new CodeMember(((ScriptString)obj).Value, ret,this.peekToken());
                    //     // }
                    //     // else{
                    //     //     throw new ParserError(token, "获取变量只能是 number或string");
                    //     // }
                    //     codeObject = new CodeMember(obj, token, codeObject as CodeMember);
                    // }
                    // else {
                    //     throw new ParserError(token, "变量的key只能是 number或string类型");
                    // }
                }
                else if (token.type == qs.TokenType.LeftPar) {
                    this.undoToken();
                    codeObject = this.getCallFunction(codeObject);
                }
                else {
                    this.undoToken();
                    break;
                }
            }
            return codeObject;
        };
        //获取一个Object
        Parser.prototype.getObject = function (checkColon) {
            if (checkColon === void 0) { checkColon = true; }
            var operateStack = new qs.Stack();
            var objectStack = new qs.Stack();
            while (true) {
                objectStack.push(this.getOneObject());
                if (!this.parseOperator(operateStack, objectStack)) {
                    break;
                }
            }
            while (true) {
                if (operateStack.length <= 0) {
                    break;
                }
                var oper = operateStack.pop();
                var binexp = new qs.CodeOperator(objectStack.pop(), objectStack.pop(), oper.operator, this.peekToken());
                objectStack.push(binexp);
            }
            var result = objectStack.pop();
            if (result instanceof qs.CodeMember) {
                var member = result;
                if (member.calc == qs.Calc.NONE) {
                    var token = this.readToken();
                    if (token.type == qs.TokenType.Colon && checkColon) {
                        this.readToken();
                        token = this.readToken();
                    }
                    switch (token.type) {
                        case qs.TokenType.Assign:
                        case qs.TokenType.AssignPlus:
                        case qs.TokenType.AssignMinus:
                        case qs.TokenType.AssignMultiply:
                        case qs.TokenType.AssignDivide:
                        case qs.TokenType.AssignModulo:
                        case qs.TokenType.AssignCombine:
                        case qs.TokenType.AssignInclusiveOr:
                        case qs.TokenType.AssignXOR:
                        case qs.TokenType.AssignShr:
                        case qs.TokenType.AssignShi:
                            return new qs.CodeAssign(member, this.getObject(), token.type, token);
                        default:
                            this.undoToken();
                            break;
                    }
                }
            }
            result = this.getTernary(result);
            return result;
        };
        /**
         * 解析操作符
         */
        Parser.prototype.parseOperator = function (operateStack, objectStack) {
            var curr = qs.TempOperator.getOper(this.peekToken().type);
            if (curr == null) {
                return false;
            }
            this.readToken();
            while (operateStack.length > 0) {
                var oper = operateStack.peek();
                if (oper.level >= curr.level) {
                    operateStack.pop();
                    var binexp = new qs.CodeOperator(objectStack.pop(), objectStack.pop(), oper.operator, this.peekToken());
                    objectStack.push(binexp);
                }
                else {
                    break;
                }
            }
            operateStack.push(curr);
            return true;
        };
        /**
         * 获取一个函数调用
         */
        Parser.prototype.getCallFunction = function (member) {
            var ret = new qs.CodeCallFunction(this.peekToken());
            this.readLeftParenthesis();
            var pars = [];
            var token = this.peekToken();
            while (token.type != qs.TokenType.RightPar) {
                pars.push(this.getObject());
                token = this.peekToken();
                if (token.type == qs.TokenType.Comma) {
                    this.readComma();
                }
                else if (token.type == qs.TokenType.RightPar) {
                    break;
                }
                else {
                    throw new qs.ParserError(token, "Comma ',' or right parenthesis ')' expected in function declararion.");
                }
            }
            this.readRightParenthesis();
            ret.member = member;
            ret.parameters = pars;
            return ret;
        };
        /**
         * 读取继承
         */
        Parser.prototype.readExtend = function (codeClass) {
            if (this.peekToken().type == qs.TokenType.Extends) {
                this.readToken();
                codeClass.parent = this.getCodeClass(codeClass.owner);
            }
        };
        /**
         * 获取一个类
         */
        Parser.prototype.getCodeClass = function (owner) {
            var name = this.readIdentifier();
            var codeClass = null;
            if (this.peekToken().type == qs.TokenType.Period) {
                codeClass = this.getCodeClassByName(name);
                while (this.peekToken().type == qs.TokenType.Period) {
                    if (!codeClass) {
                        this.undoToken();
                        throw new qs.ParserError(this.peekToken(), "不存在的定义 " + name);
                    }
                    this.readToken();
                    var name = this.readIdentifier();
                    if (this.peekToken().type != qs.TokenType.Period) {
                        return this.getCodeClassByName(name, codeClass);
                    }
                    codeClass = this.getCodeClassByName(name, codeClass);
                }
            }
            else {
                codeClass = this.getCodeClassByName(name);
                if (!codeClass) {
                    var names = [];
                    while (owner && !codeClass) {
                        codeClass = owner.classPathMap[name];
                        owner = owner.parent;
                    }
                }
            }
            return codeClass;
        };
        Parser.prototype.getCodeClassByName = function (name, parent) {
            if (parent === void 0) { parent = null; }
            if (parent == null) {
                return this.classPathMap[name] || this.globalObj[name];
            }
            return parent[name];
        };
        return Parser;
    }(qs.BaseParser));
    qs.Parser = Parser;
})(qs || (qs = {}));
var qs;
(function (qs) {
    var Token = /** @class */ (function () {
        function Token(tokenType, lexeme, sourceLine, sourceChar) {
            this._type = tokenType;
            this._lexeme = lexeme;
            this._line = sourceLine;
            this._index = sourceChar;
        }
        Object.defineProperty(Token.prototype, "type", {
            /**
             * 标记类型
             */
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Token.prototype, "name", {
            /**
             * 标记类型名
             */
            get: function () {
                return qs.TokenType[this.type];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Token.prototype, "lexeme", {
            /**
             * 标记值
             */
            get: function () {
                return this._lexeme;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Token.prototype, "line", {
            /**
             * 所在行
             */
            get: function () {
                return this._line;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Token.prototype, "index", {
            /**
             * 所在列
             */
            get: function () {
                return this._index;
            },
            enumerable: true,
            configurable: true
        });
        Token.prototype.toString = function () {
            return this.name + ":" + this._lexeme.toString();
        };
        return Token;
    }());
    qs.Token = Token;
})(qs || (qs = {}));
var qs;
(function (qs) {
    var TokenType;
    (function (TokenType) {
        /**
         * 空类型（没有实际用途）
         */
        TokenType[TokenType["None"] = 0] = "None";
        /**
         * var
         */
        TokenType[TokenType["Var"] = 1] = "Var";
        /**
         * var
         */
        TokenType[TokenType["Const"] = 2] = "Const";
        /**
         * {
         */
        TokenType[TokenType["LeftBrace"] = 3] = "LeftBrace";
        /**
         * }
         */
        TokenType[TokenType["RightBrace"] = 4] = "RightBrace";
        /**
         * (
         */
        TokenType[TokenType["LeftPar"] = 5] = "LeftPar";
        /**
         * )
         */
        TokenType[TokenType["RightPar"] = 6] = "RightPar";
        /**
         * [
         */
        TokenType[TokenType["LeftBracket"] = 7] = "LeftBracket";
        /**
         * ]
         */
        TokenType[TokenType["RightBracket"] = 8] = "RightBracket";
        /**
         * .
         */
        TokenType[TokenType["Period"] = 9] = "Period";
        /**
         * ,
         */
        TokenType[TokenType["Comma"] = 10] = "Comma";
        /**
         * :
         */
        TokenType[TokenType["Colon"] = 11] = "Colon";
        /**
         * ;
         */
        TokenType[TokenType["SemiColon"] = 12] = "SemiColon";
        /**
         * ?
         */
        TokenType[TokenType["QuestionMark"] = 13] = "QuestionMark";
        /**
         * +
         */
        TokenType[TokenType["Plus"] = 14] = "Plus";
        /**
         * ++
         */
        TokenType[TokenType["Increment"] = 15] = "Increment";
        /**
         * +=
         */
        TokenType[TokenType["AssignPlus"] = 16] = "AssignPlus";
        /**
         * -
         */
        TokenType[TokenType["Minus"] = 17] = "Minus";
        /**
         * --
         */
        TokenType[TokenType["Decrement"] = 18] = "Decrement";
        /**
         * -=
         */
        TokenType[TokenType["AssignMinus"] = 19] = "AssignMinus";
        /**
         * *
         */
        TokenType[TokenType["Multiply"] = 20] = "Multiply";
        /**
         * *=
         */
        TokenType[TokenType["AssignMultiply"] = 21] = "AssignMultiply";
        /**
         * /
         */
        TokenType[TokenType["Divide"] = 22] = "Divide";
        /**
         * /=
         */
        TokenType[TokenType["AssignDivide"] = 23] = "AssignDivide";
        /**
         * % 模运算
         */
        TokenType[TokenType["Modulo"] = 24] = "Modulo";
        /**
         * %=
         */
        TokenType[TokenType["AssignModulo"] = 25] = "AssignModulo";
        /**
         * | 或运算
         */
        TokenType[TokenType["InclusiveOr"] = 26] = "InclusiveOr";
        /**
         * |=
         */
        TokenType[TokenType["AssignInclusiveOr"] = 27] = "AssignInclusiveOr";
        /**
         * ||
         */
        TokenType[TokenType["Or"] = 28] = "Or";
        /**
         * & 并运算
         */
        TokenType[TokenType["Combine"] = 29] = "Combine";
        /**
         * &=
         */
        TokenType[TokenType["AssignCombine"] = 30] = "AssignCombine";
        /**
         * &&
         */
        TokenType[TokenType["And"] = 31] = "And";
        /**
         * ^ 异或
         */
        TokenType[TokenType["XOR"] = 32] = "XOR";
        /**
         * ^=
         */
        TokenType[TokenType["AssignXOR"] = 33] = "AssignXOR";
        /**
         * <<左移
         */
        TokenType[TokenType["Shi"] = 34] = "Shi";
        /**
         * <<=
         */
        TokenType[TokenType["AssignShi"] = 35] = "AssignShi";
        /**
         * >> 右移
         */
        TokenType[TokenType["Shr"] = 36] = "Shr";
        /**
         * >>=
         */
        TokenType[TokenType["AssignShr"] = 37] = "AssignShr";
        /**
         * !
         */
        TokenType[TokenType["Not"] = 38] = "Not";
        /**
         * =
         */
        TokenType[TokenType["Assign"] = 39] = "Assign";
        /**
         * ==
         */
        TokenType[TokenType["Equal"] = 40] = "Equal";
        /**
         * instanceof
         */
        TokenType[TokenType["Instanceof"] = 41] = "Instanceof";
        /**
         * typeof
         */
        TokenType[TokenType["Typeof"] = 42] = "Typeof";
        /**
         * !=
         */
        TokenType[TokenType["NotEqual"] = 43] = "NotEqual";
        /**
         * >
         */
        TokenType[TokenType["Greater"] = 44] = "Greater";
        /**
         * >=
         */
        TokenType[TokenType["GreaterOrEqual"] = 45] = "GreaterOrEqual";
        /**
         *  <
         */
        TokenType[TokenType["Less"] = 46] = "Less";
        /**
         * <=
         */
        TokenType[TokenType["LessOrEqual"] = 47] = "LessOrEqual";
        /**
         * ...
         */
        TokenType[TokenType["Params"] = 48] = "Params";
        /**
         * if
         */
        TokenType[TokenType["If"] = 49] = "If";
        /**
         * else
         */
        TokenType[TokenType["Else"] = 50] = "Else";
        /**
         * for
         */
        TokenType[TokenType["For"] = 51] = "For";
        /**
         * dynamic
         */
        TokenType[TokenType["Dynamic"] = 52] = "Dynamic";
        /**
         * each
         */
        TokenType[TokenType["Each"] = 53] = "Each";
        /**
         * in
         */
        TokenType[TokenType["In"] = 54] = "In";
        /**
         * switch
         */
        TokenType[TokenType["Switch"] = 55] = "Switch";
        /**
         * case
         */
        TokenType[TokenType["Case"] = 56] = "Case";
        /**
         * default
         */
        TokenType[TokenType["Default"] = 57] = "Default";
        /**
         * break
         */
        TokenType[TokenType["Break"] = 58] = "Break";
        /**
         * continue
         */
        TokenType[TokenType["Continue"] = 59] = "Continue";
        /**
         * return
         */
        TokenType[TokenType["Return"] = 60] = "Return";
        /**
         * while
         */
        TokenType[TokenType["While"] = 61] = "While";
        /**
         * function
         */
        TokenType[TokenType["Function"] = 62] = "Function";
        /**
         * try
         */
        TokenType[TokenType["Try"] = 63] = "Try";
        /**
         * catch
         */
        TokenType[TokenType["Catch"] = 64] = "Catch";
        /**
         * throw
         */
        TokenType[TokenType["Throw"] = 65] = "Throw";
        /**
         * bool true false
         */
        TokenType[TokenType["Boolean"] = 66] = "Boolean";
        /**
         * int float
         */
        TokenType[TokenType["Number"] = 67] = "Number";
        /**
         * string
         */
        TokenType[TokenType["String"] = 68] = "String";
        /**
         * null
         */
        TokenType[TokenType["Null"] = 69] = "Null";
        /**
         * export
         */
        TokenType[TokenType["Export"] = 70] = "Export";
        /**
         * abstract
         */
        TokenType[TokenType["Abstract"] = 71] = "Abstract";
        /**
         * 名称空间定义（暂时当作模块来使用）
         */
        TokenType[TokenType["NameSpace"] = 72] = "NameSpace";
        /**
         * 模块定义
         */
        TokenType[TokenType["Module"] = 73] = "Module";
        /**
         * 类定义
         */
        TokenType[TokenType["Class"] = 74] = "Class";
        /**
         * 接口定义
         */
        TokenType[TokenType["Interface"] = 75] = "Interface";
        /**
         * 公共
         */
        TokenType[TokenType["Public"] = 76] = "Public";
        /**
         * 保护
         */
        TokenType[TokenType["Protected"] = 77] = "Protected";
        /**
         * 私有
         */
        TokenType[TokenType["Private"] = 78] = "Private";
        /**
         * 继承
         */
        TokenType[TokenType["Extends"] = 79] = "Extends";
        /**
         * 静态
         */
        TokenType[TokenType["Static"] = 80] = "Static";
        /**
         * 重写
         */
        TokenType[TokenType["Override"] = 81] = "Override";
        /**
         * 实例
         */
        TokenType[TokenType["New"] = 82] = "New";
        /**
         * 无返回值
         */
        TokenType[TokenType["Void"] = 83] = "Void";
        /**
         * 不可表示的值
         */
        TokenType[TokenType["NaN"] = 84] = "NaN";
        /**
         * 引入
         */
        TokenType[TokenType["Import"] = 85] = "Import";
        /**
         * get
         */
        TokenType[TokenType["Get"] = 86] = "Get";
        /**
         * set
         */
        TokenType[TokenType["Set"] = 87] = "Set";
        /**
         * 说明符
         */
        TokenType[TokenType["Identifier"] = 88] = "Identifier";
        /**
         * is
         */
        TokenType[TokenType["Is"] = 89] = "Is";
        /**
         * as
         */
        TokenType[TokenType["As"] = 90] = "As";
        /**
         * delete
         */
        TokenType[TokenType["Delete"] = 91] = "Delete";
    })(TokenType = qs.TokenType || (qs.TokenType = {}));
})(qs || (qs = {}));
var qs;
(function (qs) {
    /**
     * 可执行指令块
     */
    var Executable = /** @class */ (function () {
        function Executable(type, parent) {
            if (parent === void 0) { parent = null; }
            /**
             * 指令列表
             */
            this.instructionList = [];
            this.type = type;
            this.parent = parent;
        }
        //添加一条指令
        Executable.prototype.addInstruction = function (instruction) {
            this.instructionList.push(instruction);
        };
        return Executable;
    }());
    qs.Executable = Executable;
    var BlockType;
    (function (BlockType) {
        /**
         * 无
         */
        BlockType[BlockType["None"] = 0] = "None";
        /**
         * 普通的分块
         */
        BlockType[BlockType["Block"] = 1] = "Block";
        /**
         * 函数
         */
        BlockType[BlockType["Function"] = 2] = "Function";
        /**
         * 判断语句
         */
        BlockType[BlockType["If"] = 3] = "If";
        /**
         * for循环开始
         */
        BlockType[BlockType["ForBegin"] = 4] = "ForBegin";
        /**
         * for循环执行
         */
        BlockType[BlockType["ForLoop"] = 5] = "ForLoop";
        /**
         * for语句内容
         */
        BlockType[BlockType["For"] = 6] = "For";
        /**
         * foreach语句
         */
        BlockType[BlockType["Forin"] = 7] = "Forin";
        /**
         * while语句
         */
        BlockType[BlockType["While"] = 8] = "While";
        /**
         * swtich语句
         */
        BlockType[BlockType["Switch"] = 9] = "Switch";
    })(BlockType = qs.BlockType || (qs.BlockType = {}));
})(qs || (qs = {}));
var qs;
(function (qs) {
    /**
     * 指令集
     */
    var Instruction = /** @class */ (function () {
        function Instruction(opcode, value, token) {
            this._opcode = opcode;
            this._value = value;
            this.token = token;
        }
        Object.defineProperty(Instruction.prototype, "opcode", {
            /**
             * 指令类型
             */
            get: function () {
                return this._opcode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Instruction.prototype, "value", {
            /**
             * 指令值
             */
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        return Instruction;
    }());
    qs.Instruction = Instruction;
})(qs || (qs = {}));
var qs;
(function (qs) {
    /**
     * 指令类型
     */
    var Opcode;
    (function (Opcode) {
        /**
         * 申请一个局部变量
         */
        Opcode[Opcode["VAR"] = 0] = "VAR";
        /**
         * 执行If语句
         */
        Opcode[Opcode["CALL_IF"] = 1] = "CALL_IF";
        /**
         * 执行For语句
         */
        Opcode[Opcode["CALL_FOR"] = 2] = "CALL_FOR";
        /**
         * 执行For语句
         */
        Opcode[Opcode["CALL_FORSIMPLE"] = 3] = "CALL_FORSIMPLE";
        /**
         * 执行Foreach语句
         */
        Opcode[Opcode["CALL_FORIN"] = 4] = "CALL_FORIN";
        /**
         * 执行While语句
         */
        Opcode[Opcode["CALL_WHILE"] = 5] = "CALL_WHILE";
        /**
         * 执行switch语句
         */
        Opcode[Opcode["CALL_SWITCH"] = 6] = "CALL_SWITCH";
        /**
         * 执行try catch语句
         */
        Opcode[Opcode["CALL_TRY"] = 7] = "CALL_TRY";
        /**
         * 调用一个函数
         */
        Opcode[Opcode["CALL_FUNCTION"] = 8] = "CALL_FUNCTION";
        /**
         * throw
         */
        Opcode[Opcode["THROW"] = 9] = "THROW";
        /**
         * 解析一个变量
         */
        Opcode[Opcode["RESOLVE"] = 10] = "RESOLVE";
        /**
         * 返回值
         */
        Opcode[Opcode["RET"] = 11] = "RET";
        /**
         * break跳出 for foreach while
         */
        Opcode[Opcode["BREAK"] = 12] = "BREAK";
        /**
         * continue跳出本次 for foreach while
         */
        Opcode[Opcode["CONTINUE"] = 13] = "CONTINUE";
        /**
         * 实例化
         */
        Opcode[Opcode["NEW"] = 14] = "NEW";
        /**
         * typeof
         */
        Opcode[Opcode["Typeof"] = 15] = "Typeof";
        /**
         * delete
         */
        Opcode[Opcode["Delete"] = 16] = "Delete";
    })(Opcode = qs.Opcode || (qs.Opcode = {}));
})(qs || (qs = {}));
var __extends = this && this.__extends || function __extends(t, e) {
    function r() {
        this.constructor = t;
    }
    for (var i in e)
        e.hasOwnProperty(i) && (t[i] = e[i]);
    r.prototype = e.prototype, t.prototype = new r();
};
var qs;
(function (qs) {
    /**
     * 运行环境
     */
    var Runtime = /** @class */ (function () {
        function Runtime() {
        }
        Runtime.prototype.run = function (mainClass, parser) {
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
        };
        Runtime.prototype.parseClass = function (codeClass) {
            this.codeClass = codeClass;
            var owner = this.parser.globalObj;
            var ownerNames = this.getPathList(codeClass);
            ownerNames.pop();
            for (var i = 0; i < ownerNames.length; i++) {
                owner[ownerNames[i]] = owner[ownerNames[i]] || {};
                owner = owner[ownerNames[i]];
            }
            var parent = null;
            if (codeClass.parent instanceof qs.CodeObject) {
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
                function QSClass() {
                    this[".classPath"] = self.getClassPath(_codeClass);
                    this[".super"] = _super; //保存父类引用
                    var args = arguments;
                    var func = _codeClass.getFunction("constructor");
                    if (func) {
                        return self.callConstructor(codeClass.variableMap, func, this, _super, args);
                    }
                    else {
                        var _this = (_super && _super.apply(this, arguments)) || this;
                        self.currentThis = _this;
                        for (var key in codeClass.variableMap) {
                            this[key] = self.resolveOperand(codeClass.variableMap[key].value, {
                                value: void 0, isOver: false, isContinue: false, isBreak: false,
                                blockType: qs.BlockType.Function, parent: null, context: _this
                            });
                        }
                        return _this;
                    }
                }
                // self.context = QSClass;
                for (var key in codeClass.functionMap) {
                    if (key != "constructor") {
                        var preStr = key.substring(0, 5);
                        if (preStr == ".get.") {
                            var getKey = key.substr(5);
                            Object.defineProperty(QSClass.prototype, getKey, {
                                get: self.resolveOperand(codeClass.functionMap[key], {
                                    value: void 0, isOver: false, isContinue: false, isBreak: false,
                                    blockType: qs.BlockType.Function, parent: null, context: {}
                                }),
                                enumerable: true,
                                configurable: true
                            });
                        }
                        else if (preStr == ".set.") {
                            var setKey = key.substr(5);
                            Object.defineProperty(QSClass.prototype, setKey, {
                                set: self.resolveOperand(codeClass.functionMap[key], {
                                    value: void 0, isOver: false, isContinue: false, isBreak: false,
                                    blockType: qs.BlockType.Function, parent: null, context: {}
                                }),
                                enumerable: true,
                                configurable: true
                            });
                        }
                        else {
                            QSClass.prototype[key] = self.resolveOperand(codeClass.functionMap[key], {
                                value: void 0, isOver: false, isContinue: false, isBreak: false,
                                blockType: qs.BlockType.Function, parent: null, context: {}
                            });
                        }
                    }
                }
                for (var key in codeClass.variableMap_static) {
                    QSClass[key] = self.resolveOperand(codeClass.variableMap_static[key].value, {
                        value: void 0, isOver: false, isContinue: false, isBreak: false,
                        blockType: qs.BlockType.Function, parent: null, context: {}
                    });
                }
                for (var key in codeClass.functionMap_static) {
                    QSClass[key] = self.resolveOperand(codeClass.functionMap_static[key], {
                        value: void 0, isOver: false, isContinue: false, isBreak: false,
                        blockType: qs.BlockType.Function, parent: null, context: {}
                    });
                }
                return QSClass;
            }(parent));
            return _Class;
        };
        /**
         * 执行构造函数
         */
        Runtime.prototype.callConstructor = function (variableMap, codeFunction, thisObject, _super, args) {
            var instructionList = codeFunction.executable.instructionList; //指令集
            var _this = this.currentThis = thisObject;
            if (_super && instructionList[0].token.lexeme != "super") {
                throw new qs.ExecutionError(codeFunction.token, "构造函数里面缺少super");
            }
            if (instructionList[0].token.lexeme == "super" && instructionList[0].opcode == qs.Opcode.CALL_FUNCTION) {
                _this = this.currentThis = (_super && _super.call(thisObject, args)) || thisObject;
            }
            for (var key in variableMap) {
                _this[key] = this.resolveOperand(variableMap[key].value, {
                    value: void 0, isOver: false, isContinue: false, isBreak: false,
                    blockType: qs.BlockType.Function, parent: null, context: _this
                });
            }
            //执行剩余指令
            this.parseExecutable(codeFunction, null, _this)();
            return _this;
        };
        /**
         * 执行指令集
         */
        Runtime.prototype.parseExecutable = function (codeFunction, parentReturnData, thisObject) {
            if (thisObject === void 0) { thisObject = null; }
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
                    var returnData = {
                        value: void 0, isOver: false, isContinue: false, isBreak: false,
                        blockType: qs.BlockType.Function, parent: parentReturnData, context: tempFunc
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
        };
        Runtime.prototype.executable = function (executable, returnData) {
            for (var i = 0; i < executable.instructionList.length; i++) {
                this.exeInstruction(executable.instructionList[i], returnData);
                if (returnData.isOver || returnData.isContinue || returnData.isBreak) {
                    break;
                }
            }
        };
        /**
         * 执行单个指令
         */
        Runtime.prototype.exeInstruction = function (instruction, returnData) {
            var opcode = instruction.opcode;
            switch (opcode) {
                case qs.Opcode.VAR:
                    this.processVar(instruction, returnData);
                    break;
                case qs.Opcode.RET:
                    this.processReturn(instruction, returnData);
                    break;
                case qs.Opcode.RESOLVE:
                    this.processResolve(instruction, returnData);
                    break;
                case qs.Opcode.CONTINUE:
                    this.processContinue(instruction, returnData);
                    break;
                case qs.Opcode.BREAK:
                    this.processBreak(instruction, returnData);
                    break;
                case qs.Opcode.CALL_FUNCTION:
                    this.processCallFunction(instruction, returnData);
                    break;
                case qs.Opcode.CALL_IF:
                    this.processCallIf(instruction, returnData);
                    break;
                case qs.Opcode.CALL_FOR:
                    this.processCallFor(instruction, returnData);
                    break;
                case qs.Opcode.CALL_FORIN:
                    this.processCallForIn(instruction, returnData);
                    break;
                case qs.Opcode.CALL_FORSIMPLE:
                    this.processCallForSimple(instruction, returnData);
                    break; //ts暂不支持这种用法
                case qs.Opcode.CALL_WHILE:
                    this.processCallWhile(instruction, returnData);
                    break;
                case qs.Opcode.CALL_SWITCH:
                    this.processCallSwitch(instruction, returnData);
                    break;
                case qs.Opcode.CALL_TRY:
                    this.processTry(instruction, returnData);
                    break;
                case qs.Opcode.THROW:
                    this.processThrow(instruction, returnData);
                    break;
                case qs.Opcode.NEW:
                    this.processNew(instruction, returnData);
                    break;
                case qs.Opcode.Typeof:
                    this.processTypeof(instruction, returnData);
                    break;
                case qs.Opcode.Delete:
                    this.processDelete(instruction, returnData);
                    break;
            }
        };
        Runtime.prototype.processBreak = function (instruction, returnData) {
            this.invokeBreak(instruction.value, returnData);
        };
        Runtime.prototype.invokeBreak = function (con, returnData) {
            returnData.isBreak = true;
            if (!this.isSupportBreak(returnData.blockType)) {
                if (returnData.parent == null) {
                    throw new qs.ExecutionError(con.token, "this block is not support continue");
                }
                this.invokeBreak(con, returnData.parent);
            }
        };
        Runtime.prototype.processContinue = function (instruction, returnData) {
            this.invokeContinue(instruction.value, returnData);
        };
        Runtime.prototype.invokeContinue = function (con, returnData) {
            returnData.isContinue = true;
            if (!this.isSupportContinue(returnData.blockType)) {
                if (returnData.parent == null) {
                    throw new qs.ExecutionError(con.token, "this block is not support continue");
                }
                this.invokeContinue(con, returnData.parent);
            }
        };
        Runtime.prototype.processCallFor = function (instruction, returnData) {
            var code = instruction.value;
            var forReturnData = {
                value: void 0, isOver: false, isContinue: false, isBreak: false,
                blockType: qs.BlockType.For, parent: returnData, context: {}
            };
            this.executable(code.beginExecutable, forReturnData);
            var condition;
            for (;;) {
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
        };
        Runtime.prototype.processCallForIn = function (instruction, returnData) {
            var code = instruction.value;
            var loopObj = this.resolveOperand(code.loopObject, returnData);
            for (var key in loopObj) {
                if (loopObj == null) {
                    return;
                }
                var context = {};
                context[code.identifier] = key;
                var forReturnData = {
                    value: void 0, isOver: false, isContinue: false, isBreak: false, blockType: qs.BlockType.Forin,
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
        };
        Runtime.prototype.processCallWhile = function (instruction, returnData) {
            var code = instruction.value;
            var condition = code.while;
            for (;;) {
                var whileReturnData = {
                    value: void 0, isOver: false, isContinue: false, isBreak: false, blockType: qs.BlockType.While,
                    parent: returnData, context: {}
                };
                if (!this.processCondition(condition, qs.BlockType.While, whileReturnData)) {
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
        };
        Runtime.prototype.processCallSwitch = function (instruction, returnData) {
            var code = instruction.value;
            var obj = this.resolveOperand(code.condition, returnData);
            var exec = false;
            var switchReturnData = {
                value: void 0, isOver: false, isContinue: false,
                isBreak: false, blockType: qs.BlockType.Switch, parent: returnData, context: {}
            };
            for (var i = 0; i < code.cases.length; i++) {
                var c = code.cases[i];
                for (var j = 0; j < c.allow.length; j++) {
                    var allow = c.allow[j];
                    var a = null;
                    if (allow instanceof qs.CodeObject) {
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
        };
        Runtime.prototype.processTry = function (instruction, returnData) {
            var code = instruction.value;
            try {
                var tryReturnData = {
                    value: void 0, isOver: false, isContinue: false, isBreak: false,
                    blockType: returnData.blockType, parent: returnData, context: {}
                };
                this.executable(code.tryExecutable, tryReturnData);
            }
            catch (error) {
                var context = {};
                context[code.identifier] = error; //设置异常对象
                var catchReturnData = {
                    value: void 0, isOver: false, isContinue: false, isBreak: false,
                    blockType: returnData.blockType, parent: returnData, context: context
                };
                this.executable(code.catchExecutable, catchReturnData);
            }
        };
        Runtime.prototype.processThrow = function (instruction, returnData) {
            var code = instruction.value;
            var obj = this.resolveOperand(code.obj, returnData);
            throw obj;
        };
        Runtime.prototype.processNew = function (instruction, returnData) {
            this.parseNew(instruction.value, returnData);
        };
        Runtime.prototype.processDelete = function (instruction, returnData) {
            this.parseDelete(instruction.value, returnData);
        };
        Runtime.prototype.processTypeof = function (instruction, returnData) {
            var code = instruction.value;
            typeof this.resolveOperand(code.value, returnData);
        };
        Runtime.prototype.processCallForSimple = function (instruction, returnData) {
            var code = instruction.value;
            var begin = this.resolveOperand(code.begin, returnData);
            if (typeof begin != 'number') {
                throw new qs.ExecutionError(code.token, "forsimple 初始值必须是number");
            }
            var finished = this.resolveOperand(code.finished, returnData);
            if (typeof finished != 'number') {
                throw new qs.ExecutionError(code.token, "forsimple 最大值必须是number");
            }
            var step;
            if (code.step != null) {
                var stepNumber = this.resolveOperand(code.step, returnData);
                if (typeof stepNumber != 'number') {
                    throw new qs.ExecutionError(code.token, "forsimple Step必须是number");
                }
                step = stepNumber;
            }
            else {
                step = 1;
            }
            var variables = code.variables;
            for (var i = begin; i <= finished; i += step) {
                variables[code.identifier] = i;
                var forReturnData = {
                    value: void 0, isOver: false, isContinue: false, isBreak: false,
                    blockType: qs.BlockType.For, parent: returnData, context: {}
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
        };
        Runtime.prototype.isSupportBreak = function (blockType) {
            return blockType == qs.BlockType.For || blockType == qs.BlockType.Forin || blockType == qs.BlockType.While;
        };
        Runtime.prototype.isSupportContinue = function (blockType) {
            return blockType == qs.BlockType.For || blockType == qs.BlockType.Forin || blockType == qs.BlockType.While;
        };
        Runtime.prototype.processVar = function (instruction, returnData) {
            var name = instruction.value;
            returnData.context[name] = null; //定义的对象默认为空
            // returnData.context[name] = undefined;
        };
        Runtime.prototype.processReturn = function (instruction, returnData) {
            this.invokeReturnValue(this.resolveOperand(instruction.value, returnData), returnData);
        };
        Runtime.prototype.invokeReturnValue = function (value, returnData) {
            returnData.isOver = true;
            if (returnData.blockType == qs.BlockType.Function) {
                returnData.value = value;
            }
            else {
                this.invokeReturnValue(value, returnData.parent);
            }
        };
        Runtime.prototype.processCondition = function (con, blockType, returnData) {
            if (con == null) {
                return false;
            }
            if (con.allow != null) {
                var b = this.resolveOperand(con.allow, returnData);
                if (!b) {
                    return false;
                }
            }
            this.executable(con.executable, {
                value: void 0, isOver: false, isContinue: false, isBreak: false, blockType: blockType,
                parent: returnData, context: {}
            });
            return true;
        };
        Runtime.prototype.processCallIf = function (instruction, returnData) {
            var code = instruction.value;
            if (this.processCondition(code.If, qs.BlockType.If, returnData)) {
                return;
            }
            for (var i = 0; i < code.elseIf.length; ++i) {
                if (this.processCondition(code.elseIf[i], qs.BlockType.If, returnData))
                    return;
            }
            this.processCondition(code.Else, qs.BlockType.If, returnData);
        };
        Runtime.prototype.processResolve = function (instruction, returnData) {
            this.resolveOperand(instruction.value, returnData);
        };
        Runtime.prototype.processCallFunction = function (instruction, returnData) {
            this.parseCall(instruction.value, returnData);
        };
        /**
         * 解析运算符
         */
        Runtime.prototype.parseOperate = function (operate, returnData) {
            var type = operate.operator;
            var left = this.resolveOperand(operate.left, returnData);
            var right;
            if (type == qs.TokenType.Plus) {
                right = this.resolveOperand(operate.right, returnData);
                return left + right;
            }
            else if (type == qs.TokenType.Minus || type == qs.TokenType.Multiply || type == qs.TokenType.Divide || type == qs.TokenType.Modulo ||
                type == qs.TokenType.InclusiveOr || type == qs.TokenType.Combine || type == qs.TokenType.XOR || type == qs.TokenType.Shr || type == qs.TokenType.Shi) {
                if (typeof left != 'number') {
                    throw new qs.ExecutionError(operate.token, "运算符[左边]必须是number类型");
                }
                right = this.resolveOperand(operate.right, returnData);
                if (typeof right != 'number') {
                    throw new qs.ExecutionError(operate.token, "运算符[右边]必须是number类型");
                }
                switch (type) {
                    case qs.TokenType.Minus:
                        return left - right;
                    case qs.TokenType.Multiply:
                        return left * right;
                    case qs.TokenType.Divide:
                        return left / right;
                    case qs.TokenType.Modulo:
                        return left % right;
                    case qs.TokenType.InclusiveOr:
                        return left | right;
                    case qs.TokenType.Combine:
                        return left & right;
                    case qs.TokenType.XOR:
                        return left ^ right;
                    case qs.TokenType.Shr:
                        return left >> right;
                    case qs.TokenType.Shi:
                        return left << right;
                }
            }
            else if (type == qs.TokenType.And || type == qs.TokenType.Or || type == qs.TokenType.Equal || type == qs.TokenType.NotEqual
                || type == qs.TokenType.Greater || type == qs.TokenType.GreaterOrEqual || type == qs.TokenType.Less || type == qs.TokenType.LessOrEqual) {
                switch (type) {
                    case qs.TokenType.And:
                        if (!left) {
                            return left;
                        }
                        else {
                            right = this.resolveOperand(operate.right, returnData);
                            return left && right;
                        }
                    // right = this.resolveOperand(operate.right, returnData);
                    // return left && right;
                    case qs.TokenType.Or:
                        if (left) {
                            return left;
                        }
                        else {
                            right = this.resolveOperand(operate.right, returnData);
                            return left || right;
                        }
                    // right = this.resolveOperand(operate.right, returnData);
                    // return left || right;
                    case qs.TokenType.Equal:
                        right = this.resolveOperand(operate.right, returnData);
                        return left == right;
                    case qs.TokenType.NotEqual:
                        right = this.resolveOperand(operate.right, returnData);
                        return left != right;
                    case qs.TokenType.Greater:
                        right = this.resolveOperand(operate.right, returnData);
                        return left > right;
                    case qs.TokenType.GreaterOrEqual:
                        right = this.resolveOperand(operate.right, returnData);
                        return left >= right;
                    case qs.TokenType.Less:
                        right = this.resolveOperand(operate.right, returnData);
                        return left < right;
                    case qs.TokenType.LessOrEqual:
                        right = this.resolveOperand(operate.right, returnData);
                        return left <= right;
                }
            }
            else if (type == qs.TokenType.Instanceof) {
                right = this.resolveOperand(operate.right, returnData);
                return left instanceof right;
            }
            else {
                throw new qs.ExecutionError(operate.token, "nonsupport operate [" + type + "] with " + left.Type);
            }
        };
        Runtime.prototype.resolveOperand = function (value, returnData) {
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
                    throw new qs.ExecutionError(value.token, "Script Object Type [" + ret.Type + "] is cannot use [-] sign");
                }
                ret = -ret;
            }
            return ret;
        };
        Runtime.prototype.resolveOperand_impl = function (codeObject, returnData) {
            if (codeObject instanceof qs.CodeTypeof) {
                return typeof this.resolveOperand(codeObject.value, returnData);
            }
            if (codeObject instanceof qs.CodeScriptObject) {
                return codeObject.value;
            }
            else if (codeObject instanceof qs.CodeDelete) {
                return this.parseDelete(codeObject, returnData);
            }
            else if (codeObject instanceof qs.CodeFunction) {
                return this.parseExecutable(codeObject, returnData);
            }
            else if (codeObject instanceof qs.CodeCallFunction) {
                return this.parseCall(codeObject, returnData);
            }
            else if (codeObject instanceof qs.CodeMember) {
                return this.getVariable(codeObject, returnData);
            }
            else if (codeObject instanceof qs.CodeArray) {
                return this.parseArray(codeObject, returnData);
            }
            else if (codeObject instanceof qs.CodeClass) {
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
            else if (codeObject instanceof qs.CodeOperator) {
                return this.parseOperate(codeObject, returnData);
            }
            else if (codeObject instanceof qs.CodeTernary) {
                return this.parseTernary(codeObject, returnData);
            }
            else if (codeObject instanceof qs.CodeAssign) {
                return this.parseAssign(codeObject, returnData);
            }
            else if (codeObject instanceof qs.CodeNew) {
                return this.parseNew(codeObject, returnData);
            }
            return null;
        };
        Runtime.prototype.parseDelete = function (codeDelete, returnData) {
            return this.setVariable(codeDelete.value, undefined, returnData);
        };
        Runtime.prototype.parseCall = function (codeCallFunction, returnData) {
            var params = [];
            for (var i = 0; i < codeCallFunction.parameters.length; i++) {
                params.push(this.resolveOperand(codeCallFunction.parameters[i], returnData));
            }
            var func = null;
            if (codeCallFunction instanceof qs.CodeFunction) {
                func = this.resolveOperand(codeCallFunction, returnData);
                func.apply(this.parser.globalObj, params);
            }
            else {
                var caller = null;
                if (codeCallFunction.member instanceof qs.CodeObject) {
                    func = this.resolveOperand(codeCallFunction.member, returnData);
                }
                else {
                    func = codeCallFunction.member;
                }
                if (!func) {
                    throw new qs.ExecutionError(codeCallFunction.token, "Cannot read property '" + codeCallFunction.member.value + "' of undefined");
                }
                if (!codeCallFunction.isNew) {
                    var isSuper = false;
                    if (codeCallFunction.member instanceof qs.CodeMember) {
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
                    if (codeCallFunction.member[".this"]) {
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
        };
        Runtime.prototype.parseTernary = function (ternary, returnData) {
            var b = this.resolveOperand(ternary.allow, returnData);
            return !!b ? this.resolveOperand(ternary.true, returnData) : this.resolveOperand(ternary.false, returnData);
        };
        Runtime.prototype.getClass = function (codeClass) {
            if (!codeClass.owner) {
                return this.parser.globalObj[codeClass.name];
            }
            else {
                var names = this.getPathList(codeClass);
                var result = this.parser.globalObj;
                for (var i = 0; i < names.length; i++) {
                    result = result[names[i]];
                }
                return result;
            }
        };
        Runtime.prototype.getClassPath = function (codeClass) {
            var pathList = this.getPathList(codeClass);
            var result = "";
            for (var i = 0; i < pathList.length; i++) {
                result += pathList[i] + ".";
            }
            if (result) {
                result = result.substring(0, result.length - 1);
            }
            return result;
        };
        Runtime.prototype.getPathList = function (codeClass) {
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
        };
        Runtime.prototype.parseNew = function (codeNew, returnData) {
            var isCall = false;
            if (codeNew.newObject instanceof qs.CodeCallFunction) {
                isCall = true;
                codeNew.newObject.isNew = true;
            }
            var classObject = this.resolveOperand(codeNew.newObject, returnData);
            if (classObject == null) {
                throw new qs.ExecutionError(codeNew.token, "要实例化的类[" + classObject + "]不存在");
            }
            return isCall ? classObject : new classObject();
        };
        Runtime.prototype.parseArray = function (codeArray, returnData) {
            var array = [];
            for (var i = 0; i < codeArray.elements.length; ++i) {
                array.push(this.resolveOperand(codeArray.elements[i], returnData));
            }
            return array;
        };
        Runtime.prototype.getContextValue = function (returnData, key) {
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
        };
        Runtime.prototype.getVariable = function (member, returnData) {
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
                if (members[0] instanceof qs.CodeCallFunction) {
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
                        result = members[i] instanceof qs.CodeCallFunction ? this.resolveOperand(members[i], returnData) : result[this.getMemberValue(members[i], returnData)];
                    }
                    if (codeClass) {
                        codeClass = codeClass[members[i].value];
                    }
                }
                oldMember[".this"] = parent; //保存调用者
                if (result === undefined && codeClass) {
                    var oldCodeClass = this.codeClass;
                    var result = this.parseClass(codeClass);
                    this.codeClass = oldCodeClass;
                    return result;
                }
            }
            else {
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
            if (member instanceof qs.CodeMember && member.calc != qs.Calc.NONE) {
                if (typeof result != 'number') {
                    throw new qs.ExecutionError(member.token, "++或者--只能应用于Number类型");
                }
                else if (member.calc == qs.Calc.POST_DECREMENT) {
                    result--;
                }
                else if (member.calc == qs.Calc.POST_INCREMENT) {
                    result++;
                }
                else if (member.calc == qs.Calc.PRE_DECREMENT) {
                    --result;
                }
                else if (member.calc == qs.Calc.PRE_INCREMENT) {
                    ++result;
                }
                this.setVariable(member, result, returnData);
            }
            return result;
        };
        Runtime.prototype.getMemberValue = function (member, returnData) {
            if (member.value instanceof qs.CodeScriptObject) {
                return member.value.value;
            }
            else if (typeof member.value == 'boolean' ||
                typeof member.value == 'number' ||
                typeof member.value == 'string') {
                return member.value;
            }
            else if (member instanceof qs.CodeMember) {
                return this.resolveOperand(member.value, returnData);
            }
            else {
                return this.resolveOperand(member, returnData);
            }
        };
        Runtime.prototype.setVariable = function (member, value, returnData) {
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
                if (members[0] instanceof qs.CodeCallFunction) {
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
                        result = members[i] instanceof qs.CodeCallFunction ? this.resolveOperand(members[i], returnData) : result[this.getMemberValue(members[i], returnData)];
                    }
                    if (codeClass) {
                        codeClass = codeClass[members[i].value];
                    }
                }
                oldMember[".this"] = parent; //保存调用者
                if (parent && value === undefined) {
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
                var isSeted = false; //是否已经设置过值
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
        };
        Runtime.prototype.parseAssign = function (codeAssign, returnData) {
            if (codeAssign.assignType == qs.TokenType.Assign) {
                var value = this.resolveOperand(codeAssign.value, returnData);
                this.setVariable(codeAssign.member, value, returnData);
                return value;
            }
            else {
                var value = this.getVariable(codeAssign.member, returnData);
                if (typeof value == 'string') {
                    if (codeAssign.assignType == qs.TokenType.AssignPlus) {
                        value += this.resolveOperand(codeAssign.value, returnData);
                        this.setVariable(codeAssign.member, value, returnData);
                        return value;
                    }
                    else {
                        throw new qs.ExecutionError(codeAssign.token, "string类型只支持[+=]赋值操作");
                    }
                }
                if (typeof value == 'number') {
                    var right = this.resolveOperand(codeAssign.value, returnData);
                    if (typeof value != 'number') {
                        throw new qs.ExecutionError(codeAssign.token, "[+= -=...]值只能为 number类型");
                    }
                    switch (codeAssign.assignType) {
                        case qs.TokenType.AssignPlus:
                            value += right;
                            break;
                        case qs.TokenType.AssignMinus:
                            value -= right;
                            break;
                        case qs.TokenType.AssignMultiply:
                            value *= right;
                            break;
                        case qs.TokenType.AssignDivide:
                            value /= right;
                            break;
                        case qs.TokenType.AssignModulo:
                            value %= right;
                            break;
                        default:
                            throw new qs.ExecutionError(codeAssign.token, "Double不支持的运算符 " + codeAssign.assignType);
                    }
                    this.setVariable(codeAssign.member, value, returnData);
                    return value;
                }
                throw new qs.ExecutionError(codeAssign.token, "[+= -=...]左边值只能为number或者string");
            }
        };
        return Runtime;
    }());
    qs.Runtime = Runtime;
})(qs || (qs = {}));
var qs;
(function (qs) {
    /**
     * 运行代码
     * @code 代码
     * @mainClassPath 主类的路径
     * @globalObject 代码中的对象所在的全局对象，可以传window或global等
     * @autoNew 是否自动实例化，如果为false，则返回一个类，否则直接返回实例好的对象，一般启动类需要传递参数的时候才需要为false
     */
    function run(code, mainClassPath, globalObject, autoNew) {
        if (autoNew === void 0) { autoNew = true; }
        var lex = new qs.Lexer(code); //词法分析
        var parser = new qs.Parser(lex.getTokens(), globalObject); //语法分析
        var runtime = new qs.Runtime(); //运行环境
        var pathList = mainClassPath.split(".");
        var codeClass = parser.classPathMap;
        for (var i = 0; i < pathList.length; i++) {
            codeClass = codeClass[pathList[i]];
        }
        if (!codeClass) {
            throw "不存在的类：" + mainClassPath + "，请检查类路径是否正确，并且是否已经载入";
        }
        var MainClass = runtime.run(codeClass, parser); //运行代码
        if (autoNew) {
            return new MainClass();
        }
        else {
            return MainClass;
        }
    }
    qs.run = run;
})(qs || (qs = {}));
var qs;
(function (qs) {
    var Stack = /** @class */ (function () {
        function Stack() {
            this.dataStore = [];
            this.top = 0;
        }
        Stack.prototype.pop = function () {
            return this.dataStore[--this.top];
        };
        Stack.prototype.push = function (elem) {
            this.dataStore[this.top++] = elem;
        };
        Stack.prototype.peek = function () {
            return this.dataStore[this.top - 1];
        };
        Stack.prototype.clear = function () {
            this.top = 0;
        };
        Object.defineProperty(Stack.prototype, "length", {
            get: function () {
                return this.top;
            },
            enumerable: true,
            configurable: true
        });
        return Stack;
    }());
    qs.Stack = Stack;
})(qs || (qs = {}));
var qs;
(function (qs) {
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        /**
         * 是否为文字
         */
        Utils.isLetter = function (str) {
            if (new RegExp("[A-Za-z]").test(str)) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * 是否是数字
         */
        Utils.isDigit = function (str) {
            if (new RegExp("[0-9]").test(str)) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * 是否为空字符串
         */
        Utils.isNullOrEmpty = function (str) {
            return str == null || str == "";
        };
        /**
         * 文字或数字
         */
        Utils.isLetterOrDigit = function (str) {
            if (new RegExp("[A-Za-z0-9]").test(str)) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * 是否是十六进制数字
         */
        Utils.isHexDigit = function (c) {
            if (Utils.isDigit(c)) {
                return true;
            }
            if ('a' <= c && c <= 'f') {
                return true;
            }
            if ('A' <= c && c <= 'F') {
                return true;
            }
            return false;
        };
        return Utils;
    }());
    qs.Utils = Utils;
})(qs || (qs = {}));
//# sourceMappingURL=qyscript.js.map