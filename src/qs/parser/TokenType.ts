module qs {
    export enum TokenType {
        /**
         * 空类型（没有实际用途）		
         */
        None,
        /**
         * var		
         */
        Var,
        /**
         * var		
         */
        Const,
        /**
         * {		
         */
        LeftBrace,
        /**
         * }		
         */
        RightBrace,
        /**
         * (		
         */
        LeftPar,
        /**
         * )		
         */
        RightPar,
        /**
         * [		
         */
        LeftBracket,
        /**
         * ]		
         */
        RightBracket,
        /**
         * .		
         */
        Period,
        /**
         * ,
         */
        Comma,
        /**
         * :
         */
        Colon,
        /**
         * ;		
         */
        SemiColon,
        /**
         * ?		
         */
        QuestionMark,
        /**
         * +		
         */
        Plus,
        /**
         * ++		
         */
        Increment,
        /**
         * +=		
         */
        AssignPlus,
        /**
         * -		
         */
        Minus,
        /**
         * --		
         */
        Decrement,
        /**
         * -=		
         */
        AssignMinus,
        /**
         * *		
         */
        Multiply,
        /**
         * *=		
         */
        AssignMultiply,
        /**
         * /		
         */
        Divide,
        /**
         * /=		
         */
        AssignDivide,
        /**
         * % 模运算		
         */
        Modulo,
        /**
         * %=		
         */
        AssignModulo,
        /**
         * | 或运算		
         */
        InclusiveOr,
        /**
         * |=		
         */
        AssignInclusiveOr,
        /**
         * ||		
         */
        Or,
        /**
         * & 并运算		
         */
        Combine,
        /**
         * &=		
         */
        AssignCombine,
        /**
         * &&		
         */
        And,
        /**
         * ^ 异或		
         */
        XOR,
        /**
         * ^=		
         */
        AssignXOR,
        /**
         * <<左移		
         */
        Shi,
        /**
         * <<=		
         */
        AssignShi,
        /**
         * >> 右移		
         */
        Shr,
        /**
         * >>=		
         */
        AssignShr,
        /**
         * !		
         */
        Not,
        /**
         * =		
         */
        Assign,
        /**
         * ==		
         */
        Equal,
        /**
         * instanceof
         */
        Instanceof,
        /**
         * typeof
         */
        Typeof,
        /**
         * !=		
         */
        NotEqual,
        /**
         * >		
         */
        Greater,
        /**
         * >=		
         */
        GreaterOrEqual,
        /**
         *  <		
         */
        Less,
        /**
         * <=		
         */
        LessOrEqual,
        /**
         * ...		
         */
        Params,
        /**
         * if		
         */
        If,
        /**
         * else		
         */
        Else,
        /**
         * for		
         */
        For,
        /**
         * dynamic		
         */
        Dynamic,
        /**
         * each		
         */
        Each,
        /**
         * in		
         */
        In,
        /**
         * switch		
         */
        Switch,
        /**
         * case		
         */
        Case,
        /**
         * default		
         */
        Default,
        /**
         * break		
         */
        Break,
        /**
         * continue		
         */
        Continue,
        /**
         * return		
         */
        Return,
        /**
         * while		
         */
        While,
        /**
         * function		
         */
        Function,
        /**
         * try		
         */
        Try,
        /**
         * catch		
         */
        Catch,
        /**
         * throw		
         */
        Throw,
        /**
         * bool true false		
         */
        Boolean,
        /**
         * int float		
         */
        Number,
        /**
         * string		
         */
        String,
        /**
         * null		
         */
        Null,
        /**
         * export
         */
        Export,
        /**
         * abstract
         */
        Abstract,
        /**
         * 名称空间定义（暂时当作模块来使用）
         */
        NameSpace,
        /**
         * 模块定义		
         */
        Module,
        /**
         * 类定义		
         */
        Class,
        /**
         * 接口定义		
         */
        Interface,
        /**
         * 公共		
         */
        Public,
        /**
         * 保护		
         */
        Protected,
        /**
         * 私有		
         */
        Private,
        /**
         * 继承		
         */
        Extends,
        /**
         * 静态		
         */
        Static,
        /**
         * 重写		
         */
        Override,
        /**
         * 实例		
         */
        New,
        /**
         * 无返回值		
         */
        Void,
        /**
         * 不可表示的值
         */
        NaN,
        /**
         * 引入		
         */
        Import,
        /**
         * get		
         */
        Get,
        /**
         * set		
         */
        Set,
        /**
         * 说明符		
         */
        Identifier,
        /**
         * is
         */
        Is,
        /**
         * as
         */
        As,
        /**
         * delete
         */
        Delete,
    }
}