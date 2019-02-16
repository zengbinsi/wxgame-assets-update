module qs {
    export class TempOperator {
        //运算符优先级表，
        private static operators: any;
        private static init() {
            if (this.operators) {
                return;
            }
            this.operators = {};

            this.operators[TokenType.InclusiveOr] = new TempOperator(TokenType.InclusiveOr, 1);
            this.operators[TokenType.Combine] = new TempOperator(TokenType.Combine, 1);
            this.operators[TokenType.XOR] = new TempOperator(TokenType.XOR, 1);
            this.operators[TokenType.Shi] = new TempOperator(TokenType.Shi, 1);
            this.operators[TokenType.Shr] = new TempOperator(TokenType.Shr, 1);
            this.operators[TokenType.And] = new TempOperator(TokenType.And, 1);
            this.operators[TokenType.Or] = new TempOperator(TokenType.Or, 1);

            this.operators[TokenType.Instanceof] = new TempOperator(TokenType.Instanceof, 2);

            this.operators[TokenType.Equal] = new TempOperator(TokenType.Equal, 2);
            this.operators[TokenType.NotEqual] = new TempOperator(TokenType.NotEqual, 2);
            this.operators[TokenType.Greater] = new TempOperator(TokenType.Greater, 2);
            this.operators[TokenType.GreaterOrEqual] = new TempOperator(TokenType.GreaterOrEqual, 2);
            this.operators[TokenType.Less] = new TempOperator(TokenType.Less, 2);
            this.operators[TokenType.LessOrEqual] = new TempOperator(TokenType.LessOrEqual, 2);

            this.operators[TokenType.Plus] = new TempOperator(TokenType.Plus, 3);
            this.operators[TokenType.Minus] = new TempOperator(TokenType.Minus, 3);

            this.operators[TokenType.Multiply] = new TempOperator(TokenType.Multiply, 4);
            this.operators[TokenType.Divide] = new TempOperator(TokenType.Divide, 4);
            this.operators[TokenType.Modulo] = new TempOperator(TokenType.Modulo, 4);
        }
        /**
         * 符号类型
         */
        public operator: TokenType;
        /**
         * 优先级
         */
        public level: number = 0;
        public constructor(oper: TokenType, level: number) {
            this.operator = oper;
            this.level = level;
            TempOperator.init();
        }
        //获得运算符
        public static getOper(oper: TokenType): TempOperator {
            this.init();
            if (this.operators[oper] != undefined) {
                return this.operators[oper];
            }
            return null;
        }

    }
}
