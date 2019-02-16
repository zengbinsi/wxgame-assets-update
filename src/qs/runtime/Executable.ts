module qs {
    /**
     * 可执行指令块
     */
    export class Executable {
        /**
         * 指令列表
         */
        public readonly instructionList: Instruction[] = [];
        /**
         * 父指令，如果为空则是当前对象
         */
        private parent: Executable;
        /**
         * 指令块类型
         */
        private type: BlockType;
        public constructor(type: BlockType, parent: Executable = null) {
            this.type = type;
            this.parent = parent;
        }
        //添加一条指令
        public addInstruction(instruction: Instruction): void {
            this.instructionList.push(instruction);
        }
    }
    export enum BlockType {
        /**
         * 无
         */
        None,
        /**
         * 普通的分块
         */
        Block,
        /**
         * 函数
         */
        Function,
        /**
         * 判断语句
         */
        If,
        /**
         * for循环开始
         */
        ForBegin,
        /**
         * for循环执行
         */
        ForLoop,
        /**
         * for语句内容
         */
        For,
        /**
         * foreach语句
         */
        Forin,
        /**
         * while语句
         */
        While,
        /**
         * swtich语句
         */
        Switch,
    }
}