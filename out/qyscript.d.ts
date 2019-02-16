declare module qs {
    class CodeObject {
        /**
         * ! 标识（非xxx）
         */
        not: boolean;
        /**
         * !! 标识（非非xxx）
         */
        doubleNot: boolean;
        /**
         * - 标识（负数）
         */
        negative: boolean;
        /**
         * 代码标识
         */
        readonly token: Token;
        /**
         * 用来存储类路径
         */
        classPathMap: any;
        constructor(token?: Token);
    }
}
declare module qs {
    class CodeArray extends CodeObject {
        readonly elements: CodeObject[];
    }
}
declare module qs {
    class CodeAssign extends CodeObject {
        readonly member: CodeMember;
        readonly value: CodeObject;
        readonly assignType: TokenType;
        constructor(member: CodeMember, value: CodeObject, assignType: TokenType, token?: Token);
    }
}
declare module qs {
    /**
     * 函数调用
     */
    class CodeCallFunction extends CodeObject {
        isNew: boolean;
        member: CodeObject | Function;
        parameters: CodeObject[];
    }
}
declare module qs {
    class CodeClass extends CodeObject {
        /**
         * 是否是普通对象
         */
        isObject: boolean;
        /**
         * 是否是导出
         */
        isExport: boolean;
        /**
         * 是否是抽象
         */
        isAbstract: boolean;
        /**
         * 所属模块
         */
        owner: CodeModule;
        /**
         * 类名或js类
         */
        name: string;
        /**
         * 父类
         */
        parent: CodeClass | Function;
        /**
         * 所有的成员属性
         */
        variableMap: any;
        /**
         * 所有的成员属性-静态
         */
        variableMap_static: any;
        /**
         * 所有的成员方法
         */
        functionMap: any;
        /**
         * 所有的成员方法-静态
         */
        functionMap_static: any;
        /**
         * 添加成员属性
         */
        addVariable(variable: CodeVariable): void;
        /**
         * 添加成员方法
         */
        addFunction(func: CodeFunction): void;
        /**
         * 获取成员方法
         */
        getFunction(name: string, isStatic?: boolean): CodeFunction;
    }
}
declare module qs {
    class CodeDelete extends CodeObject {
        readonly value: CodeObject;
        constructor(value: CodeObject, token?: Token);
    }
}
declare module qs {
    class CodeFor extends CodeObject {
        beginExecutable: Executable;
        condition: CodeObject;
        loopExecutable: Executable;
        blockExecutable: Executable;
        setContextExecutable(blockExecutable: Executable): void;
    }
}
declare module qs {
    class CodeForIn extends CodeObject {
        identifier: string;
        loopObject: CodeObject;
        executable: Executable;
    }
}
declare module qs {
    class CodeForSimple extends CodeObject {
        identifier: string;
        begin: CodeObject;
        finished: CodeObject;
        step: CodeObject;
        blockExecutable: Executable;
        variables: any;
        setContextExecutable(blockExecutable: Executable): void;
    }
}
declare module qs {
    class CodeFunction extends CodeObject {
        readonly paramNames: string[];
        readonly types: CodeMember[];
        readonly values: CodeObject[];
        readonly executable: Executable;
        readonly isDynamicParams: boolean;
        readonly name: string;
        readonly isStatic: boolean;
        /**
         * 是否自动执行，function(){}()
         */
        autoCall: boolean;
        /**
         * 自执行方法的参数
         */
        parameters: CodeObject[];
        constructor(name: string, isStatic: boolean, params: string[], types: CodeMember[], values: CodeObject[], executable: Executable, isDynamicParams: boolean, token?: Token);
    }
    enum FunctionType {
        /**
         * 普通方法
         */
        Normal = 0,
        /**
         * get方法
         */
        Get = 1,
        /**
         * set方法
         */
        Set = 2,
    }
}
declare module qs {
    class CodeIf extends CodeObject {
        If: TempCondition;
        Else: TempCondition;
        elseIf: Array<TempCondition>;
        addElseIf(con: TempCondition): void;
    }
}
declare module qs {
    class CodeMember extends CodeObject {
        /**
         * 父成员
         */
        readonly parent: CodeMember;
        /**
         * 成员值
         * obj["key"]、obj[0]
         */
        readonly value: any;
        /**
         * 计算标识
         */
        calc: Calc;
        constructor(value: any, token?: Token, parent?: CodeMember);
    }
    enum Calc {
        /**
         * 无
         */
        NONE = 0,
        /**
         * 前置++
         */
        PRE_INCREMENT = 1,
        /**
         * 后置++
         */
        POST_INCREMENT = 2,
        /**
         * 前置--
         */
        PRE_DECREMENT = 3,
        /**
         * 后置--
         */
        POST_DECREMENT = 4,
    }
}
declare module qs {
    class CodeModule extends CodeObject {
        /**
         * 父成员
         */
        parent: CodeModule;
        /**
         * 模块名
         */
        value: string;
    }
}
declare module qs {
    class CodeNew extends CodeObject {
        readonly newObject: CodeObject;
        constructor(newObject: CodeObject, token?: Token);
    }
}
declare module qs {
    /**
     * 运算符号
     */
    class CodeOperator extends CodeObject {
        /**
         * 左边值
         */
        left: CodeObject;
        /**
         * 右边值
         */
        right: CodeObject;
        /**
         * 符号类型
         */
        operator: TokenType;
        constructor(right: CodeObject, left: CodeObject, operator: TokenType, token?: Token);
    }
}
declare module qs {
    class CodeScriptObject extends CodeObject {
        readonly value: any;
        constructor(value: any, token?: Token);
    }
}
declare module qs {
    class CodeSwitch extends CodeObject {
        condition: CodeObject;
        default: TempCase;
        cases: TempCase[];
        addCase(con: TempCase): void;
    }
}
declare module qs {
    class CodeTernary extends CodeObject {
        allow: CodeObject;
        true: CodeObject;
        false: CodeObject;
    }
}
declare module qs {
    class CodeThrow extends CodeObject {
        obj: CodeObject;
    }
}
declare module qs {
    class CodeTry extends CodeObject {
        tryExecutable: Executable;
        catchExecutable: Executable;
        identifier: string;
    }
}
declare module qs {
    class CodeTypeof extends CodeObject {
        readonly value: CodeObject;
        constructor(value: CodeObject, token?: Token);
    }
}
declare module qs {
    /**
     * 成员变量
     */
    class CodeVariable extends CodeObject {
        /**
         * 变量名
         */
        readonly name: any;
        /**
         * 值
         */
        readonly value: any;
        /**
         * 修饰符，公共/私有等
         */
        readonly modifier: TokenType;
        /**
         * 是否静态
         */
        readonly isStatic: boolean;
        /**
         * 变量类型
         */
        readonly type: any;
        constructor(name: any, value: any, modifier: TokenType, isStatic: boolean, type: any, token?: Token);
    }
}
declare module qs {
    class CodeWhile extends CodeObject {
        while: TempCondition;
    }
}
declare module qs {
    class TempCase {
        allow: any[];
        executable: Executable;
        constructor(allow: any[], executable: Executable);
    }
}
declare module qs {
    class TempCondition {
        allow: CodeObject;
        executable: Executable;
        constructor(allow: CodeObject, executable: Executable);
    }
}
declare module qs {
    class TempOperator {
        private static operators;
        private static init();
        /**
         * 符号类型
         */
        operator: TokenType;
        /**
         * 优先级
         */
        level: number;
        constructor(oper: TokenType, level: number);
        static getOper(oper: TokenType): TempOperator;
    }
}
declare module qs {
    class ExecutionError extends Error {
        constructor(token: Token, message: string);
    }
}
declare module qs {
    class ParserError extends Error {
        constructor(token: Token, message: string);
    }
}
declare module qs {
    class BaseParser {
        /**
         * token列表
         */
        protected tokens: Array<Token>;
        /**
         * 当前读到token索引
         */
        protected index: number;
        constructor(tokens: Token[]);
        /**
         * 是否还有更多需要解析的语法
         */
        protected hasMoreTokens(): boolean;
        /**
         * 获得第一个Token
         */
        protected readToken(): Token;
        /**
         * 返回第一个Toke
         */
        protected peekToken(): Token;
        /**
         * 回滚Token
         */
        protected undoToken(): void;
        /**
         * 读取,
         */
        protected readComma(): void;
        /**
         * 读取 未知字符
         */
        protected readIdentifier(): string;
        /**
         * 读取{
         */
        protected readLeftBrace(): void;
        /**
         * 读取)
         */
        protected readRightPar(): void;
        /**
         * 读取>
         */
        protected readGreater(): void;
        /**
         * 读取}
         */
        protected readRightBrace(): void;
        /**
         * 读取[
         */
        protected readLeftBracket(): void;
        /**
         * 读取]
         */
        protected readRightBracket(): void;
        /**
         * 读取(
         */
        protected readLeftParenthesis(): void;
        /**
         * 读取)
         */
        protected readRightParenthesis(): void;
        /**
         * 读取;
         */
        protected readSemiColon(): void;
        /**
         * 读取var
         */
        protected readVar(): void;
        /**
         * 读取in
         */
        protected readIn(): void;
        /**
         * 读取:
         */
        protected readColon(): void;
        /**
         * 读取 module
         */
        protected readModule(): string;
        /**
         * 读取class
         */
        protected readClass(): void;
        /**
         * 读取function
         */
        protected readFunction(): void;
        /**
         * 读取catch
         */
        protected readCatch(): void;
        /**
         * 获取export修饰符
         */
        protected getExport(): boolean;
        /**
         * 获取abstract修饰符
         */
        protected getAbstract(): boolean;
    }
}
declare module qs {
    /**
     * 词法解析器
     */
    class Lexer {
        /**
         * 当前存储的单词
         */
        private word;
        /**
         * 所有行
         */
        private readonly lines;
        /**
         * 标记列表
         */
        private tokens;
        private _commentList;
        /**
         * 注释列表
         */
        readonly commentList: string[];
        /**
         * 单个注释
         */
        private commentWord;
        /**
         * 摘要，取第一行字符串
         */
        readonly breviary: string;
        /**
         * 摘要的字符数
         */
        private breviaryLength;
        /**
         * 当前解析行数
         */
        private line;
        /**
         * 当前解析字符索引
         */
        private index;
        /**
         * 当前正在解析的单个字符
         */
        private char;
        private _lexType;
        /**
         * 当前词法类型
         */
        lexType: LexType;
        /**
         * 是否一行结束
         */
        readonly isEndOfLine: boolean;
        /**
         * 是否解析结束
         */
        readonly isEndOfBuffer: boolean;
        /**
         * 词法解析器
         * @buffer 代码
         */
        constructor(buffer: string);
        /**
         * 读取一个字符
         */
        protected readChar(): string;
        /**
         * 忽略一行
         */
        protected ignoreLine(): void;
        /**
         * 增加一个标记
         */
        protected addToken(type: TokenType, lexeme?: any): void;
        /**
         * 抛出一个无效字符的异常
         */
        private throwInvalidCharacterException(ch);
        /**
         * 添加一个注释
         */
        protected addComment(): void;
        /**
         * 回滚字符读取
         */
        protected undoReadChar(): void;
        /**
         * 解析字符串
         */
        getTokens(): Array<Token>;
    }
}
declare module qs {
    /**
     * 词法类型
     */
    enum LexType {
        /**
         * 没有关键字
         */
        None = 0,
        /**
         * = 等于或者相等
         */
        AssignOrEqual = 1,
        /**
         * / 注释或者除号
         */
        CommentOrDivideOrAssignDivide = 2,
        /**
         * 行注释
         */
        LineComment = 3,
        /**
         * 区域注释开始
         */
        BlockCommentStart = 4,
        /**
         * 区域注释结束
         */
        BlockCommentEnd = 5,
        /**
         * .或者多参符(...)
         */
        PeriodOrParams = 6,
        /**
         * 多参符(...)
         */
        Params = 7,
        /**
         * + 或者 ++ 或者 +=
         */
        PlusOrIncrementOrAssignPlus = 8,
        /**
         * - 或者 -=
         */
        MinusOrDecrementOrAssignMinus = 9,
        /**
         * * 或者 *=
         */
        MultiplyOrAssignMultiply = 10,
        /**
         * % 或者 %=
         */
        ModuloOrAssignModulo = 11,
        /**
         * & 或者 &= 或者 &&
         */
        AndOrCombine = 12,
        /**
         * | 或者 |= 或者 ||
         */
        OrOrInclusiveOr = 13,
        /**
         * ^ 或者 ^=
         */
        XorOrAssignXor = 14,
        /**
         * << 或者 <<=
         */
        ShiOrAssignShi = 15,
        /**
         * >> 或者 >>=
         */
        ShrOrAssignShr = 16,
        /**
         * ! 非或者不等于
         */
        NotOrNotEqual = 17,
        /**
         * > 大于或者大于等于
         */
        GreaterOrGreaterEqual = 18,
        /**
         * < 小于或者小于等于
         */
        LessOrLessEqual = 19,
        /**
         * " 字符串
         */
        String = 20,
        /**
         * \ 格式符
         */
        StringEscape = 21,
        /**
         * ' 字符串 单引号开始结束</summary>
         */
        SingleString = 22,
        /**
         * \ 格式符</summary>
         */
        SingleStringEscape = 23,
        /**
         * @ 开始字符串
         */
        SimpleStringStart = 24,
        /**
         * @" 不格式化的字符串 类似c# @符号
         */
        SimpleString = 25,
        /**
         * 字符串内出现"是引号还是结束符
         */
        SimpleStringQuotationMarkOrOver = 26,
        /**
         * @" 不格式化的字符串 类似c# @符号
         */
        SingleSimpleString = 27,
        /**
         * 字符串内出现"是引号还是结束符
         */
        SingleSimpleStringQuotationMarkOrOver = 28,
        /**
         * 十进制数字或者十六进制数字
         */
        NumberOrHexNumber = 29,
        /**
         * 十进制数字
         */
        Number = 30,
        /**
         * 十六进制数字
         */
        HexNumber = 31,
        /**
         * 描述符
         */
        Identifier = 32,
    }
}
declare module qs {
    /**
     * 语法解析器
     */
    class Parser extends BaseParser {
        /**
         * 全局对象
         */
        readonly globalObj: any;
        /**
         * 脚本类数据
         */
        readonly classPathMap: any;
        /**
         * 所有的脚本类
         */
        readonly codeClassList: CodeClass[];
        /**
         * 语法解析器
         * @tokens 标记列表
         * @breviary 摘要
         */
        constructor(tokens: Token[], globalObj: any);
        /**
         * 解析脚本
         * @returns 脚本类数据
         */
        parse(): any;
        private _parse();
        /**
         * 解析模块
         */
        private parseModule();
        /**
         * 解析类
         */
        private parseClass(codeClass);
        /**
         * 读取成员
         */
        private readMembers(codeClass?);
        /**
         * 解析区域代码内容( {} 之间的内容)
         */
        private parseStatementBlock(executable, readLeftBrace?, finished?);
        private parseStatement(executable);
        private parseVar(executable);
        private parseIf(executable);
        private parseCondition(condition, executable);
        private parseFor(executable);
        private parseFor_Simple(executable, Identifier, obj);
        private parseFor_impl(executable);
        private parseForeach(executable);
        private parseWhile(executable);
        private parseSwtich(executable);
        private parseCase(vals);
        private parseTry(executable);
        private parseThrow(executable);
        private parseReturn(executable);
        private parseExpression(executable);
        private getOneObject(isType?);
        /**
         * 解析匿名函数
         */
        private parseFunction();
        /**
         * 解析成员函数
         */
        private parseFunctionDeclaration(modifier?, isStatic?);
        private getTernary(parent);
        /**
         * 获取数组
         */
        private getArray();
        private getNew(executable?);
        private getTypeof(executable?);
        private getDelete(executable?);
        /**
         * 获取变量数据
         */
        private getVariable(parent);
        private getObject(checkColon?);
        /**
         * 解析操作符
         */
        private parseOperator(operateStack, objectStack);
        /**
         * 获取一个函数调用
         */
        private getCallFunction(member);
        /**
         * 读取继承
         */
        private readExtend(codeClass);
        /**
         * 获取一个类
         */
        private getCodeClass(owner);
        private getCodeClassByName(name, parent?);
    }
}
declare module qs {
    class Token {
        private _type;
        /**
         * 标记类型
         */
        readonly type: TokenType;
        /**
         * 标记类型名
         */
        readonly name: string;
        private _lexeme;
        /**
         * 标记值
         */
        readonly lexeme: any;
        private _line;
        /**
         * 所在行
         */
        readonly line: number;
        private _index;
        /**
         * 所在列
         */
        readonly index: number;
        constructor(tokenType: TokenType, lexeme: any, sourceLine: number, sourceChar: number);
        toString(): String;
    }
}
declare module qs {
    enum TokenType {
        /**
         * 空类型（没有实际用途）
         */
        None = 0,
        /**
         * var
         */
        Var = 1,
        /**
         * var
         */
        Const = 2,
        /**
         * {
         */
        LeftBrace = 3,
        /**
         * }
         */
        RightBrace = 4,
        /**
         * (
         */
        LeftPar = 5,
        /**
         * )
         */
        RightPar = 6,
        /**
         * [
         */
        LeftBracket = 7,
        /**
         * ]
         */
        RightBracket = 8,
        /**
         * .
         */
        Period = 9,
        /**
         * ,
         */
        Comma = 10,
        /**
         * :
         */
        Colon = 11,
        /**
         * ;
         */
        SemiColon = 12,
        /**
         * ?
         */
        QuestionMark = 13,
        /**
         * +
         */
        Plus = 14,
        /**
         * ++
         */
        Increment = 15,
        /**
         * +=
         */
        AssignPlus = 16,
        /**
         * -
         */
        Minus = 17,
        /**
         * --
         */
        Decrement = 18,
        /**
         * -=
         */
        AssignMinus = 19,
        /**
         * *
         */
        Multiply = 20,
        /**
         * *=
         */
        AssignMultiply = 21,
        /**
         * /
         */
        Divide = 22,
        /**
         * /=
         */
        AssignDivide = 23,
        /**
         * % 模运算
         */
        Modulo = 24,
        /**
         * %=
         */
        AssignModulo = 25,
        /**
         * | 或运算
         */
        InclusiveOr = 26,
        /**
         * |=
         */
        AssignInclusiveOr = 27,
        /**
         * ||
         */
        Or = 28,
        /**
         * & 并运算
         */
        Combine = 29,
        /**
         * &=
         */
        AssignCombine = 30,
        /**
         * &&
         */
        And = 31,
        /**
         * ^ 异或
         */
        XOR = 32,
        /**
         * ^=
         */
        AssignXOR = 33,
        /**
         * <<左移
         */
        Shi = 34,
        /**
         * <<=
         */
        AssignShi = 35,
        /**
         * >> 右移
         */
        Shr = 36,
        /**
         * >>=
         */
        AssignShr = 37,
        /**
         * !
         */
        Not = 38,
        /**
         * =
         */
        Assign = 39,
        /**
         * ==
         */
        Equal = 40,
        /**
         * instanceof
         */
        Instanceof = 41,
        /**
         * typeof
         */
        Typeof = 42,
        /**
         * !=
         */
        NotEqual = 43,
        /**
         * >
         */
        Greater = 44,
        /**
         * >=
         */
        GreaterOrEqual = 45,
        /**
         *  <
         */
        Less = 46,
        /**
         * <=
         */
        LessOrEqual = 47,
        /**
         * ...
         */
        Params = 48,
        /**
         * if
         */
        If = 49,
        /**
         * else
         */
        Else = 50,
        /**
         * for
         */
        For = 51,
        /**
         * dynamic
         */
        Dynamic = 52,
        /**
         * each
         */
        Each = 53,
        /**
         * in
         */
        In = 54,
        /**
         * switch
         */
        Switch = 55,
        /**
         * case
         */
        Case = 56,
        /**
         * default
         */
        Default = 57,
        /**
         * break
         */
        Break = 58,
        /**
         * continue
         */
        Continue = 59,
        /**
         * return
         */
        Return = 60,
        /**
         * while
         */
        While = 61,
        /**
         * function
         */
        Function = 62,
        /**
         * try
         */
        Try = 63,
        /**
         * catch
         */
        Catch = 64,
        /**
         * throw
         */
        Throw = 65,
        /**
         * bool true false
         */
        Boolean = 66,
        /**
         * int float
         */
        Number = 67,
        /**
         * string
         */
        String = 68,
        /**
         * null
         */
        Null = 69,
        /**
         * export
         */
        Export = 70,
        /**
         * abstract
         */
        Abstract = 71,
        /**
         * 名称空间定义（暂时当作模块来使用）
         */
        NameSpace = 72,
        /**
         * 模块定义
         */
        Module = 73,
        /**
         * 类定义
         */
        Class = 74,
        /**
         * 接口定义
         */
        Interface = 75,
        /**
         * 公共
         */
        Public = 76,
        /**
         * 保护
         */
        Protected = 77,
        /**
         * 私有
         */
        Private = 78,
        /**
         * 继承
         */
        Extends = 79,
        /**
         * 静态
         */
        Static = 80,
        /**
         * 重写
         */
        Override = 81,
        /**
         * 实例
         */
        New = 82,
        /**
         * 无返回值
         */
        Void = 83,
        /**
         * 不可表示的值
         */
        NaN = 84,
        /**
         * 引入
         */
        Import = 85,
        /**
         * get
         */
        Get = 86,
        /**
         * set
         */
        Set = 87,
        /**
         * 说明符
         */
        Identifier = 88,
        /**
         * is
         */
        Is = 89,
        /**
         * as
         */
        As = 90,
        /**
         * delete
         */
        Delete = 91,
    }
}
declare module qs {
    /**
     * 可执行指令块
     */
    class Executable {
        /**
         * 指令列表
         */
        readonly instructionList: Instruction[];
        /**
         * 父指令，如果为空则是当前对象
         */
        private parent;
        /**
         * 指令块类型
         */
        private type;
        constructor(type: BlockType, parent?: Executable);
        addInstruction(instruction: Instruction): void;
    }
    enum BlockType {
        /**
         * 无
         */
        None = 0,
        /**
         * 普通的分块
         */
        Block = 1,
        /**
         * 函数
         */
        Function = 2,
        /**
         * 判断语句
         */
        If = 3,
        /**
         * for循环开始
         */
        ForBegin = 4,
        /**
         * for循环执行
         */
        ForLoop = 5,
        /**
         * for语句内容
         */
        For = 6,
        /**
         * foreach语句
         */
        Forin = 7,
        /**
         * while语句
         */
        While = 8,
        /**
         * swtich语句
         */
        Switch = 9,
    }
}
declare module qs {
    /**
     * 指令集
     */
    class Instruction {
        private _opcode;
        /**
         * 指令类型
         */
        readonly opcode: Opcode;
        private _value;
        /**
         * 指令值
         */
        readonly value: any;
        /**
         * 对应标识
         */
        readonly token: Token;
        constructor(opcode: Opcode, value: any, token: Token);
    }
}
declare module qs {
    /**
     * 指令类型
     */
    enum Opcode {
        /**
         * 申请一个局部变量
         */
        VAR = 0,
        /**
         * 执行If语句
         */
        CALL_IF = 1,
        /**
         * 执行For语句
         */
        CALL_FOR = 2,
        /**
         * 执行For语句
         */
        CALL_FORSIMPLE = 3,
        /**
         * 执行Foreach语句
         */
        CALL_FORIN = 4,
        /**
         * 执行While语句
         */
        CALL_WHILE = 5,
        /**
         * 执行switch语句
         */
        CALL_SWITCH = 6,
        /**
         * 执行try catch语句
         */
        CALL_TRY = 7,
        /**
         * 调用一个函数
         */
        CALL_FUNCTION = 8,
        /**
         * throw
         */
        THROW = 9,
        /**
         * 解析一个变量
         */
        RESOLVE = 10,
        /**
         * 返回值
         */
        RET = 11,
        /**
         * break跳出 for foreach while
         */
        BREAK = 12,
        /**
         * continue跳出本次 for foreach while
         */
        CONTINUE = 13,
        /**
         * 实例化
         */
        NEW = 14,
        /**
         * typeof
         */
        Typeof = 15,
        /**
         * delete
         */
        Delete = 16,
    }
}
declare var __extends: any;
declare module qs {
    interface IReturnData {
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
    class Runtime {
        /**
         * 上下文对象，用于保存临时变量等
         */
        /**
         * 当前this指针
         */
        private currentThis;
        /**
         * 当前正在解析的类
         */
        private codeClass;
        private parser;
        run(mainClass: CodeClass, parser: Parser): any;
        private parseClass(codeClass);
        /**
         * 执行构造函数
         */
        private callConstructor(variableMap, codeFunction, thisObject, _super, args);
        private returnValue;
        /**
         * 执行指令集
         */
        private parseExecutable(codeFunction, parentReturnData, thisObject?);
        private executable(executable, returnData);
        /**
         * 执行单个指令
         */
        private exeInstruction(instruction, returnData);
        private processBreak(instruction, returnData);
        private invokeBreak(con, returnData);
        private processContinue(instruction, returnData);
        private invokeContinue(con, returnData);
        private processCallFor(instruction, returnData);
        private processCallForIn(instruction, returnData);
        private processCallWhile(instruction, returnData);
        private processCallSwitch(instruction, returnData);
        private processTry(instruction, returnData);
        private processThrow(instruction, returnData);
        private processNew(instruction, returnData);
        private processDelete(instruction, returnData);
        private processTypeof(instruction, returnData);
        private processCallForSimple(instruction, returnData);
        private isSupportBreak(blockType);
        private isSupportContinue(blockType);
        private processVar(instruction, returnData);
        private processReturn(instruction, returnData);
        private invokeReturnValue(value, returnData);
        private processCondition(con, blockType, returnData);
        private processCallIf(instruction, returnData);
        private processResolve(instruction, returnData);
        private processCallFunction(instruction, returnData);
        /**
         * 解析运算符
         */
        private parseOperate(operate, returnData);
        private resolveOperand(value, returnData);
        private resolveOperand_impl(codeObject, returnData);
        private parseDelete(codeDelete, returnData);
        private parseCall(codeCallFunction, returnData);
        private parseTernary(ternary, returnData);
        private getClass(codeClass);
        private getClassPath(codeClass);
        private getPathList(codeClass);
        private parseNew(codeNew, returnData);
        private parseArray(codeArray, returnData);
        private getContextValue(returnData, key);
        private getVariable(member, returnData);
        private getMemberValue(member, returnData);
        private setVariable(member, value, returnData);
        private parseAssign(codeAssign, returnData);
    }
}
declare module qs {
    /**
     * 运行代码
     * @code 代码
     * @mainClassPath 主类的路径
     * @globalObject 代码中的对象所在的全局对象，可以传window或global等
     * @autoNew 是否自动实例化，如果为false，则返回一个类，否则直接返回实例好的对象，一般启动类需要传递参数的时候才需要为false
     */
    function run(code: string, mainClassPath: string, globalObject: any, autoNew?: boolean): any;
}
declare module qs {
    class Stack<T> {
        dataStore: any[];
        top: number;
        pop(): T;
        push(elem: any): void;
        peek(): T;
        clear(): void;
        readonly length: number;
    }
}
declare module qs {
    class Utils {
        /**
         * 是否为文字
         */
        static isLetter(str: string): boolean;
        /**
         * 是否是数字
         */
        static isDigit(str: string): boolean;
        /**
         * 是否为空字符串
         */
        static isNullOrEmpty(str: string): boolean;
        /**
         * 文字或数字
         */
        static isLetterOrDigit(str: string): boolean;
        /**
         * 是否是十六进制数字
         */
        static isHexDigit(c: string): boolean;
    }
}
