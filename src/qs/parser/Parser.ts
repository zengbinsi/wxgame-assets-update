/// <reference path="BaseParser.ts"/>
module qs {
    /**
     * 语法解析器
     */
    export class Parser extends BaseParser {
        /**
         * 全局对象
         */
        public readonly globalObj: any;
        /**
         * 脚本类数据
         */
        public readonly classPathMap: any = {};
        /**
         * 所有的脚本类
         */
        public readonly codeClassList: CodeClass[] = [];
        /**
         * 语法解析器
         * @tokens 标记列表
         * @breviary 摘要
         */
        public constructor(tokens: Token[], globalObj: any) {
            super(tokens);
            this.globalObj = globalObj;
            this.parse();
        }
        /**
         * 解析脚本
         * @returns 脚本类数据
         */
        public parse(): any {
            while (this.hasMoreTokens()) {
                this._parse();
            }
            return this.classPathMap;
        }
        private _parse(): CodeClass {
            var owner = this.parseModule();
            if (owner) {//如果有模块定义
                this.readLeftBrace();
            }
            while (true) {
                var codeClass = new qs.CodeClass();
                codeClass.owner = owner;
                //解析类
                this.parseClass(codeClass);
                if (
                    !this.hasMoreTokens() ||
                    (codeClass.owner && this.peekToken().type == TokenType.RightBrace)
                ) {
                    break;
                }
            }
            if (owner) {//如果有模块定义
                this.readRightBrace();
            }
            return codeClass;
        }
        /**
         * 解析模块
         */
        private parseModule(): CodeModule {
            var codeModule: CodeModule = null;
            if (this.peekToken().type == TokenType.Module) {//说明存在模块定义
                this.readModule();
                var moduleName = this.readIdentifier();
                codeModule = new CodeModule(this.peekToken());
                var classPathMap = this.classPathMap[moduleName] || {};
                this.classPathMap[moduleName] = classPathMap;
                codeModule.value = moduleName;
                codeModule.classPathMap = classPathMap;
                while (this.peekToken().type == TokenType.Period) {
                    this.readToken();
                    moduleName = this.readIdentifier();
                    var childModule = new CodeModule(this.peekToken());
                    childModule.value = moduleName;
                    childModule.parent = codeModule;
                    codeModule = childModule;
                    classPathMap = classPathMap[moduleName] = classPathMap[moduleName] || {};
                    codeModule.classPathMap = classPathMap;
                }
            }
            return codeModule;
        }
        /**
         * 解析类
         */
        private parseClass(codeClass: CodeClass): void {
            var isExport = this.getExport();//是否导出
            var isAbstract = this.getAbstract();//是否抽象
            this.readClass();//读取class关键字
            codeClass.name = this.readIdentifier();//读取类名
            if (codeClass.owner) {//保存类路径
                codeClass.owner.classPathMap[codeClass.name] = codeClass;
            }
            else {
                this.classPathMap[codeClass.name] = codeClass;
            }
            this.codeClassList.push(codeClass);
            this.readExtend(codeClass);//读取继承
            this.readMembers(codeClass);//读取成员
        }
        /**
         * 读取成员
         */
        private readMembers(codeClass: CodeClass = null): void {
            this.readLeftBrace();//读取{
            while (this.peekToken().type != TokenType.RightBrace) {//如果没有}
                var token = this.peekToken();
                var isStatic = false;
                var isGet = false;
                var isSet = false;
                var modifier: TokenType = TokenType.Public;
                if (token.type == TokenType.Public || token.type == TokenType.Private || token.type == TokenType.Protected) {//私有、公共、保护
                    modifier = token.type;
                    this.readToken();
                    token = this.peekToken();
                }
                if (token.type == TokenType.Static) {
                    this.readToken();
                    isStatic = true;
                }
                if (token.type == TokenType.Get) {
                    this.readToken();
                    isGet = true;
                }
                if (token.type == TokenType.Set) {
                    this.readToken();
                    isSet = true;
                }
                var key = this.readToken().lexeme;
                if (this.peekToken().type == TokenType.LeftPar) {//如果是方法定义
                    this.undoToken();
                    this.undoToken();
                    codeClass.addFunction(this.parseFunctionDeclaration(modifier, isStatic));
                }
                else {//否则则是变量
                    var type = null;//属性类型
                    if (this.peekToken().type == TokenType.Colon) {//如果有类型
                        if (codeClass.isObject) {
                            this.readToken();
                            type = this.getObject();
                        }
                        else {
                            this.readToken();
                            type = this.getOneObject(true);
                        }
                    }
                    if (this.peekToken().type == TokenType.Assign) {//如果有赋值
                        this.readToken();
                        token = this.peekToken();
                        if (token.type == TokenType.New) {//实例化
                            token = this.readToken();
                            codeClass.addVariable(new CodeVariable(key, this.getNew(), modifier, isStatic, type, token));
                        }
                        else {
                            codeClass.addVariable(new CodeVariable(key, this.getObject(), modifier, isStatic, type, token));
                        }
                    }
                    else {
                        if (!codeClass.name) {//匿名对象，var a = {1:1,2:2,3:4};或者var b = {1,2,3,4}
                            codeClass.addVariable(new CodeVariable(key, type || key, modifier, isStatic, type, token));
                        }
                        else {//不赋值就是undefined
                            codeClass.addVariable(new CodeVariable(key, undefined, modifier, isStatic, type, token));
                        }
                    }
                }
                var peek = this.peekToken();
                if (peek.type == TokenType.Comma || peek.type == TokenType.SemiColon) {
                    this.readToken();
                }
            }
            this.readRightBrace();
        }
        /**
         * 解析区域代码内容( {} 之间的内容)
         */
        private parseStatementBlock(executable: Executable, readLeftBrace: boolean = true, finished: TokenType = TokenType.RightBrace): void {
            if (readLeftBrace) {
                this.readLeftBrace();
            }
            var tokenType: TokenType;
            while (this.hasMoreTokens()) {
                tokenType = this.readToken().type;
                if (tokenType == finished) {
                    break;
                }
                this.undoToken();
                this.parseStatement(executable);
            }
        }
        //解析区域代码内容 ({} 之间的内容)
        private parseStatement(executable: Executable): void {
            var token = this.readToken();
            switch (token.type) {
                case TokenType.Public:
                    throw new ParserError(token, "方法内的声明不支持public ");
                case TokenType.Protected:
                    throw new ParserError(token, "方法内的声明不支持protected ");
                case TokenType.Private:
                    throw new ParserError(token, "方法内的声明不支持private ");
                case TokenType.Var:
                    this.parseVar(executable);
                    break;
                case TokenType.If:
                    this.parseIf(executable);
                    break;
                case TokenType.For:
                    this.parseFor(executable);
                    break;
                case TokenType.While:
                    this.parseWhile(executable);
                    break;
                case TokenType.Switch:
                    this.parseSwtich(executable);
                    break;
                case TokenType.Try:
                    this.parseTry(executable);
                    break;
                case TokenType.Throw:
                    this.parseThrow(executable);
                    break;
                case TokenType.Return:
                    this.parseReturn(executable);
                    break;
                case TokenType.Identifier:
                case TokenType.Increment:
                case TokenType.Decrement:
                    this.parseExpression(executable);
                    break;
                case TokenType.New:
                    this.getNew(executable);
                    break;
                case TokenType.Typeof:
                    this.getTypeof(executable);
                    break;
                case TokenType.Delete:
                    this.getDelete(executable);
                    break;
                case TokenType.Break:
                    executable.addInstruction(new Instruction(Opcode.BREAK, new CodeObject(token), token));
                    break;
                case TokenType.Continue:
                    executable.addInstruction(new Instruction(Opcode.CONTINUE, new CodeObject(token), token));
                    break;
                case TokenType.Function:
                    var codeFunction = this.parseFunction();
                    if (codeFunction.autoCall) {
                        executable.addInstruction(new Instruction(Opcode.CALL_FUNCTION, codeFunction, token));
                    }
                    break;
                case TokenType.SemiColon:
                    break;
                case TokenType.LeftPar:
                    this.parseStatementBlock(executable, false, TokenType.RightPar);
                    break;
                case TokenType.As:
                    this.getObject();
                    break;
                default:
                    throw new ParserError(token, "不支持的语法 ");
            }
        }
        //解析Var关键字
        private parseVar(executable: Executable): void {
            for (; ;) {
                executable.addInstruction(new Instruction(Opcode.VAR, this.readIdentifier(), this.peekToken()));
                var peek = this.peekToken();
                if (peek.type == TokenType.Colon) {
                    this.readToken();
                    this.readToken();
                    peek = this.peekToken();
                }
                if (peek.type == TokenType.Assign) {
                    this.undoToken();
                    this.undoToken();
                    if (this.peekToken().type == TokenType.Colon) {
                        this.undoToken();
                    }
                    else {
                        this.readToken();
                    }
                    this.parseStatement(executable);
                }
                peek = this.readToken();
                if (peek.type != TokenType.Comma) {
                    this.undoToken();
                    break;
                }
            }
        }
        //解析if(判断语句)
        private parseIf(executable: Executable): void {
            var ret = new CodeIf();
            ret.If = this.parseCondition(true, new Executable(BlockType.If, executable));
            for (; ;) {
                var token = this.readToken();
                if (token.type == TokenType.Else) {
                    if (this.peekToken().type == TokenType.If) {
                        this.readToken();
                        ret.addElseIf(this.parseCondition(true, new Executable(BlockType.If, executable)));
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
            if (this.peekToken().type == TokenType.Else) {
                this.readToken();
                ret.Else = this.parseCondition(false, new Executable(BlockType.If, executable));
            }
            executable.addInstruction(new Instruction(Opcode.CALL_IF, ret, this.peekToken()));
        }
        //解析判断内容
        private parseCondition(condition: boolean, executable: Executable): TempCondition {
            var con: CodeObject = null;
            if (condition) {
                this.readLeftParenthesis();
                con = this.getObject();
                this.readRightParenthesis();
            }
            this.parseStatementBlock(executable);
            return new TempCondition(con, executable);
        }
        //解析for语句
        private parseFor(executable: Executable): void {
            this.readToken();
            this.readToken();
            this.readToken();
            if (this.peekToken().type == TokenType.In) {
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
                if (token.type == TokenType.Identifier) {
                    var assign = this.readToken();
                    if (assign.type == TokenType.Assign) {
                        var obj = this.getObject();
                        var comma = this.readToken();
                        if (comma.type == TokenType.Comma) {
                            this.parseFor_Simple(executable, token.lexeme + "", obj);
                            return;
                        }
                    }
                }
                this.index = partIndex;
                this.parseFor_impl(executable);
            }
        }
        //解析单纯for循环
        private parseFor_Simple(executable: Executable, Identifier: string, obj: CodeObject): void {
            var ret = new CodeForSimple();
            ret.identifier = Identifier;
            ret.begin = obj;
            ret.finished = this.getObject();
            if (this.peekToken().type == TokenType.Comma) {
                this.readToken();
                ret.step = this.getObject();
            }
            this.readRightParenthesis();
            var forExecutable = new Executable(BlockType.For, executable);
            this.parseStatementBlock(forExecutable);
            ret.setContextExecutable(forExecutable);
            executable.addInstruction(new Instruction(Opcode.CALL_FORSIMPLE, ret, this.peekToken()));
        }
        //解析正规for循环
        private parseFor_impl(executable: Executable): void {
            var ret = new CodeFor();
            var token = this.readToken();
            if (token.type != TokenType.SemiColon) {
                this.undoToken();
                var forBeginExecutable = new Executable(BlockType.ForBegin, executable);
                this.parseStatementBlock(forBeginExecutable, false, TokenType.SemiColon);
                ret.beginExecutable = forBeginExecutable;
            }
            token = this.readToken();
            if (token.type != TokenType.SemiColon) {
                this.undoToken();
                ret.condition = this.getObject();
                this.readSemiColon();
            }
            token = this.readToken();
            if (token.type != TokenType.RightPar) {
                this.undoToken();
                var forLoopExecutable = new Executable(BlockType.ForLoop, executable);
                this.parseStatementBlock(forLoopExecutable, false, TokenType.RightPar);
                ret.loopExecutable = forLoopExecutable;
            }
            var forExecutable = new Executable(BlockType.For, executable);
            this.parseStatementBlock(forExecutable);
            ret.setContextExecutable(forExecutable);
            executable.addInstruction(new Instruction(Opcode.CALL_FOR, ret, this.peekToken()));
        }
        //解析foreach语句
        private parseForeach(executable: Executable): void {
            var ret = new CodeForIn();
            this.readLeftParenthesis();
            this.readVar();
            ret.identifier = this.readIdentifier();
            if (this.peekToken().type == TokenType.Colon) {
                this.readColon();
                this.readIdentifier();
            }
            this.readIn();
            ret.loopObject = this.getObject();
            this.readRightParenthesis();
            var forEachExecutable = new Executable(BlockType.Forin, executable);
            this.parseStatementBlock(forEachExecutable);
            ret.executable = forEachExecutable;
            executable.addInstruction(new Instruction(Opcode.CALL_FORIN, ret, this.peekToken()));
        }
        //解析while（循环语句）
        private parseWhile(executable: Executable): void {
            var ret = new CodeWhile();
            ret.while = this.parseCondition(true, new Executable(BlockType.While, executable));
            executable.addInstruction(new Instruction(Opcode.CALL_WHILE, ret, this.peekToken()));
        }
        //解析swtich语句
        private parseSwtich(executable: Executable): void {
            var ret = new CodeSwitch();
            this.readLeftParenthesis();
            ret.condition = this.getObject();
            this.readRightParenthesis();
            this.readLeftBrace();
            for (; ;) {
                var token = this.readToken();
                if (token.type == TokenType.Case) {
                    var vals = [];
                    this.parseCase(vals);
                    var switchExecutable = new Executable(BlockType.Switch, executable);
                    this.parseStatementBlock(switchExecutable, false, TokenType.Break);
                    ret.addCase(new TempCase(vals, switchExecutable));
                }
                else if (token.type == TokenType.Default) {
                    this.readColon();
                    var switchExecutable = new Executable(BlockType.Switch, executable);
                    this.parseStatementBlock(switchExecutable, false, TokenType.Break);
                    ret.default = new TempCase(null, switchExecutable);
                }
                else if (token.type != TokenType.SemiColon) {
                    this.undoToken();
                    break;
                }
            }
            this.readRightBrace();
            executable.addInstruction(new Instruction(Opcode.CALL_SWITCH, ret, this.peekToken()));
        }
        //解析case
        private parseCase(vals: any[]): void {
            // var val = this.readToken();
            // if (val.type == TokenType.String || val.type == TokenType.Number) {
            vals.push(this.getObject(false));
            // }
            // else {
            //     throw new ParserError(val, "case 语句 只支持 string和number类型");
            // }
            this.readColon();
            if (this.readToken().type == TokenType.Case) {
                this.parseCase(vals);
            }
            else {
                this.undoToken();
            }
        }
        //解析try catch
        private parseTry(executable: Executable): void {
            var ret = new CodeTry();
            var exec = new Executable(BlockType.Function, executable);
            this.parseStatementBlock(exec);
            ret.tryExecutable = exec;
            this.readCatch();
            this.readLeftParenthesis();
            ret.identifier = this.readIdentifier();
            var peek: Token = this.peekToken();
            if (peek.type == TokenType.Colon) {
                this.readToken();
                this.readToken();
                peek = this.peekToken();
            }
            this.readRightParenthesis();
            exec = new Executable(BlockType.Function, executable);
            this.parseStatementBlock(exec);
            ret.catchExecutable = exec;
            executable.addInstruction(new Instruction(Opcode.CALL_TRY, ret, this.peekToken()));
        }
        //解析throw
        private parseThrow(executable: Executable): void {
            var ret: CodeThrow = new CodeThrow();
            ret.obj = this.getObject();
            executable.addInstruction(new Instruction(Opcode.THROW, ret, this.peekToken()));
        }
        //解析return
        private parseReturn(executable: Executable): void {
            var peek = this.peekToken();
            if (peek.type == TokenType.RightBrace ||
                peek.type == TokenType.SemiColon) {
                executable.addInstruction(new Instruction(Opcode.RET, null, this.peekToken()));
            }
            else {
                executable.addInstruction(new Instruction(Opcode.RET, this.getObject(), this.peekToken()));
            }
        }
        //解析表达式
        private parseExpression(executable: Executable): void {
            this.undoToken();
            var peek = this.peekToken();
            var member = this.getObject();
            if (member instanceof CodeCallFunction) {
                executable.addInstruction(new Instruction(Opcode.CALL_FUNCTION, member, peek));
            }
            else if (member instanceof CodeMember) {
                if ((member as CodeMember).calc != Calc.NONE) {
                    executable.addInstruction(new Instruction(Opcode.RESOLVE, member, peek));
                }
                // else if (this.peekToken().type != TokenType.RightPar) {
                //     throw new ParserError(peek, "变量后缀不支持此操作符  " + this.peekToken().lexeme);
                // }
            }
            else if (member instanceof CodeAssign) {
                executable.addInstruction(new Instruction(Opcode.RESOLVE, member, peek));
            }
            else if (member instanceof CodeOperator) {
                executable.addInstruction(new Instruction(Opcode.RESOLVE, member, peek));
            }
            else {
                throw new ParserError(peek, "语法不支持起始符号为 " + peek.lexeme);
            }
        }
        private getOneObject(isType: boolean = false): any {
            var codeObject: any = null;
            var token = this.readToken();
            var not = false;
            var doubleNot = false;
            var negative = false;
            var calc = Calc.NONE;
            if (token.type == TokenType.Not) {//!
                not = true;
                token = this.readToken();
                if (token.type == TokenType.Not) {
                    not = false;
                    doubleNot = true;
                    token = this.readToken();
                }
            }
            else if (token.type == TokenType.Minus) {//-
                negative = true;
                token = this.readToken();
            }
            else if (token.type == TokenType.Increment) {//++
                calc = Calc.PRE_INCREMENT;
                token = this.readToken();
            }
            else if (token.type == TokenType.Decrement) {//--
                calc = Calc.PRE_DECREMENT;
                token = this.readToken();
            }
            switch (token.type) {
                case TokenType.Identifier:
                    codeObject = new CodeMember(token.lexeme, token);
                    break;
                case TokenType.LeftPar://()=>void、():void=>{}
                    if (!isType) {//如果不是类型，这里有两种情况，一种为lambda表达式，一种为括号开头的表达式
                        //lambda表达式-todo
                        codeObject = this.getObject();
                        this.readRightParenthesis();
                    }
                    else {//如果是类型则为()=>void这种方法类型
                        var token = this.peekToken();
                        while (token.type != TokenType.Assign) {
                            token = this.readToken();
                        }
                        this.readGreater();
                        var type = this.getOneObject();
                        codeObject = Function;
                    }
                    break;
                case TokenType.Function:
                    codeObject = this.parseFunction();
                    break;
                case TokenType.LeftBracket:
                    this.undoToken();
                    codeObject = this.getArray();
                    break;
                case TokenType.LeftBrace:
                    this.undoToken();
                    codeObject = new CodeClass();
                    codeObject.isObject = true;
                    this.readMembers(codeObject);
                    break;
                case TokenType.Void:
                case TokenType.Null:
                case TokenType.NaN:
                case TokenType.Boolean:
                case TokenType.Number:
                case TokenType.String:
                    codeObject = new CodeScriptObject(token.lexeme, token);
                    break;
                case TokenType.New:
                    codeObject = this.getNew();
                    break;
                case TokenType.Typeof:
                    codeObject = this.getTypeof();
                    break;
                case TokenType.Delete:
                    codeObject = this.getDelete();
                    break;
                default:
                    throw new ParserError(token, "Object起始关键字错误 ");
            }
            codeObject = this.getVariable(codeObject);
            codeObject.not = not;
            codeObject.doubleNot = doubleNot;
            codeObject.negative = negative;
            if (codeObject instanceof CodeMember) {
                if (calc != Calc.NONE) {
                    codeObject.calc = calc;
                } else {
                    var token = this.readToken();
                    if (token.type == TokenType.Increment) {
                        calc = Calc.POST_INCREMENT;
                    } else if (token.type == TokenType.Decrement) {
                        calc = Calc.POST_DECREMENT;
                    } else {
                        this.undoToken();
                    }
                    if (calc != Calc.NONE) {
                        codeObject.calc = calc;
                    }
                }
            }
            else if (calc != Calc.NONE) {
                throw new ParserError(token, "++ 或者 -- 只支持变量的操作");
            }
            return codeObject;
        }
        /**
         * 解析匿名函数
         */
        private parseFunction(): CodeFunction {
            return this.parseFunctionDeclaration();
        }
        /**
         * 解析成员函数
         */
        private parseFunctionDeclaration(modifier: TokenType = TokenType.Public, isStatic: boolean = false): CodeFunction {
            var token = this.readToken();
            var functionType = FunctionType.Normal;
            if (token.type == TokenType.Get) {
                functionType = FunctionType.Get;
            }
            if (token.type == TokenType.Set) {
                functionType = FunctionType.Set;
            }
            var name = null;
            if (token.type != TokenType.LeftPar && this.peekToken().type != TokenType.RightPar) {//如果有方法名
                name = this.readIdentifier();
                name = functionType == FunctionType.Get ? ".get." + name : name;
                name = functionType == FunctionType.Set ? ".set." + name : name;
            }
            if (token.type != TokenType.LeftPar) {//如果当前token为(则说明方法没有修饰符，匿名方法就没有private这些修饰符
                this.readLeftParenthesis();
            }
            var params: string[] = [];
            var types: CodeMember[] = [];
            var values: CodeObject[] = [];
            var isDynamicParams = false;
            if (this.peekToken().type != TokenType.RightPar) {
                while (true) {
                    token = this.readToken();
                    if (token.type == TokenType.Params) {
                        token = this.readToken();
                        isDynamicParams = true;
                    }
                    if (token.type != TokenType.Identifier) {
                        throw new ParserError(token, "Unexpected token '" + token.lexeme + "' in function declaration.");
                    }
                    var strParameterName = token.lexeme.toString();
                    token = this.peekToken();
                    if (token.type == TokenType.QuestionMark) {
                        this.readToken();
                    }
                    if (token.type == TokenType.Colon) {
                        this.readColon();
                        var codeObject = this.getObject() as CodeMember;
                        if (codeObject instanceof CodeAssign) {
                            types.push(codeObject.member);
                            values.push(codeObject.value);
                        }
                        else {
                            types.push(codeObject);
                            values.push(undefined);
                        }
                    }
                    else if (token.type == TokenType.Assign) {
                        this.undoToken();
                        var codeAssign = this.getObject() as CodeAssign;
                        values.push(codeAssign.value);
                    }
                    else {
                        types.push(null);
                        values.push(undefined);
                    }
                    params.push(strParameterName);
                    token = this.peekToken();
                    if (token.type == TokenType.Comma && !isDynamicParams) {
                        this.readComma();
                    }
                    else if (token.type == TokenType.RightPar) {
                        break;
                    }
                    else {
                        throw new ParserError(token, "Comma ',' or right parenthesis ')' expected in function declararion.");
                    }
                }
            }
            this.readRightParenthesis();
            token = this.readToken();
            if (token.type == TokenType.Colon)//如果后面跟着冒号
            {
                this.getObject();
            }
            else {
                this.undoToken();
            }
            var executable = new Executable(BlockType.Function);
            this.parseStatementBlock(executable);
            var codeFunction = new CodeFunction(name, isStatic, params, types, values, executable, isDynamicParams, token);
            token = this.readToken();
            this.undoToken();
            if (token.type == TokenType.LeftPar) {
                codeFunction.parameters = this.getCallFunction(null).parameters;
                codeFunction.autoCall = true;
            }
            return codeFunction;
        }
        //返回三元运算符
        private getTernary(parent: CodeObject): CodeObject {
            if (this.peekToken().type == TokenType.QuestionMark) {
                var ret = new CodeTernary();
                ret.allow = parent;
                this.readToken();
                ret.true = this.getObject(false);
                this.readColon();
                ret.false = this.getObject(false);
                return ret;
            }
            return parent;
        }
        /**
         * 获取数组
         */
        private getArray(): CodeArray {
            this.readLeftBracket();
            var token = this.peekToken();
            var codeArray = new CodeArray();
            while (token.type != TokenType.RightBracket) {
                if (this.peekToken().type == TokenType.RightBracket) {
                    break;
                }
                codeArray.elements.push(this.getObject());
                token = this.peekToken();
                if (token.type == TokenType.Comma) {
                    this.readComma();
                } else if (token.type == TokenType.RightBracket) {
                    break;
                } else
                    throw new ParserError(token, "Comma ',' or right parenthesis ']' expected in array object.");
            }
            this.readRightBracket();
            return codeArray;
        }
        //返回实例化
        private getNew(executable: Executable = null): CodeNew {
            var codeNew = new CodeNew(this.getObject(), this.peekToken());
            if (executable != null) {
                executable.addInstruction(new Instruction(Opcode.NEW, codeNew, this.peekToken()));
            }
            return codeNew;
        }
        //返回typeof
        private getTypeof(executable: Executable = null): CodeTypeof {
            var codeTypeof = new CodeTypeof(this.getObject(), this.peekToken());
            if (executable != null) {
                executable.addInstruction(new Instruction(Opcode.Typeof, codeTypeof, this.peekToken()));
            }
            return codeTypeof;
        }
        //返回delete
        private getDelete(executable: Executable = null): CodeDelete {
            var codeDelete = new CodeDelete(this.getObject(), this.peekToken());
            if (executable != null) {
                executable.addInstruction(new Instruction(Opcode.Delete, codeDelete, this.peekToken()));
            }
            return codeDelete;
        }
        /**
         * 获取变量数据
         */
        private getVariable(parent: CodeObject | Function): CodeObject | Function {
            var codeObject = parent;
            for (; ;) {
                var token = this.readToken();
                if (token.type == TokenType.Period) {
                    var identifier = this.readIdentifier();
                    codeObject = new CodeMember(identifier, this.peekToken(), codeObject as CodeMember);
                    if (this.peekToken().type == TokenType.LeftBracket) {//数组类型，比如number[]
                        this.readToken();
                        if (this.peekToken().type == TokenType.RightBracket) {
                            this.readToken();
                            return codeObject;
                        }
                        else {
                            this.undoToken();
                            // this.undoToken();
                        }
                    }
                }
                else if (token.type == TokenType.LeftBracket) {
                    var keyObject = this.getObject();
                    // if (keyObject instanceof CodeScriptObject) {
                    codeObject = new CodeMember(keyObject, this.peekToken(), codeObject as CodeMember);
                    // }
                    // else {
                    //     throw new ParserError(token, "获取变量只能是 number或string");
                    // }
                    if (this.peekToken().type == TokenType.RightBracket) {
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
                else if (token.type == TokenType.LeftPar) {
                    this.undoToken();
                    codeObject = this.getCallFunction(codeObject);
                }
                else {
                    this.undoToken();
                    break;
                }
            }
            return codeObject;
        }
        //获取一个Object
        private getObject(checkColon: boolean = true): CodeObject {
            var operateStack: Stack<TempOperator> = new Stack<TempOperator>();
            var objectStack: Stack<CodeObject> = new Stack<CodeObject>();
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
                var binexp = new CodeOperator(objectStack.pop(), objectStack.pop(), oper.operator, this.peekToken());
                objectStack.push(binexp);
            }
            var result = objectStack.pop();
            if (result instanceof CodeMember) {
                var member = result as CodeMember;
                if (member.calc == Calc.NONE) {
                    var token = this.readToken();
                    if (token.type == TokenType.Colon && checkColon)//如果后面跟着个冒号则说明有类型
                    {
                        this.readToken();
                        token = this.readToken();
                    }
                    switch (token.type) {
                        case TokenType.Assign:
                        case TokenType.AssignPlus:
                        case TokenType.AssignMinus:
                        case TokenType.AssignMultiply:
                        case TokenType.AssignDivide:
                        case TokenType.AssignModulo:
                        case TokenType.AssignCombine:
                        case TokenType.AssignInclusiveOr:
                        case TokenType.AssignXOR:
                        case TokenType.AssignShr:
                        case TokenType.AssignShi:
                            return new CodeAssign(member, this.getObject(), token.type, token);
                        default:
                            this.undoToken();
                            break;
                    }
                }
            }
            result = this.getTernary(result);
            return result;
        }
		/**
         * 解析操作符
         */
        private parseOperator(operateStack: Stack<TempOperator>, objectStack: Stack<CodeObject>): boolean {
            var curr: TempOperator = TempOperator.getOper(this.peekToken().type);
            if (curr == null) {
                return false;
            }
            this.readToken();
            while (operateStack.length > 0) {
                var oper: TempOperator = operateStack.peek();
                if (oper.level >= curr.level) {
                    operateStack.pop();
                    var binexp: CodeOperator = new CodeOperator(objectStack.pop(), objectStack.pop(), oper.operator, this.peekToken());
                    objectStack.push(binexp);
                }
                else {
                    break;
                }
            }
            operateStack.push(curr);
            return true;
        }
        /**
         * 获取一个函数调用
         */
        private getCallFunction(member: CodeObject | Function): CodeCallFunction {
            var ret = new CodeCallFunction(this.peekToken());
            this.readLeftParenthesis();
            var pars: CodeObject[] = [];
            var token = this.peekToken();
            while (token.type != TokenType.RightPar) {
                pars.push(this.getObject());
                token = this.peekToken();
                if (token.type == TokenType.Comma) {
                    this.readComma();
                }
                else if (token.type == TokenType.RightPar) {
                    break;
                }
                else {
                    throw new ParserError(token, "Comma ',' or right parenthesis ')' expected in function declararion.");
                }
            }
            this.readRightParenthesis();
            ret.member = member;
            ret.parameters = pars;
            return ret;
        }
        /**
         * 读取继承
         */
        private readExtend(codeClass: CodeClass): void {
            if (this.peekToken().type == TokenType.Extends) {//如果有继承
                this.readToken();
                codeClass.parent = this.getCodeClass(codeClass.owner);
            }
        }
        /**
         * 获取一个类
         */
        private getCodeClass(owner: CodeModule): CodeClass | Function {
            var name = this.readIdentifier();
            var codeClass: CodeClass = null;
            if (this.peekToken().type == TokenType.Period) {//如果后面还有.
                codeClass = this.getCodeClassByName(name);
                while (this.peekToken().type == TokenType.Period) {
                    if (!codeClass) {
                        this.undoToken();
                        throw new ParserError(this.peekToken(), "不存在的定义 " + name);
                    }
                    this.readToken();
                    var name = this.readIdentifier();
                    if (this.peekToken().type != TokenType.Period) {
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
        }
        private getCodeClassByName(name: string, parent: any = null): any {
            if (parent == null) {
                return this.classPathMap[name] || this.globalObj[name];
            }
            return parent[name];
        }
    }
}