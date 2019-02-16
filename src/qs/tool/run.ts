module qs {
    /**
     * 运行代码
     * @code 代码
     * @mainClassPath 主类的路径
     * @globalObject 代码中的对象所在的全局对象，可以传window或global等
     * @autoNew 是否自动实例化，如果为false，则返回一个类，否则直接返回实例好的对象，一般启动类需要传递参数的时候才需要为false
     */
    export function run(code: string, mainClassPath: string, globalObject: any, autoNew: boolean = true): any {
        var lex = new qs.Lexer(code);//词法分析
        var parser = new qs.Parser(lex.getTokens(), globalObject);//语法分析
        var runtime = new qs.Runtime();//运行环境
        var pathList = mainClassPath.split(".");
        var codeClass = parser.classPathMap;
        for (var i = 0; i < pathList.length; i++) {
            codeClass = codeClass[pathList[i]];
        }
        if (!codeClass) {
            throw "不存在的类：" + mainClassPath+"，请检查类路径是否正确，并且是否已经载入";
        }
        var MainClass = runtime.run(codeClass, parser);//运行代码
        if (autoNew) {
            return new MainClass();
        }
        else {
            return MainClass;
        }
    }
}