module qs {
    export class ParserError extends Error {
        public constructor(token: Token, message: string) {
            var msg: string = " 行数:" + (token.line + 1) + "  列数:" + token.index + "  标记:" +
                token.name + "  关键字[" + token.lexeme + "]\n\t" + message;
            super(!token ? message : msg);
            this.name = "脚本解析错误";
        }
    }
}