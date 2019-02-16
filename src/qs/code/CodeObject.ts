module qs {
    export class CodeObject {
        /**
         * ! 标识（非xxx）
         */
        public not: boolean;
        /**
         * !! 标识（非非xxx）
         */
        public doubleNot: boolean;
        /**
         * - 标识（负数）
         */
        public negative: boolean;
        /**
         * 代码标识
         */
        public readonly token: Token;
        /**
         * 用来存储类路径
         */
        public classPathMap: any;
        public constructor(token: Token = null) {
            this.token = token;
        }
    }
}