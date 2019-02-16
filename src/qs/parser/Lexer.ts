module qs {
    /**
     * 词法解析器
     */
    export class Lexer {
        /**
         * 当前存储的单词
         */
        private word: string = null;
        /**
         * 所有行
         */
        private readonly lines: string[] = [];
        /**
         * 标记列表
         */
        private tokens: Token[] = [];
        private _commentList: string[] = [];
        /**
         * 注释列表
         */
        public get commentList(): string[] {
            return this._commentList;
        }
        /**
         * 单个注释
         */
        private commentWord: string = "";
        /**
         * 摘要，取第一行字符串
         */
        public readonly breviary: string;
        /**
         * 摘要的字符数
         */
        private breviaryLength: number = 20;
        /**
         * 当前解析行数
         */
        private line: number = 0;
        /**
         * 当前解析字符索引
         */
        private index: number = 0;
        /**
         * 当前正在解析的单个字符
         */
        private char: string;
        private _lexType: LexType = LexType.None;
        /**
         * 当前词法类型
         */
        public get lexType(): LexType {
            return this._lexType;
        }
        public set lexType(value: LexType) {
            this._lexType = value;
            if (this._lexType == LexType.None) {
                this.word = "";
            }
        }
        /**
         * 是否一行结束
         */
        public get isEndOfLine(): boolean {
            return this.index >= this.lines[this.line].length;
        }
        /**
         * 是否解析结束
         */
        public get isEndOfBuffer(): boolean {
            return this.line >= this.lines.length;
        }
        /**
         * 词法解析器
         * @buffer 代码
         */
        public constructor(buffer: string) {
            buffer = buffer.replace(/\r\n/g, "\n");//windows系统换行替换
            var lines = buffer.split("\n");//获取所有行
            for (var i = 0; i < lines.length; i++) {
                lines[i] += "\n";
            }
            this.breviary = lines[0] || "";//设置摘要
            this.lines = lines;//设置所有行
        }
        /**
         * 读取一个字符
         */
        protected readChar(): string {
            if (this.isEndOfBuffer) {
                throw new Error("End of source reached." + "at:" + this.line + ":" + this.index);
            }
            var ch: string = this.lines[this.line].charAt(this.index++);
            if (this.index >= this.lines[this.line].length) {
                this.index = 0;
                ++this.line;
            }
            return ch;
        }
        /**
         * 忽略一行
         */
        protected ignoreLine(): void {
            ++this.line;
            this.index = 0;
        }
        /**
         * 增加一个标记
         */
        protected addToken(type: TokenType, lexeme: any = null): void {
            lexeme = lexeme != null ? lexeme : this.char;
            this.tokens.push(new Token(type, lexeme, this.line, this.index));
            this.lexType = LexType.None;
        }
        /**
         * 抛出一个无效字符的异常
         */
        private throwInvalidCharacterException(ch: string): void {
            throw new Error("无效的字符 [" + ch + "]  Line:" + (this.line + 1) + " Column:" + this.index
                + " [" + this.lines[this.line] + "]");
        }
        /**
         * 添加一个注释
         */
        protected addComment(): void {
            if (Utils.isLetterOrDigit(this.char) || this.char == '@') {
                this.commentWord += this.char;
            }
            else {
                if (this.commentWord.length != 0) {
                    this._commentList.push(this.commentWord);
                }
                this.commentWord = "";
            }
        }
        /**
         * 回滚字符读取
         */
        protected undoReadChar(): void {
            if (this.line == 0 && this.index == 0) {
                throw new Error("Cannot undo char beyond start of source." + ":" + this.line + ":" + this.index)
            }
            --this.index;
            if (this.index < 0) {
                --this.line;
                this.index = this.lines[this.line].length - 1;
            }
        }
        /**
         * 解析字符串
         */
        public getTokens(): Array<Token> {
            this.line = 0;
            this.index = 0;
            this.lexType = LexType.None;
            this.tokens.length = 0;
            while (!this.isEndOfBuffer) {
                if (this.isEndOfLine) {
                    this.ignoreLine();
                    continue;
                }
                this.char = this.readChar();
                var value: number;
                switch (this.lexType) {
                    case LexType.None:
                        switch (this.char) {
                            case ' ':
                            case '\t':
                            case '\n':
                            case '\r':
                                break;
                            case '(':
                                this.addToken(TokenType.LeftPar);
                                break;
                            case ')':
                                this.addToken(TokenType.RightPar);
                                break;
                            case '[':
                                this.addToken(TokenType.LeftBracket);
                                break;
                            case ']':
                                this.addToken(TokenType.RightBracket);
                                break;
                            case '{':
                                this.addToken(TokenType.LeftBrace);
                                break;
                            case '}':
                                this.addToken(TokenType.RightBrace);
                                break;
                            case ',':
                                this.addToken(TokenType.Comma);
                                break;
                            case ':':
                                this.addToken(TokenType.Colon);
                                break;
                            case ';':
                                this.addToken(TokenType.SemiColon);
                                break;
                            case '?':
                                this.addToken(TokenType.QuestionMark);
                                break;
                            case '.':
                                this.lexType = LexType.PeriodOrParams;
                                break;
                            case '+':
                                this.lexType = LexType.PlusOrIncrementOrAssignPlus;
                                break;
                            case '-':
                                this.lexType = LexType.MinusOrDecrementOrAssignMinus;
                                break;
                            case '*':
                                this.lexType = LexType.MultiplyOrAssignMultiply;
                                break;
                            case '/':
                                this.lexType = LexType.CommentOrDivideOrAssignDivide;
                                this.addComment();
                                break;
                            case '%':
                                this.lexType = LexType.ModuloOrAssignModulo;
                                break;
                            case '=':
                                this.lexType = LexType.AssignOrEqual;
                                break;
                            case '&':
                                this.lexType = LexType.AndOrCombine;
                                break;
                            case '|':
                                this.lexType = LexType.OrOrInclusiveOr;
                                break;
                            case '!':
                                this.lexType = LexType.NotOrNotEqual;
                                break;
                            case '>':
                                this.lexType = LexType.GreaterOrGreaterEqual;
                                break;
                            case '<':
                                this.lexType = LexType.LessOrLessEqual;
                                break;
                            case '^':
                                this.lexType = LexType.XorOrAssignXor;
                                break;
                            case '@':
                                this.lexType = LexType.SimpleStringStart;
                                break;
                            case "\"":
                                this.lexType = LexType.String;
                                break;
                            case '\'':
                                this.lexType = LexType.SingleString;
                                break;
                            default:
                                if (this.char == '_' || this.char == '$' || Utils.isLetter(this.char)) {
                                    this.lexType = LexType.Identifier;
                                    this.word = "" + this.char;
                                }
                                else if (this.char == '0') {
                                    this.lexType = LexType.NumberOrHexNumber;
                                    this.word = "";
                                }
                                else if (Utils.isDigit(this.char)) {
                                    this.lexType = LexType.Number;
                                    this.word = "" + this.char;
                                }
                                else {
                                    this.throwInvalidCharacterException(this.char);
                                }
                                break;
                        }
                        break;
                    case LexType.PeriodOrParams:
                        if (this.char == '.') {
                            this.lexType = LexType.Params;
                        } else {
                            this.addToken(TokenType.Period, ".");
                            this.undoReadChar();
                        }
                        break;
                    case LexType.Params:
                        if (this.char == '.') {
                            this.addToken(TokenType.Params, "...");
                        } else {
                            this.throwInvalidCharacterException(this.char);
                        }
                        break;
                    case LexType.PlusOrIncrementOrAssignPlus:
                        if (this.char == '+') {
                            this.addToken(TokenType.Increment, "++");
                        } else if (this.char == '=') {
                            this.addToken(TokenType.AssignPlus, "+=");
                        } else {
                            this.addToken(TokenType.Plus, "+");
                            this.undoReadChar();
                        }
                        break;
                    case LexType.MinusOrDecrementOrAssignMinus:
                        if (this.char == '-') {
                            this.addToken(TokenType.Decrement, "--");
                        } else if (this.char == '=') {
                            this.addToken(TokenType.AssignMinus, "-=");
                        } else {
                            this.addToken(TokenType.Minus, "-");
                            this.undoReadChar();
                        }
                        break;
                    case LexType.MultiplyOrAssignMultiply:
                        if (this.char == '=') {
                            this.addToken(TokenType.AssignMultiply, "*=");
                        } else {
                            this.addToken(TokenType.Multiply, "*");
                            this.undoReadChar();
                        }
                        break;
                    case LexType.CommentOrDivideOrAssignDivide:
                        switch (this.char) {
                            case '/':
                                this.lexType = LexType.LineComment;
                                this.addComment();
                                break;
                            case '*':
                                this.lexType = LexType.BlockCommentStart;
                                this.addComment();
                                break;
                            case '=':
                                this.addToken(TokenType.AssignDivide, "/=");
                                break;
                            default:
                                this.addToken(TokenType.Divide, "/");
                                this.undoReadChar();
                                break;
                        }
                        break;
                    case LexType.ModuloOrAssignModulo:
                        if (this.char == '=') {
                            this.addToken(TokenType.AssignModulo, "%=");
                        } else {
                            this.addToken(TokenType.Modulo, "%");
                            this.undoReadChar();
                        }
                        break;
                    case LexType.LineComment:
                        if (this.char == '\n') {
                            this.lexType = LexType.None;
                        }
                        break;
                    case LexType.BlockCommentStart:
                        if (this.char == '*') {
                            this.lexType = LexType.BlockCommentEnd;
                        }
                        this.addComment();
                        break;
                    case LexType.BlockCommentEnd:
                        if (this.char == '/') {
                            this.lexType = LexType.None;
                        }
                        else {
                            this.lexType = LexType.BlockCommentStart;
                        }
                        this.addComment();
                        break;
                    case LexType.AssignOrEqual:
                        if (this.char == '=') {
                            this.addToken(TokenType.Equal, "==");
                        } else {
                            this.addToken(TokenType.Assign, "=");
                            this.undoReadChar();
                        }
                        break;
                    case LexType.AndOrCombine:
                        if (this.char == '&') {
                            this.addToken(TokenType.And, "&&");
                        } else if (this.char == '=') {
                            this.addToken(TokenType.AssignCombine, "&=");
                        } else {
                            this.addToken(TokenType.Combine, "&");
                            this.undoReadChar();
                        }
                        break;
                    case LexType.OrOrInclusiveOr:
                        if (this.char == '|') {
                            this.addToken(TokenType.Or, "||");
                        } else if (this.char == '=') {
                            this.addToken(TokenType.AssignInclusiveOr, "|=");
                        } else {
                            this.addToken(TokenType.InclusiveOr, "|");
                            this.undoReadChar();
                        }
                        break;
                    case LexType.XorOrAssignXor:
                        if (this.char == '=') {
                            this.addToken(TokenType.AssignXOR, "^=");
                        } else {
                            this.addToken(TokenType.XOR, "^");
                            this.undoReadChar();
                        }
                        break;
                    case LexType.GreaterOrGreaterEqual:
                        if (this.char == '=') {
                            this.addToken(TokenType.GreaterOrEqual, ">=");
                        } else if (this.char == '>') {
                            this.lexType = LexType.ShrOrAssignShr;
                        } else {
                            this.addToken(TokenType.Greater, ">");
                            this.undoReadChar();
                        }
                        break;
                    case LexType.LessOrLessEqual:
                        if (this.char == '=') {
                            this.addToken(TokenType.LessOrEqual, "<=");
                        } else if (this.char == '<') {
                            this.lexType = LexType.ShiOrAssignShi;
                        } else {
                            this.addToken(TokenType.Less, "<");
                            this.undoReadChar();
                        }
                        break;
                    case LexType.ShrOrAssignShr:
                        if (this.char == '=') {
                            this.addToken(TokenType.AssignShr, ">>=");
                        } else {
                            this.addToken(TokenType.Shr, ">>");
                            this.undoReadChar();
                        }
                        break;
                    case LexType.ShiOrAssignShi:
                        if (this.char == '=') {
                            this.addToken(TokenType.AssignShi, "<<=");
                        } else {
                            this.addToken(TokenType.Shi, "<<");
                            this.undoReadChar();
                        }
                        break;
                    case LexType.NotOrNotEqual:
                        if (this.char == '=') {
                            this.addToken(TokenType.NotEqual, "!=");
                        } else {
                            this.addToken(TokenType.Not, "!");
                            this.undoReadChar();
                        }
                        break;
                    case LexType.String:
                        if (this.char == "\"") {
                            this.addToken(TokenType.String, this.word);
                        } else if (this.char == '\\') {
                            this.lexType = LexType.StringEscape;
                        } else if (this.char == '\r' || this.char == '\n') {
                            this.throwInvalidCharacterException(this.char);
                        } else {
                            this.word += this.char;
                        }
                        break;
                    case LexType.StringEscape:
                        if (this.char == '\\' || this.char == "\"") {
                            this.word += this.char;
                            this.lexType = LexType.String;
                        } else if (this.char == 't') {
                            this.word += '\t';
                            this.lexType = LexType.String;
                        } else if (this.char == 'r') {
                            this.word += '\r';
                            this.lexType = LexType.String;
                        } else if (this.char == 'n') {
                            this.word += '\n';
                            this.lexType = LexType.String;
                        } else {
                            this.throwInvalidCharacterException(this.char);
                        }
                        break;
                    case LexType.SingleString:
                        if (this.char == '\'') {
                            this.addToken(TokenType.String, this.word);
                        } else if (this.char == '\\') {
                            this.lexType = LexType.SingleStringEscape;
                        } else if (this.char == '\r' || this.char == '\n') {
                            this.throwInvalidCharacterException(this.char);
                        } else {
                            this.word += this.char;
                        }
                        break;
                    case LexType.SingleStringEscape:
                        if (this.char == '\\' || this.char == '\'') {
                            this.word += this.char;
                            this.lexType = LexType.SingleString;
                        } else if (this.char == 't') {
                            this.word += '\t';
                            this.lexType = LexType.SingleString;
                        } else if (this.char == 'r') {
                            this.word += '\r';
                            this.lexType = LexType.SingleString;
                        } else if (this.char == 'n') {
                            this.word += '\n';
                            this.lexType = LexType.SingleString;
                        } else {
                            this.throwInvalidCharacterException(this.char);
                        }
                        break;
                    case LexType.SimpleStringStart:
                        if (this.char == "\"") {
                            this.lexType = LexType.SimpleString;
                        } else if (this.char == '\'') {
                            this.lexType = LexType.SingleSimpleString;
                        } else {
                            this.throwInvalidCharacterException(this.char);
                        }
                        break;
                    case LexType.SimpleString:
                        if (this.char == "\"") {
                            this.lexType = LexType.SimpleStringQuotationMarkOrOver;
                        } else {
                            this.word += this.char;
                        }
                        break;
                    case LexType.SimpleStringQuotationMarkOrOver:
                        if (this.char == "\"") {
                            this.word += "\"";
                            this.lexType = LexType.SimpleString;
                        } else {
                            this.addToken(TokenType.String, this.word);
                            this.undoReadChar();
                        }
                        break;
                    case LexType.SingleSimpleString:
                        if (this.char == '\'') {
                            this.lexType = LexType.SingleSimpleStringQuotationMarkOrOver;
                        } else {
                            this.word += this.char;
                        }
                        break;
                    case LexType.SingleSimpleStringQuotationMarkOrOver:
                        if (this.char == '\'') {
                            this.word += '\'';
                            this.lexType = LexType.SingleSimpleString;
                        } else {
                            this.addToken(TokenType.String, this.word);
                            this.undoReadChar();
                        }
                        break;
                    case LexType.NumberOrHexNumber:
                        if (this.char == 'x') {
                            this.lexType = LexType.HexNumber;
                        } else {
                            this.word = "0";
                            this.lexType = LexType.Number;
                            //							this.addToken(TokenType.Number, 0);
                            this.undoReadChar();
                        }
                        break;
                    case LexType.Number:
                        if (Utils.isDigit(this.char) || this.char == '.') {
                            this.word += this.char;
                        }
                        else {
                            value = parseFloat(this.word);
                            this.addToken(TokenType.Number, value);
                            this.undoReadChar();
                        }
                        break;
                    case LexType.HexNumber:
                        if (Utils.isHexDigit(this.char)) {
                            this.word += this.char;
                        }
                        else {
                            if (Utils.isNullOrEmpty(this.word)) {
                                this.throwInvalidCharacterException(this.char);
                            }
                            value = parseInt("0x" + this.word);
                            this.addToken(TokenType.Number, value);
                            this.undoReadChar();
                        }
                        break;
                    case LexType.Identifier:
                        if (this.char == '_' || this.char == '$' || Utils.isLetterOrDigit(this.char)) {
                            this.word += this.char;
                        } else {
                            var tokenType: TokenType;
                            switch (this.word) {
                                case "module":
                                case 'namespace':
                                    tokenType = TokenType.Module;
                                    break;
                                case "abstract":
                                    tokenType = TokenType.Abstract;
                                    break;
                                case "export":
                                    tokenType = TokenType.Export;
                                    break;
                                case "class":
                                    tokenType = TokenType.Class;
                                    break;
                                case "interface":
                                    tokenType = TokenType.Interface;
                                    break;
                                case "public":
                                    tokenType = TokenType.Public;
                                    break;
                                case "protected":
                                    tokenType = TokenType.Protected;
                                    break;
                                case "private":
                                    tokenType = TokenType.Private;
                                    break;
                                case "dynamic":
                                    tokenType = TokenType.Dynamic;
                                    break;
                                case "extends":
                                    tokenType = TokenType.Extends;
                                    break;
                                case "override":
                                    tokenType = TokenType.Override;
                                    break;
                                case "void":
                                    tokenType = TokenType.Void;
                                    break;
                                case "NaN":
                                    tokenType = TokenType.NaN;
                                    break;
                                case "import":
                                    tokenType = TokenType.Import;
                                    break;
                                case "static":
                                    tokenType = TokenType.Static;
                                    break;
                                case "get":
                                    if (this.char == " ") {
                                        tokenType = TokenType.Get;
                                    }
                                    else {
                                        tokenType = TokenType.Identifier;
                                    }
                                    break;
                                case "set":
                                    if (this.char == " ") {
                                        tokenType = TokenType.Set;
                                    }
                                    else {
                                        tokenType = TokenType.Identifier;
                                    }
                                    break;
                                case "each":
                                    tokenType = TokenType.Each;
                                    break;
                                case "new":
                                    tokenType = TokenType.New;
                                    break;
                                case "const":
                                    tokenType = TokenType.Const;
                                    break;
                                case "var":
                                    tokenType = TokenType.Var;
                                    break;
                                case "function":
                                    tokenType = TokenType.Function;
                                    break;
                                case "if":
                                    tokenType = TokenType.If;
                                    break;
                                case "else":
                                    tokenType = TokenType.Else;
                                    break;
                                case "while":
                                    tokenType = TokenType.While;
                                    break;
                                case "for":
                                    tokenType = TokenType.For;
                                    break;
                                case "in":
                                    tokenType = TokenType.In;
                                    break;
                                case "switch":
                                    tokenType = TokenType.Switch;
                                    break;
                                case "case":
                                    tokenType = TokenType.Case;
                                    break;
                                case "default":
                                    tokenType = TokenType.Default;
                                    break;
                                case "try":
                                    tokenType = TokenType.Try;
                                    break;
                                case "catch":
                                    tokenType = TokenType.Catch;
                                    break;
                                case "throw":
                                    tokenType = TokenType.Throw;
                                    break;
                                case "continue":
                                    tokenType = TokenType.Continue;
                                    break;
                                case "break":
                                    tokenType = TokenType.Break;
                                    break;
                                case "return":
                                    tokenType = TokenType.Return;
                                    break;
                                case "null":
                                    tokenType = TokenType.Null;
                                    break;
                                case "true":
                                case "false":
                                    tokenType = TokenType.Boolean;
                                    break;
                                case "is":
                                    tokenType = TokenType.Is;
                                    break;
                                case "instanceof":
                                    tokenType = TokenType.Instanceof;
                                    break;
                                case "typeof":
                                    tokenType = TokenType.Typeof;
                                    break;
                                case "delete":
                                    tokenType = TokenType.Delete;
                                    break;
                                case "as":
                                    tokenType = TokenType.As;
                                    break;
                                case "delete":
                                    tokenType = TokenType.Delete;
                                    break;
                                default:
                                    tokenType = TokenType.Identifier;
                                    break;
                            }
                            if (tokenType == TokenType.Boolean) {
                                this.tokens.push(new Token(tokenType, this.word == "true", this.line, this.index));
                            }
                            else if (tokenType == TokenType.Null) {
                                this.tokens.push(new Token(tokenType, null, this.line, this.index));
                            }
                            else if (tokenType == TokenType.NaN) {
                                this.tokens.push(new Token(tokenType, NaN, this.line, this.index));
                            }
                            else {
                                this.tokens.push(new Token(tokenType, this.word, this.line, this.index));
                            }
                            this.undoReadChar();
                            this.lexType = LexType.None;
                        }
                        break;
                }
            }
            return this.tokens;
        }
    }
}