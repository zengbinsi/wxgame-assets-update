module qs {
    /**
     * 指令集
     */
    export class Instruction {
        private _opcode: Opcode;
        /**
         * 指令类型
         */
        public get opcode(): Opcode {
            return this._opcode;
        }
        private _value: any;
        /**
         * 指令值
         */
        public get value(): any {
            return this._value;
        }
        /**
         * 对应标识
         */
        public readonly token: Token;
        public constructor(opcode: Opcode, value: any, token: Token) {
            this._opcode = opcode;
            this._value = value;
            this.token = token;
        }
    }
}