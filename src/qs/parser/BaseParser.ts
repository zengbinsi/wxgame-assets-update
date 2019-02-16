module qs {
    export class BaseParser {
        /**
         * token列表
         */
        protected tokens: Array<Token>;
        /**
         * 当前读到token索引
         */
        protected index: number = 0;
        public constructor(tokens: Token[]) {
            this.tokens = tokens;
        }
        /**
         * 是否还有更多需要解析的语法
         */
        protected hasMoreTokens(): boolean {
            return this.index < this.tokens.length;
        }
        /**
         * 获得第一个Token
         */
        protected readToken(): Token {
            if (!this.hasMoreTokens()) {
                throw new Error("Unexpected end of token stream.");
            }
            return this.tokens[this.index++];
        }
        /**
         * 返回第一个Toke
         */
        protected peekToken(): Token {
            if (!this.hasMoreTokens()) {
                throw new Error("Unexpected end of token stream.");
            }
            return this.tokens[this.index];
        }
        /**
         * 回滚Token
         */
        protected undoToken(): void {
            if (this.index <= 0) {
                throw new Error("No more tokens to undo.");
            }
            --this.index;
        }
        /**
         * 读取,
         */
        protected readComma(): void {
            var token = this.readToken();
            if (token.type != TokenType.Comma)
                throw new ParserError(token, "Comma ',' expected.");
        }
        /**
         * 读取 未知字符
         */
        protected readIdentifier(): string {
            var token = this.readToken();
            // if (token.type != TokenType.Identifier) {
            //     throw new ParserError(token, "Identifier expected.");
            // }
            return token.lexeme.toString();
        }
        /**
         * 读取{
         */
        protected readLeftBrace(): void {
            var token = this.readToken();
            if (token.type != TokenType.LeftBrace)
                throw new ParserError(token, "Left brace '{' expected.");
        }
        /**
         * 读取)
         */
        protected readRightPar(): void {
            var token = this.readToken();
            if (token.type != TokenType.RightPar)
                throw new ParserError(token, "Right par ')' expected.");
        }
        /**
         * 读取>
         */
        protected readGreater(): void {
            var token = this.readToken();
            if (token.type != TokenType.Greater)
                throw new ParserError(token, "Right par ')' expected.");
        }
        /**
         * 读取}
         */
        protected readRightBrace(): void {
            var token = this.readToken();
            if (token.type != TokenType.RightBrace)
                throw new ParserError(token, "Right brace '}' expected.");
        }
        /**
         * 读取[
         */
        protected readLeftBracket(): void {
            var token = this.readToken();
            if (token.type != TokenType.LeftBracket)
                throw new ParserError(token, "Left bracket '[' expected for array indexing expression.");
        }
        /**
         * 读取]
         */
        protected readRightBracket(): void {
            var token = this.readToken();
            if (token.type != TokenType.RightBracket)
                throw new ParserError(token, "Right bracket ']' expected for array indexing expression.");
        }
        /**
         * 读取(
         */
        protected readLeftParenthesis(): void {
            var token = this.readToken();
            if (token.type != TokenType.LeftPar)
                throw new ParserError(token, "Left parenthesis '(' expected.");
        }
        /**
         * 读取)
         */
        protected readRightParenthesis(): void {
            var token = this.readToken();
            if (token.type != TokenType.RightPar)
                throw new ParserError(token, "Right parenthesis ')' expected.");
        }
        /**
         * 读取;
         */
        protected readSemiColon(): void {
            var token = this.readToken();
            if (token.type != TokenType.SemiColon)
                throw new ParserError(token, "SemiColon ';' expected.");
        }
        /**
         * 读取var
         */
        protected readVar(): void {
            var token = this.readToken();
            if (token.type != TokenType.Var)
                throw new ParserError(token, "Var 'var' expected.");
        }
        /**
         * 读取in
         */
        protected readIn(): void {
            var token = this.readToken();
            if (token.type != TokenType.In)
                throw new ParserError(token, "In 'in' expected.");
        }
        /**
         * 读取:
         */
        protected readColon(): void {
            var token = this.readToken();
            if (token.type != TokenType.Colon)
                throw new ParserError(token, "Colon ':' expected.");
        }
        /**
         * 读取 module
         */
        protected readModule(): string {
            var token = this.readToken();
            if (token.type != TokenType.Module) {
                throw new ParserError(token, "Module 'module' expected.");
            }
            return token.lexeme.toString();
        }
        /**
         * 读取class
         */
        protected readClass(): void {
            var token = this.readToken();
            if (token.type != TokenType.Class)
                throw new ParserError(token, "Class 'class' expected.");
        }
        /**
         * 读取function
         */
        protected readFunction(): void {
            var token = this.readToken();
            if (token.type != TokenType.Function)
                throw new ParserError(token, "function 'function' expected.");
        }
        /**
         * 读取catch
         */
        protected readCatch(): void {
            var token = this.readToken();
            if (token.type != TokenType.Catch)
                throw new ParserError(token, "Catch 'catch' expected.");
        }
        /**
         * 获取export修饰符
         */
        protected getExport(): boolean {
            if (this.peekToken().type == TokenType.Export) {
                this.readToken();
                return true;
            }
            return false;
        }
        /**
         * 获取abstract修饰符
         */
        protected getAbstract(): boolean {
            if (this.peekToken().type == TokenType.Abstract) {
                this.readToken();
                return true;
            }
            return false;
        }
    }
}