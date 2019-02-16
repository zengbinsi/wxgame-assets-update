module qs {
    export class Token {
        private _type: TokenType;

        /**
         * 标记类型
         */
        public get type(): TokenType {
            return this._type;
        }
        /**
         * 标记类型名
         */
        public get name(): string {
            return TokenType[this.type];
        }
        private _lexeme: any;

        /**
         * 标记值
         */
        public get lexeme(): any {
            return this._lexeme;
        }

        private _line: number;

        /**
         * 所在行
         */
        public get line(): number {
            return this._line;
        }

        private _index: number;

        /**
         * 所在列
         */
        public get index(): number {
            return this._index;
        }

        public constructor(tokenType: TokenType, lexeme: any, sourceLine: number, sourceChar: number) {
            this._type = tokenType;
            this._lexeme = lexeme;
            this._line = sourceLine;
            this._index = sourceChar;
        }
        public toString(): String {
            return this.name + ":" + this._lexeme.toString();
        }
    }
}