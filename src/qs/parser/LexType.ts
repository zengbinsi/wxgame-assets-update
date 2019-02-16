module qs {
    /**
     * 词法类型
     */
    export enum LexType {
        /**
         * 没有关键字
         */
        None,
        /**
         * = 等于或者相等
         */
        AssignOrEqual,
        /**
         * / 注释或者除号
         */
        CommentOrDivideOrAssignDivide,
        /**
         * 行注释
         */
        LineComment,
        /**
         * 区域注释开始
         */
        BlockCommentStart,
        /**
         * 区域注释结束
         */
        BlockCommentEnd,
        /**
         * .或者多参符(...)
         */
        PeriodOrParams,
        /**
         * 多参符(...)
         */
        Params,
        /**
         * + 或者 ++ 或者 +=
         */
        PlusOrIncrementOrAssignPlus,
        /**
         * - 或者 -=
         */
        MinusOrDecrementOrAssignMinus,
        /**
         * * 或者 *=
         */
        MultiplyOrAssignMultiply,
        /**
         * % 或者 %=
         */
        ModuloOrAssignModulo,
        /**
         * & 或者 &= 或者 &&
         */
        AndOrCombine,
        /**
         * | 或者 |= 或者 ||
         */
        OrOrInclusiveOr,
        /**
         * ^ 或者 ^=
         */
        XorOrAssignXor,
        /**
         * << 或者 <<=
         */
        ShiOrAssignShi,
        /**
         * >> 或者 >>=
         */
        ShrOrAssignShr,
        /**
         * ! 非或者不等于
         */
        NotOrNotEqual,
        /**
         * > 大于或者大于等于
         */
        GreaterOrGreaterEqual,
        /**
         * < 小于或者小于等于
         */
        LessOrLessEqual,
        /**
         * " 字符串
         */
        String,
        /**
         * \ 格式符
         */
        StringEscape,
        /**
         * ' 字符串 单引号开始结束</summary>
         */
        SingleString,
        /**
         * \ 格式符</summary>
         */
        SingleStringEscape,
        /**
         * @ 开始字符串
         */
        SimpleStringStart,
        /**
         * @" 不格式化的字符串 类似c# @符号
         */
        SimpleString,
        /**
         * 字符串内出现"是引号还是结束符
         */
        SimpleStringQuotationMarkOrOver,
        /**
         * @" 不格式化的字符串 类似c# @符号
         */
        SingleSimpleString,
        /**
         * 字符串内出现"是引号还是结束符
         */
        SingleSimpleStringQuotationMarkOrOver,
        /**
         * 十进制数字或者十六进制数字
         */
        NumberOrHexNumber,
        /**
         * 十进制数字
         */
        Number,
        /**
         * 十六进制数字
         */
        HexNumber,
        /**
         * 描述符
         */
        Identifier,
    }
}